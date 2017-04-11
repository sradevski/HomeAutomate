#!/usr/bin/python

import sys
import datetime
import remote_core as core

def main(argv):
	config = core.load_config()

	command = ""
	now = datetime.datetime.now()	
	hour_param = config["alarm"]["hour"]
	minute_param = config["alarm"]["minute"]
	day_param = "*"
	month_param = "*"
	
	if len(argv) == 4:
		hour_param = argv[0]
		minute_param = argv[1]
		day_param = argv[2]
		month_param = argv[3]
	elif len(argv) == 3:
		hour_param = argv[0]
		minute_param = argv[1]
		days_offset = int(argv[2])
		now = now + datetime.timedelta(days=days_offset)
		day_param = str(now.day)
		month_param = str(now.month)					
	elif len(argv) == 2:
		hour_param = argv[0]
		minute_param = argv[1]
	elif len(argv) == 1:
		if argv[0] is 'r':
			core.run_bash_command("crontab -r")
			command = "clear"
			config["alarm"]["is_on"] = False
		elif argv[0] is 'l':
			core.run_bash_command("crontab -l")
			command = "list"
	
	config["alarm"]["hour"] = hour_param
	config["alarm"]["minute"] = minute_param

	if command is "":
		core.run_bash_command("crontab -r")
		config["alarm"]["is_on"] = True
		timing_part = minute_param + " " + hour_param + " " + day_param + " " + month_param + " * "
		timing_part_aircon = minute_param + " " + str(int(hour_param) - 1) + " " + day_param + " " + month_param + " * "
		param_command = timing_part + "~/scripts/player_controller.py 4 1800"
		param_command_aircon = timing_part_aircon + "~/scripts/aircon_controller.py 24 h f"
		command ="(crontab -l ; echo \'" + param_command + "\') | sort - | uniq - | crontab -"
		command_aircon ="(crontab -l ; echo \'" + param_command_aircon + "\') | sort - | uniq - | crontab -"
		core.run_bash_command(command)
		core.run_bash_command(command_aircon)
	
	core.write_config(config)
	
	
if __name__ == "__main__":
    main(sys.argv[1:])
