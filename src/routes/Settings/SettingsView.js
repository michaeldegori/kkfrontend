import React from "react";
import {
    View,
    Dimensions,
    StyleSheet,
    Slider,
    ScrollView,
    Linking,
    TouchableOpacity,
} from 'react-native';
import Text from '../../common/KKText';
import FullPage from "../../common/FullPage";
import Header from "../../common/Header";
import SwipableKidSelection from "../../common/SwipableKidSelection";
import {shuttleGrey, shuttleGreyDark} from "../../colors";
import KKButton from "../../common/KKButton";
import Row from "../../common/Row";
import {scaleRatio} from "../../configuration";
import Subtitle from "../../common/Subtitle";
import EmptyState from "../../common/EmptyState";
import {Link} from "react-router-native";

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
        {
            kidsList.length  === 0 ?
                <EmptyState loading={false}/> :
                <SwipableKidSelection
                    isSelectionNullable={false}
                    kidsList={kidsList.toJS?kidsList.toJS():[]}
                    renderContents={renderSettings(kidsList, onChangeSlider, createOnSliderTick, allowanceSliderValue, savingsSliderValue, saveChild)}
                    defaultChild={kidsList.length > 0 ? kidsList[0]._id : null}
                    onChangeKid={onChangeKid}
                />
        }
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
                <Text style={styles.textLabel}>Allowance Amount: {currentAllowanceAmount} BB</Text>
                <View style={styles.slidersContainer}>
                    <Slider style={{marginHorizontal: width * 0.1}} thumbTintColor={shuttleGreyDark} value={selectedChild.allowanceAmount || 0}
                            step={1} minimumValue={1} maximumValue={20}
                            onValueChange={createOnSliderTick('allowanceSliderValue')}
                            onSlidingComplete={onChangeSlider('allowanceAmount', selectedChildId)}/>
                    <Row style={{justifyContent: 'space-between', marginVertical: 0, marginHorizontal: width * 0.1}}>
                        <Text style={styles.textLabel}>0</Text>
                        <Text style={styles.textLabel}>20</Text>
                    </Row>

                </View>
                <View style={{height: height * 0.015, width}}/>
                <Text style={styles.textLabelLight}>Default: 1 BB per child's age per week</Text>
                <Text style={styles.textLabelLight}>Note: 1BB = $1</Text>

                <KKButton type={'primary'} style={styles.btn} onPress={()=>saveChild(selectedChildId, currentAllowanceAmount, currentSavingsRequired)}>SAVE</KKButton>

                <View style={styles.linkArea}>
                    <Subtitle>Links</Subtitle>
                    <Link to={'/maintabscreen/privacypolicy'}>
                        <Subtitle style={styles.link}>Privacy Policy</Subtitle>
                    </Link>
                    <Link to={'/maintabscreen/termsofuse'}>
                        <Subtitle style={styles.link}>Terms of Use</Subtitle>
                    </Link>
                    <TouchableOpacity onPress={() => Linking.openURL('mailto:support@kiddiekredit.com')}>
                        <Subtitle style={styles.link}>Need Help</Subtitle>
                    </TouchableOpacity>
                </View>
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
        fontSize: 16 * scaleRatio,
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
    },
    linkArea: {
        marginTop: height * 0.025
    },
    link: {
        fontSize: 14*scaleRatio,
        color: shuttleGrey,
        paddingVertical: height * 0.0,
        marginVertical: height * 0.01
    }
});

export default SettingsView;