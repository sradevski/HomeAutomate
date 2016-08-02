const express = require('express'),
  bodyParser = require('body-parser'),
  requestCallbacks = require('./requestCallbacks');

const port = 8080,
  app = express();

app.use(bodyParser.json());

app.post('/aircon', (req, res) => requestCallbacks.executeAirconCommands(req, res));
app.post('/player', (req, res) => requestCallbacks.executePlayerCommands(req, res));
app.post('/lights', (req, res) => requestCallbacks.executeLightsCommands(req, res));
app.post('/alarm', (req, res) => requestCallbacks.executeAlarmCommands(req, res));
app.post('/hotkeys', (req, res) => requestCallbacks.executeHotkeyCommands(req, res));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});


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
