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
import {fountainBlue, lightGrey, shuttleGrey} from "../colors";
import PropTypes from 'prop-types';
import { withRouter} from 'react-router-native';

const messages = {
    '/maintabscreen/rewardsfeed': {
        main: '- no reward info -',
        img: require('../../assets/images/parentpanda_rewarding_baby.png'),
        sub: 'Use the button at the top right to add rewards for chores'
    },
    '/maintabscreen/choreboard': {
        main: '- no child info -',
        img: require('../../assets/images/babypanda_frustrated.png'),
        sub: 'Create children by tapping the top left button'
    },
    '/maintabscreen/kreditdashboard': {
        main: '- no child info -',
        sub: 'Create children by tapping the top left button'
    },
    '/maintabscreen/alerts': {
        main: 'no alerts',
        sub: ''
    },
    'chores': {
        main: '- no chores yet -',
        img: require('../../assets/images/babypanda_atchoreboard.png'),
        sub: 'Tap the top right button in order to create chores for your children to see in their choreboard'
    },
    '/maintabscreen/kid/choreboard': {
        main: 'You Have No Chores!',
        img: require('../../assets/images/babypanda_atchoreboard.png'),
        sub: 'Ask your parent to sign back into the app, create some chores for you, and make sure they are assigned to you.'
    },
    '/maintabscreen/kid/rewardsfeed': {
        main: 'No Rewards to Redeem!',
        img: require('../../assets/images/onboarding/screen4_kid_with_money.png'),
        sub: 'Ask your parent to sign back into the app, create some rewards, and make sure they are available for you to redeem.'
    },
};

const getMainMessage = (path, type) => {
    if (typeof type !== 'undefined')
        return messages[type].main;
    return messages[path] ? messages[path].main : '- nothing here -';
}
const getSubMessage = (path, type) => {
    if (typeof type !== 'undefined')
        return messages[type].sub;
    return (messages[path] && messages[path].sub) ? messages[path].sub : '';
}

const defaultImage = require('../../assets/images/winking-emote.png');
const getImage = (path, type) => {
    if (typeof type !== 'undefined')
        return messages[type].img;
    return (messages[path] && messages[path].img) ? messages[path].img : defaultImage;
}

const EmptyState = ({loading, type, ...props}) => {
    const imgSrc = getImage(props.history.location.pathname, type);
    return (
        <FullPage style={styles.container}>
            {
                loading ?
                    <ActivityIndicator size="large" color={fountainBlue} /> :
                    <View style={[styles.imgContainer, imgSrc===defaultImage ? styles.whiteBg : {}]}>
                        <Image style={styles.img} source={imgSrc} />
                        <Text style={[styles.label, imgSrc===defaultImage ? styles.greyText : {}]}>
                            {getMainMessage(props.history.location.pathname, type)}
                        </Text>
                        <Text style={[styles.label, styles.smaller, imgSrc===defaultImage ? styles.greyText : {}]}>
                            {getSubMessage(props.history.location.pathname, type)}
                        </Text>
                    </View>
            }
        </FullPage>
    );
}

EmptyState.propTypes = {
    loading: PropTypes.bool.isRequired
};

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgContainer: {
        padding: width * 0.03,
        borderRadius: 15,
        backgroundColor: shuttleGrey,
        overflow: 'hidden',
        width: width * 0.9,
        maxWidth: 600,
        minHeight: width * 0.9,
        maxHeight: 600,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: height * 0.1
    },
    whiteBg: {
        backgroundColor: "white"
    },
    img: {
        width: width * 0.65,
        height: width * 0.65,
        maxWidth: 256,
        maxHeight: 256,
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    label: {
        color: 'white',
        alignSelf: 'stretch',
        textAlign: 'center',
        fontSize: width * 0.06,
        marginTop: height * 0.02,
        marginHorizontal: width * 0.03
    },
    smaller: {
        fontSize: width * 0.035,
        marginTop: height * 0.02
    },
    greyText: {
        color: lightGrey
    }
});

export default withRouter(EmptyState);