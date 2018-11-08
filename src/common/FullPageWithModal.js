import React from 'react';
import {Modal, StyleSheet, View, Dimensions, TouchableOpacity} from 'react-native';
import FullPage from "./FullPage";
import Text from "./KKText";
import {fountainBlue, shuttleGrey, shuttleGreyDark} from "../colors";
import PropTypes from 'prop-types';
import {Ionicons} from 'react-native-vector-icons';
import Row from "./Row";

const {width, height} = Dimensions.get("window");
const FullPageWithModal = ({children, style, modalVisible, modalText, modalAccept, modalClose, ...props}) => (
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
                <Text style={{color: shuttleGreyDark, textAlign: 'center'}}>{modalText}</Text>
                <Row>
                    {
                        modalAccept &&
                            <TouchableOpacity onPress={modalAccept}>
                                <Ionicons size={width * 0.1} color={fountainBlue} name={"ios-checkmark"} />
                            </TouchableOpacity>
                    }
                    {
                        modalClose &&
                            <TouchableOpacity onPress={modalClose}>
                                <Ionicons size={width * 0.1} color={shuttleGrey} name={"ios-close"} />
                            </TouchableOpacity>
                    }
                </Row>
            </View>
        </Modal>
    </FullPage>
);

FullPageWithModal.propTypes = {
    modalVisible: PropTypes.bool.isRequired,
    modalText: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
    modal:  {
        backgroundColor: '#FFFFFE',
        width: width * 0.7,
        height: height * 0.3,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: width * 0.15,
        marginVertical: height * 0.25,
        elevation: 4,
        padding: 10,
        paddingTop: height * 0.05
    }
})

export default FullPageWithModal;