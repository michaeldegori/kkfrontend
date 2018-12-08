import React from "react";
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
import {Link} from "react-router-native";

const KidRewardsView = ({
    rewardsList=[],
    currentKid={kreditInformation:{kiddieKash:0}}
}) => (
    <FullPage>
        <Header leftAction={'avatarButton'}/>
        <ScrollView>
            <Text style={styles.smallLabel}>Your kk bucks balance:</Text>
            <Text style={styles.bigText}>{(currentKid.kreditInformation && currentKid.kreditInformation.kiddieKash) || 0}</Text>
            <Text style={styles.subHeading}>Redeemable Rewards:</Text>
            {
                rewardsList.map(reward =>
                    <ItemTile key={reward._id}
                              mainCaption={reward.name}
                              subCaption="children list not impl yet"
                              renderRightItem={() => <Text style={styles.rewardAmount}>{reward.kkCost} KK</Text>}
                    />
                )
            }
        </ScrollView>

    </FullPage>
);

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
        fontSize: width * 0.15,
        textAlign: 'center'
    },
    subHeading: {
        color: fountainBlue,
        fontSize: width * 0.05,
        textAlign: 'center'
    }
});

export default KidRewardsView;