import React from "react";
import KidKreditDashboardView from './KidKreditDashboardView';
import familyUnitRepository from "../../stores/FamilyUnitDataStore";
import userRepository from "../../stores/UserDataStore";

class KidRewardsContainer extends React.Component {
    state = {
        loading: true
    }
    async componentDidMount() {
        const kidId = userRepository.BROWSING_MODE.split("-")[1];
        const currentKid = familyUnitRepository.kidsList.find(k => k._id === kidId);
        if (currentKid)
            this.setState(()=> ({
                loading: false,
            }));
    }
    render() {
        const kidId = userRepository.BROWSING_MODE.split("-")[1];
        const currentKid = familyUnitRepository.kidsList.find(k => k._id === kidId);
        return (
            <KidKreditDashboardView
                {...this.props}
                {...this.state}
                kreditInfo={currentKid.kreditInfo|| {}}
                 />
        );
    }
}

export default KidRewardsContainer;