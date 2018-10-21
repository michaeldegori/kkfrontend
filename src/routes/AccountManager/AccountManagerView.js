import React from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Image,
    TouchableOpacity
} from 'react-native';
import FullPage from "../../common/FullPage";
import {MaterialCommunityIcons} from 'react-native-vector-icons';
import Header from "../../common/Header";
import Text from "../../common/KKText";
import {fountainBlue, shuttleGrey} from "../../colors";
import {Link} from "react-router-native";
import KidAvatar from "../../common/KidAvatar";

const {width, height} = Dimensions.get("window");
const AccountManagerView = ({history, kidsList=[], ...props}) => (
    <FullPage>
        {console.log("#########AccountMgr", props)}
        <Header history={history} rightAction="logout"/>
        <View style={styles.iconRow}>
            <View style={styles.badge}>
                <View style={styles.largeCircle}></View>
                <Text semiBold style={{fontSize: width * 0.044, color: shuttleGrey}}>Me</Text>
            </View>

        </View>
        <View style={styles.iconRow}>
            {
                kidsList.map(kid => (
                    <KidAvatar {...kid} key={kid._id} />
                ))
            }
            <Link style={styles.badge} to={"/maintabscreen/addfamilyunitmember"}>
                <React.Fragment>
                    <MaterialCommunityIcons name="plus-circle" style={styles.plusIcon2} />

                    <Text semiBold style={{fontSize: width * 0.033, color: fountainBlue}}>
                        Add a child
                    </Text>
                </React.Fragment>
            </Link>
        </View>
    </FullPage>
);

const KidBadge = ({kid}) => (
    <View style={styles.badge}>
        <View style={styles.smallCircle}></View>
        <Text semiBold style={{fontSize: width * 0.033, color: shuttleGrey}}>{kid.name}</Text>
    </View>
);

const styles = StyleSheet.create({
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
    plusIcon: {
        fontSize: width * 0.15,
        color: 'white',
        lineHeight: 1/6 * width,
        justifyContent: 'center',
        backgroundColor: 'red',
    },
    plusIcon2: {
        fontSize: width * 0.17,
        color: fountainBlue,
        lineHeight: 1/6 * width,
        justifyContent: 'center',
        // margin: width * 0.03,
        marginBottom: 0,
        elevation: 9,
        borderRadius: width * 0.17
    }
});

export default AccountManagerView;