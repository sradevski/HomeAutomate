import uuid from 'uuid/v4';
import {serverUrl, requestOptions} from './constants';
import parseServerFormatMiddleware from './formatParserMiddleware';

export function makeServerCall(componentName, requestBody){
	return new Promise(function(resolve, reject){
		fetch(serverUrl + componentName, {...requestOptions, body: requestBody})
			.then((response) => response.json())
			.then((data) => parseServerFormatMiddleware(data, componentName))
			.then((data) => resolve(data))
			.catch((err) => reject(err));
	});
}

export function generateRequestBody(name, args){
	return JSON.stringify([{
		name,
		args
	}]);
}

export function initializeNotificationFunction(addAction, removeAction) {
	showNotification = (message) => {
		const id = uuid();
		addAction(message, id);
		setTimeout(() => removeAction(id), 3000);
	};
}

export let showNotification;
