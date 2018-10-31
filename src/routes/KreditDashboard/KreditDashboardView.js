import React from "react";
import {
    ActivityIndicator,
    View,
    StyleSheet,
    Dimensions
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
    return (
        <FullPage>
            <Text>{currentKid && currentKid.name} kredit information</Text>
        </FullPage>
    );
}

export default KreditDashboardView;