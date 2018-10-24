import React from 'react';
import LoginRegisterView from './LoginRegisterView';
import {observer} from 'mobx-react';
import userDataRepository from '../../stores/UserDataStore';

@observer
class LoginRegisterContainer extends React.Component{
    render() {
        const {mongoId} = userDataRepository;
        return (
            <LoginRegisterView {...this.props} mongoId={mongoId} />
        );
    }
}

export default LoginRegisterContainer