import React from 'react';
import {
    View,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native';
import Text from './KKText';
import {shuttleGreyDark} from "../colors";
import {images, imageNames} from "./AvatarButton";

const KidAvatar = ({name, gender, avatar}) => {
    let source = (typeof gender === 'string' && gender[0].toLowerCase() === 'm') ?
        require('../../assets/images/add_child_icon.png') :
        require('../../assets/images/add_child_icon_female.png');

    if (avatar && imageNames.find(img => img === avatar) !== -1){
        source = images[imageNames.findIndex(img => img === avatar)];
    }
    return (
        <View style={{maxWidth: Math.min(width * 0.25, 120), alignItems: 'center'}}>
            <Image source={source} style={styles.img} />
            <Text style={styles.label}>{name}</Text>
        </View>
    );
}

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    img: {
        width: width * 0.174,
        height:  width * 0.174,
        borderRadius: width * 0.174/2
    },
    label: {
        color: shuttleGreyDark,
        alignSelf: 'stretch',
        textAlign: 'center'
    }
});

export default KidAvatar;