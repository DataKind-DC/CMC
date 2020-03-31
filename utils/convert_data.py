import pandas as pd
import json


df = pd.read_csv('public/cmcdata.csv')
df = df.reset_index()
df['unit'] = df.value.str.split(' ', 1).str[-1]
df['value'] = df.value.str.split(' ', 1).str[0]
#df.unit.value_counts()

df.head(3000).variable.value_counts()

df.head(3000).to_json('public/cmcdata_subset.json', orient='records')
df.to_json('public/cmcdata.json', orient='records')

df