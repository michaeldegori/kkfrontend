import React from "react";
import KidKreditDashboardView from './KidKreditDashboardView';
import familyUnitRepository from "../../stores/FamilyUnitDataStore";
import userRepository from "../../stores/UserDataStore";

class KidRewardsContainer extends React.Component {
    render() {
        const kidId = userRepository.BROWSING_MODE.split("-")[1];
        const currentKid = familyUnitRepository.kidsList.find(k => k._id === kidId);
        return (
            <KidKreditDashboardView
                {...this.props}
                 />
        );
    }
}

export default KidRewardsContainer;