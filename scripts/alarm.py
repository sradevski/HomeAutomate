#!/usr/bin/python

import sys
import datetime
import remote_core as core

def main(argv):
	config = core.load_config()

	now = datetime.datetime.now()
	hour_param = config["alarm"]["hour"]
	minute_param = config["alarm"]["minute"]
	day_param = "*"
	month_param = "*"
	clear_command = "sudo crontab -l -u pi | grep -v '~/scripts/player_controller.py' | crontab -u pi - ; sudo crontab -l -u pi | grep -v '~/scripts/aircon_controller.py' | crontab -u pi -"
	if len(argv) == 1 and argv[0] == 'r':
		core.run_bash_command(clear_command)
		config["alarm"]["is_on"] = False
	elif config["location"]["am_home"] == True:
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

		config["alarm"]["hour"] = hour_param
		config["alarm"]["minute"] = minute_param

		minsInt = int(minute_param)
		hoursInt = int(hour_param)

		if minsInt >= 30:
			minsInt = minsInt - 30
		else:
			minsInt = minsInt + 30
			if hoursInt != 0:
				hoursInt = hoursInt - 1
			else:
				hoursInt = 23


		aircon_hour_param = str(hoursInt)
		aircon_minute_param = str(minsInt)

		config["alarm"]["is_on"] = True
		core.run_bash_command(clear_command)
		timing_part = minute_param + " " + hour_param + " " + day_param + " " + month_param + " * "
		timing_part_aircon = aircon_minute_param + " " + aircon_hour_param + " " + day_param + " " + month_param + " * "
		param_command = timing_part + "~/scripts/player_controller.py 4 1800"
		param_command_aircon = timing_part_aircon + "~/scripts/aircon_controller.py 24 h f"
		command ="(crontab -u pi -l ; echo \'" + param_command + "\') | sort - | uniq - | crontab -u pi -"
		command_aircon ="(crontab -u pi -l ; echo \'" + param_command_aircon + "\') | sort - | uniq - | crontab -u pi -"
		core.run_bash_command(command)
		core.run_bash_command(command_aircon)

	core.write_config(config)


if __name__ == "__main__":
    main(sys.argv[1:])
