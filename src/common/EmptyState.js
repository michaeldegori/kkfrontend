import React from 'react';
import {
    Image,
    StyleSheet,
    ActivityIndicator,
    View,
    Dimensions
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
                <View>
                    <Image style={styles.img} source={require('../../assets/images/winking-emote.png')}/>
                    <Text style={styles.label}>- nothing here -</Text>
                </View>
        }
    </FullPage>
);

EmptyState.propTypes = {
    loading: PropTypes.bool.isRequired
};

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: width * 0.9,
        height: width * 0.9,
        maxWidth: 256,
        maxHeight: 256
    },
    label: {
        color: lightGrey,
        alignSelf: 'stretch',
        textAlign: 'center',
        fontSize: width * 0.07,
        marginTop: height * 0.07
    }
});

export default EmptyState;