import React from 'react';
import {
    View,
    Dimensions,
    StyleSheet
} from 'react-native';
import Text from '../../common/KKText';
import ItemTile from "../../common/ItemTile";
import Header from "../../common/Header";
import familyUnitRepository from '../../stores/FamilyUnitDataStore';
import KidAvatar from "../../common/KidAvatar";
import {observer} from "mobx-react";

const ChoreBoardView = ({match:{path}, chores=[], defaultChores=[], ...props}) => (
    <View style={{flex: 1, alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center'}}>
        {console.log('!@#!@$!@#!@#!@#@Q', familyUnitRepository)}
        <Header leftAction={"avatarButton"} rightAction="addChore"/>
        {
            familyUnitRepository && Array.isArray(familyUnitRepository.kidsList) &&
            familyUnitRepository.kidsList.map(kid => (
                <KidAvatar {...kid} key={kid._id} />
            ))
        }
        {
            defaultChores.map((chore) => (
                <ItemTile key={chore._id} mainCaption={chore.name} subCaption={"due _day"} />
            ))
        }
        {
            chores.map((chore) => (
                <ItemTile key={chore._id} mainCaption={chore.name} subCaption={"due _day"} />
            ))
        }
    </View>
);

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({

});

export default observer(ChoreBoardView);