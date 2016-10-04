#!/usr/bin/python

import os
import sys
import nmap               
import datetime
import time
import re
import come_home
import off_all

try:
    nm = nmap.PortScanner()         # instance of nmap.PortScanner
except nmap.PortScannerError:
    print('Nmap not found', sys.exc_info()[0])
    sys.exit(0)
except:
    print("Unexpected error:", sys.exc_info()[0])
    sys.exit(0)

macAddressToSearch = '64:BC:0C:9D:7D:BC'
isHome = False
isHomeCounter = 0
def checkIfHome():
    global isHome, isHomeCounter, isAwayCounter, macAddressToSearch

    curHosts = []
    nm.scan(hosts = '192.168.11.1-8', arguments = '-n -sP -PO -T4')

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

    if isHome:
	time.sleep(55)
        if macAddressToSearch not in curHosts:
	    isHomeCounter = isHomeCounter + 1
	    if isHomeCounter >= 2:   
                isHome = False
		isHomeCounter = 0
            	leftHomeScript()
	else:
	    isHomeCounter = 0

    else:
        if macAddressToSearch in curHosts:
            isHome = True
            cameHomeScript()
    
def leftHomeScript():
    print("LEFT HOME")
#     turn_off_all.turn_off_all([])

def cameHomeScript():
    print("HOME!")
#    localtime = time.localtime(time.time())
#    if localtime.tm_hour > 8 and localtime.tm_hour < 17:
#    	come_home.turn_on_all(False, [])
#    else:
#	come_home.turn_on_all(True, [])

if __name__ == '__main__':
    
    hours_to_sleep = 7
    stop_at_hour = 1
    sleep_seconds = 60 * 60 * hours_to_sleep - 20
    
    while True:
  	localtime = time.localtime(time.time())	

	if localtime.tm_hour > stop_at_hour and localtime.tm_hour < (stop_at_hour + hours_to_sleep):
	    time.sleep(sleep_seconds)
        
	time.sleep(2)
        checkIfHome()

