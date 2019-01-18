import React from 'react';
import {Dimensions, Modal, StyleSheet, TouchableOpacity, View} from "react-native";
import Text from "./KKText";
import {fountainBlue, shuttleGrey} from "../colors";
import {Ionicons} from 'react-native-vector-icons';

export default function EducationalModal({hideModal, educationalInfo, modalVisible}) {
    return (
        <Modal
            onRequestClose={hideModal}
            hardwareAccelerated={true}
            animationType={'fade'}
            transparent={true}
            visible={!!modalVisible}>

            <View style={styles.modal}>
                <TouchableOpacity onPress={hideModal} style={styles.closeBtn}>
                    <Ionicons size={width * 0.1} color={'#ECEEEE'} name={"ios-close"} />
                </TouchableOpacity>
                {
                    (educationalInfo[modalVisible] || []).map((paragraph, idx) => <Text style={styles.innerModalText} key={idx}>{paragraph}</Text>)
                }
            </View>
        </Modal>
    );
}

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({

    modal:  {
        backgroundColor: fountainBlue,
        width: width * 0.8,
        minHeight: height * 0.45,
        maxHeight: height * 0.7,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: width * 0.1,
        marginTop: height * 0.15,
        elevation: 4,
        padding: 10,
        paddingTop: 0,
        shadowColor: '#333',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.5,
        overflow: 'visible'
    },
    innerModalText: {
        color: 'white',
        fontSize: width * 0.04,
        marginTop: height * 0.02,
        textAlign: 'center'
    },
    closeBtn:{
        padding: 6,
        paddingLeft: 20,
        position: 'absolute',
        top: width * 0.01,
        right: width * 0.01,
    },
});