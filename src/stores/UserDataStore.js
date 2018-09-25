import {observable} from 'mobx';
import jwtDecode from 'jwt-decode';
import {
    Alert,
    AsyncStorage
} from 'react-native';

class UserDataStore{
    @observable userName;
    @observable accessToken;
    @observable idToken;
    @observable idTokenInfo;

    setUserData(userData){
        const userInfo = jwtDecode(userData.idToken);
        this.userName = userInfo.nickname;
        this.accessToken = userData.accessToken;
        this.idToken = userData.idToken;
        this.idTokenInfo = userInfo;
    }

    checkIfLoggedIn = async () => {
        console.log("CALLED CHECKIFLOGGEDIN")
        let localData = await AsyncStorage.multiGet([
            "@kiddiekredit:idToken",
            "@kiddiekredit:accessToken",
            "@kiddiekredit:expiresIn"
        ]);
        localData = localData.reduce( (acc, [key, storedVal]) => Object.assign(acc, {[key.split(":")[1]]: storedVal}), {});
        console.log("CHECKIFLOGGEDIN MIDWAY", localData);
        if (!localData.accessToken || !localData.idToken || !localData.expiresIn || Number(localData.expiresIn) < new Date().getTime()+1000*60*60) return;
        this.setUserData({...localData});
        console.log("CHECKIFLOGGEDIN FINISHED");
    }

    persistUserData = async (userData) => {
        return await AsyncStorage.multiSet([
            ["@kiddiekredit:idToken", userData.idToken],
            ["@kiddiekredit:accessToken", userData.accessToken],
            ["@kiddiekredit:expiresIn", ""+ (new Date().getTime() + userData.expiresIn * 1000)]
        ]);
    }


}

const userRepository = new UserDataStore();

export default userRepository;