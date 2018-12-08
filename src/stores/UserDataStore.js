import {observable} from 'mobx';
import jwtDecode from 'jwt-decode';
import {
    Alert,
    AsyncStorage
} from 'react-native';
import {fetchJson} from "../services/Networking";
import {apiUrl} from "../globals";
import {logOutFromAuth0, toQueryString} from "../services/Authorization";

import familyUnitRepository from './FamilyUnitDataStore';
import choresRepository from "./DefaultChoresStore";
import rewardsRepository from "./DefaultRewardsStore";
import registerForPushNotificationsAsync from "../services/PushNotifications";

class UserDataStore{
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
        if (finishedSignup) this.nextRoute = "/maintabscreen/addfamilyunitmember";
    };

    checkIfLoggedIn = async () => {
        // this.logOut(null);
        console.log("CALLED CHECKIFLOGGEDIN")
        let localData = await AsyncStorage.multiGet([
            "@kiddiekredit:idToken",
            "@kiddiekredit:accessToken",
            "@kiddiekredit:expiresIn"
        ]);
        localData = localData.reduce( (acc, [key, storedVal]) => Object.assign(acc, {[key.split(":")[1]]: storedVal}), {});
        console.log("CHECKIFLOGGEDIN MIDWAY", localData);
        if (!localData.accessToken || !localData.idToken || !localData.expiresIn || Number(localData.expiresIn) < new Date().getTime()+1000*60*60) return false;
        await this.pullUserInfoFromApiAndStore(localData.idToken, localData.accessToken, false, false);
        const browsingMode = await AsyncStorage.getItem("BROWSING_MODE");
        if (browsingMode) {
            this.BROWSING_MODE = browsingMode;
        }
        if (browsingMode && browsingMode.indexOf("child") !== -1) {
            this.nextRoute = "/maintabscreen/kid/choreboard";
        }
        console.log("CHECKIFLOGGEDIN FINISHED");
        return true;
    };

    pullUserInfoFromApiAndStore = async (idToken, accessToken, isRegistration=false, shouldPersist=true) => {
        const decodedToken = jwtDecode(idToken);
        const userMetaData = decodedToken['https://kiddiekredit.com/user_metadata'];
        const queryStringInfo = {
            firstName: userMetaData.first_name,
            lastName: userMetaData.last_name,
            email: decodedToken.email,
            userSubType: userMetaData.parent_type
        };
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

        if (!userAndFamilyData || !userAndFamilyData.currentUser) return;

        this.setUserData(idToken, accessToken, userAndFamilyData.currentUser._id);
        familyUnitRepository.setFamilyData(userAndFamilyData.familyUnit);
        if (shouldPersist) await this.persistUserData(idToken, accessToken, userAndFamilyData.currentUser._id);

        await Promise.all([
            choresRepository.loadChoresFromApi(idToken),
            rewardsRepository.loadRewardsFromApi(idToken)
        ]);

        return true;
    };


    persistUserData = async (idToken, accessToken, mongoId) => {
        const userInfo = jwtDecode(idToken);
        return await AsyncStorage.multiSet([
            ["@kiddiekredit:idToken", idToken],
            ["@kiddiekredit:accessToken", accessToken],
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

        if (history) await logOutFromAuth0(history);
    }
}

const userRepository = new UserDataStore();

export default userRepository;