import React from "react";
import RewardsFeedView from './RewardsFeedView';
import familyUnitRepository from "../../stores/FamilyUnitDataStore";
import rewardsRepository from "../../stores/DefaultRewardsStore";
import KidRewardsView from "./KidRewardsView";
import userRepository from "../../stores/UserDataStore";
import {Alert} from "react-native";
import {observer} from "mobx-react";

@observer
class RewardsFeedContainer extends React.Component {
    state = {
        modalVisible: false,
        modalText: "Are you sure you want to complete this reward?",
        selectedReward: null,
        buttonsClickable: true
    }
    requestRedeemReward = (reward) => {
        console.log(reward);
        this.setState(() => ({
            modalVisible: true,
            modalText: `Please choose the child who redeemed this reward`,
            buttonsClickable: true,
            selectedReward: reward._id
        }));
    }
    redeemReward = async (kid) => {
        this.setState(() => ({buttonsClickable: false}));
        console.log(kid._id, this.state.selectedReward);
        const postResult = await familyUnitRepository.requestRedeemReward(kid._id, this.state.selectedReward, userRepository.idToken);
        if (postResult.message){
            Alert.alert("Could not redeem reward", postResult.message);
        }
        else {
            this.cancelModal();
        }
    }
    cancelModal = () => this.setState(() => ({modalVisible: false}));
    render() {
        return (
            <RewardsFeedView
                {...this.props}
                {...this.state}
                onRequestRedeemReward={this.requestRedeemReward}
                modalAccept={this.redeemReward}
                modalClose={this.cancelModal}
                modalDeny={this.cancelModal}
                kidsList={familyUnitRepository.kidsList}
                rewardsList={familyUnitRepository.existingRewards} />
        );
    }
}

export default RewardsFeedContainer;