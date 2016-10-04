#!/usr/bin/python

import sys
from time import sleep
import remote_core as core
import radio_lights
import player
import main_light
import aircon

def turn_off_all(argv):

	leave_home_param = 5
  	if len(argv) == 1:
        	leave_home_param = int(argv[0])

	config = core.load_config()
	player.turn_off(config['player'], 'player')
	aircon.turn_off(config['aircon'], 'aircon')
	core.write_config(config)
	
	sleep(leave_home_param * 60)

	config = core.load_config()
	main_light.turn_off(config['lights']['main_light'], 'main_light')
	radio_lights.turn_off_all(config['lights'])
        config['steve']['am_home'] = False	
	core.write_config(config)

if __name__ == "__main__":	
    turn_off_all(sys.argv[1:])
