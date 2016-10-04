#!/bin/sh

sudo python /home/pi/scripts/PIRSensor.py &
sudo python /home/pi/scripts/buttons.py &
node /home/pi/HomeAutomateServer/main.js &
