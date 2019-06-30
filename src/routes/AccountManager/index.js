import React from 'react';
import AccountManagerView from './AccountManagerView';
import familyUnitRepository from "../../stores/FamilyUnitDataStore";
import {observer} from "mobx-react";
import userRepository from "../../stores/UserDataStore";
import {Alert} from "react-native";

@observer
class AccountManager extends React.Component{
    switchToChild = (child) => {
        const childId = child._id;
        Alert.alert(
            'Confirm User Switch',
            `This will restrict parent access and keep you logged into child mode.`,
            [
                {text: 'Ok', onPress: () => userRepository.switchBrowsingMode(this.props.history, childId)},
                {text: 'Cancel', onPress: () => ""}
            ]);

    }
    switchToOtherAdmin = (adminEmail) => {
        Alert.alert(
            'Confirm User Switch',
            `This will log you out and allow you to log in as ${adminEmail}`,
            [
                {text: 'Ok', onPress: () => userRepository.logOut(this.props.history)},
                {text: 'Cancel', onPress: () => ""}
            ]);

    }
    onDeleteChild = (child) => {
        Alert.alert('Confirm Child Deletion', `Are you sure you wish to remove ${child.name} from this family unit?`, [
            {text: "Ok", onPress: ()=>familyUnitRepository.deleteChild(child._id, userRepository.idToken)},
            {text: "Cancel", onPress: () => ""}
        ]);
    }
    onDeleteAdmin = (adminId) => {
        const adminEmail = typeof adminId === 'string' ? adminId : admin.email;
        Alert.alert('Confirm Admin Deletion', `Are you sure you wish to remove ${adminEmail} as admin to this family unit?`, [
            {text: "Ok", onPress: this._deleteAdmin(adminEmail)},
            {text: "Cancel", onPress: () => ""}
        ]);
    }
    _deleteAdmin = (adminEmail) => async () => {
        const deleteResult = await familyUnitRepository.deleteAdmin(adminEmail, userRepository.idToken);
        if (!deleteResult) Alert.alert("Something went wrong", "Please try again later");
    }
    render() {
        return (
            <AccountManagerView
                {...this.props}
                kidsList={familyUnitRepository.kidsList}
                switchToChild={this.switchToChild}
                switchToOtherAdmin={this.switchToOtherAdmin}
                parentLabel={"Me"}
                parentAvatar={userRepository.avatar}
                parentId={userRepository.mongoId}
                adminsList={familyUnitRepository.adminsList}
                onDeleteChild={this.onDeleteChild}
                onDeleteAdmin={this.onDeleteAdmin}
            />
        );
    }
}

export default AccountManager;