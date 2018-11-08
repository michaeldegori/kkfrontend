import React from "react";
import {
    View,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Slider,
    ScrollView,
    Picker, Modal
} from 'react-native';
import Text from '../../common/KKText';
import {Entypo} from 'react-native-vector-icons';
import Header from "../../common/Header";
import KKTextInput from "../../common/KKTextInput";
import {fountainBlue, lightGreyBG, shuttleGreyDark} from "../../colors";
import KidAvatar from "../../common/KidAvatar";
import {observer} from "mobx-react";
import KKButton from "../../common/KKButton";
import FullPageWithModal from "../../common/FullPageWithModal";
import KidSelection from "../../common/KidSelection";
import Row from "../../common/Row";
import AutoCompleteSuggestions from "../../common/AutoCompleteSuggestions";

const {width, height} = Dimensions.get('window');


const RadioWidget = ({label, active, onPress}) => (
    <TouchableOpacity onPress={onPress} style={[styles.dayWidget]}>
        <Text style={styles.radioLabel}>{label}</Text>
        <View style={[styles.radio, active? styles.activeRadio : {}]}></View>
    </TouchableOpacity>
);

const SliderWidget = ({value=5, onChange= () => ""}) => (
    <View style={{alignSelf: 'stretch', padding: width * 0.04}}>
        <Slider thumbTintColor={shuttleGreyDark} value={value} step={1} minimumValue={1} maximumValue={3}
                onSlidingComplete={onChange}/>
        <View style={styles.row}>
            <Text style={styles.radioLabel}>Low</Text>
            <Text style={styles.radioLabel}>Medium</Text>
            <Text style={styles.radioLabel}>High</Text>
        </View>
    </View>
);

const getSelectedDay = (choreDays) => {
    let firstTrueIndex = -1;
    for (let i = 0; i < choreDays.length; i++){
        if (choreDays[i]) {
            firstTrueIndex = i;
            break;
        }
    }
    if (firstTrueIndex === -1) {
        return 'Day';
    }
    return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][firstTrueIndex];
}

const adjustDaySelectionForMonthly = (choreDays, updateForm) => {
    if (choreDays.filter(d => d).length === 0)
        updateForm('choreDays', getNewChores(choreDays, 0, 'monthly'));
    else if (choreDays.filter(d => d).length > 1)
        updateForm('choreDays', getNewChores(choreDays, choreDays.indexOf(true), 'monthly'));
}

const getNewChores = (oldChoreDays, tappedChoreIdx, choreFrequency) => {
    if (choreFrequency === 'monthly')
        return oldChoreDays.map((e,i) => i === tappedChoreIdx ? true : false );
    return oldChoreDays.map((e,i) => i === tappedChoreIdx ? !e : e );
}

const CreateChoreView = ({
    match: {path},
    updateForm,
    choreName = "",
    choreDays = [],
    monthlyChoreInterval,
    choreFrequency,
    chorePriority,
    kidsList=[],
    choreAppliedTo = [],
    toggleKidSelection,
    submitChore,
    submitting,
    modalVisible,
    modalText,
    choreSuggestions
 }) => (
    <FullPageWithModal style={{backgroundColor: lightGreyBG}} modalVisible={modalVisible} modalText={modalText}>
        <Header/>
        <ScrollView style={{flex:1, alignSelf: 'stretch'}}>
            {console.log(choreSuggestions)}
            <KKTextInput
                style={styles.nameInput}
                placeholder={"Enter Chore Name"}
                value={choreName}
                onChangeText={text=> updateForm('choreName', text) }
            />
            {
                !!choreName && !!(choreName.length > 0) && !!choreSuggestions && !!(choreSuggestions.length > 0) &&
                    !(choreSuggestions.length === 1 && choreSuggestions[0].name === choreName) &&
                    <AutoCompleteSuggestions
                        suggestions={choreSuggestions}
                        onPressSuggestion={selectedText => updateForm('choreName', selectedText)}
                    />
            }
            <Text style={styles.textLabel}>How often would you like the chore done?</Text>
            <View style={styles.row}>
                {
                    ["M", "T", "W", "R", "F", "S", "S"].map((label, idx) =>
                        <RadioWidget key={idx} label={label} active={choreDays[idx]}
                               onPress={() => updateForm('choreDays', getNewChores(choreDays, idx, choreFrequency))}
                        />
                    )
                }
            </View>

            <Text style={styles.textLabel}>Select Chore Frequency</Text>
            <Picker
                style={styles.picker}
                selectedValue={choreFrequency}
                onValueChange={ val => {
                    if (val === 'monthly') adjustDaySelectionForMonthly(choreDays, updateForm);
                    updateForm('choreFrequency', val);
                }}
            >
                <Picker.Item label={"Weekly"} value={'weekly'} />
                <Picker.Item label={"Monthly"} value={'monthly'} />
            </Picker>

            {
                choreFrequency === 'monthly' &&
                    <React.Fragment>
                        <Text style={styles.textLabel}>Select Day for Monthly Chore</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            {
                                [`First ${getSelectedDay(choreDays, updateForm)} in Month`,
                                    `Last ${getSelectedDay(choreDays, updateForm)} in Month`
                                ].map((label, idx) =>
                                    <RadioWidget key={idx} label={label} active={monthlyChoreInterval === idx}
                                               onPress={() => updateForm('monthlyChoreInterval', idx)}
                                    />
                                )
                            }
                        </View>
                    </React.Fragment>
            }

            <Text style={styles.textLabel}>What level priority is this chore?</Text>
            <SliderWidget value={chorePriority} onChange={newVal => updateForm('chorePriority', newVal)}/>

            <Text style={styles.textLabel}>Chore Applied to:</Text>
            <View style={[styles.row, styles.bottomMargin]}>
                {
                    kidsList.map(kid => (
                        <KidSelection
                            key={kid._id}
                            selected={choreAppliedTo.indexOf(kid._id)!== -1}
                            onPress={()=>toggleKidSelection(kid._id)}>
                            <KidAvatar {...kid} />
                        </KidSelection>
                    ))
                }
            </View>
            <View style={[styles.bottomMargin, {alignItems: 'center'}]}>
                <KKButton type={"primary"} onPress={!submitting ? submitChore : ()=>""}>
                    {submitting? 'PLEASE WAIT' : 'SAVE'}
                </KKButton>
            </View>
        </ScrollView>

    </FullPageWithModal>
);


const styles = StyleSheet.create({
    nameInput: {
        margin: width * 0.08,
        elevation: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignSelf: 'stretch',
        margin: width * 0.05
    },
    dayWidget: {
        paddingHorizontal: width * 0.025,
        alignItems: 'center',
        flex: 1
    },
    textLabel: {
        margin: width * 0.03,
        marginTop: width * 0.06,
        textAlign: 'center',
        color: shuttleGreyDark
    },
    radioLabel: {
        color: shuttleGreyDark,
        fontSize: width * 0.05,
        textAlign: 'center',
        alignSelf: 'stretch'
    },
    radio: {
        width: width * 0.065,
        height: width * 0.065,
        borderWidth: 2,
        borderRadius: width * 0.065,
        borderColor: fountainBlue,
    },
    activeRadio: {
        backgroundColor: fountainBlue,
        borderColor: shuttleGreyDark
    },
    picker: {
        width: width * 0.65,
        alignSelf: 'center',
        marginBottom: height * 0.02
    },
    bottomMargin: {
        marginBottom: height * 0.1
    },
});

export default observer(CreateChoreView);