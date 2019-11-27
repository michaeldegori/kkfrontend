import {Dimensions} from "react-native";
const globalFontFamily = 'Montserrat';
const globalFontFamilySemiBold = 'Montserrat Medium';

const {width} = Dimensions.get('window');
const scaleRatio = width < 500 ? width/360 : (width - 360)*.5/360 + 1


export {
    globalFontFamily,
    globalFontFamilySemiBold,
    scaleRatio
};