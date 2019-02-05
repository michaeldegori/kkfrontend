import React from "react";
import {
    Dimensions,
    StyleSheet,
    Image,
    View,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import FullPage from "../../common/FullPage";
import {fountainBlue} from "../../colors";
import Text from "../../common/KKText";
import {Link} from "react-router-native";


export default function BaseOnboardingView({nextRoute='/maintabscreen/kid/choreboard', title="Title", image=null, description="desc", btnLabel="NEXT", onNext}){
    return (
        <FullPage style={{backgroundColor: fountainBlue}}>
            <ScrollView style={{flex: 1}} contentContainerStyle={{justifyContent: 'space-around', alignItems: 'center', flex:1}}>
                <Text style={styles.title}>{title}</Text>
                <Image source={image || require('../../../assets/images/confetti.jpg')} style={styles.img} resizeMode={"contain"}/>
                <View style={styles.pContainer}>
                    <Text style={styles.p}>{description}</Text>
                </View>
                {
                    onNext ?
                        <TouchableOpacity style={styles.btn} onPress={onNext}>
                            <Text style={styles.btnLabel} semiBold={true}>{btnLabel}</Text>
                        </TouchableOpacity>
                        : <Link style={styles.btn} to={nextRoute} component={TouchableOpacity}>
                            <Text style={styles.btnLabel} semiBold={true}>{btnLabel}</Text>
                        </Link>
                }
            </ScrollView>
        </FullPage>
    );
}


const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    title: {
        fontSize: width * 0.08,
        color: 'white',
    },
    img: {
        width: width * 0.7,
        height: width * 0.7
    },
    pContainer:{
        alignSelf: 'stretch',
        alignItems: 'center'
    },
    p: {
        color: 'white',
        fontSize: width * 0.04,
        paddingHorizontal: width * 0.08,
        textAlign: 'center',
        lineHeight: width * 0.05
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

/**
 onboarding screens
 1- panda with book: KiddieKredit is a great way to make|chores fun for your kids while teaching|them the fundamentals of credit
    screen1
 2- parent with cup of coffee and phone alert - As your kid completes a chore, you|get to review and either approve|or deny their request
    screen4
 3- kid w phone - How well your children complete their chores|will determine their kredit score. The|higher their score, the more bamboo bucks t...
    screen8

 kid onboarding:
 kredit dashboard - screen9
 choreboard - screen6
 rewards - screen10


 parent onboarding:
 alerts screen4
 kredit dashboard  screen2-withkredit dashboard
 choreboard - screen3
 rewards - screen7


 */