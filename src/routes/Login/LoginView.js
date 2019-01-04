import React from "react";
import {
    TextInput,
    View,
    ImageBackground,
    Image, StyleSheet, Dimensions,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import KKButton from "../../common/KKButton";
import KKTextInput from "../../common/KKTextInput";
import Header from "../../common/Header";

const {width, height} = Dimensions.get("window");
const LoginView = ({loginWithAuth0, handleTextInput, username, password,  ...props}) => (
    <KeyboardAvoidingView style={{flex: 1, alignSelf: 'stretch'}} behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ImageBackground
            height={height}
            width={width}
            style={styles.mainContainer}
            resizeMode={"cover"}
            source={require("../../../assets/images/child_bg.jpg")}>
            <Header/>
            <Image
                style={{width: width * 0.35, height: width * 0.35}}
                source={require("../../../assets/images/kk-square.png")} />
            <View style={{alignSelf: 'stretch'}}>
                <KKTextInput placeholder={'Email'} style={styles.input} onChangeText={v => handleTextInput('username', v)} value={username}/>
                <KKTextInput placeholder={'Password'} style={styles.input} onChangeText={v => handleTextInput('password', v)} secureTextEntry={true} value={password}/>
                <View style={styles.buttonContainer}>
                    <KKButton type="primary" onPress={() => loginWithAuth0(username, password)}>Login</KKButton>
                </View>
            </View>
        </ImageBackground>
    </KeyboardAvoidingView>
);

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {
        marginHorizontal: width * 0.08,
        marginVertical: height * 0.01
    },
    buttonContainer: {
        alignSelf: 'stretch',
        alignItems: 'center',
        marginBottom: height * 0.1,
        marginTop: height * 0.1
    }
});

export default LoginView;

