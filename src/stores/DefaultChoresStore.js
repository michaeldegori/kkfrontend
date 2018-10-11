import {observable} from 'mobx';
import {fetchJson} from "../services/Networking";
import {apiUrl} from "../globals";
import userRepository from "./UserDataStore";

class DefaultChoresStore{
    @observable chores;

    loadChoresFromApi = async (idToken) => {
        const chores = await fetchJson(apiUrl + '/defaultchores', {
            headers: {
                Authorization: 'Bearer ' + idToken
            }
        });
        if (!chores) return;
        this.chores = chores;
    }

}

const choresRepository = new DefaultChoresStore();

export default choresRepository;