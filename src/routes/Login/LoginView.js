import React from "react";
import {
    TextInput,
    View,
    ImageBackground,
    Image, StyleSheet, Dimensions,
    KeyboardAvoidingView
} from 'react-native';
import {Link} from "react-router-native";
import FullPage from "../../common/FullPage";
import KKButton from "../../common/KKButton";
import KKTextInput from "../../common/KKTextInput";

const {width, height} = Dimensions.get("window");
const LoginView = ({loginWithAuth0, ...props}) => (
    <KeyboardAvoidingView style={{flex: 1, alignSelf: 'stretch'}} behavior={'padding'}>
        <ImageBackground
            height={height}
            width={width}
            style={styles.mainContainer}
            resizeMode={"cover"}
            opacity={0.25}
            source={require("../../../assets/images/mother_and_child_bg.jpg")}>
            <Image
                style={{width: width * 0.75}}
                source={require("../../../assets/images/kk-combo.png")} />
            <KKTextInput placeholder={'Email'} style={styles.input}/>
            <KKTextInput placeholder={'Password'} style={styles.input} secureTextEntry={true}/>
            <View style={styles.buttonContainer}>
                <KKButton type="primary" onPress={loginWithAuth0}>Login</KKButton>
            </View>
        </ImageBackground>
    </KeyboardAvoidingView>
);

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        marginHorizontal: width * 0.08,
        marginVertical: height * 0.01
    }
});

export default LoginView;

