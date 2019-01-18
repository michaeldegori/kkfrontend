import React from "react";
import KidKreditDashboardView from './KidKreditDashboardView';
import familyUnitRepository from "../../stores/FamilyUnitDataStore";
import userRepository from "../../stores/UserDataStore";
import {fetchJson} from "../../services/Networking";
import {apiUrl} from "../../globals";

class KidRewardsContainer extends React.Component {
    state = {
        loading: true,
        modalVisible: false,
    }
    async componentDidMount() {
        const kidId = userRepository.BROWSING_MODE.split("-")[1];
        const currentKid = familyUnitRepository.kidsList.find(k => k._id === kidId);
        const educationalInfo = await fetchJson(apiUrl + '/educationalinfo/kidkreditdashboard', {headers: {Authorization: 'Bearer ' + userRepository.idToken}});

        for (let prop in educationalInfo){
            if (prop !== '_id' && typeof educationalInfo[prop] === 'string')
                educationalInfo[prop] = educationalInfo[prop].split('|');
            else
                delete educationalInfo[prop];
        }

        if (currentKid)
            this.setState(() => ({
                loading: false,
                educationalInfo
            }));
    }
    showModal = (whichModal) => this.setState(() => ({
        modalVisible: whichModal
    }))
    hideModal = () => this.setState(() => ({
        modalVisible: false
    }))
    render() {
        const kidId = userRepository.BROWSING_MODE.split("-")[1];
        const currentKid = familyUnitRepository.kidsList.find(k => k._id === kidId);
        return (
            <KidKreditDashboardView
                {...this.props}
                {...this.state}
                kreditInfo={currentKid.kreditInformation|| {}}
                showModal={this.showModal}
                hideModal={this.hideModal}
            />
        );
    }
}

export default KidRewardsContainer;