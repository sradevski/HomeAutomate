#!/usr/bin/python

import remote_core as core
import radio_lights
import player
import main_light
import aircon

def go_to_sleep():
	config = core.load_config()
	
	player.turn_off(config['player'], 'player')
	main_light.turn_off(config['lights']['main_light'], 'main_light')
	radio_lights.turn_off_all(config['lights'])
#	aircon.turn_on_with_mode_temperature(config['aircon'], 'aircon', 'cooling', 27)
	aircon.turn_off(config['aircon'], 'aircon')
	
	core.write_config(config)

if __name__ == "__main__":	
	go_to_sleep()
