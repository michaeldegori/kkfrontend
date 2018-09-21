import React from 'react';
import {
    Dimensions,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import {Link} from 'react-router-native';
import {fountainBlue, shuttleGrey} from "../colors";
import Text from './KKText';

const Touchable = ({to, style, children}) =>
    typeof to === 'undefined' ?
        <TouchableOpacity style={style}>{children}</TouchableOpacity> :
        <Link style={style} to={to}>{children}</Link>

const KKButton = ({children, style, type, to}) => (
    <Touchable style={[styles.mainContainer, style, styles[type]]} to={to}>
        <Text style={styles.label} semiBold={true} bold={false}>
            {children.toUpperCase()}
        </Text>
    </Touchable>
);

KKButton.propTypes = {
    children: PropTypes.any.isRequired,
    style: PropTypes.string,
    type: PropTypes.string.isRequired
};

const {width, height} = Dimensions.get("window");
const styles = StyleSheet.create({
    mainContainer: {
        paddingVertical: height * 0.02,
        width:  width * 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: height * 0.02,
        borderRadius: 8
    },
    label: {
        color: 'white',
        letterSpacing: 5
    },
    primary: {
        backgroundColor: fountainBlue
    },
    secondary: {
        backgroundColor: shuttleGrey
    }
});

export default KKButton;