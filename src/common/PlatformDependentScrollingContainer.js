import React from 'react';
import {KeyboardAvoidingView, Platform} from "react-native";
import FullPageWithModal from "./FullPageWithModal";

//android works fine without being wrapped around keyboardavoidingview
//ios needs the keyboardavoidingview outside the fullpagewithmodal
const PlatformDependentScrollingContainer = ({children, modalVisible, modalClose, renderModalContents}) => {
    if (Platform.OS === 'ios'){
        return (
            <KeyboardAvoidingView behavior='padding' style={{alignSelf: 'stretch', flex:1}}>
                <FullPageWithModal
                    modalVisible={modalVisible}
                    modalClose={modalClose}
                    renderModalContents={renderModalContents()}
                >
                    {children}
                </FullPageWithModal>
            </KeyboardAvoidingView>
        )
    }
    return (
        <FullPageWithModal
            modalVisible={modalVisible}
            modalClose={modalClose}
            renderModalContents={renderModalContents()}
        >
            {children}
        </FullPageWithModal>
    );
};

export default PlatformDependentScrollingContainer;