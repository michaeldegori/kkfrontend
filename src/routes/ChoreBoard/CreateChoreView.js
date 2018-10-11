import React from "react";
import {
    View,
    TouchableOpacity,
    Dimensions,
    StyleSheet
} from 'react-native';
import Text from '../../common/KKText';
import FullPage from "../../common/FullPage";
import Header from "../../common/Header";
import KKTextInput from "../../common/KKTextInput";
import {fountainBlue, lightGreyBG, shuttleGreyDark} from "../../colors";

const DayWidget = ({label, active, onPress}) => (
    <TouchableOpacity onPress={onPress} style={styles.dayWidget}>
        <Text style={styles.radioLabel}>{label}</Text>
        <View style={[styles.radio, active? styles.activeRadio : {}]}></View>
    </TouchableOpacity>
);

const getNewChores = (oldChoreDays, tappedChoreIdx) => oldChoreDays.map((e,i) => i === tappedChoreIdx ? !e : e );

const CreateChoreView = ({
         match: {path},
         updateForm,
         choreName = "",
         choreDays = [],
         choreFrequency,
         chorePriority,
         choreAppliedTo = []
     }) => (
    <FullPage style={{backgroundColor: lightGreyBG}}>
        <Header/>
        <KKTextInput
            style={styles.nameInput}
            placeholder={"Chore Name"}
            value={choreName}
            onChangeText={text=> updateForm('choreName', text) }
        />
        <Text style={{textAlign: 'center'}}>How often would you like the chore done?</Text>
        <View style={styles.row}>
            {
                ["M", "T", "W", "R", "F", "S", "S"].map((label, idx) =>
                    <DayWidget key={idx} label={label} active={choreDays[idx]}
                           onPress={() => updateForm('choreDays', getNewChores(choreDays, idx))}
                    />
                )
            }
        </View>
    </FullPage>
);

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    nameInput: {
      margin: width * 0.08
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignSelf: 'stretch',
        margin: width * 0.05
    },
    dayWidget: {
        paddingHorizontal: width * 0.025,
        alignItems: 'center'
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
    }
});

export default CreateChoreView;