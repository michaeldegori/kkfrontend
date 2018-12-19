import React from 'react';
import LoginRegisterView from './LoginRegisterView';

class LoginRegisterContainer extends React.Component{
    render() {
        return (
            <LoginRegisterView {...this.props} />
        );
    }
}

export default LoginRegisterContainer