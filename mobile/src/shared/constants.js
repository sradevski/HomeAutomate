import base64 from 'base-64';
//For convenience the password is hard-coded in the app, since it doesn't represent any security risk because the app is installed by me and is not available on the app store.
export const serverUrl = 'notsosecret';
export const username = 'secret';
export const password = 'secret';

export const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${ base64.encode(`${username}:${password}`)}`,
    },
    rejectUnauthorized: false,
    requestCert: true,
    agent: false
};
