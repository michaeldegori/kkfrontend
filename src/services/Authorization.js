import {auth0ClientId, auth0Domain} from "../globals";
import userDataRepository from '../stores/UserDataStore';
import {
    Alert
} from 'react-native';
import {AuthSession} from 'expo';

function toQueryString(params) {
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
            scope: 'openid profile',
            redirect_uri: redirectUrl,
            initialScreen: startingScreen === 'signUp' ? 'signUp' : 'login'
        }),
    });
    console.log('profile result:', result);
    if (result.type === 'success') {
        const userData = {
            accessToken: result.params.access_token,
            idToken: result.params.id_token,
            expiresIn: result.params.expires_in
        };
        userDataRepository.setUserData(userData);
        userDataRepository.persistUserData(userData);
    }
}

export {
    loginWithAuth0
}