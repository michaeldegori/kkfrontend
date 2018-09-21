import React from "react";
import {
    View
} from 'react-native';
import Text from '../../common/KKText';

const ChoreBoardContainer = ({match:{path}}) => (
    <View style={{flex: 1, alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center'}}>
        <Text>{path.split("/")[path.split("/").length - 1]} Screen</Text>
    </View>
);

export default ChoreBoardContainer;