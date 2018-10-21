import React from 'react';
import {
    View,
    Dimensions,
    StyleSheet, ScrollView
} from 'react-native';
import Text from '../../common/KKText';
import ItemTile from "../../common/ItemTile";
import Header from "../../common/Header";
import familyUnitRepository from '../../stores/FamilyUnitDataStore';
import KidAvatar from "../../common/KidAvatar";
import {observer} from "mobx-react";
import {Link} from "react-router-native";

const ChoreBoardView = ({match:{path}, chores=[], defaultChores=[], ...props}) => (
    <View style={{flex: 1, alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center'}}>
        {console.log('!@#!@$!@#!@#!@#@Q', familyUnitRepository)}
        <Header leftAction={"avatarButton"} rightAction="addChore" />
        <ScrollView style={{flex:1, alignSelf: 'stretch'}}>
            {
                familyUnitRepository && Array.isArray(familyUnitRepository.kidsList) &&
                familyUnitRepository.kidsList.map(kid => (
                    <KidAvatar {...kid} key={kid._id} />
                ))
            }
            {
                defaultChores.map((chore) => {
                    let kidsWithThisChore = familyUnitRepository.kidsList.filter(kid => kid.assignedChores.includes(chore._id));
                    if (kidsWithThisChore.length === 0) kidsWithThisChore = [{name: "Not assigned"}];
                    return (
                        <Link to={`/maintabscreen/editchore/default-${chore._id}`} key={chore._id}>
                            <ItemTile mainCaption={chore.name} subCaption={kidsWithThisChore.map(kid => kid.name).join(", ")} />
                        </Link>
                    );
                })
            }
            {
                chores.map((chore) => {
                    let kidsWithThisChore = familyUnitRepository.kidsList.filter(kid => kid.assignedChores.includes(chore._id));
                    if (kidsWithThisChore.length === 0) kidsWithThisChore = [{name: "Not assigned"}];
                    return (
                        <Link to={`/maintabscreen/editchore/${chore._id}`} key={chore._id}>
                            <ItemTile mainCaption={chore.name} subCaption={kidsWithThisChore.map(kid => kid.name).join(", ")} />
                        </Link>
                    );
                })
            }
        </ScrollView>
    </View>
);

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({

});

export default observer(ChoreBoardView);