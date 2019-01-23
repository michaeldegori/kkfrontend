import React from 'react';
import {
    Dimensions,
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    View,
    Alert,
    Picker
} from "react-native";
import Text from "../../common/KKText";
import FullPage from "../../common/FullPage";
import Header from "../../common/Header";
import KKTextInput from "../../common/KKTextInput";
import KKButton from "../../common/KKButton";
import {shuttleGrey} from "../../colors";
import {registerWithAuth0} from "../../services/Authorization";

const {width, height} = Dimensions.get("window");
export default class RegistrationForm extends React.Component{
    state = {
        email: 'abc@kk.co',
        password: '123qwe',
        firstName: 'Vic',
        lastName: 'Moreno',
        parent_type: 'father'
    }
    registerWithAuh0 = async () => {
        const {email, password, firstName, lastName, parent_type} = this.state;
        if (!email) return Alert.alert('Please Fill All Fields', 'Email field is required');
        if (!password) return Alert.alert('Please Fill All Fields', 'Password field is required');
        if (!firstName) return Alert.alert('Please Fill All Fields', 'First Name field is required');
        if (!lastName) return Alert.alert('Please Fill All Fields', 'Last Name field is required');
        if (!parent_type) return Alert.alert('Please Fill All Fields', 'Parent Type field is required');
        const registrationResult = await registerWithAuth0(email, password, firstName, lastName, parent_type);
        if (registrationResult.error) {
            Alert.alert("Problem Registering", "There was a problem with your registration. Please try again later. \n "+registrationResult.serverResponse);
            return;
        }
        if (this.props.history) this.props.history.push("/maintabscreen/accountmanager");
    }
    render(){
        return (
            <KeyboardAvoidingView style={{flex: 1, alignSelf: 'stretch'}} >
                <ImageBackground
                    height={height}
                    width={width}
                    style={styles.mainContainer}
                    resizeMode={"cover"}
                    source={require("../../../assets/images/child_bg.jpg")}
                >
                    <Header />
                    <ScrollView style={{alignSelf: 'stretch', flex:1}}>
                        <Image
                            style={{width: width * 0.35, height: width * 0.35, alignSelf: 'center'}}
                            source={require("../../../assets/images/kk-square.png")} />
                        <KKTextInput placeholder={'Email'} style={styles.input} onChangeText={v => this.setState(()=> ({email: v}))} />
                        <KKTextInput placeholder={'Password'} style={styles.input} onChangeText={v => this.setState(()=> ({password: v}))} secureTextEntry={true} />
                        <KKTextInput placeholder={'First Name'} style={styles.input} onChangeText={v => this.setState(()=> ({firstName: v}))} />
                        <KKTextInput placeholder={'Last Name'} style={styles.input} onChangeText={v => this.setState(() => ({lastName: v}))} />

                        <Picker
                            selectedValue={this.state.parent_type}
                            onValueChange={parent_type=> this.setState(()=>({parent_type}))}
                            itemStyle={styles.pickerItem}
                            style={styles.picker}
                        >
                            <Picker.Item label="Select Parent Type" value="" />
                            <Picker.Item label="Mother" value="mother" />
                            <Picker.Item label="Father" value="father" />
                            <Picker.Item label="Male guardian" value="male_guardian" />
                            <Picker.Item label="Female guardian" value="female_guardian" />
                        </Picker>
                        <View style={styles.buttonContainer}>
                            <KKButton type="primary" onPress={this.registerWithAuh0}>Submit</KKButton>
                        </View>
                    </ScrollView>
                </ImageBackground>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        alignSelf: 'stretch',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    input: {
        marginHorizontal: width * 0.08,
        marginVertical: height * 0.01
    },
    buttonContainer: {
        alignSelf: 'stretch',
        alignItems: 'center',
        marginVertical: height * 0.1
    },
    picker: {
        backgroundColor: 'rgba(255,255,255,0.4)',
        marginHorizontal: width * 0.08,
        marginVertical: height * 0.01
    },
    pickerItem: {
        color: shuttleGrey
    }
});