const express = require('express'),
  https = require('https'),
  bodyParser = require('body-parser'),
  fs = require('fs'),
  basicAuth = require('express-basic-auth'),
  requestCallbacks = require('./requestCallbacks');

const port = 80,
  app = express();

  var sslOptions = {
      key: fs.readFileSync('privkeylocation'),
      cert: fs.readFileSync('certlocation'),
      ca: fs.readFileSync('chainlocation')
  };

app.use(basicAuth({
	users: {'secret': 'secret'},
unauthorizedResponse: 'You are not authorized to access.'
}));
app.use(bodyParser.json());

app.post('/aircon', (req, res) => requestCallbacks.executeAirconCommands(req, res));
app.post('/player', (req, res) => requestCallbacks.executePlayerCommands(req, res));
app.post('/lights', (req, res) => requestCallbacks.executeLightsCommands(req, res));
app.post('/alarm', (req, res) => requestCallbacks.executeAlarmCommands(req, res));
app.post('/hotkeys', (req, res) => requestCallbacks.executeHotkeyCommands(req, res));
app.post('/location', (req, res) => requestCallbacks.executeLocationCommands(req, res));
app.post('/state', (req, res) => requestCallbacks.executeStateCommands(req, res));

https.createServer(sslOptions, app).listen(port, () => {
//app.listen(port, () => {
 console.log(`Server started on port ${port}`);
});
