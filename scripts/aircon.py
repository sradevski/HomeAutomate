import remote_core as core

def turn_off(aircon_config, aircon_name):
	core.execute_IR_command(aircon_config['commands']['off'], aircon_name)
	core.config_set_fields_values(aircon_config, ['is_on'], [False])

def turn_on_with_mode_temperature(aircon_config, aircon_name, mode, temperature):
	if mode in aircon_config['possible_modes']:
		mode_cmd = aircon_config['commands'][mode]
		if is_valid_temperature(aircon_config, mode, temperature):
			core.execute_IR_command(mode_cmd + str(temperature), aircon_name)
			core.config_set_fields_values(aircon_config, ['is_on', 'temperature', 'mode'], [True, temperature, mode])
			
def is_valid_temperature(aircon_config, mode, temperature):
	cooling_min_temp = aircon_config['cooling_temperature_min']
	cooling_max_temp = aircon_config['cooling_temperature_max']
	heating_min_temp = aircon_config['heating_temperature_min']
	heating_max_temp = aircon_config['heating_temperature_max']
	
	if mode == "cooling":
		if temperature >= cooling_min_temp and temperature <= cooling_max_temp:
			return True
		return False
	else:
		if temperature >= heating_min_temp and temperature <= heating_max_temp:
			return True
		return False
		
