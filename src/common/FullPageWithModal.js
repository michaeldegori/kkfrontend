import React from 'react';
import {Modal, StyleSheet, View, Dimensions, TouchableOpacity} from 'react-native';
import FullPage from "./FullPage";
import Text from "./KKText";
import {fountainBlue, lightGrey, shuttleGrey, shuttleGreyDark} from "../colors";
import PropTypes from 'prop-types';
import {Ionicons} from 'react-native-vector-icons';
import Row from "./Row";

/* OLD BUTTONS
                    <TouchableOpacity onPress={modalAccept}>
                        <Ionicons size={width * 0.15} color={fountainBlue} name={"ios-checkmark-circle-outline"} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={modalDeny}>
                        <Ionicons size={width * 0.15} color={shuttleGrey} name={"ios-remove-circle-outline"} />
                    </TouchableOpacity>


 */

const {width, height} = Dimensions.get("window");
const FullPageWithModal = ({children, style, modalVisible, modalClose, renderModalContents=()=>null, ...props}) => (
    <FullPage style={style}>
        {children}
        <Modal
            visible={modalVisible}
            transparent={true}
            animationType="fade"
            style={styles.modalTransparentPart}
            onRequestClose={() => ""}
        >
            <View style={styles.modal}>
                <TouchableOpacity onPress={modalClose} style={styles.closeBtn}>
                    <Ionicons size={width * 0.1} color={lightGrey} name={"ios-close"} />
                </TouchableOpacity>
                {renderModalContents()}
            </View>
        </Modal>
    </FullPage>
);

FullPageWithModal.propTypes = {
    modalVisible: PropTypes.bool.isRequired,
    modalClose: PropTypes.func.isRequired,
    renderModalContents: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    modalTransparentPart: {flex:1, alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center'},
    modal:  {
        backgroundColor: '#FFFFFE',
        width: width * 0.8,
        minHeight: height * 0.36,
        maxHeight: height * 0.66,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: width * 0.1,
        marginTop: height * 0.2,
        elevation: 4,
        padding: 10,
        paddingTop: 0,
        shadowColor: '#333',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.5,
        overflow: 'visible'
    },
    closeBtn:{
        padding: 6,
        paddingLeft: 20,
        alignSelf: 'flex-end'
    },
})

export default FullPageWithModal;