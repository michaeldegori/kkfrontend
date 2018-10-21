import React from "react";
import RewardsFeedView from './RewardsFeedView';
import familyUnitRepository from "../../stores/FamilyUnitDataStore";
import rewardsRepository from "../../stores/DefaultRewardsStore";

class RewardsFeedContainer extends React.Component {
    render() {
        return (
            <RewardsFeedView
                {...this.props}
                defaultRewards={rewardsRepository.rewards}
                rewardsList={familyUnitRepository.existingRewards} />
        );
    }
}

export default RewardsFeedContainer;