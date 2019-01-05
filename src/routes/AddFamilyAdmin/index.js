import React from 'react';
import {
    Alert
} from 'react-native';
import {observer} from 'mobx-react';
import AddFamilyAdminView from "./AddFamilyAdminView";
import familyUnitRepository from "../../stores/FamilyUnitDataStore";
import userRepository from "../../stores/UserDataStore";


@observer
class AddFamilyAdminContainer extends React.Component{
    state = {
        modalVisible: false,
        email: ''
    }
    submitAddAdmin = () => {
        if (!this.state.email || !this.state.email.match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)){
            Alert.alert("Invalid email", "Please enter a valid email address");
            return false;
        }
        familyUnitRepository.addAdmin(this.state.email, userRepository.idToken);
    }
    updateForm = (t) => this.setState(() => ({email: t}))
    render(){
        return (
            <AddFamilyAdminView
                {...this.props}
                {...this.state}
                submitAddAdmin={this.submitAddAdmin}
                updateForm={this.updateForm}
            />
        );
    }
}


export default AddFamilyAdminContainer;