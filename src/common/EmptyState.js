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
import { withRouter} from 'react-router-native';

const messages = {
    '/maintabscreen/rewardsfeed': {
        main: '- no reward info -',
        sub: 'Use the button at the top right to add rewards for chores'
    },
    '/maintabscreen/choreboard': {
        main: '- no child info -',
        sub: 'Create children by tapping the top left button'
    },
    '/maintabscreen/kreditdashboard': {
        main: '- no child info -',
        sub: 'Create children by tapping the top left button'
    },
    '/maintabscreen/alerts': {
        main: 'no alerts',
        sub: ''
    }
};

const getMainMessage = path => messages[path] ? messages[path].main : '- nothing here -';
const getSubMessage = path => (messages[path] && messages[path].sub) ? messages[path].sub : '';

const EmptyState = ({loading, ...props}) => (
    <FullPage style={styles.container}>
        {console.log(props.history.location.pathname)}
        {
            loading ?
                <ActivityIndicator size="large" color={fountainBlue} /> :
                <View>
                    <Image style={styles.img} source={require('../../assets/images/winking-emote.png')}/>
                    <Text style={styles.label}>
                        {getMainMessage(props.history.location.pathname)}
                    </Text>
                    <Text style={[styles.label, styles.smaller]}>
                        {getSubMessage(props.history.location.pathname)}
                    </Text>
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
        maxHeight: 256,
        alignSelf: 'center'
    },
    label: {
        color: lightGrey,
        alignSelf: 'stretch',
        textAlign: 'center',
        fontSize: width * 0.07,
        marginTop: height * 0.04,
        marginHorizontal: width * 0.03
    },
    smaller: {
        fontSize: width * 0.04,
        marginTop: height * 0.02
    }
});

export default withRouter(EmptyState);