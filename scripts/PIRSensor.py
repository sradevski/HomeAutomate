import RPi.GPIO as GPIO
import time
import come_home
import radio_lights
import remote_core as core

sensor = 23

GPIO.setmode(GPIO.BCM)
GPIO.setup(sensor, GPIO.IN, GPIO.PUD_DOWN)

#Denotes when to start checking if the kitchen lights should be turned on or not.
turn_on_hour = 18
turn_off_hour = 8
last_movement_time = time.localtime(time.time())
last_light_active = False

while True:
    time.sleep(3)
    current_state = GPIO.input(sensor)
    if current_state == 1:
        last_movement_time = time.localtime(time.time())
    	config = core.load_config()
   	    if config['location']['am_home'] == False:
            come_home.turn_on_all([])

        else:
            current_time = time.localtime(time.time())
            if current_time.tm_hour > turn_on_hour or localtime.tm_hour < turn_off_hour:
                if time.mktime(current_time) - time.mktime(last_movement_time) > 900:
                    config = core.load_config()
                    if not config["lights"]["shelf_light"]["is_on"]:
                        radio_lights.turn_on_single(config["lights"]["shelf_light"])
                        core.write_config(config)
                        last_light_active = current_time

    if last_light_active != False and time.mktime(current_time) - time.mktime(last_light_active) > 80:
        config = core.load_config()
        if config["lights"]["shelf_light"]["is_on"]:
            radio_lights.turn_off_single(config["lights"]["shelf_light"])
            core.write_config(config)
            last_light_active = False
