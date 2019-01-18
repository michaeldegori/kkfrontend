import React, {Fragment} from "react";
import {
    View,
    StyleSheet,
    Dimensions, ScrollView
} from 'react-native';
import Text from '../../common/KKText';
import Header from "../../common/Header";
import FullPage from "../../common/FullPage";
import ItemTile from "../../common/ItemTile";
import {fountainBlue, shuttleGrey, shuttleGreyDark} from "../../colors";
import EmptyState from "../../common/EmptyState";
import InfoIcon from "./InfoIcon";
import EducationalModal from "../../common/EducationalModal";

const KidKreditDashboardView = ({
    loading,
    kreditInfo,
    modalVisible,
    showModal,
    hideModal,
    educationalInfo={}
}) => (
    <FullPage>
        <Header leftAction={'avatarButton'}/>
        <Text style={{color: fountainBlue,fontSize: width * 0.05, textAlign: 'center'}}>Kredit Dashboard</Text>
        {
            loading ? <EmptyState loading={loading}/>
            :
                <ScrollView>
                    <Text style={styles.smallLabel}>Your kredit score:</Text>
                    <Text style={styles.bigText}>{getTotalScore(kreditInfo)}</Text>
                    <Text style={styles.subHeading}>Kredit Breakdown</Text>

                    <ItemTile
                        mainCaption="Rewards Redemptions (Utilization)"
                        renderRightItem={() => <InfoIcon attributeName={'utilization'} onPress={()=>showModal('utilization')}/>}
                        subCaption={buildSubtitleString(kreditInfo, 'utilization')} />
                    <ItemTile
                        mainCaption="Chore History (Payment History)"
                        renderRightItem={() => <InfoIcon attributeName={'paymentHistory'} onPress={()=>showModal('paymentHistory')}/>}
                        subCaption={buildSubtitleString(kreditInfo, 'choreHistory')} />
                    <ItemTile
                        mainCaption="Average Age of Chores (Age of Accounts)"
                        renderRightItem={() => <InfoIcon attributeName={'accountAge'} onPress={()=>showModal('accountAge')}/>}
                        subCaption={buildSubtitleString(kreditInfo, 'avgChoreAge')} />
                    <ItemTile
                        mainCaption="Total Chores (Number of Accounts)"
                        renderRightItem={() => <InfoIcon attributeName={'numAccounts'} onPress={()=>showModal('numAccounts')}/>}
                        subCaption={buildSubtitleString(kreditInfo, 'totalChores')} />
                    <ItemTile
                        mainCaption="Reward Requests (Credit Inquiries)"
                        renderRightItem={() => <InfoIcon attributeName={'creditInquiries'} onPress={()=>showModal('creditInquiries')}/>}
                        subCaption={buildSubtitleString(kreditInfo, 'inquiries')} />
                </ScrollView>
        }
        <EducationalModal
            modalVisible={modalVisible}
            educationalInfo={educationalInfo}
            hideModal={hideModal}
        />
    </FullPage>
);

function buildSubtitleString(kreditInfo, key){
    const kreditInfoFraction = kreditInfo[key];
    if (!kreditInfoFraction || !kreditInfoFraction.numerator || !kreditInfoFraction.denominator) return '0/20';

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
    rewardAmount: {
        color: fountainBlue,
        alignSelf: 'center',
        fontSize: width * 0.05
    },
    smallLabel: {
        color: shuttleGrey,
        fontSize: width * 0.04,
        textAlign: 'center'
    },
    bigText:{
        color: fountainBlue,
        fontSize: width * 0.2,
        textAlign: 'center'
    },
    subHeading: {
        color: fountainBlue,
        fontSize: width * 0.07,
        textAlign: 'center'
    },
});

export default KidKreditDashboardView;