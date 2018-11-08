import React from "react";
import KidRewardsView from './KidRewardsView';
import familyUnitRepository from "../../stores/FamilyUnitDataStore";
import userRepository from "../../stores/UserDataStore";

class KidRewardsContainer extends React.Component {
    render() {
        const kidId = userRepository.BROWSING_MODE.split("-")[1];
        const currentKid = familyUnitRepository.kidsList.find(k => k._id === kidId);
        return (
            <KidRewardsView
                {...this.props}
                rewardsList={familyUnitRepository.existingRewards.filter(reward => currentKid.eligibleRewards.includes(reward._id))} />
        );
    }
}

export default KidRewardsContainer;