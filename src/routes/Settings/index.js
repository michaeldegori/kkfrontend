import React from "react";
import {Alert} from 'react-native';
import SettingsView from './SettingsView';
import familyUnitRepository from "../../stores/FamilyUnitDataStore";
import {observer} from "mobx-react";
import userRepository from "../../stores/UserDataStore";

@observer
class SettingsContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            allowanceSliderValue: -1,
            savingsSliderValue: -1
        }
    }
    onChangeSlider = (property, childId)=> (v)=> {
        //familyUnitRepository.updateChildSettings(childId, { [property]: v }, userRepository.idToken);
    }
    onChangeKid = () => {
        this.setState(() => ({
            allowanceSliderValue: -1,
            savingsSliderValue: -1
        }));
    }
    createOnSliderTick = property => val => {
        this.setState(() => ({
            [property]: val
        }));
    }
    saveChild = async (childId, allowanceAmount, savingsRequired) => {
        console.log(`Saving ${childId} with values ${allowanceAmount}, ${savingsRequired}`);
        const saveResult = await familyUnitRepository.updateChildSettings(childId, { allowanceAmount, savingsRequired }, userRepository.idToken);
        if (!saveResult){
            Alert.alert("Error", "Something went wrong when talking to the server");
            return;
        }
        const theKid = familyUnitRepository.kidsList.find(kid => kid._id === childId);
        Alert.alert("Success", `Successfully saved values for ${theKid.name}`);
    }
    render() {
        const {kidsList} = familyUnitRepository;
        return (
            <SettingsView
                kidsList={kidsList}
                onChangeSlider={this.onChangeSlider}
                onChangeKid={this.onChangeKid}
                createOnSliderTick={this.createOnSliderTick}
                saveChild={this.saveChild}
                {...this.props}
                {...this.state}
            />
        );
    }
}

export default SettingsContainer;