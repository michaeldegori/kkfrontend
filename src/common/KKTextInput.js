import React from 'react';
import {
    TextInput,
    StyleSheet,
    Dimensions
} from 'react-native';
import {shuttleGrey} from "../colors";
import {Entypo} from 'react-native-vector-icons';
import Row from "./Row";


class KKTextInput extends React.Component{
    state = {
        showPasswordToggled: false
    }
    onPressIcon = () => {
        this.setState(() => ({showPasswordToggled: !this.state.showPasswordToggled}));
    }
    render(){
        const {style, ...props} = this.props;
        let leftElement = null;
        let secureTextEntryProp;
        if (props.secureTextEntry){
            leftElement = <Entypo name='eye' style={styles.eyeIcon} onPress={this.onPressIcon}/>
            secureTextEntryProp = props.secureTextEntry && !this.state.showPasswordToggled;
        }
        return (
            <Row style={{alignSelf: 'stretch', margin: 0, padding: 0}}>
                <TextInput
                    underlineColorAndroid={'transparent'}
                    {...props}
                    returnKeyType={"done"}
                    secureTextEntry={secureTextEntryProp}
                    style={[styles.inputStyle, style]}/>
                {
                    leftElement
                }
            </Row>
        );
    }
}

const { width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    inputStyle: {
        height: Math.round(0.084 * height),
        alignSelf: 'stretch',
        padding: height * 0.015,
        backgroundColor: 'white',
        borderRadius: 8,
        color: shuttleGrey,
        flex:1
    },
    eyeIcon:{
        padding: 8,
        fontSize: Math.round(0.04 * height),
        color: shuttleGrey,
        position: 'absolute',
        right: width * 0.1,
        top: Math.round(0.02 * height),
    }
});

export default KKTextInput;
