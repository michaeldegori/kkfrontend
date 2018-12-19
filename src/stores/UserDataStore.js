import {observable} from 'mobx';
import jwtDecode from 'jwt-decode';
import {
    Alert,
    AsyncStorage
} from 'react-native';
import {fetchJson} from "../services/Networking";
import {apiUrl} from "../globals";
import {loginWithRefreshToken, logOutFromAuth0, toQueryString} from "../services/Authorization";

import familyUnitRepository from './FamilyUnitDataStore';
import choresRepository from "./DefaultChoresStore";
import rewardsRepository from "./DefaultRewardsStore";
import registerForPushNotificationsAsync from "../services/PushNotifications";

class UserDataStore{
    @observable isLoggedIn = false;
    @observable mongoId;
    @observable firstName;
    @observable lastName;
    @observable email;
    @observable avatar;
    @observable parentType;
    @observable BROWSING_MODE = 'parent';
    @observable accessToken;
    @observable idToken;
    @observable nextRoute;

    setUserData(idToken, accessToken, mongoId, finishedSignup){
        const userInfo = jwtDecode(idToken);
        this.mongoId = mongoId;
        this.firstName = userInfo["https://kiddiekredit.com/user_metadata"].first_name;
        this.lastName = userInfo["https://kiddiekredit.com/user_metadata"].last_name;
        this.parentType = userInfo["https://kiddiekredit.com/user_metadata"].parent_type;
        this.email = userInfo.email;
        this.accessToken = accessToken;
        this.idToken = idToken;
        this.avatar = userInfo.picture;
        this.isLoggedIn = true;
        if (finishedSignup) this.nextRoute = "/maintabscreen/addfamilyunitmember";
    };

    //TODO: Change this so it only looks for refresh token
    checkIfLoggedIn = async () => {
        // let localData = await AsyncStorage.multiGet([
        //     "@kiddiekredit:idToken",
        //     "@kiddiekredit:accessToken",
        //     "@kiddiekredit:refreshToken",
        //     "@kiddiekredit:expiresIn"
        // ]);
        // localData = localData.reduce( (acc, [key, storedVal]) => Object.assign(acc, {[key.split(":")[1]]: storedVal}), {});
        // if (!localData.accessToken || !localData.refreshToken || !localData.idToken || !localData.expiresIn || Number(localData.expiresIn) < new Date().getTime()+1000*60*60) return false;
        // console.log("HYDRATED STORAGE DATA", localData);

        let refreshToken = await AsyncStorage.getItem("@kiddiekredit:refreshToken");
        if (!refreshToken) return false;

        const refreshedInfo = await loginWithRefreshToken(refreshToken);
        if (!refreshedInfo || typeof refreshedInfo !== 'object') return false;

        console.log(refreshedInfo);

        const {id_token:idToken, access_token:accessToken} = refreshedInfo;

        if (!idToken || !accessToken) return false;

        const browsingMode = await AsyncStorage.getItem("BROWSING_MODE");
        if (browsingMode) this.BROWSING_MODE = browsingMode;

        await this.pullUserInfoFromApiAndStore(idToken, accessToken, false, refreshToken);
        return true;
    };

    pullUserInfoFromApiAndStore = async (idToken, accessToken, isRegistration=false, refreshToken) => {
        const decodedToken = jwtDecode(idToken);
        console.log("################pullUser", decodedToken);
        const userMetaData = decodedToken['https://kiddiekredit.com/user_metadata'];
        const queryStringInfo = {
            firstName: userMetaData.firstName,
            lastName: userMetaData.lastName,
            email: decodedToken.email,
            userSubType: userMetaData.parent_type
        };
        console.log("##QueryString Info", queryStringInfo);
        let uri = apiUrl + '/familyUnit'+toQueryString(queryStringInfo);
        let fetchOptions = {
            headers: {
                'Authorization': 'Bearer ' + idToken
            }
        };
        if (isRegistration) {
            uri = apiUrl + '/user/finishRegistration' + toQueryString(queryStringInfo);
            fetchOptions.method = 'POST';
        }
        const userAndFamilyData = await fetchJson(uri, fetchOptions);

        if (!userAndFamilyData || !userAndFamilyData.currentUser) return false;

        // console.log('################' + JSON.stringify(userAndFamilyData, null, 4));

        this.setUserData(idToken, accessToken, userAndFamilyData.currentUser._id);
        familyUnitRepository.setFamilyData(userAndFamilyData.familyUnit);
        await this.persistUserData(idToken, accessToken, refreshToken);

        await Promise.all([
            choresRepository.loadChoresFromApi(idToken),
            rewardsRepository.loadRewardsFromApi(idToken)
        ]);

        return true;
    };


    persistUserData = async (idToken, accessToken, refreshToken) => {
        const userInfo = jwtDecode(idToken);
        console.log("@@@@@@@Persisting User Data", (idToken||"").length, (accessToken||"").length, (refreshToken||"").length)
        return await AsyncStorage.multiSet([
            ["@kiddiekredit:idToken", idToken],
            ["@kiddiekredit:accessToken", accessToken],
            ["@kiddiekredit:refreshToken", refreshToken],
            ["@kiddiekredit:expiresIn", ""+ (Number(userInfo.exp)*1000)]
        ]);
    };

    async switchBrowsingMode(history, id, mode){
        if (mode === 'parent'){
            AsyncStorage.setItem("BROWSING_MODE", 'parent');
            await this.logOut(history);
            registerForPushNotificationsAsync(this);
            return;
        }
        this.BROWSING_MODE = 'child-'+id;
        history.push("/maintabscreen/kid/choreboard");
        AsyncStorage.setItem("BROWSING_MODE", 'child-'+id);
        registerForPushNotificationsAsync(this);
    }


    async logOut(history) {
        this.mongoId = null;
        this.firstName = null;
        this.lastName = null;
        this.email = null;
        this.avatar = null;
        this.parentType = null;
        this.BROWSING_MODE = 'parent';
        this.accessToken = null;
        this.idToken = null;
        this.nextRoute = null;
        this.isLoggedIn = false;

        if (history) await logOutFromAuth0(history);
    }
}

const userRepository = new UserDataStore();

export default userRepository;