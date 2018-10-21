import React from 'react';
import AccountManagerView from './AccountManagerView';
import familyUnitRepository from "../../stores/FamilyUnitDataStore";
import {observer} from "mobx-react";

@observer
class AccountManager extends React.Component{
    render() {
        return (
            <AccountManagerView {...this.props} kidsList={familyUnitRepository.kidsList} />
        );
    }
}

export default AccountManager;