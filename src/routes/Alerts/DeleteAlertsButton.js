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
    Alert.alert(
        "Are you sure you want to delete your alerts?",
        "Alerts will be lost forever, anything you might still need to approve or deny will be automatically approved.",
        [
            {text: "Ok", onPress: () => alertsRepository.deleteAlerts(userRepository.idToken, familyUnitRepository.unitId)},
            {text: "cancel", onPress: () => ""}
        ]
    )
}


const{width} = Dimensions.get('window');
const DeleteAlertsButton = () => (
    <TouchableOpacity onPress={deleteAlerts}>
        <Ionicons style={{marginHorizontal: width * 0.02}} size={width * 0.1} color={lightGrey} name={"ios-trash"} />
    </TouchableOpacity>
);

export default DeleteAlertsButton;