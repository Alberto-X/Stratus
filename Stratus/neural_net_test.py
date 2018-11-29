##############################
# neural_net_test.py
##############################

import sys
import json
import numbers

# READ PARAMETERS
jsonForecast = sys.argv[1]
forecast = json.loads(jsonForecast)

# CURRENTLY PREDICTION
sum = 0.0
for factor, value in forecast['currently'].items():
    if (isinstance(value, numbers.Number)):
        sum += value
print(sum)

# HOURLY PREDICTION
sums = []
for hourlyPred in forecast['hourly']['data']:
    sum = 0.0
    for factor, value in hourlyPred.items():
        if (isinstance(value, numbers.Number)):
            sum += value
    sums.append(sum)
print(sums)

