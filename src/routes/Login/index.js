import React from 'react';
import LoginView from './LoginView';
import {observer, inject} from 'mobx-react';

//INACTIVE COMPONENT, LOGIN DONE WITH AUTH0


// @inject('routing')
// @observer
class LoginContainer extends React.Component{
    componentDidMount(){
        console.log("login view mounted");
    }

    render() {
        return (
            <LoginView {...this.props} loginWithAuth0={this.loginWithAuth0} />
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