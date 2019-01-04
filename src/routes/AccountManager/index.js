import React from 'react';
import AccountManagerView from './AccountManagerView';
import familyUnitRepository from "../../stores/FamilyUnitDataStore";
import {observer} from "mobx-react";
import userRepository from "../../stores/UserDataStore";
import {Alert} from "react-native";

@observer
class AccountManager extends React.Component{
    switchToChild = (childId) => {
        userRepository.switchBrowsingMode(this.props.history, childId);
    }
    onDeleteChild = (child) => {
        Alert.alert('Confirm Child Deletion', `Are you sure you wish to remove ${child.name} from this family unit?`, [
            {text: "Ok", onPress: ()=>familyUnitRepository.deleteChild(child._id, userRepository.idToken)},
            {text: "Cancel", onPress: () => ""}
        ]);
    }
    render() {
        return (
            <AccountManagerView
                {...this.props}
                kidsList={familyUnitRepository.kidsList}
                switchToChild={this.switchToChild}
                parentLabel={"Me"}
                onDeleteChild={this.onDeleteChild}
            />
        );
    }
}

export default AccountManager;