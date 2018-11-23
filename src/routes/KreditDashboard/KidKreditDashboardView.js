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

const KidKreditDashboardView = ({
    loading,
    kreditInfo
}) => (
    <FullPage>
        <Header />
        {
            loading ? <EmptyState loading={loading}/>
            :
                <ScrollView>
                    <Text style={styles.smallLabel}>Your kredit score:</Text>
                    <Text style={styles.bigText}>{getTotalScore(kreditInfo)}</Text>
                    <Text style={styles.subHeading}>Kredit Breakdown</Text>

                    <ItemTile
                        mainCaption="Rewards Redemptions (Utilization)"
                        subCaption={buildSubtitleString(kreditInfo, 'rewardsRedemptions')} />
                    <ItemTile
                        mainCaption="Chore History (Payment History)"
                        subCaption={buildSubtitleString(kreditInfo, 'choreHistory')} />
                    <ItemTile
                        mainCaption="Average Age of Chores (Age of Accounts)"
                        subCaption={buildSubtitleString(kreditInfo, 'avgChoreAge')} />
                    <ItemTile
                        mainCaption="Total Chores (Number of Accounts)"
                        subCaption={buildSubtitleString(kreditInfo, 'totalChores')} />
                    <ItemTile
                        mainCaption="Reward Requests (Credit Inquiries)"
                        subCaption={buildSubtitleString(kreditInfo, 'rewardsRequests')} />
                </ScrollView>

        }

    </FullPage>
);

function buildSubtitleString(kreditInfo, key){
    const kreditInfoFraction = kreditInfo[key];
    if (!kreditInfoFraction || !kreditInfoFraction.value || !kreditInfoFraction.denominator) return '0/20';

    return `${kreditInfoFraction.value}/${kreditInfoFraction.denominator}`;
}

function getTotalScore(kreditInfo){
    let score = 0;
    for (let key in kreditInfo) score += kreditInfo[key].value;
    return score;
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
    }
});

export default KidKreditDashboardView;