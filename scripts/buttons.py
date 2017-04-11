#!/usr/bin/python

import RPi.GPIO as GPIO
import time
import remote_core as core
import radio_lights
import player
import aircon
import come_home
import off_all
import go_to_sleep

GPIO.setmode(GPIO.BCM)

GPIO.setup(2, GPIO.IN)
GPIO.setup(7, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(18, GPIO.IN, pull_up_down=GPIO.PUD_UP)

max_volume = 6
min_volume = 3
dir_up = "up"
dir_down = "down"

def main():
	try:
		while True:
			button_press = not GPIO.input(7)
			switch_left = not GPIO.input(2)
			switch_right = not GPIO.input(18)
			if button_press:
				if switch_right:
					handle_player()
				elif switch_left:
					handle_lights()
				else:
					handle_on_off()

			time.sleep(0.5)
	finally:
		GPIO.cleanup()

def handle_player():
	counter = 0
	full_config = core.load_config()
	config = full_config["player"]
	volume = config["volume"]
	direction = dir_down if volume > min_volume else dir_up

	while True:
		button_press = not GPIO.input(7)
		if button_press:
			if counter < 3:
				counter += 1
				time.sleep(1)
			elif config["is_playing"]:
				if direction == dir_up:
					player.increase_volume(config, "player")
					volume += 1
					if volume >= max_volume:
						direction = dir_down
				elif direction == dir_down:
					player.decrease_volume(config, "player")
					volume -= 1
					if volume <= min_volume:
						direction = dir_up
				time.sleep(1)
		else:
			break	
	if counter < 3:
		if config["is_playing"]:
			player.pause(config, "player")
		else:
			player.play(config, "player")
	
	core.write_config(full_config)	

def handle_lights():
	counter = 0
	temp_counter = 0
	num_of_states = 6
	full_config = core.load_config()
	config = full_config["lights"]

	while True:
		button_press = not GPIO.input(7)
		if button_press:
			if temp_counter < 2:
				temp_counter += 1
				time.sleep(1)
			else:
				if counter % num_of_states == 0:
					radio_lights.turn_on_single(config["door_light"])
				if counter % num_of_states == 1:
					radio_lights.turn_on_single(config["desk_light"])
				if counter % num_of_states == 2:
					radio_lights.turn_on_single(config["shelf_light"])
				if counter % num_of_states == 3:
					radio_lights.turn_off_single(config["door_light"])
				if counter % num_of_states == 4:
					radio_lights.turn_off_single(config["desk_light"])
				if counter % num_of_states == 5:
					radio_lights.turn_off_single(config["shelf_light"])
			
				counter += 1			
				time.sleep(0.5)
		else:
			break 	

	if counter == 0:
		if config["door_light"]["is_on"] or config["desk_light"]["is_on"] or config["shelf_light"]["is_on"]:
			radio_lights.turn_off_all(config)
		else:
			radio_lights.turn_on_all(config)
	
	core.write_config(full_config)

def handle_on_off():
	config = core.load_config()
	counter = count_button_hold()
	if counter < 3:
		if config["player"]["is_on"]:
			go_to_sleep.go_to_sleep()
		else:
			come_home.turn_on_all([])	

	elif counter >= 3 and counter <= 6:
		off_all.turn_off_all([])
	#No need to save config, as it is handled in come_home, go_to_sleep, and off_all.

def count_button_hold():
	counter = 0
	while True:
		button_press = not GPIO.input(7)
		if button_press:
			counter += 1
			time.sleep(1)
		else:
			break;

	return counter

if __name__ == "__main__":
	main()
