import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions
} from 'react-native';
import Text from "../../common/KKText";
import KKTextInput from "../../common/KKTextInput";
import FullPageWithModal from "../../common/FullPageWithModal";
import Header from "../../common/Header";
import {fountainBlue} from "../../colors";
import KKButton from "../../common/KKButton";


const {width, height} = Dimensions.get("window");
const AddFamilyAdminView = ({
    submitAddAdmin,
    modalVisible,
    email,
    updateForm,
    ...props
}) => (
    <FullPageWithModal
        modalClose={()=>""}
        renderModalContents={()=>null}
        modalVisible={false}
    >
        <Header/>
        <View style={{flex:1, alignSelf: 'stretch', alignItems: 'center', justifyContent: 'space-around'}}>
            <Text style={{color: fountainBlue,fontSize: width * 0.05, textAlign: 'center'}}>Add Family Admin</Text>
            <KKTextInput keyboardType={'email-address'} value={email} placeholder={"Enter email address of new admin"} onChangeText={updateForm} style={styles.input}/>
            <KKButton type={"primary"} onPress={submitAddAdmin}>Submit!</KKButton>
        </View>
    </FullPageWithModal>
);

const styles = StyleSheet.create({
    input: {
        overflow: 'hidden',
        borderRadius: 12,
        elevation: 6,
        shadowOpacity: 0.2,
        shadowColor: 'black',
        marginHorizontal: width * 0.08,
        marginVertical: height * 0.01
    }
});


export default AddFamilyAdminView;