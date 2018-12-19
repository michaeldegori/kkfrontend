import React from 'react';
import {
    TouchableOpacity,
    Dimensions,
    Alert
} from 'react-native';
import {lightGrey} from "../../colors";
import {Ionicons} from 'react-native-vector-icons';
import alertsRepository from "../../stores/AlertsStore";
import userRepository from "../../stores/UserDataStore";
import familyUnitRepository from "../../stores/FamilyUnitDataStore";

function deleteAlerts(){
    alertsRepository.deleteAlerts(userRepository.idToken, familyUnitRepository.unitId);
    Alert.alert("Success", "All alerts were deleted");
}


const{width} = Dimensions.get('window');
const DeleteAlertsButton = () => (
    <TouchableOpacity onPress={deleteAlerts}>
        <Ionicons style={{marginHorizontal: width * 0.02}} size={width * 0.1} color={lightGrey} name={"ios-trash"} />
    </TouchableOpacity>
);

export default DeleteAlertsButton;