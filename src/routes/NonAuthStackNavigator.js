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

// @inject('routing')
@observer
class NonAuthStackNavigator extends Component{
    componentDidMount(){
        // userRepository.checkIfLoggedIn();
    }
    render(){
        const {userName, hasFinishedSignup} = userRepository;

        console.log("rendering nonauthnav")
        if (userName && hasFinishedSignup) return <Redirect to={"/maintabscreen/kreditdashboard"} />;
        if (userName && !hasFinishedSignup) return <Redirect to="/maintabsscreen/addfamilyunitmember/" />;
        return (
            <React.Fragment>
                <Route exact path={"/login"} render={() => <Login location={this.props.location}/>} />
                <Route exact path={"/registerchooseparentchild"} render={() => <ChooseParentChild location={this.props.location}/>} />
                <Route exact path={"/childregistrationmessage"} component={() => <ChildRegistrationMessage {...this.props}/>} />
                {/*<Route exact path={"/"} render={() => <LoginRegister location={this.props.location}/>} />*/}
                <Route exact path={"/"} component={AccountManager} />
            </React.Fragment>
        );
    }
}

export default NonAuthStackNavigator;