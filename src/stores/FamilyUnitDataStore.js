import {observable} from 'mobx';
import {fetchJson} from "../services/Networking";
import {apiUrl} from "../globals";
import userRepository from "./UserDataStore";

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

    async addChild(name, dob, gender){
        if (!userRepository.idToken) return false;
        console.log("adding child with", name, dob, gender);
        const apiResult = await fetchJson(apiUrl + `/familyunit/${this.unitId}/addchild`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + userRepository.idToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, dob, gender})
        });
        console.log(apiResult);
        if (!apiResult) return false;
        if (apiResult.newKid) this.kidsList.push(apiResult.newKid);
        return true;
    }
}

const familyUnitRepository = new FamilyUnitStore();

export default familyUnitRepository;