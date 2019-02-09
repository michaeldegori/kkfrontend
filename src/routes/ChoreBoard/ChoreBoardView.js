import React from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import Text from '../../common/KKText';
import ItemTile from "../../common/ItemTile";
import Header from "../../common/Header";
import SwipableKidSelection from "../../common/SwipableKidSelection";
import EmptyState from "../../common/EmptyState";
import {fountainBlue, lightGrey} from "../../colors";

const ChoreBoardView = ({match:{path}, chores=[], kidsList=[], deleteChore, navigateToEditChore, ...props}) => (
    <View style={{flex: 1, alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center'}}>
        <Header leftAction={"avatarButton"} rightAction="addChore" />
        <Text style={{color: fountainBlue,fontSize: width * 0.05, textAlign: 'center'}}>Chore Board</Text>
        {
            kidsList.length === 0 ?
                <EmptyState loading={false} /> :
                chores.length === 0 ?
                    <EmptyState loading={false} type={"chores"}/> :
                    <SwipableKidSelection
                        kidsList={kidsList.toJS?kidsList.toJS():[]}
                        renderContents={renderChoresList(kidsList, chores, deleteChore, navigateToEditChore)}
                        isSelectionNullable={true}
                    />
        }
    </View>
);

const renderChoresList = (kidsList=[], chores=[], deleteChore, navigateToEditChore) => selectedChildId =>
    chores.length > 0 ?
        <ScrollView style={{flex:1, alignSelf: 'stretch'}}>
            {
                chores
                    .filter(chore => !chore.deleted)
                    .filter(chore => {
                        let kidsWithThisChore = kidsList.filter(kid => (kid.assignedChores||[]).includes(chore._id)).map(kid => kid._id);
                        return kidsWithThisChore.includes(selectedChildId) || selectedChildId === null;
                    })
                    .map((chore) => {
                        let kidsWithThisChore = kidsList.filter(kid => (kid.assignedChores||[]).includes(chore._id));
                        if (kidsWithThisChore.length === 0) kidsWithThisChore = [{name: "Not assigned"}];
                        return (
                            <TouchableOpacity onPress={()=>navigateToEditChore(chore._id)} onLongPress={()=>deleteChore(chore)} key={chore._id}>
                                <ItemTile
                                    mainCaption={chore.name}
                                    subCaption={kidsWithThisChore.map(kid => kid.name).join(", ")}
                                />
                            </TouchableOpacity>
                        );
                    })
            }
        </ScrollView> :
        <Text style={styles.label}> No chores yet. Create chores by tapping the top right button </Text>

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    label: {
        color: lightGrey,
        alignSelf: 'stretch',
        textAlign: 'center',
        marginHorizontal: width * 0.03,
        fontSize: width * 0.04,
        marginTop: height * 0.02
    },
});

export default ChoreBoardView;