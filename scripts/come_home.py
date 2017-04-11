#!/usr/bin/python

import sys
from time import sleep
import time
import remote_core as core
import radio_lights
import player
import aircon

def turn_on_all(argv):

        arrive_home_param = 0
	should_turn_on_lights = True

        if len(argv) == 1:
                arrive_home_param = int(argv[0])

	config = core.load_config()
	localtime = time.localtime(time.time())
	if localtime.tm_hour > 6 and localtime.tm_hour < 17:	
		should_turn_on_lights = False

	sleep(arrive_home_param * 60)
	aircon.turn_on_with_mode_temperature(config['aircon'], 'aircon', 'heating', 22)

	if should_turn_on_lights:
		radio_lights.turn_on_all(config['lights'])

	player.play(config['player'], 'player')	
	player.set_volume(config['player'], 'player', 4)
        config['location']['am_home'] = True
	
	core.write_config(config)

if __name__ == "__main__":	
    turn_on_all(sys.argv[1:])
