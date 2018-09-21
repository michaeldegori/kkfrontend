import {observable} from 'mobx';
import {AuthSession} from 'expo';
import {
    Alert
} from 'react-native';



class UserDataStore{
    @observable userName;

    setUserData(userData){
        this.userName = userData.userName;
    }

}

const userRepository = new UserDataStore();

export default userRepository;