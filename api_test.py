import json
import csv
from urllib.request import urlopen
from urllib3 import request
import time

#this calls every hour, need to figure out how to call every 10 minutes
total_data=[]
days=365
for i in range(days):
    counter=0
    start_time=1483250400
    epoch=start_time+i*86400
    datetime=time.strftime("%a, %d %b %Y %H:%M:%S %Z", time.localtime(epoch))
    url_start='https://api.darksky.net/forecast/'
    #api_key='234ff8963974df0adec617162fe58b3b' #this is mikes key
    api_key='490a69b1cf60f32ca60e311bb4a3d402'
    #api_lon='37.8267'
    api_lat='-114.9137'
    #api_lat='-122.4233'
    api_lon='36.4104'
    url=url_start + api_key + '/' + api_lon +','+api_lat+','+str(epoch) +"?exclude=minutely"
    print(url + '\n' + str(i) + '\n' + datetime + '\n\n')
    
#use "currently" in call using the epoch time in 10 minute intervals

    #get json from online into a dict
    #url="https://api.darksky.net/forecast/234ff8963974df0adec617162fe58b3b/37.8267,-122.4233,1505938563"
    response=urlopen(url)
    elevations=response.read()
    data=json.loads(elevations)
    outputdata=data['hourly']['data']
    total_data+=outputdata


#write to csv
csv_name='api_data.csv'
with open(csv_name, 'w',newline="") as f:  
    w = csv.writer(f)
    counter=0
    for temp_dict in total_data:
        get_rid_of=['precipType','summary','icon']
        for del_var in get_rid_of:
            try: 
                del temp_dict[del_var]
            except:
                pass
        if counter==0: #only write keys for first line
            w.writerow(temp_dict.keys())
            counter=1
        #some data has precipType if there is a chance of rain
        #in final, add in prciptype to everything instead of taking it out
        #(get rid of summary and icon columns)
        
        w.writerow(temp_dict.values())

f.close()
print(csv_name)
            

