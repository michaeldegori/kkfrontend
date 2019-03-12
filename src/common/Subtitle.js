import React from 'react';
import Text from "./KKText";
import {fountainBlue} from "../colors";
import {scaleRatio} from "../configuration";


export default function Subtitle({children, style, ...props}){
    return (
        <Text style={[{color: fountainBlue, textAlign: 'center', fontSize: 18 * scaleRatio}, style||{}]} {...props}>
            {children}
        </Text>
    )
}