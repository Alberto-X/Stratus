#data-retriever.py
import time

#generate sample data
def past(start):
    result = []
    for i in range(3):
        result.append(start + i)
    return result

#print sample data
for i in range(5):
    print(past(i))
    time.sleep(2)
