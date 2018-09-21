import React, {Component} from "react";
import {Text} from "react-native";
import {globalFontFamily, globalFontFamilySemiBold, globalFontFamilyBold} from '../configuration';
import PropTypes from 'prop-types';

export default class KKText extends Component{
    constructor(props){
        super(props)
    }
    static propTypes = Text.propTypes;
    setNativeProps = (np)=>{
        this._root.setNativeProps(np);
    }
    render(){
        let {style, ...props} = this.props;
        let fontFamily =  globalFontFamily;
        if (props.semiBold) fontFamily = globalFontFamilySemiBold;
        if (props.bold) fontFamily = globalFontFamilyBold;
        return (
            <Text style={[{fontFamily}, style]} ref={r=>this._root=r} {...props} >
                {props.children}
            </Text>
        );
    }
}