import {observable} from 'mobx';
import {fetchJson} from "../services/Networking";
import {apiUrl} from "../globals";
import userRepository from "./UserDataStore";

class AlertsStore{
    @observable alerts = null;

    loadAlertsFromApi = async (idToken, familyUnitId) => {
        const alerts = await fetchJson(apiUrl + `/familyunit/${familyUnitId}/alerts`, {
            headers: {
                Authorization: 'Bearer ' + idToken
            }
        });
        if (!alerts) return;
        if (alerts.err) return;
        if (alerts.message) return;
        this.alerts = alerts;
    }
    deleteAlerts = async (idToken, familyUnitId) => {
        const deleteResult = await fetchJson(apiUrl + `/familyunit/${familyUnitId}/alerts`, {
            headers: {
                Authorization: 'Bearer ' + idToken
            },
            method: 'DELETE'
        });
        if (deleteResult.message === 'ok') this.alerts = [];
    };

}

const alertsRepository = new AlertsStore();

export default alertsRepository;