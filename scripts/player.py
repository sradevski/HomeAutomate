import remote_core as core

def turn_off(player_config, player_name):
	if player_config['is_on'] == True:
		core.execute_IR_command(player_config['commands']['power'], player_name)
	core.config_set_fields_values(player_config, ['is_on', 'is_playing'], [False, False])
	
	light_off(player_config, player_name)

def turn_on(player_config, player_name):
	if player_config['is_on'] == False:
		core.execute_IR_command(player_config['commands']['power'], player_name)
	core.config_set_fields_values(player_config, ['is_on', 'light'], [True, player_config['light_max']])
	
def play(player_config, player_name):
	if player_config['is_on'] == False:
		turn_on(player_config, player_name)
	if player_config['is_playing'] == False:
		core.execute_IR_command(player_config['commands']['play'], player_name)

	core.config_set_fields_values(player_config, ['is_playing'], [True])

def pause(player_config, player_name):
	if player_config['is_on'] == True:
		if player_config['is_playing'] == True:
			core.execute_IR_command(player_config['commands']['play'], player_name)

	core.config_set_fields_values(player_config, ['is_playing'], [False])

def set_volume(player_config, player_name, volume):
	current_volume = player_config['volume']

	while(volume > current_volume):
		increase_volume(player_config, player_name)
		current_volume += 1

	while(volume < current_volume):
		decrease_volume(player_config, player_name)
		current_volume -= 1

def increase_volume(player_config, player_name):
	max_volume = player_config['volume_max']
	current_volume = player_config['volume']

	if player_config['is_on'] == True:
		if(current_volume < max_volume):
			core.execute_IR_command(player_config['commands']['volume_increase'], player_name)
			current_volume += 1
		
	core.config_set_fields_values(player_config, ['volume'], [current_volume])

def decrease_volume(player_config, player_name):
	min_volume = player_config['volume_min']
	current_volume = player_config['volume']

	if player_config['is_on'] == True:
		if(current_volume > min_volume):
			core.execute_IR_command(player_config['commands']['volume_decrease'], player_name)
			current_volume -= 1
		
	core.config_set_fields_values(player_config, ['volume'], [current_volume])

def light_off(player_config, player_name):
	min_light = player_config['light_min']
	current_light = player_config['light']
	
	if player_config['is_on'] == False:
		if current_light > min_light:
			core.execute_IR_command(player_config['commands']['light'], player_name)
	else:
		set_light_intensity(player_config, player_name, min_light)
		
	core.config_set_fields_values(player_config, ['light'], [min_light])

def light_on(player_config, player_name):
	min_light = player_config['light_min']
	max_light = player_config['light_max']
	current_light = player_config['light']

	if player_config['is_on'] == False:
		if current_light < max_light and current_light > min_light:
			core.execute_IR_command(player_config['commands']['light'], player_name)
			core.execute_IR_command(player_config['commands']['light'], player_name)
			current_light = max_light
		elif current_light == min_light:
			core.execute_IR_command(player_config['commands']['light'], player_name)
	else:
		set_light_intensity(player_config, player_name, max_light)

	core.config_set_fields_values(player_config, ['light'], [max_light])


def set_light_intensity(player_config, player_name, intensity):
	max_light = player_config['light_max']
	current_light = player_config['light']

	if player_config['is_on'] == True:
		while(current_light != intensity):
			core.execute_IR_command(player_config['commands']['light'], player_name)
			current_light += 1
			current_light = current_light % (max_light + 1)

	core.config_set_fields_values(player_config, ['light'], [current_light])

def next_song(player_config, player_name):
	if player_config['is_on'] == True:
		if player_config['is_playing'] == True:
			core.execute_IR_command(player_config['commands']['forward'], player_name)

def previous_song(player_config, player_name):
	if player_config['is_on'] == True:
		if player_config['is_playing'] == True:
			core.execute_IR_command(player_config['commands']['rewind'], player_name)
