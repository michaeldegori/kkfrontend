import React, {Fragment} from "react";
import {
    View,
    StyleSheet,
    Dimensions, ScrollView, TouchableOpacity
} from 'react-native';
import Text from '../../common/KKText';
import Header from "../../common/Header";
import {Ionicons} from 'react-native-vector-icons';
import ItemTile from "../../common/ItemTile";
import {fountainBlue, shuttleGrey, shuttleGreyDark} from "../../colors";
import FullPageWithModal from "../../common/FullPageWithModal";
import EmptyState from "../../common/EmptyState";

const renderModalContents = (modalText, modalAccept, modalClose) => () => (
    <Fragment>
        <Text style={{color: shuttleGreyDark, textAlign: 'center', marginBottom: height * 0.05}}>{modalText}</Text>
        <View style={{alignSelf: 'stretch', alignItems: 'center', marginBottom: height * 0.03, flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableOpacity style={[{borderColor: fountainBlue}]} onPress={modalAccept} >
                <Ionicons style={{marginHorizontal: width * 0.02}} size={width * 0.15} color={fountainBlue} name={"ios-checkmark-circle-outline"} />
            </TouchableOpacity>
            <TouchableOpacity style={[{borderColor: shuttleGrey}]} onPress={modalClose} >
                <Ionicons style={{marginHorizontal: width * 0.02}} size={width * 0.15} color={shuttleGrey} name={"ios-close-circle-outline"} />
            </TouchableOpacity>
        </View>
    </Fragment>
);

const getKreditScoreDisplay = currentKid => {
    if (!currentKid.kreditInformation || !currentKid.kreditInformation.kiddieKashBalance) return 0;
    return Math.floor(currentKid.kreditInformation.kiddieKashBalance);
}

const KidRewardsView = ({
    rewardsList=[],
    currentKid={kreditInformation:{kiddieKash:0}},
    modalText,
    modalVisible,
    modalAccept, modalClose,
    onRequestRedeemReward

}) => (
    <FullPageWithModal
        modalVisible={modalVisible}
        renderModalContents={renderModalContents(modalText, modalAccept, modalClose)}
        modalClose={modalClose}
        style={{flex: 1, alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center'}}>
        <Header leftAction={'avatarButton'}/>
        <ScrollView style={{flex:1, alignSelf: 'stretch'}}>
            <Text style={styles.smallLabel}>Your kk bucks balance:</Text>
            <Text style={styles.bigText}>{getKreditScoreDisplay(currentKid)}</Text>
            <Text style={styles.subHeading}>Redeemable Rewards:</Text>
            {
                rewardsList.length === 0 ?
                    <EmptyState loading={false}/> :
                    rewardsList.map(reward =>
                        <TouchableOpacity key={reward._id} onPress={()=>onRequestRedeemReward(reward)}>
                            <ItemTile key={reward._id}
                                      mainCaption={reward.name}
                                      subCaption={reward.notes}
                                      renderRightItem={() => <Text style={styles.rewardAmount}>{reward.kkCost} KK</Text>}
                            />
                        </TouchableOpacity>
                    )
            }
        </ScrollView>

    </FullPageWithModal>
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