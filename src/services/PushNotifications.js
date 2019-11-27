import { Permissions, Notifications } from 'expo';
import {AsyncStorage} from "react-native";
import {apiUrl} from "../globals";

const PUSH_ENDPOINT = apiUrl + '/user/notification-token';

async function registerForPushNotificationsAsync({idToken, BROWSING_MODE, email}) {
    const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
        return;
    }

    try {
        // Get the token that uniquely identifies this device
        let token = await Notifications.getExpoPushTokenAsync();

        // POST the token to your backend server from where you can retrieve it to send push notifications.
        const notificationResult = await fetch(PUSH_ENDPOINT, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${idToken}`
            },
            body: JSON.stringify({
                token,
                browsingMode: BROWSING_MODE,
                email
            }),
        });
    } catch(e) {
        console.log('ERROR with retrieving token or with saving it', e);
    }

}

export async function scheduleLocalPushNotification(){
    const notificationId = await AsyncStorage.getItem("@kiddiekredit:localnotificationid");
    if (notificationId && notificationId.indexOf("6pm-") === 0) return;
    await Notifications.cancelAllScheduledNotificationsAsync();
    const now = new Date();
    const day = ("0" + now.getDate()).slice(-2);
    const month = ("0" + (now.getMonth()+1)).slice(-2);
    const year = now.getFullYear();
    const timeStampLastNight = new Date(`${year}-${month}-${day}`).getTime() ;
    const timeZoneOffsetMS = new Date().getTimezoneOffset()*60*1000;
    const dateTomorrow6PM = new Date(timeStampLastNight + 1000*60*60*42 + timeZoneOffsetMS);
    const newNotificationId = await Notifications.scheduleLocalNotificationAsync( {
        title: 'Daily Chore Reminder',
        body: 'Don\'t forget to log into the Kiddiekredit app and manage your daily chores!'
    }, {time: dateTomorrow6PM, repeat: 'day'});
    console.log('New push notification reminder set!', newNotificationId);
    await AsyncStorage.setItem("@kiddiekredit:localnotificationid", "6pm-"+newNotificationId);
}


export default registerForPushNotificationsAsync;