import React, {Fragment} from "react";
import {
    TouchableOpacity,
    Dimensions,
    ScrollView, View,
    StyleSheet
} from 'react-native';
import Text from '../../common/KKText';
import {Ionicons} from 'react-native-vector-icons';
import Header from "../../common/Header";
import EmptyState from "../../common/EmptyState";
import ItemTile from "../../common/ItemTile";
import FullPageWithModal from "../../common/FullPageWithModal";
import {fountainBlue, shuttleGrey, shuttleGreyDark} from "../../colors";
import {scaleRatio} from "../../configuration";
import AdultModalContent from "../../common/AdultModalContent";
const renderModalContents = (modalText, modalAccept, modalDeny) => () => (
    <AdultModalContent
        modalText={modalText}
        modalAccept={modalAccept}
        modalDeny={modalDeny}
        acceptLabel={'Approve Chore'}
        denyLabel={'Deny Chore'}
    />
);

const{width, height} = Dimensions.get('window');
const AlertView = ({
    match:{path},
    alerts=[],
    kidsList,
    chores,
    loading,
    handleTapChore,
    modalVisible,
    modalText,
    modalAccept,
    modalDeny,
    modalClose
}) => (
    <FullPageWithModal modalVisible={modalVisible} modalClose={modalClose} renderModalContents={renderModalContents(modalText, modalAccept, modalDeny)}>
        <Header leftAction={'avatarButton'} rightAction="deleteAlerts"/>
        <Text style={{color: fountainBlue,fontSize: 18 * scaleRatio, textAlign: 'center'}}>Alerts</Text>
        <ScrollView>
            {
                (!alerts || !alerts.length)
                    ? <EmptyState loading={loading}/>
                    : alerts.filter(a => a.recipient === 'parent').map((alert, idx)=> {
                        const {_id, kid: kidId, chore: choreId, isTappable, doneChoreId} = alert;
                        const kidObj = kidsList.find(k => k._id === kidId);
                        const choreObj = chores.find(c => c._id === choreId);
                        if (!kidObj || !choreObj) {
                            console.log(alerts);
                            return null;
                        }
                        let doneChoreObj;
                        if (doneChoreId) {
                            doneChoreObj = kidObj.doneChores.find(doneChore => doneChore._id === doneChoreId);
                        }

                        if (!isTappable || (doneChoreObj && doneChoreObj.status === 'approved'))
                            return <ItemTile key={_id} mainCaption={alert.notificationBody} subCaption={`${kidObj.name} - ${choreObj.name}`} disabled={true} />;

                        return (
                            <TouchableOpacity key={_id} onPress={()=>handleTapChore(alert, choreObj, kidObj)}>
                                <ItemTile mainCaption={alert.notificationBody} subCaption={`${kidObj.name} - ${choreObj.name}`}  />
                            </TouchableOpacity>
                        );
                    })
            }
        </ScrollView>
    </FullPageWithModal>
);

const styles = StyleSheet.create({
    modalBtn: {
        width: 0.7 * width,
            borderRadius: 8,
            borderWidth: 2,
            backgroundColor: 'white',
            flexDirection: 'row',
            marginBottom: width * 0.015,
            justifyContent: 'center',
            alignItems: 'center'
    }
});

export default AlertView;