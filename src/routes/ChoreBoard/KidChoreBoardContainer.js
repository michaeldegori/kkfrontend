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
        const kidId = userRepository.BROWSING_MODE.split("-")[1];
        const currentKid = familyUnitRepository.kidsList.find(k => k._id === kidId);
        this.setState(() => ({
            modalVisible: true,
            selectedChore: choreId,
            modalText: `${currentKid.name}, are you sure you have completed this chore?`,
            checkMarkClickable: true
        }));
    }
    completeChore = async () => {
        const kidId = userRepository.BROWSING_MODE.split("-")[1];
        const currentKid = familyUnitRepository.kidsList.find(k => k._id === kidId);

        await familyUnitRepository.requestCompleteChore(currentKid._id, this.state.selectedChore, userRepository.idToken);
        this.cancelModal();
    }
    cancelModal= () => {
        this.setState(() => ({modalVisible: false, checkMarkClickable: false}));
    }
    getChoresToDisplay() {
        if (!familyUnitRepository.kidsList ) return [];
        const kidId = userRepository.BROWSING_MODE.split("-")[1];
        const currentKid = familyUnitRepository.kidsList.find(k => k._id === kidId);
        const choresToDisplay = familyUnitRepository.existingChores.filter(globalChore => currentKid.assignedChores.includes(globalChore._id));
        //TODO: sort by next due
        //TODO:  remove any that are already done - check if a chore has already been done since the last time it was due
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
                modalDeny={this.cancelModal}
                chores={this.getChoresToDisplay()}
            />
        );
    }
}

export default KidChoreBoardContainer;