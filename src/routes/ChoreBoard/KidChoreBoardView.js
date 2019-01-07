import React, {Fragment} from "react";
import ItemTile from "../../common/ItemTile";
import {Dimensions, ScrollView, StyleSheet, TouchableOpacity, View, FlatList} from "react-native";
import PropTypes from 'prop-types';
import Header from "../../common/Header";
import FullPageWithModal from "../../common/FullPageWithModal";
import Text from "../../common/KKText";
import {fountainBlue, shuttleGrey, shuttleGreyDark} from "../../colors";
import {Ionicons} from 'react-native-vector-icons';

const{width, height} = Dimensions.get('window');
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

const KidChoreBoardView = ({chores, pastChores, modalVisible, modalText, onRequestCompleteChore, modalAccept, modalDeny, modalClose}) => (
    <FullPageWithModal
        modalVisible={modalVisible}
        renderModalContents={renderModalContents(modalText, modalAccept, modalClose)}
        modalClose={modalClose}
        style={{flex: 1, alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center'}}>
        <Header leftAction={"avatarButton"} />
        <FlatList
            style={{flex:1, alignSelf: 'stretch'}}
            data={[
                {key: 'yo', label: 'Upcoming Chores'},
                ...chores,
                {key: 'asdfg', label: 'Past Activity'},
                ...pastChores
                ]}
            keyExtractor={(item, index) => item.key || item._id || index+''}
            renderItem={({item}) => renderRow(item, onRequestCompleteChore)}
        />
    </FullPageWithModal>
);

const renderRow = (item, onRequestCompleteChore) => {
    if (item.label)
        return (
            <Text key={item.key} style={{color: fountainBlue, textAlign: 'center', fontSize: width * 0.05}}>{item.label}</Text>
        );

    let dotColor, disabled = true;
    if (item.type === 'delinquent') dotColor = 'red';
    if (item.repetitionRule){
        dotColor = '#ff8d43';
        disabled=false;
    }
    return (
        <TouchableOpacity key={item._id} onPress={disabled? ()=>'' : ()=>onRequestCompleteChore(item._id)}>
            <ItemTile
                mainCaption={item.name}
                subCaption={item.notes}
                dotColor={dotColor}
                disabled={disabled}
            />
        </TouchableOpacity>
    );
}



KidChoreBoardView.propTypes = {
    chores: PropTypes.array.isRequired,
};
/*
<ScrollView style={{flex:1, alignSelf: 'stretch'}}>
    <Text style={{color: fountainBlue, textAlign: 'center', fontSize: width * 0.05}}>Your Upcoming Chores:</Text>
    {
        chores
            .map((chore) => (
                <TouchableOpacity key={chore._id} onPress={()=>onRequestCompleteChore(chore._id)}>
                    <ItemTile
                        mainCaption={chore.name}
                        subCaption={chore.notes}
                    />
                </TouchableOpacity>
            ))
    }
</ScrollView>*/


export default KidChoreBoardView;