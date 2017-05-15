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

while True:
    time.sleep(3)
    current_state = GPIO.input(sensor)
    current_time = time.localtime(time.time())
    print(current_state)
    if current_state == 1:
        last_movement_time = time.localtime(time.time())
    	config = core.load_config()
    print(last_movement_time)
   	if config['location']['am_home'] == False:
            come_home.turn_on_all([])

        elif current_time.tm_hour > turn_on_hour or localtime.tm_hour < turn_off_hour:
            config = core.load_config()
            if not config["lights"]["shelf_light"]["is_on"]:
                radio_lights.turn_on_single(config["lights"]["shelf_light"])
                core.write_config(config)

    if  time.mktime(current_time) - time.mktime(last_movement_time) > 80:
        config = core.load_config()
        if config["lights"]["shelf_light"]["is_on"]:
            radio_lights.turn_off_single(config["lights"]["shelf_light"])
            core.write_config(config)
