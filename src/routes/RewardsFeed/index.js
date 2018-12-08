import React from "react";
import RewardsFeedView from './RewardsFeedView';
import familyUnitRepository from "../../stores/FamilyUnitDataStore";
import rewardsRepository from "../../stores/DefaultRewardsStore";
import KidRewardsView from "./KidRewardsView";

class RewardsFeedContainer extends React.Component {
    render() {
        return (
            <RewardsFeedView
                {...this.props}
                rewardsList={familyUnitRepository.existingRewards} />
        );
    }
}

export default RewardsFeedContainer;