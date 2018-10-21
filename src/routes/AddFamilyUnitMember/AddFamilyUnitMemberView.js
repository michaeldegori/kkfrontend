import React from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    ImageBackground,
    Image,
    Modal
} from 'react-native';
// import {observer} from 'mobx-react';
import FullPage from "../../common/FullPage";
import {Link} from 'react-router-native';

import KKButton from "../../common/KKButton";
import KKTextInput from "../../common/KKTextInput";
import Text from "../../common/KKText";
import {MaterialCommunityIcons} from 'react-native-vector-icons';
import {fountainBlue, lightGrey, shuttleGreyDark} from "../../colors";
import KidAvatar from "../../common/KidAvatar";


const {width, height} = Dimensions.get("window");
const AddFamilyUnitMember = ({firstName="", dob="", gender="", onChangeText, onAddChild, modalVisible, kidsList=[]}) => (
    <FullPage>
        <ImageBackground
            height={height}
            width={width}
            style={{width:width, height, flex:1, alignSelf: 'stretch'}}
            resizeMode={"cover"}
            source={require("../../../assets/images/child_bg.jpg")}>
            <View style={styles.logoContainer}>
                <Image
                    style={{width: width * 0.4, resizeMode: 'contain'}}
                    source={require("../../../assets/images/kk-letters.png")} />
                <View style={styles.kidRow}>
                    {
                        kidsList.map(kid => (
                            <KidAvatar {...kid} key={kid._id} />
                        ))
                    }
                    <ImageBackground
                        style={styles.kidIcon}
                        source={require("../../../assets/images/add_child_icon.png")}>
                        {/*<Link to="/maintabscreen/accountmanager">*/}
                            <MaterialCommunityIcons name="plus" style={styles.plusIcon} />
                        {/*</Link>*/}
                    </ImageBackground>
                </View>
            </View>
            <View style={styles.inputAndButtons}>
                <KKTextInput
                    value={firstName}
                    onChangeText={(newVal) => onChangeText('firstName', newVal)}
                    placeholder={'First Name'}
                    style={styles.input}/>
                <KKTextInput
                    value={dob}
                    onChangeText={(newVal) => onChangeText('dob', newVal)}
                    placeholder={'DOB (mm-dd-yyyy)'}
                    style={styles.input}/>
                {/*<KKTextInput*/}
                    {/*value={gender}*/}
                    {/*onChangeText={(newVal) => onChangeText('gender', newVal)}*/}
                    {/*placeholder={'Gender'}*/}
                    {/*style={[styles.input, {marginBottom: height * 0.02}]}/>*/}
                <View style={styles.genderContainer}>
                    <Text style={styles.genderLabel}>Gender</Text>
                    <Text
                        onPress={() => onChangeText('gender', 'm')}
                        style={[styles.genderButton, gender == "m" && styles.genderButtonActive ]}>
                        Male
                    </Text>
                    <Text
                        onPress={() => onChangeText('gender', 'f')}
                        style={[styles.genderButton, gender == "f" && styles.genderButtonActive ]}>
                        Female
                    </Text>
                </View>
                <KKButton type="primary" to="/maintabscreen/accountmanager">QUIT</KKButton>
                <KKButton type="secondary" onPress={onAddChild}>ADD CHILD</KKButton>
            </View>
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                style={{flex:1, alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center'}}
                onRequestClose={() => ""}
            >
                <View style={styles.modal}>
                    <Text style={{color: shuttleGreyDark}}>Success</Text>
                </View>
            </Modal>
        </ImageBackground>
    </FullPage>
);

const styles = StyleSheet.create({
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
        height:  width * 0.174,
        justifyContent: 'center',
        alignItems: 'center'
    },
    plusIcon: {
        color: 'white',
        fontSize: width * 0.15,
    },
    genderContainer: {
        marginBottom: height * 0.02,
        marginHorizontal: width * 0.05,
        flexDirection: 'row',
        alignItems: 'center'
    },
    genderLabel: {
        flex:1,
        margin: width * 0.05,
        textAlign: 'center',
        color: shuttleGreyDark
    },
    genderButton: {
        flex:1,
        margin: width * 0.05,
        backgroundColor: 'rgba(255,255,255,0.4)',
        color: lightGrey,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: lightGrey,
        padding: height * 0.015,
        paddingTop: height * 0.02,
        textAlign: 'center'
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
    }
});

export default AddFamilyUnitMember;