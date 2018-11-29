##############################
# dark_sky_data_grab.py
##############################

# importing the requests library 
import requests
import json
import sys
import os
import datetime


key = 'a71beeb0c8a084275e2c356b049dff52'
latitude = sys.argv[1]
longitude = sys.argv[2]
r = requests.get('https://api.darksky.net/forecast/' + key +'/' + latitude + ',' + longitude)
forecast = r.json()
fore_dict = "{\"currently\":"

#Makes a json entry for needed current weather data
cur = forecast["currently"]
time = "\"time\":" + str(cur["time"])
temp = "\"temp\":" + str(cur["temperature"])
cloud_cover = "\"cloud\":" + str(cur["cloudCover"])
ozone = "\"ozone\":" + str(cur["ozone"])
	
cur_dict = "{" + time + "," + temp + "," + cloud_cover + "," + ozone + "},"
fore_dict += cur_dict

#Makes a dictionary for every future hour avalible
fore_dict += "\"hourly\":["
for e in forecast["hourly"]["data"]:
	time = "\"time\":" + str(e["time"])
	temp = "\"temp\":" + str(e["temperature"])
	cloud_cover = "\"cloud\":" + str(e["cloudCover"])
	ozone = "\"ozone\":" + str(e["ozone"])
	
	hour_dict = "{" + time + "," + temp + "," + cloud_cover + "," + ozone + "},"
	fore_dict += hour_dict
fore_dict = fore_dict[0:-1] + "]}"

print(fore_dict)