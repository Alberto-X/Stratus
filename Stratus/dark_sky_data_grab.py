# importing the requests library 
import requests

def unix_time_seconds(dt): #its going to treat it as GMT, so it will be early by 5 hours
    return (dt - epoch).total_seconds() + 18000
#https://api.darksky.net/forecast/[key]/[latitude],[longitude]
# 26.862517 N, -81.745393 W
#lines 4 to 52564
key = 'a71beeb0c8a084275e2c356b049dff52'
latitude = '40.0022469'
longitude = '-83.0156818'
r = requests.get('https://api.darksky.net/forecast/' + key +'/' + latitude + ',' + longitude)
json = r.json()
print(json['currently'])
hoursAhead = 0
for element in json['hourly']['data']:
	print('Hours ahead: ' + str(hoursAhead))
	print('p: ' + str(element['precipProbability']) +', c: '+ str(element['cloudCover']))
	hoursAhead += 1
for element in json['hourly']['data']:
	print(element)