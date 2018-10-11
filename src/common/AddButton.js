import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions
} from 'react-native';
import {fountainBlue} from "../colors";
import {MaterialCommunityIcons} from 'react-native-vector-icons';
import {Link} from "react-router-native";


const AddButton = ({route}) => (
    <Link to={route} style={styles.button}>
        <MaterialCommunityIcons name="plus" style={styles.plusIcon} />
    </Link>
);

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    button: {
        backgroundColor: fountainBlue,
        width: width * 0.085,
        height: width * 0.085,
        marginRight: width * 0.085,
        borderRadius: width * 0.085,
        justifyContent: 'center',
        alignItems: 'center'
    },
    plusIcon: {
        color: 'white',
        fontSize: width * 0.05
    }
});

export default AddButton;