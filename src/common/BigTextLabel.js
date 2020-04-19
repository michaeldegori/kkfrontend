import React from "react";
import {
    StyleSheet,
    Dimensions
} from 'react-native';
import Text from './KKText';
import {fountainBlue} from '../colors';
import {scaleRatio} from "../configuration";


const BigTextLabel = ({children}) => (
            <Text style={styles.bigText}>
                {children}
            </Text>
);

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    bigText:{
        color: fountainBlue,
        fontSize: 72 * scaleRatio,
        textAlign: 'center',
        paddingBottom: 6 * scaleRatio
    },
});

export default BigTextLabel;