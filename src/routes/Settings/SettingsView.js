import React from "react";
import {
    View
} from 'react-native';
import Text from '../../common/KKText';
import FullPage from "../../common/FullPage";
import Header from "../../common/Header";

const SettingsView = ({match:{path}}) => (
    <FullPage>
        <Header/>
        <Text>{path.split("/")[path.split("/").length - 1]} Screen</Text>
    </FullPage>
);

export default SettingsView;