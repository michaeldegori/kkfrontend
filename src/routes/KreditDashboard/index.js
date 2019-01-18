import React from "react";
import KreditDashboardView from './KreditDashboardView';
import familyUnitRepository from "../../stores/FamilyUnitDataStore";
import {observer} from "mobx-react";
import userRepository from "../../stores/UserDataStore";
import {apiUrl} from "../../globals";
import {fetchJson} from "../../services/Networking";

class KreditDashboardContainer extends React.Component{
    state = {
        loading: true,
        modalVisible: false
    }
    async componentDidMount() {
        const educationalInfo = await fetchJson(apiUrl + '/educationalinfo/parentkreditdashboard', {headers: {Authorization: 'Bearer ' + userRepository.idToken}});

        for (let prop in educationalInfo){
            if (prop !== '_id' && typeof educationalInfo[prop] === 'string')
                educationalInfo[prop] = educationalInfo[prop].split('|');
            else
                delete educationalInfo[prop];
        }
        console.log(educationalInfo);
        if (familyUnitRepository.kidsList)
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
        return (
            <KreditDashboardView
                {...this.props}
                {...this.state}
                kidsList={familyUnitRepository.kidsList}
                showModal={this.showModal}
                hideModal={this.hideModal}
            />
        );
    }
}

export default observer(KreditDashboardContainer);