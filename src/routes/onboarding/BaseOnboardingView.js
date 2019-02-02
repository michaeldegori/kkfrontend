import React from "react";
import {
    Dimensions,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import FullPage from "../../common/FullPage";
import {fountainBlue} from "../../colors";
import Text from "../../common/KKText";
import {Link} from "react-router-native";


export default function BaseOnboardingView({nextRoute='/maintabscreen/kid/choreboard', title="Title", image=null, description="desc", btnLabel="NEXT"}){
    return (
        <FullPage style={{backgroundColor: fountainBlue}}>
            <ScrollView style={{flex: 1}} contentContainerStyle={{justifyContent: 'space-around', alignItems: 'center', minHeight: height}}>
                <Text style={styles.title}>{title}</Text>
                <Image source={require('../../../assets/images/confetti.jpg')} style={styles.img}/>
                {
                    description.split('|').map((pg, idx) => <Text key={idx} style={styles.p}>{pg}</Text>)
                }
                <Link style={styles.btn} to={nextRoute} component={TouchableOpacity}>
                    <Text style={styles.btnLabel} semiBold={true}>{btnLabel}</Text>
                </Link>
            </ScrollView>
        </FullPage>
    );
}


const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    title: {
        fontSize: width * 0.08,
        color: 'white',
        fontWeight: 'bold'
    },
    img: {
        width: width * 0.8,
        height: width * 0.8
    },
    p: {
        color: 'white',
        fontSize: width * 0.04,
    },
    btn: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: width * 0.5,
        paddingVertical: width * 0.05,
        alignItems: 'center'
    },
    btnLabel: {
        color: fountainBlue,
        fontSize: width * 0.05,
        letterSpacing: 5
    }
});