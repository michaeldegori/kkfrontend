import React, {Component} from 'react';
import {
    Image,
    Dimensions,
    StyleSheet,
    Alert,
    TouchableOpacity,
    ScrollView,
    View
} from 'react-native';
import FullPage from "../../common/FullPage";
import Header from "../../common/Header";
import Row from "../../common/Row";
import KKText from "../../common/KKText";
import {shuttleGrey} from "../../colors";
import userRepository from "../../stores/UserDataStore";
import familyUnitRepository from "../../stores/FamilyUnitDataStore";
import KKButton from "../../common/KKButton";
import {scaleRatio} from "../../configuration";

import {images, imageNames} from "../../common/AvatarButton";



export default class ChooseAvatar extends Component{
    selectAvatar = async (imgIndex) => {
        const kidId = userRepository.BROWSING_MODE.split("-")[1];
        const avatarImgName = imageNames[imgIndex];
        const updateResult = await familyUnitRepository.updateChildSettings(kidId, {avatar: avatarImgName}, userRepository.idToken);

        if (!updateResult) {
            Alert.Alert("Server Error", "Something went wrong selecting your new avatar. Please try again later");
            return;
        }
        Alert.alert("Success!", "Child avatar updated");
    }
    dismissScreen = () => {
        //"/maintabscreen/kid/choreboard"
        const kidId = userRepository.BROWSING_MODE.split("-")[1];
        const child = familyUnitRepository.kidsList.find(cK => cK._id === kidId);
        if (!child.avatar) {
            Alert.alert("Please Selct an Avatar", "You must select an avatar to continue");
            return;
        }
        this.props.history.push("/maintabscreen/kid/choreboard");
    }
    render(){
        const kidId = userRepository.BROWSING_MODE.split("-")[1];
        const child = familyUnitRepository.kidsList.find(cK => cK._id === kidId);
        return (
            <FullPage>
                <ScrollView contentContainerStyle={{alignSelf: 'stretch', flex:1}}>
                    <Header/>
                    <KKText style={styles.title}>{child.name}, Choose your Avatar</KKText>
                    <View style={{flex:1, alignSelf: 'stretch'}}>
                        {
                            [0,1,2,3].map(idx =>
                                <Row style={styles.imgRow} key={idx}>
                                    <TouchableOpacity onPress={() => this.selectAvatar(3*idx)}>
                                        <Image source={images[3*idx]} style={styles.avatar} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.selectAvatar(3*idx+1)}>
                                        <Image source={images[3*idx+1]} style={styles.avatar} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.selectAvatar(3*idx+2)}>
                                        <Image source={images[3*idx+2]} style={styles.avatar} />
                                    </TouchableOpacity>
                                </Row>
                            )
                        }
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "center"}}>
                        <KKButton type={"primary"} onPress={this.dismissScreen}>Done</KKButton>
                    </View>
                </ScrollView>
            </FullPage>
        )
    }
}

const {width, height} = Dimensions.get("window");
const styles = StyleSheet.create({
    title: {
        color: shuttleGrey,
        fontSize: 18 * scaleRatio,
        alignSelf: 'center',
        textAlign: 'center'
    },
    imgRow: {
        justifyContent: "space-around",
        alignItems: 'center',
        margin:0,
        flex: 1
    },
    avatar: {
        width: width * 128/640,
        height: width * 128/640,
        margin: width * 0.02
    },
});