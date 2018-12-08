import React from "react";
import AlertsView from './AlertsView';
import familyUnitRepository from "../../stores/FamilyUnitDataStore";
import {observer} from "mobx-react";
import alertsRepository from "../../stores/AlertsStore";
import userRepository from "../../stores/UserDataStore";

class AlertsContainer extends React.Component{
    state = {
        loading: true,
        modalVisible: false,
        modalText: "",
        selectedAlert: {}
    }
    async componentDidMount() {
        await alertsRepository.loadAlertsFromApi(userRepository.idToken, familyUnitRepository.unitId);
        this.setState(()=> ({loading: false}));
    }
    handleTapChore = (alert, chore, kid) => {
        if (!alert || !alert.isTappable) return;
        if (!chore || !kid) throw "Something went awful wrong";
        console.log("clicked chore id "+chore._id);
        const {name:kidName} = kid;
        const {name:choreName} = chore;
        this.setState({
            modalVisible: true,
            modalText: `Are you sure you want to approve chore "${choreName} for ${kidName}?`,
            selectedAlert: alert
        });
    }
    modalAccept = async () => {
        await familyUnitRepository.processApprovalRequest(this.state.selectedAlert, "approved", userRepository.idToken);
        this.modalClose();
    }
    modalDeny = async () => {
        await familyUnitRepository.processApprovalRequest(this.state.selectedAlert, "denied", userRepository.idToken);
        this.modalClose();
    }
    modalClose = () => this.setState({modalVisible: false})
    render() {
        return (
            <AlertsView
                {...this.props}
                {...this.state}
                modalAccept={this.modalAccept}
                modalDeny={this.modalDeny}
                modalClose={this.modalClose}
                handleTapChore={this.handleTapChore}
                alerts={alertsRepository.alerts}
                kidsList={familyUnitRepository.kidsList}
                chores={familyUnitRepository.existingChores}
            />
        );
    }
}

export default observer(AlertsContainer);