import React from 'react';
import AccountManagerView from './AccountManagerView';

export default class AccountManager extends React.Component{
    render() {
        return (
            <AccountManagerView {...this.props} />
        );
    }
}

