import base64 from 'base-64';
//For convenience the password is hard-coded in the app, since it doesn't represent any security risk because the app is installed by me and is not available on the app store. The one you see is just a placeholder.
export const serverUrl = 'https://127.0.0.1:8080/';
export const username = 'blaa';
export const password = 'blabla';

export const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': base64.encode(`${username}:${password}`)
    },
};
