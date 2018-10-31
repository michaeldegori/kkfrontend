import React from "react";
import AlertsView from './AlertsView';
import familyUnitRepository from "../../stores/FamilyUnitDataStore";
import {observer} from "mobx-react";
import alertsRepository from "../../stores/AlertsStore";
import userRepository from "../../stores/UserDataStore";

class AlertsContainer extends React.Component{
    state = {
        loading: false
    }
    async componentDidMount() {
        this.setState(()=> ({loading: true}));
        await alertsRepository.loadAlertsFromApi(userRepository.idToken, familyUnitRepository.unitId);
        this.setState(()=> ({loading: false}));
    }
    render() {
        return (
            <AlertsView
                {...this.props}
                {...this.state}
                alerts={alertsRepository.alerts}
                kidsList={familyUnitRepository.kidsList}
                chores={familyUnitRepository.existingChores}
            />
        );
    }
}

export default observer(AlertsContainer);