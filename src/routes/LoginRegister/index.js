import React from 'react';
import LoginRegisterView from './LoginRegisterView';
// import {inject, observer} from 'mobx-react';

// @inject('routing')
// @observer
class LoginRegisterContainer extends React.Component{
    render() {
        return (
            <LoginRegisterView {...this.props} />
        );
    }
}

export default LoginRegisterContainer