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

const AvatarButton = (props) => {
    const {avatar, BROWSING_MODE} = userRepository;
    let path = "/maintabscreen/accountmanager";

    let imgSource;
    if (!avatar) imgSource = require('../../assets/images/add_child_icon.png');
    else if (typeof avatar === 'string' && BROWSING_MODE === 'parent') {
        imgSource = {uri: avatar};
    }
    else {
        path = "/maintabscreen/kid/accountmanager";
        const childId = BROWSING_MODE.split('-')[1];
        const child = familyUnitRepository.kidsList.find(kid => kid._id === childId);
        imgSource = (typeof child.gender === 'string' && child.gender[0].toLowerCase() === 'm') ?
            require('../../assets/images/add_child_icon.png') :
            require('../../assets/images/add_child_icon_female.png');
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