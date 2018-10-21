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

const RewardsFeedView = ({
     match:{path},
    defaultRewards=[],
    rewardsList=[]
}) => (
    <FullPage>
        <Header rightAction="addReward"/>
        {
            rewardsList.concat(defaultRewards).map(reward =>
                <ItemTile
                    key={reward._id}
                    mainCaption={reward.name}
                    subCaption="children list not impl yet"
                    renderRightItem={() => <Text style={styles.rewardAmount}>{reward.kkCost} KK</Text>}
                />
            )
        }
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

export default RewardsFeedView;