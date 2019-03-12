import React from "react";
import KidRewardsView from './KidRewardsView';
import {Alert} from 'react-native';
import familyUnitRepository from "../../stores/FamilyUnitDataStore";
import userRepository from "../../stores/UserDataStore";
import {observer} from "mobx-react";

@observer
class KidRewardsContainer extends React.Component {
    state = {
        modalVisible: false,
        modalText: "Are you sure you want to complete this reward?",
        selectedReward: null,
        checkMarkClickable: true,
        showAnimation: false
    }
    componentWillUnmount(){
        if (this.timer) clearTimeout(this.timer);
    }
    requestRedeemReward = reward => {
        const kidId = userRepository.BROWSING_MODE.split("-")[1];
        const currentKid = familyUnitRepository.kidsList.find(k => k._id === kidId);

        if (!currentKid.kreditInformation || !currentKid.kreditInformation.kiddieKashBalance ){
            Alert.alert("Cannot Redeem Reward", `${currentKid.name}, you do not have enough Kiddie Kash to redeem this reward.`)
            return;
        }

        this.setState(() => ({
            modalVisible: true,
            modalText: `${currentKid.name}, are you sure you want to redeem this reward?`,
            checkMarkClickable: true,
            selectedReward: reward._id
        }));
    }
    redeemReward = async () => {
        this.setState(() => ({checkMarkClickable: false}));
        const kidId = userRepository.BROWSING_MODE.split("-")[1];
        console.log(`Redeeming reward.... ${kidId}, ${this.state.selectedReward}`);
        const postResult = await familyUnitRepository.requestRedeemReward(kidId, this.state.selectedReward, userRepository.idToken);
        if (postResult.message){
            Alert.alert("Could not redeem reward", postResult.message);
        }
        else {
            this.cancelModal(true);
        }
    }
    cancelModal = (showAnimation) => {
        this.setState(() =>
            ({
                modalVisible: false,
                checkMarkClickable: false,
                showAnimation: !!showAnimation
            }),
            () => {
                if (this.animation && showAnimation){
                    this.animation.play();
                    this.timer = setTimeout(this.hideAnimation, 2000);
                }
            });

    }
    setAnimationRef = e => this.animation = e;
    hideAnimation = () => {
        this.setState(() => ({showAnimation: false}));
    }
    render() {
        const kidId = userRepository.BROWSING_MODE.split("-")[1];
        const currentKid = familyUnitRepository.kidsList.find(k => k._id === kidId);
        return (
            <KidRewardsView
                {...this.props}
                {...this.state}
                currentKid={currentKid}
                onRequestRedeemReward={this.requestRedeemReward}
                modalAccept={this.redeemReward}
                modalClose={this.cancelModal}
                modalDeny={this.cancelModal}
                rewardsList={familyUnitRepository.existingRewards.filter(reward => currentKid.eligibleRewards.includes(reward._id))}
                setAnimationRef={this.setAnimationRef}
                hideAnimation={this.hideAnimation}
            />
        );
    }
}

export default KidRewardsContainer;