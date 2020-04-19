import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    Dimensions
} from 'react-native';
import Text from '../../common/KKText';
import FullPage from "../../common/FullPage";
import {fountainBlue} from "../../colors";
import {scaleRatio} from "../../configuration";
import familyUnitRepository from "../../stores/FamilyUnitDataStore";
import Row from "../../common/Row";
import { EvilIcons } from '@expo/vector-icons';
import ProgressBar from "../../common/ProgressBar";
import KKButton from "../../common/KKButton";
import {observer} from "mobx-react";

const iconSize = 44;

function ProfileCompletion(props){
    const numChildren = (familyUnitRepository.kidsList || []).length;
    const numChores = (familyUnitRepository.existingChores || []).length;
    const numRewards = (familyUnitRepository.existingRewards || []).length;
    const completionPercent = computeProfileCompletionPercent(familyUnitRepository);
    return (
        <FullPage style={{backgroundColor: fountainBlue, alignItems: 'center'}}>
            <View style={{flex:1, alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center'}}>
                <Image
                    source={require('../../../assets/images/trophy.png')}
                    style={styles.trophy}
                />
                <Text style={{color: '#FFF', fontSize: 18 * scaleRatio, textAlign: 'center'}}>Complete Your Profile</Text>
                <ProgressBar completionPercent={completionPercent} />
                <Row style={{marginVertical: width * 0.02}}>
                    <View style={styles.iconContainer}>
                        <EvilIcons color={'#FFF'} name={'check'} size={iconSize} />
                    </View>
                    <View style={styles.profileCompletionElementContainer}>
                        <Text style={{color: 'white'}}>Create Account</Text>
                    </View>
                </Row>
                <Row style={{marginVertical: width * 0.02}}>
                    <View style={styles.iconContainer}>
                        {
                            chooseIconToDisplay(numChildren, 1)
                        }
                    </View>
                    <View style={styles.profileCompletionElementContainer}>
                        <Text style={{color: 'white'}}>Added {numChildren} {numChildren === 1 ? 'child' : 'children'}</Text>
                    </View>
                </Row>
                <Row style={{marginVertical: width * 0.02}}>
                    <View style={styles.iconContainer}>
                        {
                            chooseIconToDisplay(numChores, 5)
                        }
                    </View>
                    <View style={styles.profileCompletionElementContainer}>
                        <Text style={{color: 'white'}}>Chores added: {numChores}/5 (minimum)</Text>
                    </View>
                </Row>
                <Row style={{marginVertical: width * 0.02}}>
                    <View style={styles.iconContainer}>
                        {
                            chooseIconToDisplay(numRewards, 3)
                        }
                    </View>
                    <View style={styles.profileCompletionElementContainer}>
                        <Text style={{color: 'white'}}>Rewards added: {numRewards}/3 (minimum)</Text>
                    </View>
                </Row>
            </View>
            <KKButton
                style={{marginBottom: height * 0.04, marginHorizontal: 'auto'}}
                type="secondary"
                to="/maintabscreen/choreboard"
            >
                DASHBOARD
            </KKButton>
        </FullPage>
    );
}

function chooseIconToDisplay(actualValue, valueForCompletion) {
    if (actualValue === 0)
        return <EvilIcons color={'#AAA'} name={'close-o'} size={iconSize} />;
    if (actualValue < valueForCompletion)
        return <EvilIcons color={'#AAA'} name={'check'} size={iconSize} />;

    return <EvilIcons color={'#FFF'} name={'check'} size={iconSize} />;
}

// create account - 10%
// add children - 20%
// Add at least 5 chores -  8% per chore
// add at least 3 rewards - 10% per reward
// if numChildren === 0 display msg to add children
// if numChores <= 2 display msg to add chores
// if numRewards <= 1 display msg to add rewards
export function computeProfileCompletionPercent(familyUnitRepository) {
    const numChildren = (familyUnitRepository.kidsList || []).length;
    const numChores = (familyUnitRepository.existingChores || []).length;
    const numRewards = (familyUnitRepository.existingRewards || []).length;
    return 10
        + (numChildren > 0 ? 20 : 0)
        + Math.min(numChores, 5) * 8
        + Math.min(numRewards, 3) * 10;
}

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    trophy: {
        alignSelf: 'center',
        width: width * 0.18,
        height: (width * 0.18) * 785 / 583,
        marginVertical: height * .025
    },
    iconContainer: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: .05 * width
    },
    profileCompletionElementContainer: {
        flex: 3,
        justifyContent: 'center'
    }
});

export default observer(ProfileCompletion);