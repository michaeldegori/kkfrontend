import React from "react";
import {observer} from 'mobx-react';
import ChoredBoardView from './ChoreBoardView'
import userRepository from "../../stores/UserDataStore";
import familyUnitRepository from "../../stores/FamilyUnitDataStore";
import choresRepository from "../../stores/DefaultChoresStore";

@observer
class ChoredBoardContainer extends React.Component{
    render(){
        return(
            <ChoredBoardView
                {...this.props}
                chores={familyUnitRepository.existingChores}
                defaultChores={choresRepository.chores}
                avatar={userRepository.avatar}
            />
        );
    }
}

export default ChoredBoardContainer;