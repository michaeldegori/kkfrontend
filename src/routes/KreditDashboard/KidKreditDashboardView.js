import React from "react";
import {
    View,
    StyleSheet,
    Dimensions
} from 'react-native';
import Text from '../../common/KKText';
import Header from "../../common/Header";
import FullPage from "../../common/FullPage";
import ItemTile from "../../common/ItemTile";
import {fountainBlue, shuttleGreyDark} from "../../colors";

const KidKreditDashboardView = ({
    kreditData=[]
}) => (
    <FullPage>
        <Header />
        <Text>Kid Kredit Dashboard</Text>
    </FullPage>
);

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    rewardAmount: {
        color: fountainBlue,
        alignSelf: 'center',
        fontSize: width * 0.05
    }
});

export default KidKreditDashboardView;