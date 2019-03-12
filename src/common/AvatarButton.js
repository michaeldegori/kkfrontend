import React from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Image
} from 'react-native';
import {observer} from "mobx-react";
import userRepository from "../stores/UserDataStore";
import {Link} from 'react-router-native';
import familyUnitRepository from "../stores/FamilyUnitDataStore";

export const images = [
    require("../../assets/images/avatar_cheetah.png"),
    require("../../assets/images/avatar_dog.png"),
    require("../../assets/images/avatar_fox.png"),
    require("../../assets/images/avatar_giraffe.png"),
    require("../../assets/images/avatar_lion.png"),
    require("../../assets/images/avatar_orca.png"),
    require("../../assets/images/avatar_porcupine.png"),
    require("../../assets/images/avatar_polar-bear.png"),
    require("../../assets/images/avatar_racoon.png"),
    require("../../assets/images/avatar_tiger.png"),
    require("../../assets/images/avatar_walrus.png"),
    require("../../assets/images/avatar_zebra.png"),
];
export const imageNames = ["cheetah","dog", "fox", "giraffe", "lion", "orca", "porcupine", "polar-bear", "racoon", "tiger", "walrus", "zebra"];


const AvatarButton = (props) => {
    const {avatar, BROWSING_MODE} = userRepository;
    let path = "/maintabscreen/accountmanager";

    let imgSource;
    if (!avatar) imgSource = require('../../assets/images/add_child_icon.png');
    else if (typeof avatar === 'string' && BROWSING_MODE === 'parent') {
        imgSource = {uri: avatar};
    }
    else if (BROWSING_MODE.indexOf("child") !== -1){
        path = "/maintabscreen/kid/accountmanager";

        const childId = BROWSING_MODE.split('-')[1];
        const child = familyUnitRepository.kidsList.find(kid => kid._id === childId);

        imgSource = (typeof child.gender === 'string' && child.gender[0].toLowerCase() === 'm') ?
            require('../../assets/images/add_child_icon.png') :
            require('../../assets/images/add_child_icon_female.png');

        if (child.avatar && imageNames.find(img => img === child.avatar) !== -1) {
            imgSource = images[imageNames.findIndex(img => img === child.avatar)];
        }

    }

    return (
        <Link to={path}>
            <Image source={imgSource} style={styles.img} />
        </Link>
    );
}


const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    img: {
        width: width * 0.085,
        height: width * 0.085,
        marginLeft: width * 0.025,
        borderRadius: width * 0.025,
        // alignSelf: 'flex-start'
    }
});

export default observer(AvatarButton);