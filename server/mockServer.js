const express = require('express'),
	bodyParser = require('body-parser'),
	requestCallbacks = require('./requestCallbacks');

const port = 8080,
	app = express();

app.use(bodyParser.json());

app.post('/aircon', (req, res) => {
	requestCallbacks.sendConfigToClient('aircon', (data) => res.send(data))
});
app.post('/player', (req, res) => {
	requestCallbacks.sendConfigToClient('player', (data) => res.send(data))
});
app.post('/lights', (req, res) => {
	requestCallbacks.sendConfigToClient('lights', (data) => res.send(data))
});
app.post('/alarm', (req, res) => {
	requestCallbacks.sendConfigToClient('alarm', (data) => res.send(data))
});
app.post('/hotkeys', (req, res) => {
	requestCallbacks.sendConfigToClient('steve', (data) => res.send(data))
});

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
