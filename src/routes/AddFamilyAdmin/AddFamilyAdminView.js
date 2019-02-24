import React, {Fragment} from 'react';
import {
    View,
    StyleSheet,
    Dimensions, TouchableOpacity
} from 'react-native';
import Text from "../../common/KKText";
import KKTextInput from "../../common/KKTextInput";
import FullPageWithModal from "../../common/FullPageWithModal";
import Header from "../../common/Header";
import {fountainBlue, shuttleGrey, shuttleGreyDark} from "../../colors";
import KKButton from "../../common/KKButton";
import {Ionicons} from 'react-native-vector-icons';
import {scaleRatio} from "../../configuration";


const {width, height} = Dimensions.get("window");
const renderModalContents = (modalText, modalAccept, modalDeny) => () => (
    <Fragment>
        <Text style={{color: shuttleGreyDark, textAlign: 'center', marginBottom: height * 0.05}}>{modalText}</Text>
        <View style={{alignSelf: 'stretch', alignItems: 'center', marginBottom: height * 0.03}}>
            <TouchableOpacity style={[styles.modalBtn, {borderColor: fountainBlue}]} onPress={modalAccept} >
                <Ionicons style={{marginHorizontal: width * 0.02}} size={width * 0.1} color={fountainBlue} name={"ios-checkmark-circle-outline"} />
                <Text style={{color: fountainBlue, marginLeft: 8, flex:1}}>Add Another Admin</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalBtn, {borderColor: shuttleGrey}]} onPress={modalDeny} >
                <Ionicons style={{marginHorizontal: width * 0.02}} size={width * 0.1} color={shuttleGrey} name={"ios-arrow-dropleft"} />
                <Text style={{color: shuttleGrey, marginLeft: 8, flex:1}}>Back to Account Manager</Text>
            </TouchableOpacity>
        </View>
    </Fragment>
);


const AddFamilyAdminView = ({
    submitAddAdmin,
    modalVisible,
    email,
    updateForm,
    closeModal,
    modalAccept,
    modalClose,
    modalDeny,
    ...props
}) => (
    <FullPageWithModal
        modalClose={modalClose}
        renderModalContents={renderModalContents("Admin added!", modalAccept, modalDeny)}
        modalVisible={modalVisible}
    >
        <Header/>
        <View style={{flex:1, alignSelf: 'stretch', alignItems: 'center', justifyContent: 'space-around'}}>
            <Text style={{color: fountainBlue,fontSize: 18 * scaleRatio, textAlign: 'center'}}>Add Family Admin</Text>
            <KKTextInput keyboardType={'email-address'} value={email} placeholder={"Enter email address of new admin"} onChangeText={updateForm} style={styles.input}/>
            <KKButton type={"primary"} onPress={submitAddAdmin}>Submit!</KKButton>
        </View>
    </FullPageWithModal>
);

const styles = StyleSheet.create({
    input: {
        borderRadius: 12,
        elevation: 6,
        shadowOpacity: 0.2,
        shadowColor: 'black',
        marginHorizontal: width * 0.08,
        marginVertical: height * 0.01,
        shadowOffset: {width:0, height: 3}
    },
    textLabel: {
        margin: width * 0.03,
        marginTop: width * 0.06,
        textAlign: 'center',
        color: shuttleGreyDark
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


export default AddFamilyAdminView;