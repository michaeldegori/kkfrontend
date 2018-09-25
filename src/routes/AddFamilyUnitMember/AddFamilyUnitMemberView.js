import React from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    ImageBackground,
    Image
} from 'react-native';
// import {observer} from 'mobx-react';
import FullPage from "../../common/FullPage";
import {Link} from 'react-router-native';

import KKButton from "../../common/KKButton";
import KKTextInput from "../../common/KKTextInput";
import {MaterialCommunityIcons} from 'react-native-vector-icons';
import {fountainBlue} from "../../colors";

const {width, height} = Dimensions.get("window");
const AddFamilyUnitMember = ({firstName="", dob="", gender="", onChangeText}) => (
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
                    placeholder={'DOB'}
                    style={styles.input}/>
                <KKTextInput
                    value={gender}
                    onChangeText={(newVal) => onChangeText('gender', newVal)}
                    placeholder={'Gender'}
                    style={[styles.input, {marginBottom: height * 0.02}]}/>
                <KKButton type="primary" onPress={()=>console.log("Finish add child")}>FINISH</KKButton>
                <KKButton type="secondary" onPress={()=>console.log("Add child and clear")}>+ CHILD</KKButton>
            </View>
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
        width: width * 0.234,
        // resizeMode: 'contain',
        height:  width * 0.234,
        justifyContent: 'center',
        alignItems: 'center'
    },
    plusIcon: {
        color: 'white',
        fontSize: width * 0.15,
    }
});

export default AddFamilyUnitMember;