#only use useful columns of data
#delete any values that are = 0
#get rid of any NaN values

import csv
import datetime
import time
file='api_and_outputpower_data.csv'

#open csv file and get data from it
with open(file, 'r') as f:
    reader = csv.reader(f)
    your_list = list(reader)
f.close()

#a=your_list[1][0]
#b=datetime.datetime.fromtimestamp(int(a))
#c=b.hour

#Keep only columns with usefule data
#1:precipintensity
#3:temperature (try later with apparent temp but shouldnt be much different)
#6:humidity
#11:cloud cover
#12:UV index
#13:visibility
#14:hour of day
#15:output power

data=your_list
remove_data=[0,2,4,5,7,8,9,10]
remove_data.reverse()
print(remove_data)

for i in data:
    for j in remove_data: 
        del(i[j])




#remove all rows with power output <1 (find best value for this)
numrows=len(data)
numcols=len(data[0])

remove_from_data=([])
counter=0
for k in data:
    counter+=1
    try:
        float(k[numcols-1])
    except:
        continue
    else:
        if float(k[numcols-1])<1:
            remove_from_data.append(counter-1)
        else:
            continue
remove_from_data.reverse()
for i in remove_from_data:
    del(data[i])





#find non-float-type data
rows=len(data)
cols=len(data[0])
errors=([])
for i in range(rows):
    for j in range(cols):
        try:
            float(data[i][j])
        except:
            if i>0:
                errors.append([i,j])
        else:
            continue
print(errors)

for i in errors:
    r,c=i
    print(r)
    print(c)
    avg=(float(data[r-1][c])+float(data[r+1][c]))/2
    data[r][c]=avg

print('done')



#write preprocessed data to this outfile
with open('preprocessed_data.csv','w',newline="") as out_file:
    wr=csv.writer(out_file,dialect="excel")
    wr.writerows(data)

out_file.close()




