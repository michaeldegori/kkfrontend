import React from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import {Ionicons} from 'react-native-vector-icons';
import {fountainBlue} from "../../colors";
import KKText from "../../common/KKText";

const {width, height} = Dimensions.get('window');
const InfoIcon = ({attributeName, onPress=()=>''}) => (
    <TouchableOpacity onPress={onPress} style={{alignSelf: 'stretch', paddingLeft: width * 0.03, justifyContent: 'center'}}>
        <Ionicons name={'ios-information-circle-outline'} size={width*0.07} color={fountainBlue} />
    </TouchableOpacity>
);

export default InfoIcon;