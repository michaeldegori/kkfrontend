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

const renderModalContents = (modalText, modalAccept, modalDeny) => () => (
    <Fragment>
        <Text style={{color: shuttleGreyDark, textAlign: 'center', marginBottom: height * 0.05}}>{modalText}</Text>
        <View style={{alignSelf: 'stretch', alignItems: 'center', marginBottom: height * 0.03}}>
            <TouchableOpacity style={[styles.modalBtn, {borderColor: fountainBlue}]} onPress={modalAccept} >
                <Ionicons style={{marginHorizontal: width * 0.02}} size={width * 0.1} color={fountainBlue} name={"ios-checkmark-circle-outline"} />
                <Text style={{color: fountainBlue, marginLeft: 8, flex:1}}>Approve Chore</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalBtn, {borderColor: shuttleGrey}]} onPress={modalDeny} >
                <Ionicons style={{marginHorizontal: width * 0.02}} size={width * 0.1} color={shuttleGrey} name={"ios-arrow-dropleft"} />
                <Text style={{color: shuttleGrey, marginLeft: 8, flex:1}}>Deny Chore</Text>
            </TouchableOpacity>
        </View>
    </Fragment>
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
        <Text style={{color: fountainBlue,fontSize: width * 0.05, textAlign: 'center'}}>Alerts</Text>
        <ScrollView>
            {
                (!alerts || !alerts.length)
                    ? <EmptyState loading={loading}/>
                    : alerts.filter(a => a.recipient === 'parent').map((alert)=> {
                            const {_id, kid: kidId, chore: choreId, timeStamp, customNote, isTappable} = alert;
                            const kidObj = kidsList.find(k => k._id === kidId);
                            const choreObj = chores.find(c => c._id === choreId);
                            if (!isTappable)
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