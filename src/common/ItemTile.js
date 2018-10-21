import React from 'react';
import Text from'./KKText';
import {
    View,
    Dimensions,
    StyleSheet
} from 'react-native';
import {lightGrey, fountainBlue} from "../colors";

const ItemTile = ({iconSrc, mainCaption, subCaption="", renderRightItem }) => (
    <View style={styles.mainContainer}>
        <View style={styles.innerContainer}>
            <View style={styles.imgContainer}>

            </View>
            <View style={styles.captionContainer}>
                <Text style={styles.mainCaption}>{mainCaption}</Text>
                <Text style={styles.subCaption}>{subCaption}</Text>
            </View>
            {
                renderRightItem ? renderRightItem() : <View style={styles.indicatorContainer} />
            }
        </View>
    </View>
);

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    mainContainer: {
        borderRadius: 10,
        alignSelf: 'stretch',
        margin: width * 0.03,
        padding: width * 0.03,
        borderColor: lightGrey,
        borderWidth: 1
    },
    innerContainer: {
        flexDirection: 'row'
    },
    imgContainer: {
        width: 54/375 * width,
        height: 54/375 * width,
        borderRadius: 54/375 * width,
        backgroundColor: fountainBlue
    },
    captionContainer: {
        marginHorizontal: width * 0.02,
        flex: 1
    },
    indicatorContainer: {
        width: Math.round(10/375 * width),
        height: Math.round(10/375 * width),
        borderRadius: Math.round(10/375 * width),
        backgroundColor: '#00FF33',
        alignSelf: 'center'
    },
    mainCaption: {
        fontSize: 14
    },
    subCaption: {
        color: lightGrey,
        fontSize: 11
    }
});

export default ItemTile;