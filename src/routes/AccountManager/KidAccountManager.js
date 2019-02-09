import React from 'react';
import AccountManagerView from './AccountManagerView';
import familyUnitRepository from "../../stores/FamilyUnitDataStore";
import {observer} from "mobx-react";
import userRepository from "../../stores/UserDataStore";
import {Alert} from "react-native";

@observer
class KidAccountManagerContainer extends React.Component{
    switchToChild = async (child) => {
        const childId = child._id;
        const currentChildId = userRepository.BROWSING_MODE.split("-")[1];
        const currentChild = familyUnitRepository.kidsList.find(k => k._id == currentChildId);
        Alert.alert(
            'Confirm User Switch',
            `This will log you out of ${currentChild.name} and log you in as ${child.name}`,
            [
                {text: 'Ok', onPress: () => userRepository.switchBrowsingMode(this.props.history, childId)},
                {text: 'Cancel', onPress: () => ""}
            ]);
    }
    switchToParent = () => {
        const currentChildId = userRepository.BROWSING_MODE.split("-")[1];
        const currentChild = familyUnitRepository.kidsList.find(k => k._id == currentChildId);
        Alert.alert(
            'Confirm User Switch',
            `This will log you out of child browsing mode and a password will be required to log back in.`,
            [
                {text: 'Ok', onPress: () => userRepository.switchBrowsingMode(this.props.history, null, 'parent')},
                {text: 'Stay Here', onPress: () => ""}
            ]);
    }
    render() {
        return (
            <AccountManagerView
                {...this.props}
                kidsList={familyUnitRepository.kidsList}
                switchToChild={this.switchToChild}
                switchToParent={this.switchToParent}
                parentAvatar={userRepository.avatar}
                parentLabel={"Parent"}
            />
        );
    }
}

export default KidAccountManagerContainer;