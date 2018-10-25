import pandas as pd 
import numpy as np 
import csv


data=pd.read_csv('smv_data_just_output.csv')
date=data.iloc[:,0].values
power=data.iloc[:,1].values

out_power=[]
out_date=[] 
counter=0
with open('out_power.csv','w',newline="") as file:
    #outfile=csv.writer(file)
    for iter in range(len(date)):
        if counter==0:
            #outfile.writerow(date[iter]+','+power[iter])            
            file.write(date[iter]+',')
            temp=date[iter].split(' ')
            temp=temp[1].split(':')
            hour=temp[0]
            file.write(hour+',')
            try:
                float(power[iter])                
            except:
                
                file.write('0') #automatically set to 0 for now
            else:
                if float(power[iter])>0:
                    file.write(power[iter])
                else:
                    file.write('0')
            file.write('\n')            
        counter+=1
        if counter==6:
            counter=0



file.close()



