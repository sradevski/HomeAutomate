#!/usr/bin/python

import remote_core as core
import os
import sys
import nmap               
import datetime
import time
import re
import go_to_sleep

try:
    nm = nmap.PortScanner()         # instance of nmap.PortScanner
except nmap.PortScannerError:
    print('Nmap not found', sys.exc_info()[0])
    sys.exit(0)
except:
    print("Unexpected error:", sys.exc_info()[0])
    sys.exit(0)

macAddressToSearch = '64:76:BA:A3:43:B0'
laptopHasBeenTurnedOn = False
disconnectedCounter = 0

def checkIfLaptopOn():
    global macAddressToSearch, laptopHasBeenTurnedOn, disconnectedCounter

    curHosts = []
#    nm.scan(hosts = '192.168.11.1-8', arguments = '-n -sP -PS 7,22,88,443,80,660,2195 -PA 80,22,443 -PU -T3')
    nm.scan(hosts = '192.168.11.1-8', arguments = '-n -sn -PR')

    for host in nm.all_hosts():
	try:
            mac = nm[host]['addresses']['mac']
            vendor = nm[host]['vendor'][mac]
        except:
            vendor = mac = 'unknown'

        curHosts.append(mac)

    localtime = time.asctime(time.localtime(time.time()))
    print('============ {0} ============'.format(localtime))
    for host in curHosts:
	print(host)

    config = core.load_config();
    if config['location']['am_home']:
        if macAddressToSearch not in curHosts:
	    if laptopHasBeenTurnedOn:
		if disconnectedCounter > 3:       
	            wentToSleepScript()
	            laptopHasBeenTurnedOn = False
		disconnectedCounter += 1
    	else:
	    laptopHasBeenTurnedOn = True

def wentToSleepScript():
    time.sleep(10)
    go_to_sleep.go_to_sleep()
#    print("SLEEPING")

if __name__ == '__main__':
    
    start_at_hour = 22
    stop_at_hour = 2
    sleep_seconds = 60 * 60 * (start_at_hour - stop_at_hour) - 20
    
    while True:
  	localtime = time.localtime(time.time())	

	if localtime.tm_hour > stop_at_hour and localtime.tm_hour < start_at_hour:
	    time.sleep(sleep_seconds - (60 * 60 * (start_at_hour - localtime.tm_hour)))
	time.sleep(10)
        checkIfLaptopOn()

