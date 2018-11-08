import {apiUrl, auth0ClientId, auth0Domain} from "../globals";
import userDataRepository from '../stores/UserDataStore';
import {
    Linking, AsyncStorage
} from 'react-native';
import {AuthSession} from 'expo';
import {fetchJson} from "./Networking";


export function toQueryString(params) {
    return '?' + Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
}

async function loginWithAuth0(startingScreen) {
    const redirectUrl = AuthSession.getRedirectUrl();
    const result = await AuthSession.startAsync({
        authUrl: `${auth0Domain}/authorize` + toQueryString({
            client_id: auth0ClientId,
            response_type: 'token',
            scope: 'openid profile user_metadata email',
            redirect_uri: redirectUrl,
            initialScreen: startingScreen === 'signUp' ? 'signUp' : 'login'
        }),
    });
    console.log('profile result:', result);
    if (result.type !== 'success'){
        // Alert.alert("Error while logging in", result.type);
        return;
    }


    //finish logging in
    await userDataRepository.pullUserInfoFromApiAndStore(result.params.id_token, result.params.access_token);
}

async function registerWithAuth0(){
    const redirectUrl = AuthSession.getRedirectUrl();
    const result = await AuthSession.startAsync({
        authUrl: `${auth0Domain}/authorize` + toQueryString({
            client_id: auth0ClientId,
            response_type: 'token',
            scope: 'openid profile user_metadata email',
            redirect_uri: redirectUrl,
            initialScreen: 'signUp'
        }),
    });
    console.log('profile result:', result);
    if (result.type !== 'success'){
        // Alert.alert("Error while logging in", result.type);
        return;
    }

    //finish logging in
    await userDataRepository.pullUserInfoFromApiAndStore(result.params.id_token, result.params.access_token, true);
}

async function logOutFromAuth0(history) {
    await AsyncStorage.multiRemove([
        "@kiddiekredit:idToken",
        "@kiddiekredit:accessToken",
        "@kiddiekredit:expiresIn"
    ]);
    const redirectUrl = AuthSession.getRedirectUrl();
    // const result = await AuthSession.startAsync({
    //     authUrl: `${auth0Domain}/v2/logout` + toQueryString({
    //         client_id: auth0ClientId,
    //         scope: 'openid profile user_metadata email',
    //     }),
    //     returnUrl: redirectUrl
    // });
    //domain with back end redirect
    // `${auth0Domain}/v2/logout?returnTo=http%3A%2F%2Fapi.kiddiekredit.com%3A8080%2Flogout&client_id=`+auth0ClientId
    const result = await AuthSession.startAsync({
        authUrl: `${auth0Domain}/v2/logout?returnTo=kiddiekredit%3A%2F%2Fmaintabscreen&client_id=`+auth0ClientId
    });
    console.log('LOGOUT RESULT',result);
    // if (result.type !== 'success'){
    //     // Alert.alert("Error while logging in", result.type);
    //     return;
    // }


    history.push("/");
}

export {
    loginWithAuth0,
    registerWithAuth0,
    logOutFromAuth0
}

/* RESPONSE SHAPE WHEN LOGGING IN:
 {
   "currentUser": Object {
     "__v": 0,
     "_id": "5bb6380b61791d2cb83a3fa0",
     "auth0ID": "auth0|5bb63805bdd7bf2d95bdb2a7",
     "avatar": "",
     "email": "marjvic@gmail.com",
     "firstName": "Victor",
     "lastName": "Moreno",
     "userSubType": "father",
     "userType": "parent",
   },
   "familyUnit": Object {
     "__v": 0,
     "_id": "5bb6380b61791d2cb83a3fa1",
     "adminsList": Array [
       Object {
         "__v": 0,
         "_id": "5bb6380b61791d2cb83a3fa0",
         "auth0ID": "auth0|5bb63805bdd7bf2d95bdb2a7",
         "avatar": "",
         "email": "marjvic@gmail.com",
         "firstName": "Victor",
         "lastName": "Moreno",
         "userSubType": "father",
         "userType": "parent",
       },
     ],
     "choreExceptions": Array [],
     "existingChores": Array [],
     "existingRewards": Array [],
     "kidsList": Array [],
   },
 }


 */