import React, {Component} from 'react';
import {Redirect, Route, Switch, withRouter} from 'react-router-native';
import userRepository from '../stores/UserDataStore';
import {observer} from 'mobx-react/native';

import LoginRegister from './LoginRegister';
import Login from './Login';
import ChooseParentChild from './RegistrationFlow/ChooseParentChild';
import ChildRegistrationMessage from './RegistrationFlow/ChildRegistrationMessage';
import {inject} from "mobx-react";
import AccountManager from "./AccountManager";
import Expo from "expo";

// @inject('routing')
@observer
class NonAuthStackNavigator extends Component{
    componentDidMount(){
        userRepository.checkIfLoggedIn();
        this.redirecting = false;
    }
    render(){
        const {mongoId, nextRoute} = userRepository;

        console.log("rendering nonauthnav")
        if (mongoId && !nextRoute && !this.redirecting) {
            this.redirecting = true;
            return <Redirect to="/maintabscreen/choreboard" />;
        }
        if (mongoId && nextRoute && !this.redirecting) {
            console.log(this.props.history.location.pathname);
            this.redirecting = true;
            return <Redirect to={nextRoute} />;
        }
        return (
            <Switch>
                    <Route exact path={"/login"} render={() => <Login location={this.props.location}/>} />
                    <Route exact path={"/registerchooseparentchild"} render={() => <ChooseParentChild location={this.props.location}/>} />
                    <Route exact path={"/childregistrationmessage"} component={() => <ChildRegistrationMessage {...this.props}/>} />
                    <Route exact path={"/"} render={() => <LoginRegister location={this.props.location}/>} />
            </Switch>
        );
    }
}

export default NonAuthStackNavigator;