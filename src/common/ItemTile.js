import React from 'react';
import Text from'./KKText';
import {
    View,
    Dimensions,
    StyleSheet
} from 'react-native';
import {lightGrey, fountainBlue} from "../colors";
import PropTypes from 'prop-types';

const ItemTile = ({iconSrc, mainCaption, subCaption="", renderRightItem, disabled=false, dotColor }) => (
    <View style={styles.mainContainer}>
        <View style={styles.innerContainer}>
            {
                typeof iconSrc === 'string' && iconSrc.length > 2 &&
                <View style={styles.imgContainer}>

                </View>
            }
            <View style={styles.captionContainer}>
                <Text style={styles.mainCaption}>{mainCaption}</Text>
                <Text style={styles.subCaption}>{subCaption}</Text>
            </View>
            {
                renderRightItem ? renderRightItem() : <View style={[styles.indicatorContainer, dotColor? {backgroundColor: dotColor} : {}]} />
            }
        </View>
        {
            disabled && <View style={styles.overlay}></View>
        }
    </View>
);

ItemTile.propTypes = {
    iconSrc: PropTypes.string,
    mainCaption: PropTypes.string.isRequired,
    subCaption: PropTypes.string,
    renderRightItem: PropTypes.func,
    disabled: PropTypes.bool
};

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    mainContainer: {
        borderRadius: 10,
        alignSelf: 'stretch',
        margin: width * 0.03,
        padding: width * 0.03,
        borderColor: lightGrey,
        borderWidth: 1,
        overflow: 'hidden'
    },
    overlay:{
        backgroundColor: 'rgba(255,255,255,0.75)',
        // backgroundColor: 'red',
        position:'absolute',
        width: width * 0.94,
        height: height * 0.25
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