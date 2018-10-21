import {observable} from 'mobx';
import {fetchJson} from "../services/Networking";
import {apiUrl} from "../globals";
import userRepository from "./UserDataStore";

class DefaultRewardsStore{
    @observable rewards;

    loadRewardsFromApi = async (idToken) => {
        const rewards = await fetchJson(apiUrl + '/defaultrewards', {
            headers: {
                Authorization: 'Bearer ' + idToken
            }
        });
        if (!rewards) return;
        this.rewards = rewards;
    }

}

const rewardsRepository = new DefaultRewardsStore();

export default rewardsRepository;