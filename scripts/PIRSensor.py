import RPi.GPIO as GPIO
import time
import come_home
import player_controller
import remote_core as core

sensor = 23

GPIO.setmode(GPIO.BCM)
GPIO.setup(sensor, GPIO.IN, GPIO.PUD_DOWN)

start_at_hour = 7
stop_at_hour = 0
sleep_seconds = 60 * 60 * (start_at_hour - stop_at_hour) - 20

while True:
    time.sleep(0.3)
    current_state = GPIO.input(sensor)
    if current_state == 1:
        localtime = time.localtime(time.time())
    	config = core.load_config()
   	if config['location']['am_home'] == True:
	    time.sleep(300)
#	    if localtime.tm_hour > start_at_hour and localtime.tm_hour < start_at_hour + 3:
#		if config['player']['is_playing'] and config['player']['volume'] != 3:
#		    player_controller.main(['3'])
#		else:
#		    time.sleep(300)
#	    else:
#	    	time.sleep(300)
 	else:
		come_home.turn_on_all([])

    localtime = time.localtime(time.time())    
    if localtime.tm_hour > stop_at_hour and localtime.tm_hour < start_at_hour:
        time.sleep(sleep_seconds)
