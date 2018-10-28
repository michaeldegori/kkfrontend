import React from 'react';
import {View, Dimensions, StyleSheet} from "react-native";

const Row = ({children, style}) => (
    <View style={[styles.row, (style || {})]}>
        {children}
    </View>
);

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignSelf: 'stretch',
        margin: width * 0.05
    },
});

export default Row;