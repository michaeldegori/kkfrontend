import React from 'react';
import AddFamilyUnitMemberView from './AddFamilyUnitMemberView';

export default class AddFamilyUnitMember extends React.Component{
    state = {
        firstName: "",
        dob: "",
        gender: ""
    }
    updateForm = (prop, newValue) => {
        console.log("setting state - ", prop, newValue)
        this.setState({[prop]: newValue});
    }
    render() {
        return (
            <AddFamilyUnitMemberView {...this.state} onChangeText={this.updateForm} />
        );
    }
}