import React from 'react';
import {Modal, StyleSheet, View, Dimensions} from 'react-native';
import FullPage from "./FullPage";
import Text from "./KKText";
import {shuttleGreyDark} from "../colors";
import PropTypes from 'prop-types';

const FullPageWithModal = ({children, style, modalVisible, modalText, ...props}) => (
    <FullPage style={style}>
        {children}
        <Modal
            visible={modalVisible}
            transparent={true}
            animationType="fade"
            style={{flex:1, alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center'}}
            onRequestClose={() => ""}
        >
            <View style={styles.modal}>
                <Text style={{color: shuttleGreyDark}}>{modalText}</Text>
            </View>
        </Modal>
    </FullPage>
);

FullPageWithModal.propTypes = {
    modalVisible: PropTypes.bool.isRequired,
    modalText: PropTypes.string.isRequired
};

const {width, height} = Dimensions.get("window");
const styles = StyleSheet.create({
    modal:  {
        backgroundColor: '#ECEEEE',
        width: width * 0.7,
        height: height * 0.3,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: width * 0.15,
        marginVertical: height * 0.25,
        elevation: 4
    }
})

export default FullPageWithModal;