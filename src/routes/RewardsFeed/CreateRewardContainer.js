import React from "react";
import {Alert} from 'react-native';
import CreateRewardView from './CreateRewardView';
import familyUnitRepository from "../../stores/FamilyUnitDataStore";
import userRepository from "../../stores/UserDataStore";

class CreateRewardContainer extends React.Component {
    state = {
        modalVisible: false,
        modalText: 'Success',
        rewardName: '',
        rewardAppliesTo: [],
        kkCost: '',
        notes: '',
        submitting: false,
    }
    updateForm = (prop, newVal) => {
        this.setState(prevState => ({
            [prop]: newVal
        }));
    }
    toggleKidSelection = (kidId) => {
        if (this.state.rewardAppliesTo.indexOf(kidId) === -1)
            this.setState({rewardAppliesTo: [...this.state.rewardAppliesTo, kidId]});
        else
            this.setState({rewardAppliesTo: this.state.rewardAppliesTo.filter(kId => kId !== kidId)});
    }
    showModal = message => {
        this.setState(state => ({modalVisible: true, modalText: message}));
        setTimeout(() => this.setState(state => ({modalVisible: false})), 1750);
    }
    submitReward = async () => {
        console.log('submitting reward', this.state);
        this.setState( _ => ({submitting: true}));
        const {
            rewardName,
            rewardAppliesTo,
            kkCost,
            notes
        } = this.state;

        if (!rewardName) return Alert.alert("Incorrect Input", "Please specify a reward name");
        if (typeof kkCost !== 'number') return Alert.alert("Incorrect Input", "Please enter a cost for this reward");


        try {
            await familyUnitRepository.addReward({rewardName, rewardAppliesTo, kkCost, notes}, userRepository.idToken);
            this.showModal("Success!");
        }
        catch(err){
            console.log(err);
            Alert.alert("API error", (typeof err === 'object' ? JSON.stringify(err, null,2) : err.toString()));
        }
        finally {
            this.setState( _ => ({submitting: false}));
        }
    }
    render() {
        const {kidsList} = familyUnitRepository;
        return (
            <CreateRewardView
                {...this.props}
                {...this.state}
                updateForm={this.updateForm}
                kidsList={kidsList}
                toggleKidSelection={this.toggleKidSelection}
                submitReward={this.submitReward}
            />
        );
    }
}

export default CreateRewardContainer;