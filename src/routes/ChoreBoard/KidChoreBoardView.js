import React from "react";
import Link from "react-router-native/Link";
import ItemTile from "../../common/ItemTile";
import {ScrollView, TouchableOpacity} from "react-native";
import PropTypes from 'prop-types';
import Header from "../../common/Header";
import FullPageWithModal from "../../common/FullPageWithModal";

const KidChoreBoardView = ({chores, modalVisible, modalText, onRequestCompleteChore, modalAccept, modalClose}) => (
    <FullPageWithModal
        modalVisible={modalVisible}
        modalText={modalText}
        modalAccept={modalAccept}
        modalClose={modalClose}
        style={{flex: 1, alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center'}}>
        <Header leftAction={"avatarButton-kid"} />
        <ScrollView style={{flex:1, alignSelf: 'stretch'}}>

            {
                chores
                    .map((chore) => (
                        <TouchableOpacity key={chore._id} onPress={()=>onRequestCompleteChore(chore._id)}>
                            <ItemTile
                                mainCaption={chore.name}
                                subCaption={""}
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