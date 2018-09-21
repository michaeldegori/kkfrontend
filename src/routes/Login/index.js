import React from 'react';
import LoginView from './LoginView';
// import {observer, inject} from 'mobx-react';

// @inject('routing')
// @observer
class LoginContainer extends React.Component{
    componentDidMount(){
        console.log("login view mounted");
    }
    render() {
        return (
            <LoginView {...this.props} />
        );
    }
}

export default LoginContainer;