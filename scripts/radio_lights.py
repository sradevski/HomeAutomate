import remote_core as core

def turn_off_all(radio_lights_config):
	turn_off_single(radio_lights_config['door_light'])
	turn_off_single(radio_lights_config['desk_light'])
	turn_off_single(radio_lights_config['shelf_light'])

def turn_on_all(radio_lights_config):
	turn_on_single(radio_lights_config['door_light'])
	turn_on_single(radio_lights_config['desk_light'])
	turn_on_single(radio_lights_config['shelf_light'])

def turn_off_single(light_config):
	commands = light_config['commands']
	for comm in commands:
		if("off_binary" in comm):
			core.execute_RF_command(commands[comm])
	
	core.config_set_fields_values(light_config, ['is_on'], [False])	

def turn_on_single(light_config):
	commands = light_config['commands']
	for comm in commands:
		if("on_binary" in comm):
			core.execute_RF_command(commands[comm])
	
	core.config_set_fields_values(light_config, ['is_on'], [True])		