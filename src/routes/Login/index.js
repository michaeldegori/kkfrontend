import React from 'react';
import {AsyncStorage, Alert} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions  from 'expo-permissions';
import LoginView from './LoginView';
import {loginWithAuth0, triggerPWResetWithAuth0} from "../../services/Authorization";


class LoginContainer extends React.Component{
    state = {
        username: '',
        password: '',
        location: null,
        submitting: false
    }
    async componentDidMount(){
        this.getLocationOnLoginAsync();
        this.setState({submitting:false});
        try{
            const userEmailLastLoggedIn = await AsyncStorage.getItem("@kiddiekredit:email");
            if (typeof userEmailLastLoggedIn === 'string')
                this.setState(() => ({username: userEmailLastLoggedIn}));
        }
        catch(e){
            console.log("something went wrong with retrieving the email address from asyncstorage");
        }
    }
    handleTextInput = (key, newValue) => this.setState(() => ({[key]: (newValue||'').trim()}))
    triggerPWResetWithAuth0 = async () => {
        this.setState({submitting:true});
        let {username:email} = this.state;
        if (!email){
            Alert.alert("Please input email", "Please enter your email address so we know whose password to reset.")
            return this.setState({submitting:false});
        }
        if (email.trim) email = email.trim();
        if (!email.match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)){
            Alert.alert("Invalid email", "That doesn't look like a valid email. Please enter a valid email address.");
            return this.setState({submitting:false});
        }
        const pwResetResult = await triggerPWResetWithAuth0(this.state.username);
        if (!pwResetResult){
            Alert.alert("Something went wrong", "Are you sure you have an account with that email?");
            return this.setState({submitting:false});
        }
        Alert.alert("Success!", pwResetResult);
        this.setState({submitting:false});
    }
    loginWithAuth0 = async () => {
        this.setState({submitting:true});
        const loginResult = await loginWithAuth0('login')(this.state.username, this.state.password);
        if (!loginResult){
            Alert.alert("Login error", "Username or password incorrect");
            this.setState({submitting:false});
            //don't need to setState to notsubmitting if succeeded, should already be unmounted
        }
    }
    getLocationOnLoginAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
            errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        
        this.setState({ location });
        console.log(location.coords.longitude)
        console.log(location.coords.latitude)
    }


    render() {
        return (
            <LoginView
                {...this.props}
                {...this.state}
                handleTextInput={this.handleTextInput}
                loginWithAuth0={this.loginWithAuth0}
                triggerPWResetWithAuth0={this.triggerPWResetWithAuth0}
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