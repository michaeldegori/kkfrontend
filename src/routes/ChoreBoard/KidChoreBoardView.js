import React, {Fragment} from "react";
import ItemTile from "../../common/ItemTile";
import {
    Dimensions,
    Platform,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ImageBackground,
} from "react-native";
import PropTypes from 'prop-types';
import Header from "../../common/Header";
import FullPageWithModal from "../../common/FullPageWithModal";
import Text from "../../common/KKText";
import {fountainBlue, fountainBlueDark, shuttleGrey, shuttleGreyDark} from "../../colors";
import EmptyState from "../../common/EmptyState";
import {scaleRatio} from "../../configuration";
import KidModalContent from "../../common/KidModalContent";
import LottieView from "lottie-react-native";

const renderModalContents = (modalText, modalAccept, modalClose) => () => (
    <KidModalContent
        modalText={modalText}
        modalAccept={modalAccept}
        modalClose={modalClose}
    />
);

class KidChoreBoardView extends React.PureComponent{
    state = {
        shouldHideAnimation: false
    }
    componentWillUnmount(){
        if (this.timer) clearTimeout(this.timer);
    }
    componentDidUpdate(){
        this.checkPlayAnimation();
    }
    componentDidMount(){
        this.checkPlayAnimation();
    }
    checkPlayAnimation = () => {
        if (!this.animation || this.animationHasPlayed || this.props.chores.length !== 1 || this.props.chores[0].img !== 'success') return;
        this.animation.play();
        this.animationHasPlayed = true;
        this.timer = setTimeout(() => this.setState({shouldHideAnimation: true}), 2500);
    }
    render() {
        const {chores, pastChores, modalVisible, modalText, onRequestCompleteChore, modalAccept, modalClose} = this.props;
        return (
            <FullPageWithModal
                modalVisible={modalVisible}
                renderModalContents={renderModalContents(modalText, modalAccept, modalClose)}
                modalClose={modalClose}
                style={{flex: 1, alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center'}}>
                <Header leftAction={"avatarButton"} lettersOnly={true} />
                <FlatList
                    style={{flex:1, alignSelf: 'stretch'}}
                    data={[
                        {key: 'yo', label: 'Upcoming Chores'},
                        ...chores,
                        {key: 'asdfg', label: 'Past Activity'},
                        ...pastChores
                    ]}
                    keyExtractor={(item, index) => item.key || item._id || index+''}
                    renderItem={({item}) => renderRow(item, onRequestCompleteChore)}
                />
                {
                    chores.length === 1 && chores[0].img === 'success' && !this.state.shouldHideAnimation &&
                    <LottieView
                        ref={r => this.animation = r}
                        style={styles.animation}
                        loop={false}
                        speed={Platform.OS === 'ios' ? 0.1 : 1}
                        source={require('../../../assets/animations/triangular-confetti.json')}
                    />
                }
            </FullPageWithModal>
        );
    }
}


const renderRow = (item, onRequestCompleteChore) => {
    if (item.label)
        return <Text key={item.key} style={{color: fountainBlue, textAlign: 'center', fontSize: 18 * scaleRatio}}>{item.label}</Text>;

    if (item.img === 'emptystate')
        return <EmptyState loading={false} />

    if (item.img === 'success')
        return (
            <ImageBackground source={require('../../../assets/images/confetti.png')} style={{width, height: width, justifyContent: 'center', alignItems: 'center' }} >
                <Text style={{color: fountainBlueDark, textAlign: 'center', fontSize: 28.8 * scaleRatio}}>Done</Text>
                <Text style={{color: fountainBlueDark, textAlign: 'center', fontSize: 28.8 * scaleRatio}}>For</Text>
                <Text style={{color: fountainBlueDark, textAlign: 'center', fontSize: 28.8 * scaleRatio}}>Today!</Text>
            </ImageBackground>
        )

    let dotColor, disabled = true;
    if (item.type === 'delinquent' || item.status==="denied") dotColor = 'red';
    if (item.repetitionRule){
        dotColor = '#ff8d43';
        disabled=false;
    }
    if (item.type === 'done' && item.status === 'unapproved') dotColor = '#ffe800';
    return (
        <TouchableOpacity key={item._id} onPress={disabled? ()=>'' : ()=>onRequestCompleteChore(item._id)}>
            <ItemTile
                mainCaption={item.name}
                subCaption={item.notes}
                dotColor={dotColor}
                disabled={disabled}
            />
        </TouchableOpacity>
    );
}



KidChoreBoardView.propTypes = {
    chores: PropTypes.array.isRequired,
};

const{width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    animation: {
        width,
        height,
        position: 'absolute',
        top: height * 0.1,
        left: 0,
        // ...Platform.select({
        //     ios: {
        //         width: height, left: -(height-width)/4
        //     },
        //     android: {
        //         width, left: 0
        //     }
        // })
    }
});



export default KidChoreBoardView;