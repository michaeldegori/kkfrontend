import React from 'react';
import {
    View,
    Dimensions,
    StyleSheet, ScrollView
} from 'react-native';
import Text from '../../common/KKText';
import ItemTile from "../../common/ItemTile";
import Header from "../../common/Header";
import KidAvatar from "../../common/KidAvatar";
import {Link} from "react-router-native";
import SwipableKidSelection from "../../common/SwipableKidSelection";

const ChoreBoardView = ({match:{path}, chores=[], kidsList=[], ...props}) => (
    <View style={{flex: 1, alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center'}}>
        <Header leftAction={"avatarButton"} rightAction="addChore" />
        <SwipableKidSelection
            kidsList={kidsList.toJS?kidsList.toJS():[]}
            renderContents={renderChoresList(kidsList, chores)}
            isSelectionNullable={true}
        />
    </View>
);

const renderChoresList = (kidsList=[], chores=[]) => selectedChildId => (
    <ScrollView style={{flex:1, alignSelf: 'stretch'}}>
        {
            chores
                .filter(chore => {
                    let kidsWithThisChore = kidsList.filter(kid => kid.assignedChores.includes(chore._id)).map(kid => kid._id);
                    return kidsWithThisChore.includes(selectedChildId) || selectedChildId === null;
                })
                .map((chore) => {
                let kidsWithThisChore = kidsList.filter(kid => kid.assignedChores.includes(chore._id));
                if (kidsWithThisChore.length === 0) kidsWithThisChore = [{name: "Not assigned"}];
                return (
                    <Link to={`/maintabscreen/editchore/${chore._id}`} key={chore._id}>
                        <ItemTile mainCaption={chore.name} subCaption={kidsWithThisChore.map(kid => kid.name).join(", ")} />
                    </Link>
                );
            })
        }
    </ScrollView>
);

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({

});

export default ChoreBoardView;