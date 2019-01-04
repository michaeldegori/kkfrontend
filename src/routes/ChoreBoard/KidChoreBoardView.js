import React, {Fragment} from "react";
import ItemTile from "../../common/ItemTile";
import {Dimensions, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
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

const KidChoreBoardView = ({chores, modalVisible, modalText, onRequestCompleteChore, modalAccept, modalDeny, modalClose}) => (
    <FullPageWithModal
        modalVisible={modalVisible}
        renderModalContents={renderModalContents(modalText, modalAccept, modalClose)}
        modalClose={modalClose}
        style={{flex: 1, alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center'}}>
        <Header leftAction={"avatarButton"} />
        <ScrollView style={{flex:1, alignSelf: 'stretch'}}>
            <Text style={{color: fountainBlue, textAlign: 'center', fontSize: width * 0.05}}>Your Chores:</Text>
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
        </ScrollView>
    </FullPageWithModal>
);

KidChoreBoardView.propTypes = {
    chores: PropTypes.array.isRequired,
};


export default KidChoreBoardView;