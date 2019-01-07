import {observable} from 'mobx';
import {fetchJson} from "../services/Networking";
import {apiUrl} from "../globals";
import alertsRepository from "./AlertsStore";

class FamilyUnitStore{
    @observable unitId;
    @observable kidsList;
    @observable adminsList;
    @observable existingChores;
    @observable existingRewards;
    @observable choreExceptions;

    setFamilyData = ({kidsList, adminsList, existingChores, existingRewards, choreExceptions, ...familyUnit}) => {
        this.unitId = familyUnit._id;
        this.kidsList = kidsList;
        this.adminsList = adminsList;
        this.existingChores = existingChores;
        this.existingRewards = existingRewards;
        this.choreExceptions = choreExceptions;
    }

    async addChild(name, dob, gender, idToken){
        if (!idToken) return false;
        const apiResult = await fetchJson(apiUrl + `/familyunit/${this.unitId}/addchild`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + idToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, dob, gender})
        });
        if (!apiResult) return false;
        if (apiResult.newKid) this.kidsList.push(apiResult.newKid);
        return true;
    }

    addChore = async (choreData, idToken) => {
        const { choreName, choreDays, choreFrequency, chorePriority, choreAppliedTo, monthlyChoreInterval, choreNotes} = choreData;
        const days = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
        const choreDayNames = choreDays.map((e,i) => e ? days[i] : null).filter(e => e !== null);
        const payload = {
            name: choreName,
            priority: chorePriority,
            kkReward: 0,
            notes: choreNotes,
            freq: choreFrequency.toUpperCase(),
            weekdays: choreDayNames,
            choreAppliedTo
        };
        if (payload.freq === 'MONTHLY'){
            payload.monthlyChoreInterval = monthlyChoreInterval === 0 ? 1 : -1;
        }

        const postResult = await fetchJson(apiUrl + `/familyunit/${this.unitId}/chore`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer '+idToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        if (postResult.existingChores) this.existingChores = postResult.existingChores;
        if (postResult.kidsList) this.kidsList = postResult.kidsList;

    }

    putChore = async (choreData, idToken) => {
        const { choreId, choreName, choreDays, choreFrequency, chorePriority, choreAppliedTo, monthlyChoreInterval} = choreData;
        console.log( choreName, choreDays, choreFrequency, chorePriority, choreAppliedTo, monthlyChoreInterval);
        const days = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
        const choreDayNames = choreDays.map((e,i) => e ? days[i] : null).filter(e => e !== null);
        const payload = {
            name: choreName,
            priority: chorePriority,
            kkReward: 0,
            notes: "",
            freq: choreFrequency.toUpperCase(),
            weekdays: choreDayNames,
            choreAppliedTo
        };
        if (payload.freq === 'MONTHLY'){
            payload.monthlyChoreInterval = monthlyChoreInterval === 0 ? 1 : -1;
        }

        const postResult = await fetchJson(apiUrl + `/familyunit/${this.unitId}/chore/${choreId}`, {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer '+idToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        this.existingChores = postResult.existingChores;
        this.kidsList = postResult.kidsList;
    }

    addReward = async (rewardData, idToken) => {
        const payload = {
            name: rewardData.rewardName,
            kkCost: rewardData.kkCost,
            notes: rewardData.notes,
            rewardAppliesTo: rewardData.rewardAppliesTo
        };
        const postResult = await fetchJson(apiUrl + `/familyunit/${this.unitId}/reward`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer '+idToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        this.existingRewards = postResult.existingRewards;
        this.kidsList = postResult.kidsList;
    }

    updateReward = async (rewardData, idToken) => {
        const payload = {
            name: rewardData.rewardName,
            kkCost: rewardData.kkCost,
            notes: rewardData.notes,
            rewardAppliesTo: rewardData.rewardAppliesTo
        };
        const putResult = await fetchJson(apiUrl + `/familyunit/${this.unitId}/reward/${rewardData._id}`, {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer '+idToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        this.existingRewards = putResult.existingRewards;
        this.kidsList = putResult.kidsList;
    }

    updateChildSettings = async (childId, patchUpdate, idToken) => {
        const putResult = await fetchJson(apiUrl + `/familyunit/${this.unitId}/child/${childId}`, {
            method: 'PATCH',
            headers: {
                Authorization: 'Bearer '+idToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(patchUpdate)
        });
        if (!putResult.kidsList) return false;
        const updatedKid = putResult.kidsList.find(kid => kid._id === childId);
        const update = {};
        for (let key in patchUpdate) update[key] = updatedKid[key];

        // this.kidsList = putResult.kidsList;
        this.kidsList.forEach(kid => {
            if (kid._id !== updatedKid._id) return;
            Object.assign(kid, update);
        });
        return true;
    }

    requestCompleteChore = async (childId, choreId, idToken) => {
        console.log(childId, choreId, idToken)
        const putResult = await fetchJson(apiUrl + `/familyunit/${this.unitId}/child/${childId}/requestcompletechore`, {
            method: 'PATCH',
            headers: {
                Authorization: 'Bearer '+idToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                choreId
            })
        });

        this.kidsList = putResult.kidsList;
    }

    processApprovalRequest = async (alert, status, idToken) => {
        const {kid:childId, doneChoreId, _id: alertId} = alert;
        const putResult = await fetchJson(apiUrl + `/familyunit/${this.unitId}/child/${childId}/processapprovalrequest`, {
            method: 'PATCH',
            headers: {
                Authorization: 'Bearer '+idToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                doneChoreId,
                alertId,
                status
            })
        });

        this.kidsList = putResult.familyUnit.kidsList;

        alertsRepository.alerts = alertsRepository.alerts.map(alert => {
            if(alert._id !== putResult.alert._id) return alert;
            return putResult.alert;
        });
    }

    deleteChild = async (childId, idToken) => {
        const deleteResult = await fetchJson(apiUrl + `/familyunit/${this.unitId}/child/${childId}`, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer '+idToken,
                'Content-Type': 'application/json'
            }
        });
        if (deleteResult && typeof deleteResult.kidsList.length === 'number'){
            this.kidsList = deleteResult.kidsList;
            console.log("#####################loading new kids list")
        }
    }

    requestRedeemReward = async (kidId, rewardId, idToken) => {
        const postResult = await fetchJson(apiUrl + `/familyunit/${this.unitId}/rewardredemption`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer '+idToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                kidId, rewardId
            })
        });

        if (postResult.kidsList)
            this.kidsList = postResult.kidsList;
        return postResult;
    }

    addAdmin = async (email, idToken) => {
        const postResult = await fetchJson(apiUrl + `/familyunit/${this.unitId}/admin`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer '+idToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email
            })
        });

        if (!postResult.adminsList) return false;

        this.adminsList = postResult.adminsList;
        return true;
    }
    deleteAdmin = async (email, idToken) => {
        const deleteResult = await fetchJson(apiUrl + `/familyunit/${this.unitId}/admin`, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer '+idToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email
            })
        });

        if (!deleteResult.adminsList) return false;

        this.adminsList = deleteResult.adminsList;
        return true;
    }
    deleteChore = async (chore, idToken) => {
        const result = await fetchJson(apiUrl + `/familyunit/${this.unitId}/chore/${chore._id}`, {
            method: 'put',
            headers: {
                Authorization: 'Bearer '+idToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...chore,
                deleted: true
            })
        });

        if (!result.existingChores) return false;

        this.existingChores = result.existingChores;
        return true;
    }
}

const familyUnitRepository = new FamilyUnitStore();

export default familyUnitRepository;