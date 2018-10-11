import {Constants} from 'expo';
const auth0ClientId = 'LVfVnJg9zngBlm5fIPkAPsZO5wyveh1z';
const auth0Domain = 'https://kiddiekredit.auth0.com';

const apiUrl = Constants.appOwnership === 'standalone'  ? '' : 'http://192.168.1.64:4000';


export {
    auth0ClientId,
    auth0Domain,
    apiUrl
};