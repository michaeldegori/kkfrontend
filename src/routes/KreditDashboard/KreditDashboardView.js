import React from "react";
import {
    StyleSheet,
    Dimensions,
    ScrollView,
    View,
    Modal, TouchableOpacity
} from 'react-native';
import {Ionicons} from 'react-native-vector-icons';
import Text from '../../common/KKText';
import FullPage from "../../common/FullPage";
import Header from "../../common/Header";
import EmptyState from "../../common/EmptyState";
import ItemTile from "../../common/ItemTile";
import SwipableKidSelection from "../../common/SwipableKidSelection";
import {fountainBlue, lightGrey, shuttleGrey} from "../../colors";
import Row from "../../common/Row";
import InfoIcon from "./InfoIcon";
import EducationalModal from "../../common/EducationalModal";
import {scaleRatio} from "../../configuration";

const KreditDashboardView = ({
    match:{path},
    kidsList,
    loading,
    modalVisible,
    educationalInfo={},
    showModal,
    hideModal
}) => (
    <FullPage>
        <Header leftAction={"avatarButton"} />
        <Text style={{color: fountainBlue, fontSize: 18 * scaleRatio, textAlign: 'center'}}>Kredit Dashboard</Text>
        {
            kidsList && kidsList.length > 0 ?
                <SwipableKidSelection
                    kidsList={kidsList.toJS ? kidsList.toJS() : []}
                    renderContents={renderKidKreditInfo(kidsList, showModal)}
                    isSelectionNullable={false}
                    defaultChild={kidsList[0]._id}
                /> :
                <EmptyState loading={loading}/>
        }
        <EducationalModal
            modalVisible={modalVisible}
            educationalInfo={educationalInfo}
            hideModal={hideModal}
        />
    </FullPage>
);


const renderKidKreditInfo = (kidsList=[], showModal) => selectedChildId => {
    const currentKid = kidsList.find(k => k._id === selectedChildId);
    if (!currentKid) return <EmptyState loading={false}/>
    if (!currentKid.kreditInformation)
        currentKid.kreditInformation = {};
    const {kreditInformation} = currentKid;
    return (
        <ScrollView>
            <Row>
                <View>
                    <Text style={styles.smallLabel}>{currentKid.name}'s kredit score:</Text>
                    <Text style={styles.bigText}>{getTotalScore(kreditInformation)}</Text>
                </View>
                <View>
                    <Text style={styles.smallLabel}>Bamboo Bucks</Text>
                    <Text style={styles.bigText}>{Math.floor(kreditInformation.kiddieKashBalance || 0 )}</Text>
                </View>
            </Row>
            <Text style={styles.subHeading}>Kredit Breakdown</Text>
            <ItemTile
                mainCaption="Rewards Redemptions (Utilization)"
                renderRightItem={() => <InfoIcon attributeName={'utilization'} onPress={()=>showModal('utilization')}/>}
                subCaption={buildSubtitleString(kreditInformation, 'utilization')} />
            <ItemTile
                mainCaption="Chore History (Payment History)"
                renderRightItem={() => <InfoIcon attributeName={'paymentHistory'} onPress={()=>showModal('paymentHistory')}/>}
                subCaption={buildSubtitleString(kreditInformation, 'choreHistory')} />
            <ItemTile
                mainCaption="Average Age of Chores (Age of Accounts)"
                renderRightItem={() => <InfoIcon attributeName={'accountAge'} onPress={()=>showModal('accountAge')}/>}
                subCaption={buildSubtitleString(kreditInformation, 'avgChoreAge')} />
            <ItemTile
                mainCaption="Total Chores (Number of Accounts)"
                renderRightItem={() => <InfoIcon attributeName={'numAccounts'} onPress={()=>showModal('numAccounts')}/>}
                subCaption={buildSubtitleString(kreditInformation, 'totalChores')} />
            <ItemTile
                mainCaption="Reward Requests (Credit Inquiries)"
                renderRightItem={() => <InfoIcon attributeName={'creditInquiries'} onPress={()=>showModal('creditInquiries')}/>}
                subCaption={buildSubtitleString(kreditInformation, 'inquiries')} />
        </ScrollView>
    );
};

function buildSubtitleString(kreditInfo, key){
    const kreditInfoFraction = kreditInfo[key];
    if (!kreditInfoFraction || typeof kreditInfoFraction.numerator !== 'number' || typeof kreditInfoFraction.denominator !== 'number') return '0/20';

    return `${kreditInfoFraction.numerator}/${kreditInfoFraction.denominator}`;
}

function getTotalScore(kreditInfo){
    let score = 0;
    for (let key in kreditInfo) {
        if (typeof kreditInfo[key] === 'object' && typeof Number(kreditInfo[key].numerator) === 'number')
            score += Number(kreditInfo[key].numerator);
    }
    return Math.floor(score);
}

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    smallLabel: {
        color: shuttleGrey,
            fontSize: 14.4 * scaleRatio,
            textAlign: 'center'
    },
    bigText:{
        color: fountainBlue,
            fontSize: 72 * scaleRatio,
            textAlign: 'center'
    },
    subHeading: {
        color: fountainBlue,
        fontSize: 25.2 * scaleRatio,
        textAlign: 'center'
    },
});


export default KreditDashboardView;