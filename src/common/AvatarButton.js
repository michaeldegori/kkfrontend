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

const AvatarButton = (props) => {
    const {avatar} = userRepository;

    let imgSource;
    if (!avatar) imgSource = require('../../assets/images/add_child_icon.png');
    else if (typeof avatar === 'string') imgSource = {uri: avatar};

    return (
        <Link to={props.path ? props.path : "/maintabscreen/accountmanager"}>
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