import React from 'react';
import {
    Image,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import FullPage from "./FullPage";
import Text from "./KKText";
import {fountainBlue, lightGrey} from "../colors";
import PropTypes from 'prop-types';

const EmptyState = ({loading}) => (
    <FullPage style={styles.container}>
        {
            loading ?
                <ActivityIndicator size="large" color={fountainBlue} /> :
                <Image style={styles.img} source={require('../../assets/images/winking-emote.png')}/>
        }
    </FullPage>
);

EmptyState.propTypes = {
    loading: PropTypes.bool.isRequired
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: 256,
        height: 256
    }
});

export default EmptyState;