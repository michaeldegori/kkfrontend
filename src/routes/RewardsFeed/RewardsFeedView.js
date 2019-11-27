import React, {Fragment} from "react";
import {
    View,
    StyleSheet,
    Dimensions, TouchableOpacity, ScrollView
} from 'react-native';
import Text from '../../common/KKText';
import Header from "../../common/Header";
import ItemTile from "../../common/ItemTile";
import {fountainBlue, shuttleGrey, shuttleGreyDark} from "../../colors";
import FullPageWithModal from "../../common/FullPageWithModal";
import {Ionicons} from 'react-native-vector-icons';
import EmptyState from "../../common/EmptyState";
import {scaleRatio} from "../../configuration";

// This modal is totally unique
const renderModalContents = (modalText, modalAccept, kidsList=[], buttonsClickable=true) => () => (
    <Fragment>
        <Text style={{color: shuttleGreyDark, textAlign: 'center', marginBottom: height * 0.05}}>{modalText}</Text>
        <View style={{alignSelf: 'stretch', alignItems: 'center', marginBottom: height * 0.03, justifyContent: 'space-around'}}>
            {
                kidsList.map(kid =>
                    <TouchableOpacity style={[styles.modalBtn, {borderColor: fountainBlue}]} onPress={buttonsClickable? ()=>modalAccept(kid) : ()=>""} key={kid._id} >
                        <Ionicons style={{marginHorizontal: width * 0.02}} size={width * 0.1} color={fountainBlue} name={"ios-checkmark-circle-outline"} />
                        <Text style={{color: fountainBlue, marginLeft: 8, flex:1}}>{kid.name}</Text>
                    </TouchableOpacity>
                )
            }
        </View>
    </Fragment>
);

const RewardsFeedView = ({
    match:{path},
    history,
    rewardsList=[],
    modalText,
    modalVisible,
    modalAccept, modalClose,
    onRequestRedeemReward,
    buttonsClickable,
    kidsList=[]
}) => (
    <FullPageWithModal
        modalVisible={modalVisible}
        renderModalContents={renderModalContents(modalText, modalAccept, kidsList, buttonsClickable)}
        modalClose={modalClose}
        style={{flex: 1, alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center'}}>
        <Header leftAction={'avatarButton'} rightAction="addReward"/>
        <Text style={styles.subHeading}>Rewards Available to Children:</Text>
        {
            rewardsList.length > 0 ?
                <ScrollView style={{flex:1, alignSelf: 'stretch'}}>
                    {
                        rewardsList.map(reward =>{
                            const childrenRewardAppliesto = kidsList.filter(kid => (kid.eligibleRewards||[]).includes(reward._id)).map(kid=>kid.name);
                            return (
                                <TouchableOpacity key={reward._id} onLongPress={()=>onRequestRedeemReward(reward)} onPress={()=>history.push(`/maintabscreen/editreward/${reward._id}`)}>
                                    <ItemTile
                                        mainCaption={reward.name}
                                        subCaption={childrenRewardAppliesto.join(", ")}
                                        renderRightItem={() => <Text style={styles.rewardAmount}>{reward.kkCost} BB</Text>}
                                    />
                                </TouchableOpacity>
                            );
                        })
                    }
                </ScrollView> :
                <EmptyState loading={false}/>
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
    subHeading: {
        color: fountainBlue,
        fontSize: 18 * scaleRatio,
        textAlign: 'center'
    },
    modalBtn: {
        width: 0.7 * width,
        borderRadius: 8,
        borderWidth: 2,
        backgroundColor: 'white',
        flexDirection: 'row',
        marginBottom: width * 0.015,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default RewardsFeedView;