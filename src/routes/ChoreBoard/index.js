import React from "react";
import {
    Alert
} from 'react-native';
import {observer} from 'mobx-react';
import ChoredBoardView from './ChoreBoardView'
import userRepository from "../../stores/UserDataStore";
import familyUnitRepository from "../../stores/FamilyUnitDataStore";

@observer
class ChoreBoardContainer extends React.Component{
    handleChoreLongPress = (chore) => {
        Alert.alert(
            "Please Confirm",
            "Are you sure you wish to delete this chore?",
            [
                {text: 'Cancel', onPress: () => null, style: 'cancel'},
                {text: 'OK', onPress: () => familyUnitRepository.deleteChore(chore, userRepository.idToken)},
            ]
        );
    }
    handleChorePress = (choreId) => this.props.history.push(`/maintabscreen/editchore/${choreId}`);
    render(){
        return(
            <ChoredBoardView
                {...this.props}
                chores={familyUnitRepository.existingChores}
                kidsList={(familyUnitRepository.kidsList || [])}
                avatar={userRepository.avatar}
                navigateToEditChore={this.handleChorePress}
                deleteChore={this.handleChoreLongPress}
            />
        );
    }
}

export default ChoreBoardContainer;