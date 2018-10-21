import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    ScrollView
} from 'react-native';
import FullPageWithModal from "../../common/FullPageWithModal";
import Header from "../../common/Header";
import Text from "../../common/KKText";
import {lightGreyBG, shuttleGreyDark} from "../../colors";
import KKTextInput from "../../common/KKTextInput";
import KidAvatar from "../../common/KidAvatar";
import KidSelection from "../../common/KidSelection";
import KKButton from "../../common/KKButton";

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
    ...props
}) => (
    <FullPageWithModal style={{backgroundColor: lightGreyBG}} modalVisible={modalVisible} modalText={modalText}>
        <Header/>
        <ScrollView style={{flex:1, alignSelf: 'stretch'}}>
            <KKTextInput
                style={styles.input}
                placeholder={"Enter Reward Name"}
                value={rewardName}
                onChangeText={text=> updateForm('rewardName', text) }
            />

            <KKTextInput
                style={styles.input}
                placeholder={"Amount of kk"}
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
    </FullPageWithModal>
);

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignSelf: 'stretch',
        margin: width * 0.05
    },
    bottomMargin: {
        marginBottom: height * 0.1
    },
    input: {
        margin: width * 0.08,
        elevation: 5,
    },
    textLabel: {
        margin: width * 0.03,
        marginTop: width * 0.06,
        textAlign: 'center',
        color: shuttleGreyDark
    },
});

export default CreateRewardView;