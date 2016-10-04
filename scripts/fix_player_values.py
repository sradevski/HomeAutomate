#!/usr/bin/python

import sys
import remote_core as core
import player

def main():
	config = core.load_config()
	config["player"]["is_on"] = False
	config["player"]["is_playing"] = False
	core.write_config(config)
	
if __name__ == "__main__":
    main()
