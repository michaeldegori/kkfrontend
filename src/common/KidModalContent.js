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


const {width, height} = Dimensions.get('window');
const KidModalContent = ({modalText, modalAccept, modalClose}) => (
    <Fragment>
        <Text style={{color: shuttleGreyDark, textAlign: 'center', marginBottom: height * 0.05}}>{modalText}</Text>
        <View style={{alignSelf: 'stretch', alignItems: 'center', marginBottom: height * 0.03, flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableOpacity style={[{borderColor: fountainBlue}]} onPress={modalAccept} >
                <Ionicons style={{marginHorizontal: width * 0.02}} size={width * 0.15} color={fountainBlue} name={"ios-checkmark-circle-outline"} />
            </TouchableOpacity>
            <TouchableOpacity style={[{borderColor: shuttleGrey}]} onPress={modalClose} >
                <Ionicons style={{marginHorizontal: width * 0.02}} size={width * 0.15} color={shuttleGrey} name={"ios-close-circle-outline"} />
            </TouchableOpacity>
        </View>
    </Fragment>
);


export default KidModalContent;