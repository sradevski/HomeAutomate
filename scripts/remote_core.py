import json
import pprint
import subprocess
from time import sleep

PATH = "/home/pi/scripts/config.json"
RADIO_EXECUTOR_COMMAND = "sudo /home/pi/scripts/codesend "

def execute_IR_command(command, object_name):
	full_command = "irsend SEND_ONCE " + object_name + " " + command
	run_bash_command(full_command)
	sleep(1)	

def execute_RF_command(command):
	full_command = RADIO_EXECUTOR_COMMAND + command
	run_bash_command(full_command)

def run_bash_command(command):
	subprocess.call(command, shell=True)

def config_set_fields_values(config, fieldsList, valuesList):
	for i in range(0, len(fieldsList)):
		config[fieldsList[i]] = valuesList[i]

def _safe_repr(object, context, maxlevels, level):
	object = str(object)
	return pprint._safe_repr(object, context, maxlevels, level)

def print_config():
	config = load_config()
	del config["aircon"]["commands"]
	del config["main_light"]["commands"]
	del config["player"]["commands"]

	del config["radio_lights"]["desk_light"]["commands"]
	del config["radio_lights"]["door_light"]["commands"]
	del config["radio_lights"]["shelf_light"]["commands"]

	del config["aircon"]["cooling_temperature_max"]
	del config["aircon"]["cooling_temperature_min"]
	del config["aircon"]["heating_temperature_max"]
	del config["aircon"]["heating_temperature_min"]
	del config["aircon"]["possible_modes"]

	del config["main_light"]["intensity_max"]
	del config["main_light"]["intensity_min"]

	del config["player"]["volume_max"]
	del config["player"]["volume_min"]
	del config["player"]["light_max"]
	del config["player"]["light_min"]

	pp = pprint.PrettyPrinter(indent=2)
	pp.format = _safe_repr
	pp.pprint(config)

def load_config():
	f = open(PATH, 'r')
	config = json.loads(f.read())
	
	f.close()
	return config

def write_config(config):
	f = open(PATH, "w+")
	f.write(json.dumps(config))
	f.close()
