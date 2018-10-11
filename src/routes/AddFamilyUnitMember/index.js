import React from 'react';
import { Alert} from 'react-native';
import AddFamilyUnitMemberView from './AddFamilyUnitMemberView';
import familyUnitRepository from "../../stores/FamilyUnitDataStore";
import {observer} from "mobx-react";

@observer
export default class AddFamilyUnitMember extends React.Component{
    state = {
        firstName: "",
        dob: "",
        gender: "",
        modalVisible: false
    }

    updateForm = (prop, newValue) => {
        this.setState({[prop]: newValue});
    }
    isValidDOB(dob) {
        dob = dob.replace(/[ /-]/g, "/");
        const numeric = dob.split("/").map(Number);
        return numeric.length === 3 && numeric.every(num => num > 0) && numeric[0] < 13 && numeric[1] < 32 && numeric[3] <= new Date().getFullYear();
    }
    showAlert = () => {
        this.setState( () => ({modalVisible: true }));
        setTimeout(() =>
            this.setState( () => ({modalVisible: false}))
        ,1000);
    }
    onAddChild = () => {
        const {firstName, dob, gender} = this.state;
        if (!firstName || !dob || !gender) return Alert.alert("Invalid input", "Please fill out all fields.");
        if (this.isValidDOB(dob)) return Alert.alert("Invalid DOB", "Please enter date of birth in format mm/dd/yyyy");
        const saveResult = familyUnitRepository.addChild(firstName, dob, gender==="m" ? "male" : "female");
        if (!saveResult) return Alert.alert("Server Error", "Please try again later");

        this.setState(() => ({ firstName: "", dob: "", gender: ""}));
        this.showAlert();
    }
    render() {
        return (
            <AddFamilyUnitMemberView
                {...this.state}
                kidsList={familyUnitRepository.kidsList}
                onChangeText={this.updateForm}
                onAddChild={this.onAddChild}
            />
        );
    }
}