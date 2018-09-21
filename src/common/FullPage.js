import React from 'react';
import {StyleSheet, View} from 'react-native';

const FullPage = ({children, style, ...props}) => (
    <View style={[styles.mainContainer, style]} {...props}>
        {children}
    </View>
);

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignSelf: 'stretch',
        overflow: 'hidden'
    }
});

export default FullPage;