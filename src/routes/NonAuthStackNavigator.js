import React, {Component} from 'react';
import {Redirect, Route, Switch, withRouter} from 'react-router-native';
import userRepository from '../stores/UserDataStore';
import {observer} from 'mobx-react/native';

import LoginRegister from './LoginRegister';
import Login from './Login';
import {inject} from "mobx-react";

// @inject('routing')
@observer
class NonAuthStackNavigator extends Component{
    componentDidMount(){

    }
    render(){
        const userName = userRepository.userName;
        console.log("rendering nonauthnav")
        if (userName) return <Redirect to={"/maintabscreen"} />;
        return (
            <React.Fragment>
                <Route exact path={"/login"} render={() => <Login location={this.props.location}/>} />
                <Route exact path={"/"} render={() => <LoginRegister location={this.props.location}/>} />
            </React.Fragment>
        );
    }
}

export default NonAuthStackNavigator;