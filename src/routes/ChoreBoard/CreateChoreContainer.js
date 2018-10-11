import React from "react";
import CreateChoreView from './CreateChoreView';
import {observer} from "mobx-react";

@observer
class CreateChoreContainer extends React.Component{
    state = {
        choreName: "",
        choreDays: [false, false, false, false, false, false, false],
        choreFrequency: "",
        chorePriority: "",
        choreAppliedTo: []
    }
    updateForm = (field, newVal) => this.setState({ [field]: newVal } )
    render() {
        return (
            <CreateChoreView {...this.props} {...this.state} updateForm={this.updateForm.bind(this)} />
        );
    }
}


export default CreateChoreContainer;