import uuid from 'uuid/v4';
import {serverUrl, requestOptions} from './constants';
import parseServerFormatMiddleware from './formatParserMiddleware';

export function makeServerCall(componentName, requestBody){
	return new Promise(function(resolve, reject){
		fetch(serverUrl + componentName, {...requestOptions, body: requestBody})
			.then((response) => response.json())
			.then((data) => parseServerFormatMiddleware(data, componentName))
			.then((data) => resolve(data))
			.catch((err) => { console.warn(err); reject(err); });
	});
}

export function generateRequestBody(name, args){
	return JSON.stringify([{
		name,
		args
	}]);
}
