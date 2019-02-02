import React, {Fragment} from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    ImageBackground,
    Modal, ScrollView, KeyboardAvoidingView,
    Picker,
    Platform, TouchableOpacity
} from 'react-native';
import {Ionicons} from 'react-native-vector-icons';

import KKButton from "../../common/KKButton";
import KKTextInput from "../../common/KKTextInput";
import Text from "../../common/KKText";
import {MaterialCommunityIcons} from 'react-native-vector-icons';
import {fountainBlue, lightGrey, shuttleGrey, shuttleGreyDark} from "../../colors";
import KidAvatar from "../../common/KidAvatar";
import Row from "../../common/Row";
import FullPageWithModal from "../../common/FullPageWithModal";
import Header from "../../common/Header";
let pkg = require('../../../app');

const {width, height} = Dimensions.get("window");


const renderModalContents = (modalText, modalAccept, modalDeny) => () => (
    <Fragment>
        <Text style={{color: shuttleGreyDark, textAlign: 'center', marginBottom: height * 0.05}}>{modalText}</Text>
        <View style={{alignSelf: 'stretch', alignItems: 'center', marginBottom: height * 0.03}}>
            <TouchableOpacity style={[styles.modalBtn, {borderColor: fountainBlue}]} onPress={modalAccept}>
                <Ionicons style={{marginHorizontal: width * 0.02}} size={width * 0.1} color={fountainBlue}
                          name={"ios-checkmark-circle-outline"}/>
                <Text style={{color: fountainBlue, marginLeft: 8, flex: 1}}>Add another child</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalBtn, {borderColor: shuttleGrey}]} onPress={modalDeny}>
                <Ionicons style={{marginHorizontal: width * 0.02}} size={width * 0.1} color={shuttleGrey}
                          name={"ios-arrow-dropleft"}/>
                <Text style={{color: shuttleGrey, marginLeft: 8, flex: 1}}>Back to Dashboard</Text>
            </TouchableOpacity>
        </View>
    </Fragment>
);

