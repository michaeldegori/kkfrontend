import React from "react";
import {
    ActivityIndicator,
    View,
    StyleSheet,
    Dimensions, ScrollView
} from 'react-native';
import Text from '../../common/KKText';
import FullPage from "../../common/FullPage";
import Header from "../../common/Header";
import EmptyState from "../../common/EmptyState";
import ItemTile from "../../common/ItemTile";
import SwipableKidSelection from "../../common/SwipableKidSelection";

const KreditDashboardView = ({
    match:{path},
    kidsList,
    loading
}) => (
    <FullPage>
        <Header leftAction={"avatarButton"} />
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
    if (!currentKid.kreditInfo)
        currentKid.kreditInfo = {};
    const {
        rewardsRedemptions,
        choreHistory,
        avgChoreAge,
        totalChores,
        rewardsRequests,
        punishments
    } = currentKid.kreditInfo;
    return (
        <ScrollView>
            <ItemTile
                mainCaption="Rewards Redemptions (Utilization)"
                subCaption={rewardsRedemptions || "0/20"} />
            <ItemTile
                mainCaption="Chore History (Payment History)"
                subCaption={choreHistory || "0/20"} />
            <ItemTile
                mainCaption="Average Age of Chores (Age of Accounts)"
                subCaption={avgChoreAge || "0/20"} />
            <ItemTile
                mainCaption="Total Chores (Number of Accounts)"
                subCaption={totalChores || "0/20"} />
            <ItemTile
                mainCaption="Reward Requests (Credit Inquiries)"
                subCaption={rewardsRequests || "0/20"} />
            <ItemTile
                mainCaption="Punishments"
                subCaption={punishments || "0/20"} />
        </ScrollView>
    );
}

export default KreditDashboardView;