import React, {Fragment} from "react";
import {
    View,
    StyleSheet,
    Dimensions, ScrollView, TouchableOpacity,
    Platform
} from 'react-native';
import Text from '../../common/KKText';
import Header from "../../common/Header";
import {Ionicons} from 'react-native-vector-icons';
import ItemTile from "../../common/ItemTile";
import {fountainBlue, shuttleGrey, shuttleGreyDark} from "../../colors";
import FullPageWithModal from "../../common/FullPageWithModal";
import EmptyState from "../../common/EmptyState";
import {scaleRatio} from "../../configuration";
import { DangerZone } from 'expo';
import BigTextLabel from '../../common/BigTextLabel';
import KidModalContent from "../../common/KidModalContent";
let { Lottie } = DangerZone;

const renderModalContents = (modalText, modalAccept, modalClose) => () => (
    <KidModalContent
        modalText={modalText}
        modalAccept={modalAccept}
        modalClose={modalClose}
    />
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
    onRequestRedeemReward,
    showAnimation,
    setAnimationRef,
    hideAnimation
}) => (
    <FullPageWithModal
        modalVisible={modalVisible}
        renderModalContents={renderModalContents(modalText, modalAccept, modalClose)}
        modalClose={()=>modalClose(false)}
        style={{flex: 1, alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center'}}>
        <Header leftAction={'avatarButton'} lettersOnly={true} />
        <ScrollView style={{flex:1, alignSelf: 'stretch'}}>
            <Text semiBold={true} style={styles.smallLabel}>Bamboo Bucks balance:</Text>
            <BigTextLabel>{getKreditScoreDisplay(currentKid)}</BigTextLabel>
            <Text style={styles.subHeading}>Redeemable Rewards:</Text>
            {
                rewardsList.length === 0 ?
                    <EmptyState loading={false}/> :
                    rewardsList.map(reward =>
                        <TouchableOpacity key={reward._id} onPress={()=>onRequestRedeemReward(reward)}>
                            <ItemTile key={reward._id}
                                      mainCaption={reward.name}
                                      subCaption={reward.notes}
                                      renderRightItem={() => <Text style={styles.rewardAmount}>{reward.kkCost} BB</Text>}
                            />
                        </TouchableOpacity>
                    )
            }
        </ScrollView>
        {
            showAnimation &&
            <Lottie
                ref={setAnimationRef}
                style={styles.animation}
                loop={false}
                source={require('../../../assets/animations/1370-confetti.json')}
            />
        }
    </FullPageWithModal>
);

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    rewardAmount: {
        color: fountainBlue,
        alignSelf: 'center',
        fontSize: 18 * scaleRatio
    },
    smallLabel: {
        color: shuttleGrey,
        fontSize: 16.4 * scaleRatio,
        textAlign: 'center'
    },
    subHeading: {
        color: fountainBlue,
        fontSize: 18 * scaleRatio,
        textAlign: 'center',
        marginBottom: height * 0.02
    },
    animation: {
        position: 'absolute',
        height,
        top: 0,
        ...Platform.select({
            ios: {
                width: height, left: -(height-width)/4
            },
            android: {
                width, left: 0
            }
        })
    }
});

export default KidRewardsView;