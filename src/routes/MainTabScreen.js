import React from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity,
    Keyboard,
    KeyboardAvoidingView
} from 'react-native';
import {Switch, Route, Redirect, Link} from 'react-router-native';
import { EvilIcons, Ionicons, Octicons } from '@expo/vector-icons';
import {fountainBlue, lightGrey} from '../colors';

import Alerts from './Alerts';
import ChoreBoard from './ChoreBoard';
import KreditDashboard from './KreditDashboard';
import RewardsFeed from './RewardsFeed';
import Settings from './Settings';
import AddFamilyUnitMember from "./AddFamilyUnitMember";
import AccountManager from "./AccountManager";
import CreateChoreContainer from "./ChoreBoard/CreateChoreContainer";

const icons = [
    color=> <EvilIcons color={color} name="bell" size={32}/>,
    color=> <EvilIcons color={color} name="credit-card" size={32}/>,
    color=> <Ionicons color={color} name="ios-list" size={32}/>,
    color=> <Octicons color={color} name="gift" size={30}/>,
    color=> <Octicons color={color} name="gear" size={30}/>
];
const links = [
    "/maintabscreen/alerts",
    "/maintabscreen/kreditdashboard",
    "/maintabscreen/choreboard",
    "/maintabscreen/rewardsfeed",
    "/maintabscreen/settings"
];


class MainTabScreen extends React.Component{
    state = {
        keyboardShown: false
    }
    componentDidMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
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
    render() {
        const {match, location:{pathname}} = this.props;
        return (
            <View style={[styles.mainContainer]}>
                <Switch>
                    <Route path="/maintabscreen/alerts" component={Alerts} />
                    <Route path="/maintabscreen/choreboard" component={ChoreBoard} />
                    <Route path="/maintabscreen/rewardsfeed" component={RewardsFeed} />
                    <Route path="/maintabscreen/settings" component={Settings} />
                    <Route path="/maintabscreen/kreditdashboard" component={KreditDashboard} />
                    <Route path="/maintabscreen/accountmanager" component={AccountManager} />
                    <Route path="/maintabscreen/addfamilyunitmember" component={AddFamilyUnitMember} />
                    <Route path="/maintabscreen/createchore" component={CreateChoreContainer} />
                </Switch>

                {
                    !this.state.keyboardShown &&
                    <View style={styles.bottomBar}>
                        {
                            icons.map((icon, iconIndex) =>
                                <TabButton
                                    key={iconIndex}
                                    to={links[iconIndex]}>
                                    {icon(pathname===links[iconIndex] ? fountainBlue : lightGrey )}
                                </TabButton>)
                        }
                    </View>
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
        flexDirection: 'row'
    },
    navItem: {
        flex:1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default MainTabScreen;