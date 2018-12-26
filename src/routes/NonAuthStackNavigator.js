import React, {Component} from 'react';
import {Redirect, Route, Switch, withRouter} from 'react-router-native';
import userRepository from '../stores/UserDataStore';
import {observer} from 'mobx-react/native';

import LoginRegister from './LoginRegister';
import Login from './Login';
import ChooseParentChild from './RegistrationFlow/ChooseParentChild';
import ChildRegistrationMessage from './RegistrationFlow/ChildRegistrationMessage';
import RegistrationForm from "./RegistrationFlow/RegistrationForm";

// @inject('routing')
@observer
class NonAuthStackNavigator extends Component{
    componentDidMount(){
        this.redirecting = false;
    }
    componentDidUpdate(){
        console.log("nonauthnav Component did update");
    }
    render(){
        const {isLoggedIn} = userRepository;

        console.log("rendering nonauthnav")
        if (isLoggedIn && !this.redirecting) {
            this.redirecting = true;
            return <Redirect to="/" />;
        }

        return (
            <Switch>
                    <Route exact path={"/newuser/login"} render={() => <Login location={this.props.location}/>} />
                    <Route exact path={"/newuser/registerchooseparentchild"} render={() => <ChooseParentChild location={this.props.location}/>} />
                    <Route exact path={"/newuser/registrationform"} component={RegistrationForm} />
                    <Route exact path={"/newuser/childregistrationmessage"} component={() => <ChildRegistrationMessage {...this.props}/>} />
                    <Route exact path={"/newuser"} render={() => <LoginRegister location={this.props.location}/>} />
            </Switch>
        );
    }
}

export default NonAuthStackNavigator;