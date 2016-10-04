import remote_core as core

def turn_off(main_light_config, main_light_name):
	core.execute_IR_command(main_light_config['commands']['off'], main_light_name)
	core.config_set_fields_values(main_light_config, ['is_on', 'is_full', 'is_red', 'is_smooth'], [False, False, False, False])

def turn_on_full(main_light_config, main_light_name):
	core.execute_IR_command(main_light_config['commands']['full'], main_light_name)
	core.config_set_fields_values(main_light_config, [ 'is_on', 'is_red', 'is_smooth', 'is_full'], [True, False, False, True])
	
def turn_on_smooth(main_light_config, main_light_name):
	core.execute_IR_command(main_light_config['commands']['smooth'], main_light_name)
	core.config_set_fields_values(main_light_config, ['is_on', 'is_red', 'is_smooth', 'is_full'], [True, False, True, False])

def turn_on_red(main_light_config, main_light_name):
	core.execute_IR_command(main_light_config['commands']['red'], main_light_name)
	core.config_set_fields_values(main_light_config, ['is_on', 'is_red', 'is_smooth', 'is_full'], [True, True, False, False])


def set_intensity(main_light_config, main_light_name, goal_intensity):
	current_intensity = main_light_config['intensity']

	while(goal_intensity < current_intensity):
		increase_intensity(main_light_config, main_light_name)
		current_intensity += 1

	while(goal_intensity > current_intensity):
		decrease_intensity(main_light_config, main_light_name)
		current_intensity -= 1

def increase_intensity(main_light_config, main_light_name):
	current_intensity = main_light_config['intensity']
	max_intensity = main_light_config['intensity_max']

	if(current_intensity < max_intensity):
		core.execute_IR_command(main_light_config['commands']['intensity_increase'], main_light_name)
		current_intensity += 1

	core.config_set_fields_values(main_light_config, ['intensity'], [current_intensity])

def decrease_intensity(main_light_config, main_light_name):
	current_intensity = main_light_config['intensity']
	min_intensity = main_light_config['intensity_min']

	if(current_intensity > min_intensity):
		core.execute_IR_command(main_light_config['commands']['intensity_decrease'], main_light_name)
		current_intensity -= 1

	core.config_set_fields_values(main_light_config, ['intensity'], [current_intensity])
