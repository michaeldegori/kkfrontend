import React from "react";
import {Platform, StyleSheet, View} from "react-native";
import * as Constants from "expo-constants";
import {fountainBlue} from "../colors";

export default function NavBarPaddingView({route}){
    let paddingView = null;
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