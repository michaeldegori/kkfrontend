import React from "react";
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
        familyUnitRepository.updateChildSettings(childId, { [property]: v }, userRepository.idToken);
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
    render() {
        const {kidsList} = familyUnitRepository;
        return (
            <SettingsView
                kidsList={kidsList}
                onChangeSlider={this.onChangeSlider}
                onChangeKid={this.onChangeKid}
                createOnSliderTick={this.createOnSliderTick}
                {...this.props}
                {...this.state}
            />
        );
    }
}

export default SettingsContainer;