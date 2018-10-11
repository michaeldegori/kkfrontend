import React from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native';
import {SimpleLineIcons} from 'react-native-vector-icons';
import userRepository from "../stores/UserDataStore";
import {lightGrey} from "../colors";

const LogoutButton = ({history, ...props}) => (
    <TouchableOpacity style={styles.container} onPress={() => userRepository.logOut(history)}>
        <SimpleLineIcons name="logout" style={styles.icon} />
    </TouchableOpacity>
);


const{width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    icon: {
        fontSize: width * 0.07,
        color: lightGrey,
        marginRight: width * 0.02
    }
});

export default LogoutButton;