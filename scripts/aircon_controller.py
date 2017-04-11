#!/usr/bin/python

import sys
import remote_core as core
import aircon

def main(argv):
	config = core.load_config()
	
	mode_param = config["aircon"]["mode"]
	temp_param = config["aircon"]["temperature"]
	turn_on_if_not_home = "t"

	if len(argv) == 3:
		turn_on_if_not_home = argv[2].lower()
		mode_param = argv[1].lower()
		temp_param = int(argv[0])
	elif len(argv) == 2:
		mode_param = argv[1].lower()
		temp_param = int(argv[0])
	elif len(argv) == 1:
		temp_param = int(argv[0])
	
	if temp_param == 0:
		aircon.turn_off(config['aircon'], 'aircon')
	else:
			
		if mode_param == "c" or mode_param == "cooling":
			mode_param = "cooling"
		elif mode_param == "h" or mode_param == "heating":
			mode_param = "heating"

		if turn_on_if_not_home == "t" or config["location"]["am_home"]:
			aircon.turn_on_with_mode_temperature(config['aircon'], 'aircon', mode_param, temp_param)	
		
	core.write_config(config)
	
if __name__ == "__main__":
    main(sys.argv[1:])
