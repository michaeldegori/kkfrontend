import React from "react";
import KreditDashboardView from './KreditDashboardView';
import familyUnitRepository from "../../stores/FamilyUnitDataStore";
import {observer} from "mobx-react";
import userRepository from "../../stores/UserDataStore";

class KreditDashboardContainer extends React.Component{
    state = {
        loading: false
    }
    async componentDidMount() {
        this.setState(()=> ({loading: true}));
        setTimeout(() => {
            this.setState(()=> ({loading: false}));
        }, 750);
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