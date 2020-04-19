import React from "react";
import {Platform, StyleSheet, View} from "react-native";
import Constants from "expo-constants";
import {fountainBlue} from "../colors";

export default function NavBarPaddingView({route}){
    let paddingView = null;
    console.log("#########STATUSBARHEIGHT", Constants.statusBarHeight);
    if (Platform.OS === 'ios' && Constants.statusBarHeight !== 0)
        paddingView = <View style={[styles.paddingView, route.indexOf("onboarding") !== -1 ? styles.onboarding : {}]} />;
    return paddingView;
}


const styles = StyleSheet.create({
    paddingView: {
        height: Constants.statusBarHeight,
        alignSelf: 'stretch'
    },
    onboarding: {
        backgroundColor: fountainBlue
    }
});