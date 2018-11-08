import Text from "./KKText";
import {
    View,
    Dimensions,
    StyleSheet
} from "react-native";
import React from "react";


const AutoCompleteSuggestions = ({suggestions=[], onPressSuggestion=()=>""}) => (
    <View contentContainerStyle={styles.choreSuggestionsContainer}>
        {
            suggestions.map(choreSuggestion => (
                <Text onPress={()=>onPressSuggestion(choreSuggestion.name)} key={choreSuggestion._id} style={styles.choreSuggestion}>
                    {choreSuggestion.name}
                </Text>
            ))
        }
    </View>
);

const {width, height} = Dimensions.get("window");
const styles = StyleSheet.create({
    choreSuggestionsContainer: {
        width,
        height: height * 0.04,
        margin: width * 0.025,
        backgroundColor: 'white',
        position: 'absolute'
    },
    choreSuggestion: {
        textAlign: 'center',
        padding: width * 0.02,
        backgroundColor: 'white'
    },
});


export default AutoCompleteSuggestions;