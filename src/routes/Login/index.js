import React from 'react';
import LoginView from './LoginView';
import {observer, inject} from 'mobx-react';
import {loginWithAuth0} from "../../services/Authorization";

//INACTIVE COMPONENT, LOGIN DONE WITH AUTH0


// @inject('routing')
// @observer
class LoginContainer extends React.Component{
    state = {
        username: '',
        password: ''
    }
    handleTextInput = (key, newValue) => this.setState(() => ({[key]: newValue}))
    render() {
        return (
            <LoginView
                {...this.props}
                {...this.state}
                handleTextInput={this.handleTextInput}
                loginWithAuth0={loginWithAuth0('login')}
            />
        );
    }
}

export default LoginContainer;
/*
SUCCESS SHAPE:
{
  "errorCode": undefined,
  "params": Object {
    "access_token": "eTgBxRNvYgdFdNH4XVqZ3ZnkXxq2oPZB",
    "exp://192.168.1.64:19000/--/expo-auth-session": "",
    "expires_in": "7200",
    "scope": "openid",
    "token_type": "Bearer",
  },
  "type": "success",
  "url": "exp://192.168.1.64:19000/--/expo-auth-session#access_token=eTgBxRNvYgdFdNH4XVqZ3ZnkXxq2oPZB&scope=openid&expires_in=7200&token_type=Bearer",
}

 */