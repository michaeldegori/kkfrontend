import React from 'react';
import {Dimensions, ActivityIndicator, View} from 'react-native';
import WebView from 'react-native-webview';
import FullPage from "../../common/FullPage";
import Header from "../../common/Header";
import {fountainBlue} from "../../colors";


const {width, height} = Dimensions.get('window');
export default class PrivacyPolicy extends React.Component{
    state = {
        loading: true
    }
    setLoading = loading => this.setState(() => ({loading}))
    render(){
        return (
            <FullPage>
                <Header />
                <WebView
                    source={{uri:'https://www.kiddiekredit.com/privacy-policy/'}}
                    style={{alignSelf: 'stretch', flex:1}}
                    onLoad={() => this.setLoading(false)}
                />
                {
                    this.state.loading &&
                    <View style={{justifyContent: 'center', alignItems: 'center', height: height*.7, width, backgroundColor: 'white', position: 'absolute', bottom:0, left:0}}>
                        <ActivityIndicator size={"large"} color={fountainBlue}/>
                    </View>
                }
            </FullPage>
        );
    }
}