import dash
import pandas as pd
import plotly.graph_objs as go
import numpy as np

class DashboardPlot():
	def __init__(self, parameter, df):
		self.parameter = parameter
		self.df = df
		# self.x = [int(datestring[4:6]) for datestring in self.startDates]

	def plot(self, stationName):
		stationdf = self.df[self.df['StationName'] == stationName][['Date', self.parameter]]
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

