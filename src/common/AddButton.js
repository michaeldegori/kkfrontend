import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Animated
} from 'react-native';
import {fountainBlue} from "../colors";
import {MaterialCommunityIcons} from 'react-native-vector-icons';
import {Link} from "react-router-native";
import {scaleRatio} from "../configuration";

export default class AddButton extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            pulsatingAnim: new Animated.Value(1)
        };
        this.one = new Animated.Value(1);
        this.five = new Animated.Value(5);
    }
    componentDidMount() {
        if (!this.props.pulsating) return;

        Animated.loop(
            Animated.sequence([
                Animated.timing(
                    this.state.pulsatingAnim,
                    {
                        toValue: 0.2,
                        duration: 1000,
                    }
                ),
                Animated.timing(
                    this.state.pulsatingAnim,
                    {
                        toValue: 1,
                        duration: 1000,
                    }
                )
            ]),
            {
                iterations: 20
            }
        ).start();
    }
    render() {
        const {route} = this.props;
        return (
            <Animated.View
                style={{
                    opacity: this.state.pulsatingAnim,
                    transform: [{
                        scale: Animated.add(
                            Animated.divide(this.state.pulsatingAnim, this.five),
                            this.one
                        )
                    }]
                }}
            >
                <Link to={route} style={styles.button}>
                    <MaterialCommunityIcons name="plus" style={styles.plusIcon} />
                </Link>
            </Animated.View>
        );
    }
}

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    button: {
        backgroundColor: fountainBlue,
        width: width * 0.085,
        height: width * 0.085,
        marginRight: width * 0.085,
        borderRadius: width * 0.085,
        justifyContent: 'center',
        alignItems: 'center'
    },
    plusIcon: {
        color: 'white',
        fontSize: 18 * scaleRatio
    },
});
