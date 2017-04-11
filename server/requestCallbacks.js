const fs = require('fs'),
	pythonCaller = require('./pythonCaller');

const configUri = '/home/pi/scripts/config.json',
	scriptsFolder = '/home/pi/scripts/',
	cacheTimeToLiveMs = 3000;
let configCache;

function showError(err) {
	console.log(err.toString());
}

function getFullConfig(shouldUseCache, callback) {
	const currentTimestamp = Date.now();
	const isCacheBad = !configCache || (configCache.timestamp - currentTimestamp) > cacheTimeToLiveMs;

	if (!shouldUseCache || isCacheBad) {
		fs.readFile(configUri, 'utf8', function(err, data) {
			if (err) {
				showError(err);
			}
			let configCache = {
				timestamp: Date.now(),
				data: JSON.parse(data)
			};

			callback(configCache.data);
		});
	} else {
		callback(configCache.data);
	}
}

function sendConfigToClient(selector, callback, shouldUseCache = true) {
	getFullConfig(shouldUseCache, (data) => {
		callback(JSON.stringify(data[selector]));
	});
}

function executeAirconCommands(req, res) {
	let functionList = req.body;
	let configSelector = 'aircon';
	functionList.forEach(func => {
		switch (func.name) {
			case 'getState':
				sendConfigToClient(configSelector, (data) => res.send(data))
				break;
			case 'toggleAirconMode':
			case 'temperatureChanged':
			case 'toggleAircon':
				pythonCaller.executePythonScript(scriptsFolder, 'aircon_controller.py', func.args, sendConfigToClient.bind(this, configSelector, (data) => res.send(data), false));
				break;
		}
	});
}

function executeLightsCommands(req, res) {
	let functionList = req.body;
	let configSelector = 'lights';
	functionList.forEach(func => {
		switch (func.name) {
			case 'getState':
				sendConfigToClient(configSelector, (data) => res.send(data))
				break;
			case 'toggleAllLights':
			case 'toggleYellowLights':
			case 'toggleSingleLight':
				pythonCaller.executePythonScript(scriptsFolder, 'lights_controller.py', func.args, sendConfigToClient.bind(this, configSelector, (data) => res.send(data), false));
				break;
		}
	});
}

function executePlayerCommands(req, res) {
	let functionList = req.body;
	let configSelector = 'player';
	functionList.forEach(func => {
		switch (func.name) {
			case 'getState':
				sendConfigToClient(configSelector, (data) => res.send(data))
				break;
			case 'playToggle':
			case 'playerToggle':
			case 'volumeChanged':
			case 'changeSong':
				pythonCaller.executePythonScript(scriptsFolder, 'player_controller.py', func.args, sendConfigToClient.bind(this, configSelector, (data) => res.send(data), false));
				break;
		}
	});
}

function executeAlarmCommands(req, res) {
	let functionList = req.body;
	let configSelector = 'alarm';
	functionList.forEach(func => {
		switch (func.name) {
			case 'getState':
				sendConfigToClient(configSelector, (data) => res.send(data))
				break;
			case 'alarmToggle':
				pythonCaller.executePythonScript(scriptsFolder, 'alarm.py', func.args, sendConfigToClient.bind(this, configSelector, (data) => res.send(data), false));
				break;
		}
	});
}

function executeHotkeyCommands(req, res) {
	let functionList = req.body;
	let configSelector = 'steve';
	functionList.forEach(func => {
		switch (func.name) {
			case 'getState':
				sendConfigToClient(configSelector, (data) => res.send(data))
				break;
			case 'comeHome':
				pythonCaller.executePythonScript(scriptsFolder, 'come_home.py', func.args, sendConfigToClient.bind(this, configSelector, (data) => res.send(data), false));
				break;
			case 'offAll':
				pythonCaller.executePythonScript(scriptsFolder, 'off_all.py', func.args, sendConfigToClient.bind(this, configSelector, (data) => res.send(data), false));
				break;
			case 'goSleep':
				pythonCaller.executePythonScript(scriptsFolder, 'go_to_sleep.py', func.args, sendConfigToClient.bind(this, configSelector, (data) => res.send(data), false));
				break;
		}
	});
}
exports.getFullConfig = getFullConfig;
exports.executeAirconCommands = executeAirconCommands;
exports.executePlayerCommands = executePlayerCommands;
exports.executeLightsCommands = executeLightsCommands;
exports.executeAlarmCommands = executeAlarmCommands;
exports.executeHotkeyCommands = executeHotkeyCommands;
exports.sendConfigToClient = sendConfigToClient;
