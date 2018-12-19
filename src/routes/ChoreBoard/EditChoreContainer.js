import React from "react";
import {
    Alert
} from 'react-native';
import CreateChoreView from './CreateChoreView';
import {observer} from "mobx-react";
import RRule, {rrulestr} from 'rrule';
import familyUnitRepository from "../../stores/FamilyUnitDataStore";
import userRepository from "../../stores/UserDataStore";
import choresRepository from "../../stores/DefaultChoresStore";

@observer
class EditChoreContainer extends React.Component{
    state = {
        choreId: null,
        choreName: "",
        choreDays: [false, false, false, false, false, false, false],
        choreFrequency: "weekly",
        monthlyChoreInterval: "",
        chorePriority: 2,
        choreAppliedTo: [],
        submitting: false,
        modalVisible: false,
        modalText: "Success"
    }
    componentDidMount() {
        const {match: {params: {choreid}}} = this.props;
        // console.log(choreid);
        if (choreid.indexOf("default") !== -1) {
            const choreId = choreid.split("-")[1];
            this.loadChore(
                choresRepository.chores.find(c => c._id === choreId)
            )
        }
        else {
            this.loadChore(
                familyUnitRepository.existingChores.find(c => c._id === choreid)
            );
        }
    }
    loadChore(chore){
        const repRule = rrulestr(chore.repetitionRule);
        //reprule.byweekday: [0,2,4] freq=1 is monthly, 2 is weekly
        const choreFrequency = repRule.options.freq === 1 ? 'monthly' : 'weekly';
        console.log('############################',repRule, choreFrequency);
        const choreDays = [false, false, false, false, false, false, false].map((e, i) => ((repRule.options || {byweekday:[]}).byweekday).includes(i));
        this.setState(state => ({
            choreId: chore._id,
            choreName: chore.name,
            choreDays,
            choreFrequency,
            monthlyChoreInterval: (repRule.options.bysetpos && repRule.options.bysetpos[0] === -1) ? 1 : 0,
            chorePriority: Number(chore.priority),
            choreAppliedTo: familyUnitRepository.kidsList.filter(kid => (kid.assignedChores||[]).includes(chore._id)).map(kid => kid._id),
        }))
    }
    updateForm = (field, newVal) => this.setState({ [field]: newVal } )
    toggleKidSelection = (kidId) => {
        if (this.state.choreAppliedTo.indexOf(kidId) === -1)
            this.setState({choreAppliedTo: [...this.state.choreAppliedTo, kidId]});
        else
            this.setState({choreAppliedTo: this.state.choreAppliedTo.filter(kId => kId !== kidId)});
    }
    showModal = message => {
        this.setState(state => ({modalVisible: true, modalText: message}));
        setTimeout(() => this.setState(state => ({modalVisible: false})), 1750);
    }
    submitChore = async () => {
        this.setState(state=> ({submitting: true}));
        const {
            choreId,
            choreName,
            choreDays,
            choreFrequency,
            chorePriority,
            choreAppliedTo,
            monthlyChoreInterval
        } = this.state;
        console.log(this.state);
        if (choreName.length < 2) return Alert.alert("Invalid input", "Please enter a chore name");
        const numChoreDays = choreDays.filter(e=>e).length;
        let error = false;
        if (choreFrequency === "weekly" && numChoreDays === 0) {
            error = true;
            Alert.alert("Invalid input", "Please select at least one day of the week for a weekly chore");
        }
        if (choreFrequency === "monthly" && numChoreDays !== 1) {
            error = true;
            Alert.alert("Invalid input", "Please select only one day of the week for a monthly chore");
        }
        if (choreFrequency === "monthly" && monthlyChoreInterval === null) {
            error = true;
            Alert.alert("Invalid input", "Please select whether it's the first or last day for a monthly chore");
        }
        if (error) return this.setState(state => ({submitting: false}));

        try {
            await familyUnitRepository.putChore({ choreId, choreName, choreDays, choreFrequency, chorePriority, choreAppliedTo, monthlyChoreInterval}, userRepository.idToken);
            this.showModal("Success");
        }
        catch(err){
            Alert.alert("Error posting chore", err.toString());
        }

        this.setState(state => ({submitting: false}));
    }
    render() {
        const {kidsList} = familyUnitRepository;
        return (
            <CreateChoreView
                {...this.props}
                {...this.state}
                updateForm={this.updateForm.bind(this)}
                kidsList={kidsList}
                toggleKidSelection={this.toggleKidSelection}
                submitChore={this.submitChore}
            />
        );
    }
}


export default EditChoreContainer;