import React from 'react';
import {
    View,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import {Ionicons} from 'react-native-vector-icons';
import Text from './KKText';
import { shuttleGrey} from "../colors";
import { withRouter} from 'react-router-native';
import AvatarButton from "./AvatarButton";
import LogoutButton from "./LogoutButton";
import AddButton from "./AddButton";
import DeleteAlertsButton from "../routes/Alerts/DeleteAlertsButton";
import familyUnitRepository from "../stores/FamilyUnitDataStore";

const {width, height} = Dimensions.get("window");


const Header = ({history, leftAction, rightAction, ...props}) => {
    const chooseRightAction = actionName => {
        if (!actionName) return null;
        switch (actionName){
            case 'logout': return  <LogoutButton history={history}/>;
            case 'addChore': return (
                <AddButton
                    route="/maintabscreen/createchore"
                    pulsating={
                        !familyUnitRepository.existingChores ||
                        !familyUnitRepository.existingChores.length ||
                        familyUnitRepository.existingChores.length < 5
                    }
                />
            );
            case 'addReward': return (
                <AddButton
                    route="/maintabscreen/createreward"
                    pulsating={
                        !familyUnitRepository.existingRewards ||
                        !familyUnitRepository.existingRewards.length ||
                        familyUnitRepository.existingRewards.length < 3
                    }
                />
            );
            case 'deleteAlerts': return <DeleteAlertsButton/>;
            default: return null;
        }
    };
    const chooseLeftAction = actionName => {
        if (!actionName) return <BackArrow/>
        switch (actionName) {
            case 'avatarButton': return <AvatarButton/>;
            default: return <BackArrow/>
        }
    }
    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity style={styles.sideContainer} onPress={history.goBack}>
                {
                    chooseLeftAction(leftAction)
                }
            </TouchableOpacity>
            <View style={styles.logoContainer}>
                {
                    props.lettersOnly
                        ? <KkOnlyLogo />
                        : <FullWrittenLogo />
                }
            </View>
            <View style={styles.sideContainer}>
                {
                    chooseRightAction(rightAction)
                }
            </View>
        </View>
    );
}

const BackArrow = ({onPress}) => (
    <Ionicons name="ios-arrow-round-back" size={Math.round(width * 0.12)} color={shuttleGrey} />
);

const FullWrittenLogo = () => <Image source={require("../../assets/images/kk-letters.png")} style={styles.img} />;
const KkOnlyLogo = () => <Image source={require("../../assets/images/kk-nobg.png")} style={[styles.img, styles.smallLogo]} />;

const styles = StyleSheet.create({
    mainContainer: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        height: height * 0.1,
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sideContainer: {
        width: width * 0.135,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: width * 0.5,
        height: (width * 0.4)/256 * 41
    },
    smallLogo: {
        resizeMode: 'contain',
        height: 0.05 * height,
        width: 0.05 * height
    }
})

export default withRouter(Header);