import React from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from "react-native";
import {Entypo} from 'react-native-vector-icons';
import {fountainBlue, shuttleGreyDark} from "../colors";

const KidSelection = ({selected, onPress, children}) => (
    <TouchableOpacity onPress={onPress}>
        {children}
        {
            selected &&
            <View style={styles.checkWrapper}>
                <Entypo size={width * 0.174} name={"check"} style={styles.check}/>
            </View>
        }
    </TouchableOpacity>
);

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    checkWrapper:{
        backgroundColor: 'rgba(255,255,255,0.7)',
        position: 'absolute',
        top: 0,
        left: 0,
        borderRadius: width * 0.174,
    },
    check: {
        color: 'white'
    }
});

export default KidSelection;