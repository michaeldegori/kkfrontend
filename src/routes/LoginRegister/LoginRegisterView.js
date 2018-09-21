import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ImageBackground,
    Image
} from 'react-native';
import {Link} from 'react-router-native';
// import {observer} from 'mobx-react';
import FullPage from "../../common/FullPage";
import KKButton from "../../common/KKButton";

const {width, height} = Dimensions.get("window");
const LoginRegisterView = (props) => (
    <FullPage>
        {console.log("LoginRegisterView props ",props)}
        <ImageBackground
            height={height}
            width={width}
            style={{width:width, height, flex:1, alignSelf: 'stretch'}}
            resizeMode={"cover"}
            opacity={0.25}
            source={require("../../../assets/images/children-cute-excited-225017.jpg")}>
            <View style={styles.logoContainer}>
                <Image
                    style={{width: width * 0.75}}
                    source={require("../../../assets/images/kk-combo.png")} />
            </View>
            <View style={styles.buttonContainer}>
                <KKButton type="primary" to="login">Login</KKButton>
                <KKButton type="secondary">Register</KKButton>
            </View>
        </ImageBackground>
    </FullPage>
);

const styles = StyleSheet.create({
    logoContainer: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        height: height * 0.25,
        alignSelf: 'stretch',
        alignItems: 'center'
    }
});

export default LoginRegisterView;