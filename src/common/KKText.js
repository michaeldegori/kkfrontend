import React, {Component} from "react";
import {Text} from "react-native";
import {globalFontFamily, globalFontFamilySemiBold} from '../configuration';
import PropTypes from 'prop-types';

export default class KKText extends Component{
    static propTypes = Text.propTypes;
    setNativeProps = (np)=>{
        this._root.setNativeProps(np);
    }
    render(){
        let {style, ...props} = this.props;
        let fontFamily =  globalFontFamily;
        let overrideStyle = {fontFamily};
        if (props.semiBold) {
            overrideStyle.fontFamily = globalFontFamilySemiBold;
            overrideStyle.letterSpacing = 2;
        }
        return (
            <Text style={[overrideStyle, style]} ref={r=>this._root=r} {...props} >
                {props.children}
            </Text>
        );
    }
}