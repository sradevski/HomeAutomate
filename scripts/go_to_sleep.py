#!/usr/bin/python

import remote_core as core
import radio_lights
import player
import aircon

def go_to_sleep():
	config = core.load_config()
	
	player.turn_off(config['player'], 'player')
	radio_lights.turn_off_all(config['lights'])
#	aircon.turn_on_with_mode_temperature(config['aircon'], 'aircon', 'cooling', 27)
	aircon.turn_off(config['aircon'], 'aircon')
	
	core.write_config(config)

if __name__ == "__main__":	
	go_to_sleep()
