const express = require('express'),
  https = require('https'),
  bodyParser = require('body-parser'),
  fs = require('fs'),
  basicAuth = require('express-basic-auth'),
  requestCallbacks = require('./requestCallbacks');

const port = 8080,
  app = express();

//The location of certificates and user info are just placeholders.
  var sslOptions = {
      key: fs.readFileSync('keylocation.crt'),
      cert: fs.readFileSync('certlocation.crt'),
  };

app.use(basicAuth({
	users: {'blaaa': 'blaa'},
unauthorizedResponse: 'You are not authorized to access.'
}));
app.use(bodyParser.json());

app.post('/aircon', (req, res) => requestCallbacks.executeAirconCommands(req, res));
app.post('/player', (req, res) => requestCallbacks.executePlayerCommands(req, res));
app.post('/lights', (req, res) => requestCallbacks.executeLightsCommands(req, res));
app.post('/alarm', (req, res) => requestCallbacks.executeAlarmCommands(req, res));
app.post('/hotkeys', (req, res) => requestCallbacks.executeHotkeyCommands(req, res));

https.createServer(sslOptions, app).listen(port, () => {
  console.log(`Server started on port ${port}`);
});
