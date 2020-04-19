import React, { Fragment } from 'react';
import {
    Platform,
    StyleSheet,
    TouchableOpacity,
    View,
    Dimensions
} from "react-native";
import {Ionicons} from 'react-native-vector-icons';
import Text from './KKText';
import {fountainBlue, shuttleGrey, shuttleGreyDark} from "../colors";


const AdultModalContent = ({modalText, modalAccept, modalDeny, acceptLabel, denyLabel}) => (
    <Fragment>
        <Text style={{color: shuttleGreyDark, textAlign: 'center', marginBottom: height * 0.05}}>{modalText}</Text>
        <View style={{alignSelf: 'stretch', alignItems: 'center', marginBottom: height * 0.03}}>
            <TouchableOpacity style={[styles.modalBtn, {borderColor: fountainBlue}]} onPress={modalAccept} >
                <Ionicons style={{marginHorizontal: width * 0.02}} size={width * 0.1} color={fountainBlue} name={"ios-checkmark-circle-outline"} />
                <Text style={{color: fountainBlue, marginLeft: 8, flex:1}}>{acceptLabel}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalBtn, {borderColor: shuttleGrey}]} onPress={modalDeny} >
                <Ionicons style={{marginHorizontal: width * 0.02}} size={width * 0.1} color={shuttleGrey} name={"ios-arrow-dropleft"} />
                <Text style={{color: shuttleGrey, marginLeft: 8, flex:1}}>{denyLabel}</Text>
            </TouchableOpacity>
        </View>
    </Fragment>
);

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    modalBtn: {
        width: 0.7 * width,
        borderRadius: 8,
        borderWidth: 2,
        backgroundColor: 'white',
        flexDirection: 'row',
        marginBottom: width * 0.015,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default AdultModalContent;