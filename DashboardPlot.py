import dash
import pandas as pd
import plotly.graph_objs as go
import numpy as np

class DashboardPlot():
	def __init__(self, parameter):
		self.parameter = parameter
		df = pd.read_csv('data/cmcWaterQualitySamples.csv')
		df['Date'] = pd.to_datetime(df.Date)
		self.df = df.sort_values(by = 'Date')
		# self.x = [int(datestring[4:6]) for datestring in self.startDates]

	def plot(self, stationName):
		stationdf = self.df[self.df['StationName'] == stationName]
		trace = [go.Scatter(
					x = stationdf['Date'],
					y = stationdf[self.parameter], 
					mode = 'markers'
				)]
		return {
			'data': trace,
			'layout': go.Layout(
				xaxis = {
					'title': 'Date',
					'type': 'date'
				},
				yaxis = {
					'title': self.parameter,
					'type': 'linear'
				},
				hovermode = 'closest',
				showlegend = False
			)
		}

