import React from "react";
import {
    View,
    Dimensions,
    StyleSheet,
    Slider
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
}) => (
    <FullPage>
        <Header/>
        <SwipableKidSelection
            isSelectionNullable={false}
            kidsList={kidsList.toJS?kidsList.toJS():[]}
            renderContents={renderSettings(kidsList, onChangeSlider)}
            defaultChild={kidsList.length > 0 ? kidsList[0]._id : null}
        />
    </FullPage>
);

const renderSettings = (kidsList, onChangeSlider) => selectedChildId => {
    let selectedChild = kidsList.find(kid=>kid._id === selectedChildId);
    if (!selectedChild) selectedChild = {};
    console.log(selectedChild);
    return (
        <FullPage>
            <Text style={styles.textLabel}>Allowance Amount: {selectedChild.allowanceAmount || 0} KK</Text>
            <Slider thumbTintColor={shuttleGreyDark} value={selectedChild.allowanceAmount || 0} step={1} minimumValue={1} maximumValue={100}
                    onSlidingComplete={onChangeSlider('allowanceAmount', selectedChildId)}/>
            <Row style={{justifyContent: 'space-between', margin: 0}}>
                <Text style={styles.textLabel}>0</Text>
                <Text style={styles.textLabel}>100</Text>
            </Row>

            <Text style={styles.textLabel}>Savings Required: {selectedChild.savingsRequired || 0} KK</Text>
            <Slider thumbTintColor={shuttleGreyDark} value={selectedChild.savingsRequired || 0} step={1} minimumValue={1} maximumValue={100}
                    onSlidingComplete={onChangeSlider('savingsRequired', selectedChildId)}/>
            <Row style={{justifyContent: 'space-between', margin: 0}}>
                <Text style={styles.textLabel}>0</Text>
                <Text style={styles.textLabel}>100</Text>
            </Row>
            <View style={{height: height * 0.015, width}}/>
            <Text style={styles.textLabelLight}>Default: 1 KK per child's age per week</Text>
            <Text style={styles.textLabelLight}>Note: 1KK = $1</Text>

        </FullPage>
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
    }
});

export default SettingsView;