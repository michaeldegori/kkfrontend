import React from 'react';
import AccountManagerView from './AccountManagerView';
import familyUnitRepository from "../../stores/FamilyUnitDataStore";
import {observer} from "mobx-react";
import userRepository from "../../stores/UserDataStore";

@observer
class KidAccountManagerContainer extends React.Component{
    switchToChild = async (childId) => {
        userRepository.switchBrowsingMode(this.props.history, childId);
    }
    switchToParent = async () => {
        await userRepository.switchBrowsingMode(this.props.history, null, 'parent');
    }
    render() {
        return (
            <AccountManagerView
                {...this.props}
                kidsList={familyUnitRepository.kidsList}
                switchToChild={this.switchToChild}
                switchToParent={this.switchToParent}
            />
        );
    }
}

export default KidAccountManagerContainer;