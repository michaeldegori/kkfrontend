import React, {Component} from 'react';
import FullPage from "./FullPage";
import KidSelection from "./KidSelection";
import KidAvatar from "./KidAvatar";
import PropTypes from 'prop-types';
import AddButton from "./AddButton";
import {View} from "react-native";
import Text from "./KKText";
import Row from "./Row";


class SwipableKidSelection extends Component{
    state = {
        selectedChildId: null
    }
    selectChild = kidId => () => {
        if (kidId === this.state.selectedChildId && !this.props.isSelectionNullable) return;
        this.setState(state => ({
            selectedChildId: kidId === state.selectedChildId ? null : kidId
        }));
        if(this.props.onChangeKid) this.props.onChangeKid();
    }
    componentDidMount() {
        if (this.props.defaultChild) this.setState(state => ({selectedChildId: this.props.defaultChild}));
    }
    render(){
        const {kidsList, renderContents} = this.props;
        console.log(this.state);
        return (
            <FullPage>
                <Row>
                    {
                        kidsList.length > 0 ?
                            kidsList.map( kid => (
                                <KidSelection
                                    key={kid._id}
                                    selected={kid._id === this.state.selectedChildId}
                                    onPress={this.selectChild(kid._id)}>
                                    <KidAvatar {...kid} />
                                    {console.log(kid._id === this.state.selectedChildId)}
                                </KidSelection>))
                            : <View>
                                <AddButton route="/maintabscreen/addfamilyunitmember" />
                                <Text>Add Child</Text>
                            </View>
                    }
                </Row>
                {
                    renderContents(this.state.selectedChildId)
                }
            </FullPage>
        );
    }
}

SwipableKidSelection.propTypes = {
    kidsList: PropTypes.array.isRequired,
    renderContents: PropTypes.func.isRequired, // function taking a null or a child index in kidsList to display their rewards/chores/etc
    defaultChild: PropTypes.string,
    isSelectionNullable: PropTypes.bool.isRequired,
    onChangeKid: PropTypes.func
};

export default SwipableKidSelection;