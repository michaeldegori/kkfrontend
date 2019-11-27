import React from 'react';
import {Dimensions, Modal, StyleSheet, TouchableOpacity, View, Image} from "react-native";
import Text from "./KKText";
import {black, fountainBlue, shuttleGrey} from "../colors";
import {Ionicons} from 'react-native-vector-icons';
import {scaleRatio} from "../configuration";

/**
 *
 * @param hideModal: function to hide modal
 * @param educationalInfo: Object where the key is the kind of modal and the value is a string[] for title and subtitle
 *              example at end of file
 * @param modalVisible: string saying which of the keys in educationalInfo is shown
 * @returns JSX element
 */
export default function EducationalModal({hideModal, educationalInfo, modalVisible}) {
    return (
        <Modal
            onRequestClose={hideModal}
            hardwareAccelerated={true}
            animationType={'fade'}
            transparent={true}
            visible={!!modalVisible}>
            <View style={styles.modalBgOverlay}/>
            <View style={styles.modal}>
                <View style={styles.closeBtnStrip}>
                    <TouchableOpacity onPress={hideModal} style={styles.closeBtn}>
                        <Ionicons size={width * 0.1} color={'#ECEEEE'} name={"ios-close"} />
                    </TouchableOpacity>
                </View>
                <Text semiBold={true} style={styles.titleText}>
                    {
                        (educationalInfo[modalVisible] || [""])[0]
                    }
                </Text>
                {
                    (educationalInfo[modalVisible] || [""])
                        .slice(1)
                        .map((paragraph, idx) => <Text style={styles.innerModalText} key={idx}>{paragraph}</Text>)
                }
                {
                    renderImage(modalVisible)
                }
            </View>
        </Modal>
    );
}

function renderImage(modalVisible) {
    switch (modalVisible) {
        case 'accountAge':
            return <Image source={require('../../assets/images/onboarding/screen1_panda_w_book.png')} style={styles.img} />;
        case 'creditInquiries':
            return <Image source={require('../../assets/images/parentpanda_rewarding_baby.png')} style={styles.img} />;
        case 'derogatoryMarks':
            return <Image source={require('../../assets/images/babypanda_frustrated.png')} style={styles.img} />;
        case 'numAccounts':
            return <Image source={require('../../assets/images/babypanda_atchoreboard.png')} style={styles.img} />;
        case 'paymentHistory':
            return <Image source={require('../../assets/images/onboarding/postreg_screen1.png')} style={styles.img} />;
        case 'utilization':
            return <Image source={require('../../assets/images/onboarding/screen4_kid_with_money.png')} style={styles.img} />;
        default:
            return undefined;
    }
}

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    modalBgOverlay: {
        width,
        height,
        position: 'absolute',
        alignItems: 'center',
        backgroundColor: black,
        opacity: 0.3
    },
    modal:  {
        backgroundColor: shuttleGrey,
        width: width * 0.8,
        minHeight: height * 0.45,
        maxHeight: height * 0.7,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: width * 0.1,
        marginTop: height * 0.15,
        elevation: 4,
        padding: width * 0.04,
        paddingTop: 0,
        shadowColor: '#333',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.5,
        borderRadius: 20
    },
    titleText: {
        fontSize: 17 * scaleRatio,
        marginBottom: height * 0.01,
        color: 'white',
    },
    innerModalText: {
        color: 'white',
        fontSize: 14.4 * scaleRatio,
        marginTop: height * 0.02,
        textAlign: 'center'
    },
    closeBtnStrip: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    closeBtn:{
        padding: 6,
    },
    img: {
        width: width * 0.33,
        resizeMode: 'contain',
        height: width * 0.33,
        marginTop: height * 0.025
    }
});

/*
 {
  "accountAge": Array [
    "Average Age of Chores",
    "Keep at it! The longer you do one specific chore, the better it is for your score!",
  ],
  "creditInquiries": Array [
    "Rewards Requests",
    "Do chores, get rewards! Don’t ask Mom and Dad for too much stuff though, as it will hurt your score for asking too much!",
  ],
  "derogatoryMarks": Array [
    "Punishments",
    "Let’s just stay out of trouble, ok! If you can do this we never have to worry about punishments :)",
  ],
  "numAccounts": Array [
    "Total Chores",
    "How many can you handle? The more chores that you do, the better off your score will be!",
  ],
  "paymentHistory": Array [
    "Chore History",
    "Do your chores on time! The more you do them on time, the better your score!",
  ],
  "utilization": Array [
    "Rewards Redemptions",
    "Look at that balance! Don’t spend all of it though, because if you don’t save some for a rainy day it will hurt your score.",
  ],
}
 */