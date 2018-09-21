import React from 'react';
import {StyleSheet, View, Dimensions, TouchableOpacity} from 'react-native';
import {Switch, Route, Redirect, Link} from 'react-router-native';
import { EvilIcons, Ionicons, Octicons } from '@expo/vector-icons';
import {fountainBlue, lightGrey} from '../colors';

import Alerts from './Alerts';
import ChoreBoard from './ChoreBoard';
import KreditDashboard from './KreditDashboard';
import RewardsFeed from './RewardsFeed';
import Settings from './Settings';

const icons = [
    color=> <EvilIcons color={color} name="bell" size={32}/>,
    color=> <EvilIcons color={color} name="credit-card" size={32}/>,
    color=> <Ionicons color={color} name="ios-list" size={32}/>,
    color=> <Octicons color={color} name="gift" size={30}/>,
    color=> <Octicons color={color} name="gear" size={30}/>
];
const links = [
    "/maintabscreen/alerts",
    "/maintabscreen/choreboard",
    "/maintabscreen/kreditdashboard",
    "/maintabscreen/rewardsfeed",
    "/maintabscreen/settings"
];


const MainTabScreen = ({match, location:{pathname}}) => (
    <View style={[styles.mainContainer]}>
        <Switch>
            <Route path="/maintabscreen/alerts" component={Alerts} />
            <Route path="/maintabscreen/choreboard" component={ChoreBoard} />
            <Route path="/maintabscreen/rewardsfeed" component={RewardsFeed} />
            <Route path="/maintabscreen/settings" component={Settings} />
            <Route path="/maintabscreen/kreditdashboard" component={KreditDashboard} />
        </Switch>
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
    </View>
);

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
    bottomBar: {
        alignSelf: 'stretch',
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