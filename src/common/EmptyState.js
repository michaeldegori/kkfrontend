import React from 'react';
import {
    View,
    Dimensions,
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
                <Text style={styles.text}>- nothing here yet -</Text>
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
    text: {
        color: lightGrey
    }
});

export default EmptyState;