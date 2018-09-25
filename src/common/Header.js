import React from 'react';
import {
    View,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import {Ionicons} from 'react-native-vector-icons';
import {shuttleGrey} from "../colors";
import {withRouter} from 'react-router-native';

const {width, height} = Dimensions.get("window");

const Header = props => (
    <View style={styles.mainContainer}>
        <TouchableOpacity style={styles.sideContainer} onPress={props.history.goBack}>
            {console.log(props)}
            <BackArrow />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
            <Image source={require("../../assets/images/kk-letters.png")} style={styles.img}></Image>
        </View>
        <View style={styles.sideContainer}></View>
    </View>
);

const BackArrow = ({onPress}) => (
    <Ionicons name="ios-arrow-round-back" size={Math.round(width * 0.12)} color={shuttleGrey} />
);

const styles = StyleSheet.create({
    mainContainer: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        height: height * 0.1,
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sideContainer: {
        width: width * 0.1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: width * 0.5,
        height: (width * 0.4)/256 * 41
    }
})

export default withRouter(Header);