import React from 'react';
import {
    TextInput,
    StyleSheet,
    Dimensions
} from 'react-native';
import {shuttleGrey} from "../colors";

const KKTextInput = ({style, ...props}) => (
  <TextInput
      underlineColorAndroid={'transparent'}
      {...props}
      style={[styles.inputStyle, style]}/>
);

const { height} = Dimensions.get('window');
const styles = StyleSheet.create({
    inputStyle: {
        height: Math.round(0.084 * height),
        alignSelf: 'stretch',
        padding: height * 0.015,
        backgroundColor: 'white',
        borderRadius: 8,
        color: shuttleGrey
    }
});

export default KKTextInput;
