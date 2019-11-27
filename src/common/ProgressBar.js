import React from 'react';
import {
    View,
    Dimensions,
    StyleSheet
} from 'react-native';

const {width, height} = Dimensions.get('window');
export default function ProgressBar({
    completionPercent,
    height=Math.floor(height*.02),
    color='#FFF'
}) {
    return (
        <View style={[styles.outerContainer, {borderColor: color}]}>
            {
                Array.from({length: 10})
                    .map((_, notch) => (
                    <View
                        key={notch+1}
                        style={[styles.progressNotch, {backgroundColor: (notch+1)*10 <= completionPercent ? color : 'transparent'}]}
                    />
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
   outerContainer: {
       margin: width * 0.025,
       height: height * 0.02,
       flexDirection: 'row',
       borderRadius: 10,
       overflow: 'hidden',
       borderWidth: 1,
   },
   progressNotch: {
       flex:1,
   }
});