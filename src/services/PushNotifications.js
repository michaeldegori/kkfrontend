import { Permissions, Notifications } from 'expo';
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

}


export default registerForPushNotificationsAsync;