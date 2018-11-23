import React from "react";
import KreditDashboardView from './KreditDashboardView';
import familyUnitRepository from "../../stores/FamilyUnitDataStore";
import {observer} from "mobx-react";
import userRepository from "../../stores/UserDataStore";

class KreditDashboardContainer extends React.Component{
    state = {
        loading: true
    }
    async componentDidMount() {
        if (familyUnitRepository.kidsList) this.setState(() => ({loading: false}));
    }
    render() {
        return (
            <KreditDashboardView
                {...this.props}
                {...this.state}
                kidsList={familyUnitRepository.kidsList}
            />
        );
    }
}

export default observer(KreditDashboardContainer);