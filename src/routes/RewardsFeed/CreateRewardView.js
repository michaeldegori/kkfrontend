import React, {Fragment} from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView, Platform, TouchableOpacity
} from 'react-native';
import PlatformDependentScrollingContainer from "../../common/PlatformDependentScrollingContainer";
import Header from "../../common/Header";
import Text from "../../common/KKText";
import {fountainBlue, lightGreyBG, shuttleGrey, shuttleGreyDark} from "../../colors";
import KKTextInput from "../../common/KKTextInput";
import KidAvatar from "../../common/KidAvatar";
import KidSelection from "../../common/KidSelection";
import KKButton from "../../common/KKButton";
import {Ionicons} from 'react-native-vector-icons';
import {scaleRatio} from "../../configuration";
import AdultModalContent from "../../common/AdultModalContent";

const {width, height} = Dimensions.get('window');
const renderModalContents = (modalText, modalAccept, modalDeny) => () => (
    <AdultModalContent
        modalText={modalText}
        modalAccept={modalAccept}
        modalDeny={modalDeny}
        acceptLabel={'Add another reward'}
        denyLabel={'Back to Reward Manager'}
    />
);

const CreateRewardView = ({
    modalVisible,
    modalText,
    updateForm,
    rewardName,
    kkCost,
    kidsList,
    rewardAppliesTo,
    toggleKidSelection,
    notes,
    submitting,
    submitReward,
    modalClose,
    modalAccept,
    modalDeny,
    ...props
}) => (
    <PlatformDependentScrollingContainer
        modalVisible={modalVisible}
        modalClose={modalClose}
        renderModalContents={()=>renderModalContents(modalText, modalAccept, modalDeny)}>
            <Header/>
            <ScrollView style={{flex:1, alignSelf: 'stretch'}}>
                <Text style={styles.subHeading}>Input All Reward Data:</Text>
                <KKTextInput
                    style={styles.input}
                    placeholder={"Enter Reward Name"}
                    value={rewardName}
                    onChangeText={text=> updateForm('rewardName', text) }
                />

                <KKTextInput
                    style={styles.input}
                    placeholder={"Cost in Bamboo Bucks"}
                    value={""+kkCost}
                    keyboardType={"number-pad"}
                    onChangeText={text=> updateForm('kkCost', Number(text)) }
                />

                {
                    kidsList.length > 0 &&
                    <React.Fragment>
                        <Text style={styles.textLabel}>Children eligible for reward:</Text>
                        <View style={styles.row}>
                            {
                                kidsList.map(kid => (
                                    <KidSelection
                                        key={kid._id}
                                        selected={rewardAppliesTo.indexOf(kid._id)!== -1}
                                        onPress={()=>toggleKidSelection(kid._id)}>
                                        <KidAvatar {...kid} />
                                    </KidSelection>
                                ))
                            }
                        </View>
                    </React.Fragment>
                }
                <KKTextInput
                    style={[styles.input, {height: height * 0.2}]}
                    multiline={true}
                    placeholder={"Notes"}
                    value={notes}
                    onChangeText={text=> updateForm('notes', text) }
                />
                <View style={[styles.bottomMargin, {alignItems: 'center'}]}>
                    <KKButton type={"primary"} onPress={!submitting ? submitReward : ()=>""}>
                        {submitting? 'PLEASE WAIT' : 'SAVE'}
                    </KKButton>
                </View>
            </ScrollView>
        </PlatformDependentScrollingContainer>
);

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignSelf: 'stretch',
        margin: width * 0.05
    },
    subHeading: {
        color: fountainBlue,
        fontSize: 18 * scaleRatio,
        textAlign: 'center'
    },
    bottomMargin: {
        marginBottom: height * 0.1
    },
    input: {
        margin: width * 0.08,
        ...Platform.select({
            android: {
                elevation: 5,
            },
            ios: {
                shadowColor: 'black',
                shadowOpacity: 0.3,
                shadowOffset: {width: 0, height: 2}
            }
        })
    },
    textLabel: {
        margin: width * 0.03,
        marginTop: width * 0.06,
        textAlign: 'center',
        color: shuttleGreyDark
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

export default CreateRewardView;