import React from "react";
import {observer} from 'mobx-react';
import ChoredBoardView from './ChoreBoardView'
import userRepository from "../../stores/UserDataStore";
import familyUnitRepository from "../../stores/FamilyUnitDataStore";

@observer
class ChoreBoardContainer extends React.Component{
    deleteChore = () => {

    }
    render(){
        return(
            <ChoredBoardView
                {...this.props}
                chores={familyUnitRepository.existingChores}
                kidsList={(familyUnitRepository.kidsList || [])}
                avatar={userRepository.avatar}
            />
        );
    }
}

export default ChoreBoardContainer;