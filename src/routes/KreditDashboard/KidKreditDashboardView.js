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
import {scaleRatio} from "../../configuration";
import BigTextLabel from "../../common/BigTextLabel";

const KidKreditDashboardView = ({
    loading,
    kreditInfo,
    modalVisible,
    showModal,
    hideModal,
    educationalInfo={}
}) => (
    <FullPage>
        <Header leftAction={'avatarButton'} lettersOnly={true} />
        <Text style={styles.title}>Kredit Dashboard</Text>
        {
            loading ? <EmptyState loading={loading}/>
            :
                <ScrollView>
                    <Text style={styles.smallLabel}>Your kredit score:</Text>
                    <BigTextLabel>{getTotalScore(kreditInfo)}</BigTextLabel>
                    <Text style={styles.subTitle} semiBold={true}>Kredit Breakdown</Text>

                    <ItemTile
                        mainCaption="Rewards Redemptions (Utilization)"
                        renderRightItem={() => <InfoIcon attributeName={'utilization'} onPress={()=>showModal('utilization')}/>}
                        subCaption={buildSubtitleElement(kreditInfo, 'utilization')}
                        subCaptionType={'progressBar'}
                    />
                    <ItemTile
                        mainCaption="Chore History (Payment History)"
                        renderRightItem={() => <InfoIcon attributeName={'paymentHistory'} onPress={()=>showModal('paymentHistory')}/>}
                        subCaption={buildSubtitleElement(kreditInfo, 'choreHistory')}
                        subCaptionType={'progressBar'}
                    />
                    <ItemTile
                        mainCaption="Average Age of Chores (Age of Accounts)"
                        renderRightItem={() => <InfoIcon attributeName={'accountAge'} onPress={()=>showModal('accountAge')}/>}
                        subCaption={buildSubtitleElement(kreditInfo, 'avgChoreAge')}
                        subCaptionType={'progressBar'}
                    />
                    <ItemTile
                        mainCaption="Total Chores (Number of Accounts)"
                        renderRightItem={() => <InfoIcon attributeName={'numAccounts'} onPress={()=>showModal('numAccounts')}/>}
                        subCaption={buildSubtitleElement(kreditInfo, 'totalChores')}
                        subCaptionType={'progressBar'}
                    />
                    <ItemTile
                        mainCaption="Reward Requests (Credit Inquiries)"
                        renderRightItem={() => <InfoIcon attributeName={'creditInquiries'} onPress={()=>showModal('creditInquiries')}/>}
                        subCaption={buildSubtitleElement(kreditInfo, 'inquiries')}
                        subCaptionType={'progressBar'}
                    />
                </ScrollView>
        }
        <EducationalModal
            modalVisible={modalVisible}
            educationalInfo={educationalInfo}
            hideModal={hideModal}
        />
    </FullPage>
);

function buildSubtitleElement(kreditInfo, key){
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
        fontSize: 18 * scaleRatio
    },
    smallLabel: {
        color: shuttleGrey,
        fontSize: 14.4 * scaleRatio,
        textAlign: 'center'
    },
    title: {
        color: shuttleGrey,
        fontSize: 25 * scaleRatio,
        textAlign: 'center'
    },
    subTitle: {
        color: fountainBlue,
        fontSize: 18 * scaleRatio,
        textAlign: 'center',
        marginBottom: height * .036
    }
});

export default KidKreditDashboardView;