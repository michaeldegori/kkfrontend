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
import {Link} from "react-router-native";

const RewardsFeedView = ({
     match:{path},
    defaultRewards=[],
    rewardsList=[]
}) => (
    <FullPage>
        <Header rightAction="addReward"/>
        {
            defaultRewards.map(reward =>
                <ItemTile
                    key={reward._id}
                    mainCaption={reward.name}
                    subCaption="children list not impl yet"
                    renderRightItem={() => <Text style={styles.rewardAmount}>{reward.kkCost} KK</Text>}
                />
            )
        }
        {
            rewardsList.map(reward =>
                <Link to={`/maintabscreen/editreward/${reward._id}`} key={reward._id}>
                    <ItemTile
                        mainCaption={reward.name}
                        subCaption="children list not impl yet"
                        renderRightItem={() => <Text style={styles.rewardAmount}>{reward.kkCost} KK</Text>}
                    />
                </Link>
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