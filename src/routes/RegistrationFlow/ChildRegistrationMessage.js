import React from 'react';
import {
    Dimensions
} from 'react-native';
import FullPage from "../../common/FullPage";
import Header from "../../common/Header";
import Text from '../../common/KKText';

const {width} = Dimensions.get("window");
const ChildRegistrationMessage = props => (
    <FullPage>
        <Header/>
        <FullPage style={{justifyContent: 'center'}}>
            <Text style={{textAlign: 'center', margin: 20, fontSize: width * 0.06}}>
                You must get your parent or guardian to register and sign in before you can use the Kiddie Kredit app.
            </Text>
        </FullPage>
    </FullPage>
);


export default ChildRegistrationMessage;