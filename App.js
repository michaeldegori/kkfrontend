import React from 'react';
import Expo, {Font, Constants, Asset} from 'expo';
import {Platform, View} from 'react-native';
import {NativeRouter, Router, Route, Switch} from 'react-router-native';
import NonAuthStackNavigator from './src/routes/NonAuthStackNavigator';
import MainTabScreen from './src/routes/MainTabScreen';


// import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import createMemoryHistory from 'history/createMemoryHistory';
import userRepository from "./src/stores/UserDataStore";
import FullPage from "./src/common/FullPage";
// import { Provider } from 'mobx-react';
//

// const routingStore = new RouterStore();
// const history = syncHistoryWithStore(memoryHistory, routingStore);

class App extends React.Component {
    state = {
        resourcesLoaded: false,
        isLoggedIn: false
    }
    async componentWillMount(){
        await Font.loadAsync({
            "Poppins": require("./assets/fonts/poppins-regular.ttf"),
            "Poppins SemiBold": require("./assets/fonts/poppins-semibold.ttf"),
            "Poppins Bold": require("./assets/fonts/poppins-bold.ttf"),
        });
        const isLoggedIn = await userRepository.checkIfLoggedIn('login');
        this.setState( () => ({
            resourcesLoaded: true,
            isLoggedIn
        }));
    }
    render() {
        if (!this.state.resourcesLoaded) return <Expo.AppLoading />;
        console.log(Constants);
        let paddingView = null;
        if (Platform.OS === 'ios' && Constants.statusBarHeight !== 0)
            paddingView = <View style={{height: Constants.statusBarHeight, alignSelf: 'stretch'}} />

        return (
            <NativeRouter>
                <FullPage>
                    {paddingView}
                    <Switch>
                        <Route path='/maintabscreen' component={MainTabScreen} />
                        <Route path='/' component={NonAuthStackNavigator} />
                    </Switch>
                </FullPage>
            </NativeRouter>
        )
    }
}

export default App;