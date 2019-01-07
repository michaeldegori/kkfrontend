import React from "react";
import {
    StyleSheet,
    Dimensions,
    ScrollView,
    View
} from 'react-native';
import Text from '../../common/KKText';
import FullPage from "../../common/FullPage";
import Header from "../../common/Header";
import EmptyState from "../../common/EmptyState";
import ItemTile from "../../common/ItemTile";
import SwipableKidSelection from "../../common/SwipableKidSelection";
import {fountainBlue, shuttleGrey} from "../../colors";
import Row from "../../common/Row";

const KreditDashboardView = ({
    match:{path},
    kidsList,
    loading
}) => (
    <FullPage>
        <Header leftAction={"avatarButton"} />
        <Text style={{color: fountainBlue,fontSize: width * 0.05, textAlign: 'center'}}>Kredit Dashboard</Text>
        {
            kidsList && kidsList.length > 0 ?
                <SwipableKidSelection
                    kidsList={kidsList.toJS ? kidsList.toJS() : []}
                    renderContents={renderKidKreditInfo(kidsList)}
                    isSelectionNullable={false}
                    defaultChild={kidsList[0]._id}
                /> :
                <EmptyState loading={loading}/>
        }


    </FullPage>
);

const renderKidKreditInfo = (kidsList=[]) => selectedChildId => {
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
                    <Text style={styles.smallLabel}>Kiddie Kash</Text>
                    <Text style={styles.bigText}>{Math.floor(kreditInformation.kiddieKashBalance || 0 )}</Text>
                </View>
            </Row>
            <Text style={styles.subHeading}>Kredit Breakdown</Text>
            <ItemTile
                mainCaption="Rewards Redemptions (Utilization)"
                subCaption={buildSubtitleString(kreditInformation, 'utilization')} />
            <ItemTile
                mainCaption="Chore History (Payment History)"
                subCaption={buildSubtitleString(kreditInformation, 'choreHistory')} />
            <ItemTile
                mainCaption="Average Age of Chores (Age of Accounts)"
                subCaption={buildSubtitleString(kreditInformation, 'avgChoreAge')} />
            <ItemTile
                mainCaption="Total Chores (Number of Accounts)"
                subCaption={buildSubtitleString(kreditInformation, 'totalChores')} />
            <ItemTile
                mainCaption="Reward Requests (Credit Inquiries)"
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
        console.log(kreditInfo[key]);
        if (typeof kreditInfo[key] === 'object' && typeof Number(kreditInfo[key].numerator) === 'number')
            score += Number(kreditInfo[key].numerator);
    }
    return Math.floor(score);
}

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
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


export default KreditDashboardView;