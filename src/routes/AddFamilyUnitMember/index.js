import React from 'react';
import { Alert} from 'react-native';
import AddFamilyUnitMemberView from './AddFamilyUnitMemberView';
import familyUnitRepository from "../../stores/FamilyUnitDataStore";
import {observer} from "mobx-react";
import userRepository from "../../stores/UserDataStore";

@observer
export default class AddFamilyUnitMember extends React.Component{
    state = {
        firstName: "",
        dobM: "",
        dobD: "",
        dobY: "",
        gender: "",
        modalVisible: false,
        modalText: "Child added!"
    }
    modalClose = () => {
        console.log("modalClose handler called")
        this.setState(()=> ({modalVisible: false}))
    }
    addAnotherChild = () => this.setState(() => ({ firstName: "", dobM: "", dobD: "", dobY: "", gender: "", modalVisible: false}));
    returnToDashboard = () => {
        this.setState(() => ({modalVisible: false}));
        if (this.props.history) {
            console.log("#############attempting redirect");
            this.props.history.push('/maintabscreen/choreboard');
        }
        else{
            console.log("#############attempting redirect, failed");
        }
    }

    onDeleteChild = (child) => {
        Alert.alert('Confirm child Deletion', `Are you sure you wish to remove ${child.name} from this family unit?`, [
            {text: "Ok", onPress: ()=>familyUnitRepository.deleteChild(child._id, userRepository.idToken)},
            {text: "Cancel", onPress: () => ""}
        ]);
    }
    updateForm = (prop, newValue) => {
        this.setState({[prop]: newValue});
    }
    isValidDOB(dob) {
        const numeric = dob.split("-").map(Number);
        return numeric.length === 3 && numeric.every(num => num > 0) && numeric[0] < 13 && numeric[1] < 32 && numeric[3] <= new Date().getFullYear();
    }
    onAddChild = () => {
        const {firstName, dobM, dobD, dobY, gender} = this.state;
        const dob = `${dobM}-${dobD}-${dobY}`;
        if (!firstName || !dob || !gender) return Alert.alert("Invalid input", "Please fill out all fields.");
        if (this.isValidDOB(dob)) return Alert.alert("Invalid DOB", "Please enter date of birth in format mm/dd/yyyy");
        const idToken = userRepository.idToken;
        const saveResult = familyUnitRepository.addChild(firstName, dob, gender==="m" ? "male" : "female", idToken);
        if (!saveResult) return Alert.alert("Server Error", "Please try again later");
        this.setState(()=> ({modalVisible: true}));

        // this.setState(() => ({ firstName: "", dob: "", gender: ""}));
        // this.showAlert();
    }
    render() {
        return (
            <AddFamilyUnitMemberView
                {...this.state}
                kidsList={familyUnitRepository.kidsList}
                onChangeText={this.updateForm}
                onAddChild={this.onAddChild}
                onDeleteChild={this.onDeleteChild}

                modalClose={this.modalClose}
                modalAccept={this.addAnotherChild}
                modalDeny={this.returnToDashboard}
            />
        );
    }
}