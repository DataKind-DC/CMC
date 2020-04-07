import pandas as pd
import os


df = pd.read_csv('public/stations.csv')
df = df.rename(columns={'Latitude': 'Longitude', 'Longitude': 'Latitude'})
df = df.reset_index()
df['index'] = df['index'].apply(lambda x: '{}-{}'.format('wqp', x))
df.to_json('public/wqp_stations.json', orient='records')