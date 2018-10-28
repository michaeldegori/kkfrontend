import React from "react";
import SettingsView from './SettingsView';
import familyUnitRepository from "../../stores/FamilyUnitDataStore";
import {observer} from "mobx-react";
import userRepository from "../../stores/UserDataStore";

@observer
class SettingsContainer extends React.Component {

    onChangeSlider = (property, childId)=> (v)=> {
        familyUnitRepository.updateChildSettings(childId, { [property]: v }, userRepository.idToken);
    }
    render() {
        const {kidsList} = familyUnitRepository;
        return (
            <SettingsView
                kidsList={kidsList}
                onChangeSlider={this.onChangeSlider}
                {...this.props}
            />
        );
    }
}

export default SettingsContainer;