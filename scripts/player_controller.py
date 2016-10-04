#!/usr/bin/python

import sys
from time import sleep
import remote_core as core
import player

def main(argv):
	config = core.load_config()
	
	volume_param = config['player']['volume']
	is_next_song = False
	is_prev_song = False
	should_turn_off = False
	should_turn_on = False
	is_volume_param_passed = False
	timeout = 0	

	if len(argv) == 1:
		if len(argv[0]) > 2:
			if argv[0] == "next":
				is_next_song = True
			elif argv[0] == "prev":
				is_prev_song = True
			elif argv[0] == "toff":
				should_turn_off = True
			elif argv[0] == "ton":
				should_turn_on = True	
		else:
			volume_param = int(argv[0])
			is_volume_param_passed = True
	elif len(argv) == 2:
		is_volume_param_passed = True
		volume_param = int(argv[0])
		timeout = int(argv[1])

	if is_volume_param_passed:
		if volume_param > 0:	
			player.play(config['player'], 'player')
			player.set_volume(config['player'], 'player', volume_param)
		else:
			player.pause(config['player'], 'player')
	

	if is_next_song:
		player.next_song(config['player'], 'player')
	
	if is_prev_song:
		player.previous_song(config['player'], 'player')
	
	if should_turn_off:
		player.turn_off(config['player'], 'player')

	if should_turn_on:
		player.turn_on(config['player'], 'player')

	core.write_config(config)
	
	if timeout > 0:
		sleep(timeout)
		config = core.load_config()
		player.pause(config['player'], 'player')
		core.write_config(config)

	
if __name__ == "__main__":
    main(sys.argv[1:])
