import React from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    ImageBackground,
    TouchableOpacity, Modal
} from 'react-native';
import FullPage from "../../common/FullPage";
import {MaterialCommunityIcons, Octicons} from 'react-native-vector-icons';
import Header from "../../common/Header";
import Text from "../../common/KKText";
import {fountainBlue, shuttleGrey} from "../../colors";
import {Link, Switch} from "react-router-native";
import KidAvatar from "../../common/KidAvatar";
import {observer} from "mobx-react";
import PostRegOnboarding1 from "../onboarding/PostRegOnboarding1";
import PostRegOnboarding2 from "../onboarding/PostRegOnboarding2";
import {scaleRatio} from "../../configuration";

const {width, height} = Dimensions.get("window");
//onDeleteChild is how we determine if we are in parent or child view
const AccountManagerView = (
    {
        history,
        kidsList=[],
        switchToChild,
        switchToOtherAdmin,
        onDeleteChild,
        switchToParent=()=>"",
        parentLabel,
        parentAvatar,
        adminsList=[],
        parentId,
        onDeleteAdmin,
        ...props
    }) => (
    <FullPage>
        <Header history={history} rightAction="logout"/>
        <View style={styles.iconRow}>
            <TouchableOpacity style={styles.badge} onPress={switchToParent}>
                <View style={styles.largeCircle}>
                    {
                        typeof parentAvatar === 'string' && parentAvatar.length > 5 &&
                            <ImageBackground source={{uri: parentAvatar}} style={styles.avatarImg}>
                                <Text style={styles.avatarTextLabel}> </Text>
                            </ImageBackground>
                    }
                </View>
                <Text semiBold style={{fontSize: 16*scaleRatio, color: shuttleGrey}}>{parentLabel}</Text>
            </TouchableOpacity>

        </View>
        {/*KIDS ROW*/}
        <View style={styles.iconRow}>
            {
                kidsList.map(kid => (
                    <TouchableOpacity
                        onPress={()=>switchToChild(kid)}
                        key={kid._id} onLongPress={onDeleteChild ? () => onDeleteChild(kid) : ()=>""}
                        style={{padding: width * 0.01}}
                    >
                        <KidAvatar {...kid} />
                    </TouchableOpacity>
                ))
            }
            {
                onDeleteChild &&
                <Link style={styles.badge} to={"/maintabscreen/addfamilyunitmember"}>
                    <React.Fragment>
                        <MaterialCommunityIcons name="plus-circle" style={styles.plusIcon2} />

                        <Text semiBold style={{fontSize: 12*scaleRatio, color: fountainBlue}}>
                            Add a child
                        </Text>
                    </React.Fragment>
                </Link>
            }
        </View>
        {/*FAMILY ADMINS*/}
        {
            onDeleteChild &&
            <View style={styles.adminCol}>
                <Text style={styles.sideLabel}>Family</Text>
                <Text style={styles.sideLabel}>Admins:</Text>
                {
                    adminsList.length > 0 &&
                    adminsList.filter(admin => admin._id !== parentId).map(admin => //this variable can be an email string or a user object
                        <TouchableOpacity
                            style={styles.badge}
                            key={admin._id || admin}
                            onPress={()=> switchToOtherAdmin(admin.email || admin)}
                            onLongPress={() => onDeleteAdmin(admin)}
                        >
                            <Octicons name={"person"} style={styles.icon} />
                            <Text style={{fontSize: 7.2 * scaleRatio}}>{getAdminName(admin)}</Text>
                        </TouchableOpacity>
                    )
                }

                <Link style={styles.badge} to={"/maintabscreen/addfamilyadmin"} >
                    <>
                        <MaterialCommunityIcons name="plus-circle" style={[styles.plusIcon2, {fontSize: 36*scaleRatio}]} />
                        <Text semiBold style={{fontSize: 7.2*scaleRatio, color: fountainBlue}}>
                            Add Admin
                        </Text>
                    </>
                </Link>
            </View>
        }
    </FullPage>
);

const KidBadge = ({kid}) => (
    <View style={styles.badge}>
        <View style={styles.smallCircle}></View>
        <Text semiBold style={{fontSize: 12*scaleRatio, color: shuttleGrey}}>{kid.name}</Text>
    </View>
);

function getAdminName(admin){
    if (typeof admin === 'string') return admin.split("@")[0];
    if (typeof admin.firstName === 'string' && admin.firstName !== "undefined") return admin.firstName;
    if (typeof admin.email === 'string' && admin.email.length > 0) return admin.email.split("@")[0];
    return "unknown";
}

const styles = StyleSheet.create({
    adminCol: {
        position: 'absolute',
        right: 0,
        top: height * 0.1,
        padding: width * 0.025,
    },
    sideLabel: {
        textAlign: 'center',
        color: shuttleGrey,
        fontSize: 12*scaleRatio
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: height * 0.05,
        flexWrap: 'wrap'
    },
    badge: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    largeCircle: {
        width: 1/3 * width,
        height: 1/3 * width,
        borderRadius: 1/3 * width,
        overflow: 'hidden',
        backgroundColor: shuttleGrey,
        margin: width * 0.05
    },
    avatarImg:{
        width: 1/3 * width,
        height: 1/3 * width,
        borderRadius: 1/3 * width,
        justifyContent: 'flex-end'
    },
    avatarTextLabel: {
        color: 'white',
        textAlign: 'center',
        marginBottom: height * 0.025
    },
    smallCircle: {
        width: 1/6 * width,
        height: 1/6 * width,
        borderRadius: 1/6 * width,
        overflow: 'hidden',
        backgroundColor: shuttleGrey,
        margin: width * 0.03,
        marginBottom: 0,
        elevation: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        fontSize: 36*scaleRatio,
        color: fountainBlue,
        lineHeight: width * 0.1,
        justifyContent: 'center',
    },
    plusIcon2: {
        fontSize: 61*scaleRatio,
        color: fountainBlue,
        // lineHeight: 1/6 * width,
        justifyContent: 'center',
        // margin: width * 0.03,
        marginBottom: 0,
        borderRadius: width * 0.17
    }
});

export default observer(AccountManagerView);