import React from "react";
import {
    View,
    Dimensions,
    StyleSheet,
    Slider,
    ScrollView
} from 'react-native';
import Text from '../../common/KKText';
import FullPage from "../../common/FullPage";
import Header from "../../common/Header";
import SwipableKidSelection from "../../common/SwipableKidSelection";
import {shuttleGrey, shuttleGreyDark} from "../../colors";
import KKButton from "../../common/KKButton";
import Row from "../../common/Row";

const SettingsView = ({
    match:{path},
    kidsList=[],
    onChangeSlider=()=>()=>"",
    onChangeKid=()=>"",
    createOnSliderTick,
    allowanceSliderValue,
    savingsSliderValue,
    saveChild
}) => (
    <FullPage>
        <Header leftAction={'avatarButton'}/>
        <SwipableKidSelection
            isSelectionNullable={false}
            kidsList={kidsList.toJS?kidsList.toJS():[]}
            renderContents={renderSettings(kidsList, onChangeSlider, createOnSliderTick, allowanceSliderValue, savingsSliderValue, saveChild)}
            defaultChild={kidsList.length > 0 ? kidsList[0]._id : null}
            onChangeKid={onChangeKid}
        />
    </FullPage>
);

const renderSettings = (kidsList, onChangeSlider, createOnSliderTick, allowanceSliderValue, savingsSliderValue, saveChild) => selectedChildId => {
    let selectedChild = kidsList.find(kid=>kid._id === selectedChildId);
    if (!selectedChild) selectedChild = {};
    const currentAllowanceAmount = allowanceSliderValue!== -1 ? allowanceSliderValue : (selectedChild.allowanceAmount || 0);
    const currentSavingsRequired = savingsSliderValue!== -1 ? savingsSliderValue : (selectedChild.savingsRequired || 0);
    return (
        <ScrollView>
            <FullPage>
                <Text style={styles.textLabel}>Allowance Amount: {currentAllowanceAmount} KK</Text>
                <View style={styles.slidersContainer}>
                    <Slider style={{marginHorizontal: width * 0.1}} thumbTintColor={shuttleGreyDark} value={selectedChild.allowanceAmount || 0}
                            step={1} minimumValue={1} maximumValue={20}
                            onValueChange={createOnSliderTick('allowanceSliderValue')}
                            onSlidingComplete={onChangeSlider('allowanceAmount', selectedChildId)}/>
                    <Row style={{justifyContent: 'space-between', marginVertical: 0, marginHorizontal: width * 0.1}}>
                        <Text style={styles.textLabel}>0</Text>
                        <Text style={styles.textLabel}>20</Text>
                    </Row>

                    <Text style={styles.textLabel}>Savings Required: {currentSavingsRequired} KK</Text>
                    <Slider style={{marginHorizontal: width * 0.1}} thumbTintColor={shuttleGreyDark} value={selectedChild.savingsRequired || 0}
                            step={1} minimumValue={1} maximumValue={20}
                            onValueChange={createOnSliderTick('savingsSliderValue')}
                            onSlidingComplete={onChangeSlider('savingsRequired', selectedChildId)}/>
                    <Row style={{justifyContent: 'space-between', marginVertical: 0, marginHorizontal: width * 0.1}}>
                        <Text style={styles.textLabel}>0</Text>
                        <Text style={styles.textLabel}>20</Text>
                    </Row>
                </View>
                <View style={{height: height * 0.015, width}}/>
                <Text style={styles.textLabelLight}>Default: 1 KK per child's age per week</Text>
                <Text style={styles.textLabelLight}>Note: 1KK = $1</Text>

                <KKButton type={'primary'} style={styles.btn} onPress={()=>saveChild(selectedChildId, currentAllowanceAmount, currentSavingsRequired)}>SAVE</KKButton>
            </FullPage>
        </ScrollView>
    );
}

const {width, height} = Dimensions.get("window");
const styles = StyleSheet.create({
    textLabel: {
        margin: width * 0.03,
        marginTop: width * 0.06,
        textAlign: 'center',
        color: '#333333',
        fontSize: width * 0.045,
    },
    textLabelLight: {
        // margin: width * 0.03,
        // marginTop: width * 0.06,
        textAlign: 'center',
        color: shuttleGrey
    },
    slidersContainer: {
        marginHorizontal: width * 0.06,
        alignSelf: 'stretch'
    },
    btn: {
        alignSelf: 'center',
        marginTop: height * 0.05
    }
});

export default SettingsView;