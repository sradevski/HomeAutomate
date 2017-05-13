#!/bin/sh

sudo python /home/pi/scripts/PIRSensor.py &
sudo python /home/pi/scripts/buttons.py &
sudo /usr/local/bin/nodejs/bin/node /home/pi/HomeAutomateServer/main.js &
