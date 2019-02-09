import React, {Component} from 'react';
import {Redirect, Route, Switch, withRouter} from 'react-router-native';
import userRepository from '../stores/UserDataStore';
import {observer} from 'mobx-react/native';

import LoginRegister from './LoginRegister';
import Login from './Login';
import ChooseParentChild from './RegistrationFlow/ChooseParentChild';
import ChildRegistrationMessage from './RegistrationFlow/ChildRegistrationMessage';
import RegistrationForm from "./RegistrationFlow/RegistrationForm";
import ParentOnboarding1 from "./onboarding/ParentOnboarding1";
import ParentOnboarding2 from "./onboarding/ParentOnboarding2";
import ParentOnboarding3 from "./onboarding/ParentOnboarding3";
import ParentOnboarding4 from "./onboarding/ParentOnboarding4";

// @inject('routing')
@observer
class NonAuthStackNavigator extends Component{
    componentDidMount(){
        this.redirecting = false;
    }
    render(){
        const {isLoggedIn, nextRoute} = userRepository;

        console.log("rendering nonauthnav")
        if (isLoggedIn && !this.redirecting) {
            this.redirecting = true;
            return <Redirect to={nextRoute || "/"} />;
        }


        return (
            <Switch>
                    <Route exact path={"/nonauth/login"} render={() => <Login location={this.props.location}/>} />
                    <Route exact path={"/nonauth/registerchooseparentchild"} render={() => <ChooseParentChild location={this.props.location}/>} />
                    <Route exact path={"/nonauth/registrationform"} component={RegistrationForm} />
                    <Route exact path={"/nonauth/childregistrationmessage"} component={() => <ChildRegistrationMessage {...this.props}/>} />
                    <Route exact path={"/nonauth"} render={() => <LoginRegister location={this.props.location}/>} />
                    <Route exact path={"/nonauth/onboarding/1"} component={ParentOnboarding1 } />
                    <Route exact path={"/nonauth/onboarding/2"} component={ParentOnboarding2 } />
                    <Route exact path={"/nonauth/onboarding/3"} component={ParentOnboarding3 } />
                    <Route exact path={"/nonauth/onboarding/4"} component={ParentOnboarding4 } />
            </Switch>
        );
    }
}

export default NonAuthStackNavigator;