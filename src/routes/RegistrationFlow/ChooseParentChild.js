import React from "react";
import {
    TextInput,
    View,
    Image, StyleSheet, Dimensions,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import {Link} from "react-router-native";
import FullPage from "../../common/FullPage";
import Header from "../../common/Header";
import Text from '../../common/KKText';
import {fountainBlue, shuttleGrey} from "../../colors";
import {globalFontFamilyBold} from "../../configuration";
import {loginWithAuth0} from "../../services/Authorization";


const {width, height} = Dimensions.get("window");
const ChooseParentChild = () => (
    <FullPage>
        <Header/>
        <ScrollView contentContainerStyle={{alignSelf: 'stretch', justifyContent: 'center', flex: 1}}>
            <TouchableOpacity style={styles.card} onPress={() => loginWithAuth0('signUp')}>
                <View style={styles.cardSlice}>
                    <Image source={require('../../../assets/images/reg_icon_parent.png')} style={styles.cardIcon}/>
                </View>
                <View style={styles.cardSlice}>
                    <Text style={styles.cardTitle}>Parent</Text>
                    <Text style={styles.cardSubtitle}>Register as Parent</Text>
                </View>
            </TouchableOpacity>
            <Link to="/childregistrationmessage" component={TouchableOpacity} style={[styles.card, {backgroundColor: shuttleGrey}]}>
                <View style={styles.cardSlice}>
                    <Image source={require('../../../assets/images/reg_icon_child.png')} style={styles.cardIcon}/>
                </View>
                <View style={styles.cardSlice}>
                    <Text style={styles.cardTitle}>Child</Text>
                    <Text style={styles.cardSubtitle}>Continue using the app as a child</Text>
                </View>
            </Link>
        </ScrollView>
    </FullPage>
);

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        margin: width * 0.05,
        borderRadius: 15,
        backgroundColor: fountainBlue,
        paddingHorizontal: width * 0.05,
        alignSelf: 'stretch'
    },
    cardSlice: {
        alignSelf: 'stretch',
        backgroundColor: 'transparent'
    },
    cardIcon: {
        width: (181/640) * width,
        height: width / 640 * 207,
        alignSelf: 'flex-end',
        resizeMode: 'contain'
    },
    cardTitle: {
        fontFamily: globalFontFamilyBold,
        fontSize: width * 0.125,
        lineHeight: width * 0.14,
        color: 'white'
    },
    cardSubtitle: {
        color: 'white',
        position: 'relative',
        bottom: 10
    }
});

export default ChooseParentChild;

