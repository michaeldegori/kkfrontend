import React from "react";
import {observer} from 'mobx-react';
import KidChoreBoardView from './KidChoreBoardView'
import userRepository from "../../stores/UserDataStore";
import familyUnitRepository from "../../stores/FamilyUnitDataStore";
import {Redirect} from "react-router-native";
import {rrulestr} from 'rrule';

@observer
class KidChoreBoardContainer extends React.Component{
    state = {
        modalVisible: false,
        modalText: "Are you sure you have completed this chore?",
        selectedChore: null,
        checkMarkClickable: true,
        submitting: false,
    }
    requestConfirmCompleteChore = choreId => {
        this.setState({submitting: true});
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
        this.setState(() => ({modalVisible: false, checkMarkClickable: false, submitting: false}));
    }
    getChoresToDisplay() {
        if (!familyUnitRepository.kidsList ) return [];
        const kidId = userRepository.BROWSING_MODE.split("-")[1];
        const currentKid = familyUnitRepository.kidsList.find(k => k._id === kidId);
        const famChores = familyUnitRepository.existingChores;
        const kidAssignedChores = famChores.filter(globalChore => (currentKid.assignedChores || []).includes(globalChore._id)  )
        if (!famChores || famChores.length === 0 || kidAssignedChores.length === 0) return [{img: 'emptystate', type: 'nochores'}];
        const choresToDisplay = familyUnitRepository.existingChores.filter(globalChore =>{
            if (!(currentKid.assignedChores||[]).includes(globalChore._id)) return false;

            const choreRRule = rrulestr(globalChore.repetitionRule);
            const now = new Date();
            const day = ("0" + now.getDate()).slice(-2);
            const month = ("0" + (now.getMonth()+1)).slice(-2);
            const year = now.getFullYear();
            const dateLastNight = new Date(`${year}-${month}-${day}`);
            const tomorrowTimestamp = dateLastNight.getTime() + 1000*60*60*24;
            const occurrencesToday = choreRRule.between(dateLastNight, new Date(tomorrowTimestamp));
            if (occurrencesToday.length === 0) return false;

            const timesChoreDoneToday = (currentKid.doneChores||[]).find(
                doneChoreObj =>
                    doneChoreObj.chore === globalChore._id &&
                    doneChoreObj.timeStamp > dateLastNight.getTime() &&
                    doneChoreObj.status !== 'denied'
            );

            return !timesChoreDoneToday;
        });
        if (choresToDisplay.length > 0)
            return choresToDisplay;

        return [{img: 'success'}]
    }
    getPastChores(){
        if (!familyUnitRepository.kidsList ) return [];
        const kidId = userRepository.BROWSING_MODE.split("-")[1];
        const currentKid = familyUnitRepository.kidsList.find(k => k._id === kidId);
        const {doneChores, delinquentChoreInstances} = currentKid;
        const workingValue = [];
        for (let i = 0; i < doneChores.length; i++){
            const theChore = familyUnitRepository.existingChores.find(chore=> chore._id === doneChores[i].chore);
            workingValue.push({
                ...doneChores[i],
                name: theChore.name,
                notes: theChore.notes,
                type: 'done'
            });
        }
        for (let i = 0; i < delinquentChoreInstances.length; i++){
            const theChore = familyUnitRepository.existingChores.find(chore=> chore._id === delinquentChoreInstances[i].chore);
            workingValue.push({
                ...delinquentChoreInstances[i],
                name: theChore.name,
                notes: theChore.notes,
                type: 'delinquent'
            });
        }
        return workingValue.sort((c1, c2) => c2.timeStamp - c1.timeStamp);
    }
    render(){
        const kidId = userRepository.BROWSING_MODE.split("-")[1];
        const currentKid = familyUnitRepository.kidsList.find(k => k._id === kidId);
        if (!currentKid.avatar) {
            return <Redirect to="/maintabscreen/kid/chooseavatar" />
        }
        return(
            <KidChoreBoardView
                {...this.props}
                {...this.state}
                onRequestCompleteChore={this.requestConfirmCompleteChore}
                modalAccept={this.state.checkMarkClickable ? this.completeChore : () => ""}
                modalClose={this.cancelModal}
                modalDeny={this.cancelModal}
                chores={this.getChoresToDisplay()}
                pastChores={this.getPastChores()}
                setAnimationRef={this.setAnimationRef}
            />
        );
    }
}



export default KidChoreBoardContainer;