const AddChildView = ({
    firstName = "",
    dobM = "",
    dobD = "",
    dobY = "",
    gender = "",
    onChangeText,
    onAddChild,
    onDeleteChild,
    kidsList = [],
    modalVisible,
    modalText,
    modalClose,
    modalAccept,
    modalDeny
}) => (
    <FullPageWithModal
        modalVisible={modalVisible}
        renderModalContents={renderModalContents(modalText, modalAccept, modalDeny)}
        modalClose={modalClose}
    >
        <KeyboardAvoidingView behavior={Platform.OS === 'android' ? null : 'padding'}>

            <ScrollView>
                <ImageBackground
                    height={height}
                    width={width}
                    style={{width: width, height, flex: 1, alignSelf: 'stretch'}}
                    resizeMode={"cover"}
                    source={require("../../../assets/images/child_bg.jpg")}>
                    <Header />
                    <View style={styles.logoContainer}>
                        {/*<Image*/}
                            {/*style={{width: width * 0.4, resizeMode: 'contain'}}*/}
                            {/*source={require("../../../assets/images/kk-letters.png")}/>*/}
                        <View style={styles.kidRow}>
                            {
                                kidsList.map(kid => (
                                    <TouchableOpacity key={kid._id} onLongPress={() => onDeleteChild(kid)}>
                                        <KidAvatar {...kid} />
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                    </View>
                    <View style={styles.inputAndButtons}>
                        <KKTextInput
                            value={firstName}
                            onChangeText={(newVal) => onChangeText('firstName', newVal)}
                            placeholder={'First Name'}
                            style={styles.input}/>

                        <Row style={{paddingRight: width * 0.06}}>
                            <View style={styles.dobLabelContainer}>
                                <Text style={styles.dobLabel}>DOB</Text>
                                {Platform.OS === 'ios' && <Text style={styles.dobLabel}>(m/d/y)</Text>}
                            </View>
                            <Picker style={[styles.picker, styles[`picker${Platform.OS}`]]} selectedValue={dobM}
                                    onValueChange={v => onChangeText('dobM', v)}
                                    itemStyle={[styles.pickerItem, Platform.OS === 'ios' ? styles.pickerItemIOSStyle : {}]}>
                                {Platform.OS !== 'ios' && <Picker.Item label="MM" enabled={false} value=""/>}
                                {
                                    Array(12).fill('').map((_, i) => <Picker.Item label={"" + (i + 1)}
                                                                                  value={"" + (i + 1)} key={i}/>)
                                }
                            </Picker>
                            <Picker style={[styles.picker, styles[`picker${Platform.OS}`]]} selectedValue={dobD}
                                    onValueChange={v => onChangeText('dobD', v)}
                                    itemStyle={[styles.pickerItem, Platform.OS === 'ios' ? styles.pickerItemIOSStyle : {}]}>
                                {Platform.OS !== 'ios' && <Picker.Item label="DD" enabled={false} value=""/>}
                                {
                                    Array(31).fill('').map((_, i) => <Picker.Item label={"" + (i + 1)}
                                                                                  value={"" + (i + 1)} key={i}/>)
                                }
                            </Picker>
                            <Picker style={[styles.picker, styles[`picker${Platform.OS}`]]} selectedValue={dobY}
                                    onValueChange={v => onChangeText('dobY', v)}
                                    itemStyle={[styles.pickerItem, Platform.OS === 'ios' ? styles.pickerItemIOSStyle : {}]}>
                                {Platform.OS !== 'ios' && <Picker.Item label="YY" enabled={false} value=""/>}
                                {
                                    Array(14).fill('').map((_, i) => <Picker.Item
                                        label={'' + (new Date().getFullYear() - i)}
                                        value={'' + (new Date().getFullYear() - i)} key={i}/>)
                                }
                            </Picker>
                        </Row>

                        <View style={styles.genderContainer}>
                            <Text style={styles.genderLabel}>Gender</Text>
                            <Text
                                onPress={() => onChangeText('gender', 'm')}
                                style={[styles.genderButton, gender == "m" && styles.genderButtonActive]}>
                                Male
                            </Text>
                            <Text
                                onPress={() => onChangeText('gender', 'f')}
                                style={[styles.genderButton, gender == "f" && styles.genderButtonActive]}>
                                Female
                            </Text>
                        </View>
                        <KKButton type="primary" onPress={onAddChild}>ADD CHILD</KKButton>
                        <KKButton type="secondary" to="/maintabscreen/accountmanager">QUIT</KKButton>
                    </View>
                    <Modal
                        visible={modalVisible}
                        transparent={true}
                        animationType="fade"
                        style={{flex: 1, alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center'}}
                        onRequestClose={() => ""}
                    >
                        <View style={styles.modal}>
                            <Text style={{color: shuttleGreyDark}}>Success</Text>
                        </View>
                    </Modal>
                    <Text style={styles.versionLabel}>v {(pkg.expo||{}).version}</Text>
                </ImageBackground>
            </ScrollView>
        </KeyboardAvoidingView>

    </FullPageWithModal>
);

const styles = StyleSheet.create({
    versionLabel: {
        position: 'absolute',
        left: 5,
        bottom: 5,
        color: lightGrey,
        fontSize: 8
    },
    logoContainer: {
        alignSelf: 'stretch',
        padding: width * 0.02,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputAndButtons: {
        alignSelf: 'stretch',
        alignItems: 'center',
        flex: 1,
    },
    input: {
        marginHorizontal: width * 0.08,
        marginVertical: height * 0.01
    },
    kidRow: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    kidIcon: {
        width: width * 0.174,
        height: width * 0.174,
        justifyContent: 'center',
        alignItems: 'center',
    },
    plusIcon: {
        color: 'white',
        fontSize: width * 0.174,
    },
    dobLabelContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    dobLabel: {
        color: shuttleGrey
    },
    genderContainer: {
        marginBottom: height * 0.02,
        marginHorizontal: width * 0.05,
        flexDirection: 'row',
        alignItems: 'center'
    },
    genderLabel: {
        flex: 1,
        margin: width * 0.04,
        textAlign: 'center',
        color: shuttleGreyDark
    },
    genderButton: {
        flex: 1,
        margin: width * 0.04,
        backgroundColor: 'rgba(255,255,255,0.4)',
        color: lightGrey,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: lightGrey,
        padding: height * 0.015,
        paddingTop: height * 0.02,
        textAlign: 'center',
        overflow: 'hidden'
    },
    genderButtonActive: {
        backgroundColor: fountainBlue,
        color: 'white',
        borderWidth: 0
    },
    modal: {
        backgroundColor: 'rgba(255,255,255,0.65)',
        width: width * 0.7,
        height: height * 0.3,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: width * 0.15,
        marginVertical: height * 0.25
    },
    picker: {
        flex: 1,
    },
    pickerItem: {
        color: shuttleGrey,
    },
    pickerItemIOSStyle: {
        fontSize: width * 0.035
    },
    pickerandroid: {
        backgroundColor: 'white',
        borderRadius: 8,
        height: Math.round(0.084 * height),
        color: shuttleGrey,
    },
    pickerios: {
        backgroundColor: 'rgba(255,255,255,0.4)',
    },
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

export default AddChildView;