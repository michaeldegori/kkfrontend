import {Dimensions} from "react-native";
const globalFontFamily = 'Poppins';
const globalFontFamilySemiBold = 'Poppins SemiBold';
const globalFontFamilyBold = 'Poppins Bold';

const {width} = Dimensions.get('window');
const scaleRatio = width < 500 ? width/360 : (width - 360)*.5/360 + 1


export {
    globalFontFamily,
    globalFontFamilyBold,
    globalFontFamilySemiBold,
    scaleRatio
};