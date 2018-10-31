import {observable} from 'mobx';
import {fetchJson} from "../services/Networking";
import {apiUrl} from "../globals";
import userRepository from "./UserDataStore";

class AlertsStore{
    @observable alerts = [];

    loadAlertsFromApi = async (idToken, familyUnitId) => {
        const alerts = await fetchJson(apiUrl + `/familyunit/${familyUnitId}/alerts`, {
            headers: {
                Authorization: 'Bearer ' + idToken
            }
        });
        if (!alerts) return;
        this.alerts = alerts;
    }

}

const alertsRepository = new AlertsStore();

export default alertsRepository;