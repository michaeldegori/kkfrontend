import React from 'react';
import Expo, {Font, Constants, Asset} from 'expo';
import {Platform, View} from 'react-native';
import {NativeRouter, Router, Route, Switch, Redirect} from 'react-router-native';
import NonAuthStackNavigator from './src/routes/NonAuthStackNavigator';
import MainTabScreen from './src/routes/MainTabScreen';


// import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import createMemoryHistory from 'history/createMemoryHistory';
import userRepository from "./src/stores/UserDataStore";
import FullPage from "./src/common/FullPage";
import {observer} from "mobx-react";
// import { Provider } from 'mobx-react';
//

// const routingStore = new RouterStore();
// const history = syncHistoryWithStore(memoryHistory, routingStore);

const randomRoute = `/${Math.random().toString(26).slice(2)}`;
@observer
class App extends React.Component {
    state = {
        resourcesLoaded: false,
    }
    async componentDidMount(){
        await Font.loadAsync({
            "Poppins": require("./assets/fonts/poppins-regular.ttf"),
            "Poppins SemiBold": require("./assets/fonts/poppins-semibold.ttf"),
            "Poppins Bold": require("./assets/fonts/poppins-bold.ttf"),
        });
        try {
            await userRepository.checkIfLoggedIn();
        }
        catch (e) {
            console.log("###################Error while checkIfLoggedIn", e);
        }
        this.setState( () => ({
            resourcesLoaded: true,
        }));
    }
    render() {
        if (!this.state.resourcesLoaded) return <Expo.AppLoading />;

        let paddingView = null;
        if (Platform.OS === 'ios' && Constants.statusBarHeight !== 0)
            paddingView = <View style={{height: Constants.statusBarHeight, alignSelf: 'stretch'}} />


        return (
            <NativeRouter>
                <FullPage>
                    {paddingView}
                    <Switch>
                        <Route path={'/newuser'} component={NonAuthStackNavigator} />
                        <PrivateRoute path="/" component={MainTabScreen} />
                    </Switch>
                </FullPage>
            </NativeRouter>
        )
    }
}
{/*<Route path='/newuser' component={NonAuthStackNavigator} />*/}
{/*<PrivateRoute path="/" component={MainTabScreen} />*/}

class PrivateRoute extends React.Component{
    componentDidUpdate(){
        console.log("#########privateroute updated");
    }
    render(){
        const {component: TabNavComponent, ...rest} = this.props;
        const {isLoggedIn} = userRepository;
        console.log("privateroute isloggedin", isLoggedIn);
        return (
            <Route {...rest} path={'/'} render={(props) => (
                isLoggedIn
                    ? <TabNavComponent {...props} />
                    : <Redirect to='/newuser' />
            )} />
        );
    }
}

export default App;