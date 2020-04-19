import React from 'react';
import * as Font from 'expo-font';
import * as Updates from 'expo-updates';
import {AppLoading} from 'expo';
import {YellowBox} from 'react-native';
import {NativeRouter, Route, Switch, Redirect} from 'react-router-native';
import NonAuthStackNavigator from './src/routes/NonAuthStackNavigator';
import MainTabScreen from './src/routes/MainTabScreen';
import {observer} from "mobx-react";
import FullPage from "./src/common/FullPage";
import userRepository from "./src/stores/UserDataStore";
import {bundleReloadErrorEvent} from "./src/services/MixPanel";


YellowBox.ignoreWarnings(['Require cycle']);
YellowBox.ignoreWarnings(['The syntax "import Expo from']);

@observer
class App extends React.Component {
    state = {
        resourcesLoaded: false,
    }
    async componentDidMount(){
        await Font.loadAsync({
            "Montserrat": require("./assets/fonts/monstserrat-regular.ttf"),
            "Montserrat Medium": require("./assets/fonts/monstserrat-medium.ttf"),
        });
        try {
            await userRepository.checkIfLoggedIn();
            await userRepository.checkHasSeenCaroussel();
        }
        catch (e) {
            console.log("###################Error while checkIfLoggedIn", e);
        }

        try {
            const update = await Updates.checkForUpdateAsync();
            if (update.isAvailable) {
                await Updates.fetchUpdateAsync();
                Updates.reloadFromCache();
            }
        }catch(e){
            console.log("###################Error while downloading update", e);
            bundleReloadErrorEvent(userRepository); //mixpanel
        }

        this.setState( () => ({
            resourcesLoaded: true,
        }));
    }
    render() {
        if (!this.state.resourcesLoaded) return <AppLoading />;

        return (
            <NativeRouter>
                <FullPage>
                    <Switch>
                        <Route path={'/nonauth'} component={NonAuthStackNavigator} />
                        <PrivateRoute path="/" component={MainTabScreen} />
                    </Switch>
                </FullPage>
            </NativeRouter>
        )
    }
}

class PrivateRoute extends React.Component{
    render(){
        const {component: TabNavComponent, ...rest} = this.props;
        const {isLoggedIn, hasSeenCaroussel} = userRepository;
        let redirectPath = "/nonauth";
        if (!hasSeenCaroussel) redirectPath = "/nonauth/onboarding/1";

        console.log("##privateroute isloggedin", isLoggedIn, 'path', redirectPath);

        return (
            <Route {...rest} path={'/'} render={(props) => (
                isLoggedIn
                    ? <TabNavComponent {...props} />
                    : <Redirect to={redirectPath} />
            )} />
        );
    }
}

export default App;