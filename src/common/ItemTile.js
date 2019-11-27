import React from 'react';
import Text from'./KKText';
import {
    View,
    Dimensions,
    StyleSheet
} from 'react-native';
import {lightGrey, fountainBlue, black} from "../colors";
import PropTypes from 'prop-types';
import {scaleRatio} from "../configuration";
import ProgressBar from "./ProgressBar";

const ItemTile = ({
    iconSrc,
    mainCaption,
    subCaption='',
    subCaptionType='string',
    renderRightItem,
    disabled=false,
    dotColor }) => (
    <View style={styles.mainContainer}>
        <View style={styles.innerContainer}>
            {
                typeof iconSrc === 'string' && iconSrc.length > 2 && !disabled &&
                <View style={styles.imgContainer}>

                </View>
            }
            <View style={styles.captionContainer}>
                <Text style={[styles.mainCaption, disabled ? styles.disabledCaption : {}]}>{mainCaption}</Text>
                {
                    subCaptionType === 'string'
                        ? <Text style={[styles.subCaption, disabled ? styles.disabledCaption : {}]}>{subCaption}</Text>
                        : <View style={{flexDirection: 'row', alignSelf: 'stretch', alignItems: 'center'}}>
                            <View style={{width:   width * .5, marginRight: width * 0.02}}>
                                <ProgressBar completionPercent={computeCompletionPercent(subCaption)} color={fountainBlue} />
                            </View>
                            <Text style={[styles.subCaption, disabled ? styles.disabledCaption : {}]}>{subCaption}</Text>
                        </View>
                }
            </View>
            {
                renderRightItem ? renderRightItem() : <View style={[styles.indicatorContainer, dotColor? {backgroundColor: dotColor} : {}]} />
            }
        </View>
    </View>
);

ItemTile.propTypes = {
    iconSrc: PropTypes.string,
    mainCaption: PropTypes.string.isRequired,
    subCaption: PropTypes.string,
    renderRightItem: PropTypes.func,
    disabled: PropTypes.bool
};

function computeCompletionPercent(subCaptionFraction) {
    const num = Number(subCaptionFraction.split('/')[0]);
    const denom = Number(subCaptionFraction.split('/')[1]);
    if (denom === 0) return 0;
    return Math.round(10 * num / denom) * 10;
}

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    mainContainer: {
        borderRadius: 15,
        alignSelf: 'stretch',
        marginHorizontal: width * 0.035,
        marginVertical:  height * 0.02,
        padding: height * 0.02,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
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
        fontSize: 14 * scaleRatio,
        color: black
    },
    subCaption: {
        color: lightGrey,
        fontSize: 11 * scaleRatio,
        height: 17 * scaleRatio,
    },
    disabledCaption: {
        color: lightGrey,
        opacity: 0.5
    }
});

export default ItemTile;