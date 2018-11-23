import React from "react";
import {observer} from 'mobx-react';
import KidChoreBoardView from './KidChoreBoardView'
import userRepository from "../../stores/UserDataStore";
import familyUnitRepository from "../../stores/FamilyUnitDataStore";

@observer
class KidChoreBoardContainer extends React.Component{
    state = {
        modalVisible: false,
        modalText: "Are you sure you have completed this chore?",
        selectedChore: null,
        checkMarkClickable: true
    }
    requestConfirmCompleteChore = choreId => {
        this.setState(() => ({
            modalVisible: true,
            selectedChore: choreId
        }));
    }
    completeChore = async () => {
        const kidId = userRepository.BROWSING_MODE.split("-")[1];
        const currentKid = familyUnitRepository.kidsList.find(k => k._id === kidId);

        await familyUnitRepository.requestCompleteChore(currentKid._id, this.state.selectedChore, userRepository.idToken);
        this.cancelModal();
    }
    cancelModal= () => {
        console.log("Closing modal")
        this.setState(() => ({modalVisible: false}));
    }
    getChoresToDisplay() {
        if (!familyUnitRepository.kidsList ) return [];
        const kidId = userRepository.BROWSING_MODE.split("-")[1];
        const currentKid = familyUnitRepository.kidsList.find(k => k._id === kidId);
        const choresToDisplay = familyUnitRepository.existingChores.filter(globalChore => currentKid.assignedChores.includes(globalChore._id));
        //sort by next due
        //remove any that are already done - check if a chore has already been done since the last time it was due
        return choresToDisplay;
    }
    render(){
        return(
            <KidChoreBoardView
                {...this.props}
                {...this.state}
                onRequestCompleteChore={this.requestConfirmCompleteChore}
                modalAccept={this.state.checkMarkClickable ? this.completeChore : () => ""}
                modalClose={this.cancelModal}
                chores={this.getChoresToDisplay()}
            />
        );
    }
}

export default KidChoreBoardContainer;