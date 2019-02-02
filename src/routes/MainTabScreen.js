import React from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity,
    Keyboard,
} from 'react-native';
import {Switch, Route, Redirect, Link} from 'react-router-native';
import { EvilIcons, Ionicons, Octicons } from '@expo/vector-icons';
import {fountainBlue, lightGrey} from '../colors';

import AlertsContainer from './Alerts';
import ChoreBoard from './ChoreBoard';
import KreditDashboard from './KreditDashboard';
import RewardsFeed from './RewardsFeed';
import Settings from './Settings';
import AddChildContainer from "./AddFamilyUnitMember/AddChildContainer";
import AccountManager from "./AccountManager";
import CreateChoreContainer from "./ChoreBoard/CreateChoreContainer";
import CreateRewardContainer from "./RewardsFeed/CreateRewardContainer";
import EditChoreContainer from "./ChoreBoard/EditChoreContainer";
import EditRewardContainer from "./RewardsFeed/EditRewardContainer";
import KidAccountManagerContainer from "./AccountManager/KidAccountManager";
import KidChoreBoardContainer from "./ChoreBoard/KidChoreBoardContainer";
import KidRewardsContainer from "./RewardsFeed/KidRewardsContainer";
import KidKreditDashboardContainer from "./KreditDashboard/KidKreditDashboardContainer";
import userRepository from "../stores/UserDataStore";
import registerForPushNotificationsAsync from "../services/PushNotifications";
import ChooseAvatar from "./RegistrationFlow/ChooseAvatar";
import AddFamilyAdminContainer from "./AddFamilyAdmin";
import BaseOnboardingView from "./onboarding/BaseOnboardingView";

const icons = [
    color=> <EvilIcons color={color} name="bell" size={32}/>,
    color=> <EvilIcons color={color} name="credit-card" size={32}/>,
    color=> <Ionicons color={color} name="ios-list" size={32}/>,
    color=> <Octicons color={color} name="gift" size={30}/>,
    color=> <Octicons color={color} name="gear" size={30}/>
];
const kidIcons = [
    color=> <EvilIcons color={color} name="credit-card" size={32}/>,
    color=> <Ionicons color={color} name="ios-list" size={32}/>,
    color=> <Octicons color={color} name="gift" size={30}/>
];

const links = [
    "/maintabscreen/alerts",
    "/maintabscreen/kreditdashboard",
    "/maintabscreen/choreboard",
    "/maintabscreen/rewardsfeed",
    "/maintabscreen/settings"
];

const kidLinks = [
    "/maintabscreen/kid/kreditdashboard",
    "/maintabscreen/kid/choreboard",
    "/maintabscreen/kid/rewardsfeed"
];

const keyboardHiddenPaths  = [
    "/maintabscreen/createchore",
    "/onboarding",
];


class MainTabScreen extends React.Component{
    state = {
        keyboardShown: false
    }
    async componentDidMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
        await registerForPushNotificationsAsync(userRepository);
    }

    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow = () => {
        this.setState(() => ({keyboardShown: true}));
    }

    _keyboardDidHide = () => {
        this.setState(() => ({keyboardShown: false}));
    }
    //hides the bottom tab bar when keyboard is out
    //Also hides tab bar for a certain set of hardcoded paths
    shouldShowTabBar = () => {
        const {location:{pathname}} = this.props;
        if (this.state.keyboardShown) return false;
        return keyboardHiddenPaths.indexOf(pathname) === -1;

    }
    getIconSet = () => {
        const {match, location:{pathname}} = this.props;
        if (pathname.indexOf('/kid') !== -1) return kidIcons;
        return icons;
    }
    getIconLink = (index) => {
        const {match, location:{pathname}} = this.props;
        if (pathname.indexOf('/kid') !== -1) return kidLinks[index];
        return links[index];
    }
    render() {
        const {match, location:{pathname}} = this.props;
        const {BROWSING_MODE} = userRepository;
        let redirectPath =  '/maintabscreen/choreboard';
        if (BROWSING_MODE.toString() !== 'parent')
            redirectPath = '/maintabscreen/kid/choreboard';
        return (
            <View style={[styles.mainContainer]}>
                <Switch>
                    <Route path="/maintabscreen/alerts" component={AlertsContainer} />
                    <Route path="/maintabscreen/choreboard" component={ChoreBoard} />
                    <Route path="/maintabscreen/rewardsfeed" component={RewardsFeed} />
                    <Route path="/maintabscreen/settings" component={Settings} />
                    <Route path="/maintabscreen/kreditdashboard" component={KreditDashboard} />
                    <Route path="/maintabscreen/accountmanager" component={AccountManager} />
                    <Route path="/maintabscreen/addfamilyunitmember" component={AddChildContainer} />
                    <Route path="/maintabscreen/addfamilyadmin" component={AddFamilyAdminContainer} />
                    <Route path="/maintabscreen/createchore" component={CreateChoreContainer} />
                    <Route path="/maintabscreen/editchore/:choreid" component={EditChoreContainer} />
                    <Route path="/maintabscreen/createreward" component={CreateRewardContainer} />
                    <Route path="/maintabscreen/editreward/:rewardid" component={EditRewardContainer} />
                    {/*KID ROUTES*/}


                    <Route path="/maintabscreen/kid/accountmanager" component={KidAccountManagerContainer} />
                    <Route path="/maintabscreen/kid/choreboard" component={KidChoreBoardContainer} />
                    <Route path="/maintabscreen/kid/rewardsfeed" component={KidRewardsContainer} />
                    <Route path="/maintabscreen/kid/kreditdashboard" component={KidKreditDashboardContainer} />
                    <Route path="/maintabscreen/kid/chooseavatar" component={ChooseAvatar} />
                    <Redirect to={redirectPath}/>
                </Switch>

                {
                    this.shouldShowTabBar() &&
                    <React.Fragment>
                        <View style={styles.bottomSpacer}/>
                        <View style={styles.bottomBar}>
                            {
                                this.getIconSet().map((icon, iconIndex) =>
                                    <TabButton
                                        key={iconIndex}
                                        to={this.getIconLink(iconIndex)}>
                                        {icon(pathname===this.getIconLink(iconIndex) ? fountainBlue : lightGrey )}
                                    </TabButton>)
                            }
                        </View>
                    </React.Fragment>
                }
            </View>
        );
    }
}

const TabButton = ({children, to}) => (
        <Link style={styles.navItem} to={to} component={TouchableOpacity}>
            {children}
        </Link>
);

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomSpacer:{
        alignSelf: 'stretch',
        height: height * 0.1,
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width,
        height: height * 0.1,
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    navItem: {
        flex:1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default MainTabScreen;