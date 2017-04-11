#!/usr/bin/python

import sys
import remote_core as core
import radio_lights

def main(argv):
	config = core.load_config()
	lights_config_names = {"1":"door_light", "2":"desk_light", "3": "shelf_light"}
	
	if len(argv) == 1 and len(argv[0]) == 2:
		if argv[0] == "an":
			argv = ["1n", "2n", "3n"]
		elif argv[0] == "af":
			argv =  ["1f", "2f", "3f"]	

	for item in argv:
		if item[-1:] == 'n':
			radio_lights.turn_on_single(config["lights"][lights_config_names[item[:1]]])
		
		elif item[-1:] == 'f':
			radio_lights.turn_off_single(config["lights"][lights_config_names[item[:1]]])
	
	core.write_config(config)

if __name__ == "__main__":
    main(sys.argv[1:])
