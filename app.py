import dash
import dash_bootstrap_components as dbc
import dash_core_components as dcc
import dash_html_components as html
import pandas as pd
import us
import numpy as np
from DashboardPlot import DashboardPlot
import json
import plotly.graph_objs as go


mapbox_access_token = 'pk.eyJ1IjoicHJpeWF0aGFyc2FuIiwiYSI6ImNqbGRyMGQ5YTBhcmkzcXF6YWZldnVvZXoifQ.sN7gyyHTIq1BSfHQRBZdHA'

# Data on individual stations.
cmc_stations = pd.read_csv('data/cmcStations.csv')
cmc_stations = cmc_stations[cmc_stations.Status]

# Data on all samples.
water_quality_samples = pd.read_csv('data/cmcWaterQualitySamples.csv')

# Data on Benthic samples.
benthic_samples = pd.read_csv('data/cmcBenthicSamples.csv')

# Data on whether stations have a reading for a particular parameter.
parameters = pd.read_csv('data/cmcParameters.csv')
shared_parameters = list(
	set(water_quality_samples.columns) & set(parameters.Name))
station_parameters = water_quality_samples[['StationName'] + shared_parameters].groupby(
	'StationName'
).agg(
	lambda x: any(~np.isnan(x))
)

app = dash.Dash(__name__, external_stylesheets=[dbc.themes.BOOTSTRAP])

DissolvedOxygenDashboardPlot = DashboardPlot('Dissolved oxygen')
AlkalinityDashboardPlot = DashboardPlot('Alkalinity')
AmmoniaNitrogenDashboardPlot = DashboardPlot('Ammonia-nitrogen')
BacteriaEColiDashboardPlot = DashboardPlot('Bacteria (E.Coli)')
ChlorophyllADashboardPlot = DashboardPlot('Chlorophyll a')
ConductivityDashboardPlot = DashboardPlot('Conductivity')
DissolvedOxygenDashboardPlot = DashboardPlot('Dissolved oxygen')
DissolvedOxygenSaturationDashboardPlot = DashboardPlot('Dissolved oxygen % Sat')
EnterococcusDashboardPlot = DashboardPlot('Enterococcus')
NitrateNitrogenDashboardPlot = DashboardPlot('Nitrate-nitrogen')
NitriteNitrateDashboardPlot = DashboardPlot('Nitrite-nitrate')
OrthophosphateDashboardPlot = DashboardPlot('Orthophosphate')
PHDashboardPlot = DashboardPlot('pH')
TotalDepthDashboardPlot = DashboardPlot('Total Depth')
TotalDissolvedSolidsDashboardPlot = DashboardPlot('Total Dissolved Solids')
TotalKjeldahlNitrogenDashboardPlot = DashboardPlot('Total Kjeldahl Nitrogen')
TotalNitrogenDashboardPlot = DashboardPlot('Total Nitrogen')
TotalPhosphorousDashboardPlot = DashboardPlot('Total Phosphorus')
TotalSuspendedSolidsDashboardPlot = DashboardPlot('Total Suspended Solids')
WaterClarityDashboardPlot = DashboardPlot('Water Clarity')
WaterTemperatureDashboardPlot = DashboardPlot('Water temperature')
SalinityDashboardPlot = DashboardPlot('Salinity')


navbar = dbc.NavbarSimple(
	brand='Chesapeake Monitoring Cooperative',
	brand_href='#',
	sticky='top',
)

body = dbc.Container([
<<<<<<< HEAD
	dbc.Row([
		dbc.Col([
			html.P('County'),
			dcc.Dropdown(
				id='county-selected',
				options=[{'label': group, 'value': group} for group in cmc_stations['CityCounty'].dropna().unique()],
				value=[],
				multi=True,
				style={
					'display': 'block',
					'margin-left': 'auto',
					'margin-right': 'auto',
					'width': '100%'
				}
			),
			html.P('Water Body'),
			dcc.Dropdown(
				id='waterbody-selected',
				options=[{'label': group, 'value': group} for group in cmc_stations['WaterBody'].dropna().unique()],
				value=[],
				multi=True,
				style={
					'display': 'block',
					'margin-left': 'auto',
					'margin-right': 'auto',
					'width': '100%'
				}
			),
			html.P('Group Name'),
			dcc.Dropdown(
				id='group-selected',
				options=[{'label': group, 'value': group} for group in cmc_stations['GroupName'].unique()],
				value=[],
				multi=True,
				style={
					'display': 'block',
					'margin-left': 'auto',
					'margin-right': 'auto',
					'width': '100%'
				}
			),
			html.P('Parameter'),
			dcc.Dropdown(
				id='parameter-selected',
				options=[{'label': group, 'value': group} for group in shared_parameters],
				value=[],
				multi=True,
				style={
					'display': 'block',
					'margin-left': 'auto',
					'margin-right': 'auto',
					'width': '100%'
				}
			)
		], md=3),
		dbc.Col([
			html.Div(dcc.Graph(id='main-map'))
		])
	]),
	dbc.Row(
		[
		dbc.Col([
			html.P('Alkalinity'),
			html.Div(dcc.Graph(id='alkalinity'))
		]),
		dbc.Col([
			html.P('Ammonia Nitrogen'),
			html.Div(dcc.Graph(id='ammonia-nitrogen'))
		]),
		dbc.Col([
			html.P('Bacteria (E.Coli)'),
			html.Div(dcc.Graph(id='bacteria-ecoli'))
		])
		],
		align = 'center'),

	dbc.Row(
		[
		dbc.Col([
			html.P('Chlorophyll-a'),
			html.Div(dcc.Graph(id='chlorophyll-a'))
		]),
		dbc.Col([
			html.P('Conductivity'),
			html.Div(dcc.Graph(id='conductivity'))
		]),
		dbc.Col([
			html.P('Dissolved Oxygen'),
			html.Div(dcc.Graph(id='dissolved-oxygen'))
		]),
		],
		align = 'center'),

	dbc.Row(
		[
		dbc.Col([
			html.P('Dissolved oxygen % Sat'),
			html.Div(dcc.Graph(id='dissolved-oxygen-saturation'))
		]),
		dbc.Col([
			html.P('Enterococcus'),
			html.Div(dcc.Graph(id='enterococcus'))
		]),
		dbc.Col([
			html.P('Nitrate-Nitrogen'),
			html.Div(dcc.Graph(id='nitrate-nitrogen'))
		]),
		],
		align = 'center'),

	dbc.Row(
		[
		dbc.Col([
			html.P('Nitrite-Nitrate'),
			html.Div(dcc.Graph(id='nitrite-nitrate'))
		]),
		dbc.Col([
			html.P('Orthophosphate'),
			html.Div(dcc.Graph(id='orthophosphate'))
		]),
		dbc.Col([
			html.P('pH'),
			html.Div(dcc.Graph(id='pH'))
		])
		],
		align = 'center'),

	dbc.Row(
		[
		dbc.Col([
			html.P('Salinity'),
			html.Div(dcc.Graph(id='salinity'))
		]),
		dbc.Col([
			html.P('Total Depth'),
			html.Div(dcc.Graph(id='total-depth'))
		]),
		dbc.Col([
			html.P('Total Dissolved Solids'),
			html.Div(dcc.Graph(id='total-dissolved-solids'))
		])
		],
		align = 'center'),

	dbc.Row(
		[
		dbc.Col([
			html.P('Total Kjeldahl Nitrogen'),
			html.Div(dcc.Graph(id='total-kjeldahl-nitrogen'))
		]),
		dbc.Col([
			html.P('Total Nitrogen'),
			html.Div(dcc.Graph(id='total-nitrogen'))
		]),
		dbc.Col([
			html.P('Total Phosphorous'),
			html.Div(dcc.Graph(id='total-phosphorous'))
		])
		],
		align = 'center'),

	dbc.Row(
		[
		dbc.Col([
			html.P('Total Suspended Solids'),
			html.Div(dcc.Graph(id='total-suspended-solids'))
		]),
		dbc.Col([
			html.P('Water Clarity'),
			html.Div(dcc.Graph(id='water-clarity'))
		]),
		dbc.Col([
			html.P('Water Temperature'),
			html.Div(dcc.Graph(id='water-temp'))])
		],
		align = 'center')
=======
    dbc.Row([
        dbc.Col([
            html.P("County"),
            dcc.Dropdown(
                id="county-selected",
                options=[{"label": group, "value": group} for group in cmc_stations["CityCounty"].dropna().unique()],
                value=[],
                multi=True,
                style={
                    "display": "block"
                }
            ),
            html.P("Water Body"),
            dcc.Dropdown(
                id="waterbody-selected",
                options=[{"label": group, "value": group}
                         for group in cmc_stations["WaterBody"].dropna().unique()],
                value=[],
                multi=True,
                style={
                    "display": "block"
                }
            ),
            html.P("Group Name"),
            dcc.Dropdown(
                id="group-selected",
                options=[{"label": group, "value": group}
                         for group in cmc_stations["GroupName"].unique()],
                value=[],
                multi=True,
                style={
                    "display": "block"
                }
            ),
            html.P("Parameter"),
            dcc.Dropdown(
                id="parameter-selected",
                options=[{"label": group, "value": group}
                         for group in list(station_parameters.columns.values) + ["Benthic"]],
                value=[],
                multi=True,
                style={
                    "display": "block"
                }
            )
        ], md=3),
        dbc.Col([
            html.Div(dcc.Graph(id="main-map"))
        ])
    ])
>>>>>>> c1ea83dd3fef261122b7d3e6f37fd97fd617ead0
])

app.layout = html.Div([navbar, body])


@app.callback(
	dash.dependencies.Output('main-map', 'figure'),
	[
		dash.dependencies.Input('county-selected', 'value'),
		dash.dependencies.Input('waterbody-selected', 'value'),
		dash.dependencies.Input('group-selected', 'value'),
		dash.dependencies.Input('parameter-selected', 'value')
	]
)
def update_figure(counties_selected, waterbodies_selected, groups_selected,
<<<<<<< HEAD
				  parameters_selected):
	trace = []
	filtered_stations = cmc_stations
	if counties_selected:
		filtered_stations = filtered_stations[filtered_stations['CityCounty'].apply(lambda x: x in counties_selected)]
	if waterbodies_selected:
		filtered_stations = filtered_stations[filtered_stations['WaterBody'].apply(lambda x: x in waterbodies_selected)]
	if groups_selected:
		filtered_stations = filtered_stations[filtered_stations['GroupName'].apply(lambda x: x in groups_selected)]
	if parameters_selected:
		mask = station_parameters[parameters_selected].all(axis=1)
		filtered_stations = filtered_stations[filtered_stations['Name'].apply(lambda x: x in station_parameters[mask].index)]

	if filtered_stations.shape != cmc_stations.shape:
		data_complement = cmc_stations[cmc_stations['Name'].apply(lambda x: x not in filtered_stations['Name'])]
		trace.append(go.Scattermapbox(
			lat=data_complement['Lat'],
			lon=data_complement['Long'],
			mode='markers',
			marker={'symbol': 'circle', 'size': 10, 'opacity': .05},
			text=data_complement['Name'],
			hoverinfo='text',
			name='test'
		))
	trace.append(go.Scattermapbox(
		lat=filtered_stations['Lat'],
		lon=filtered_stations['Long'],
		mode='markers',
		marker={'symbol': 'circle', 'size': 10},
		text=filtered_stations['Name'],
		hoverinfo='text',
		name='test'
	))

	return {
		'data': trace,
		'layout': go.Layout(
			autosize=True,
			hovermode='closest',
			showlegend=False,
			height=700,
			mapbox={'accesstoken': mapbox_access_token,
					'bearing': 0,
					'center': {'lat': 38.9784, 'lon': -76.4922},
					'pitch': 30, 'zoom': 6,
					'style': 'mapbox://styles/mapbox/light-v9'},
		)

	}

# All of these callbacks are separate to allow for parallel computation 
# for the pandas subsetting that occurs within the plot function.
@app.callback(
	dash.dependencies.Output('dissolved-oxygen', 'figure'),
	[dash.dependencies.Input('main-map', 'clickData')]
)
def update_dissolved_oxygen_plot(clickData):
	if clickData:
		selectedStationName = clickData['points'][0]['text']
	else:
		selectedStationName = 'TC1'
	return DissolvedOxygenDashboardPlot.plot(selectedStationName)

@app.callback(
	dash.dependencies.Output('alkalinity', 'figure'),
	[dash.dependencies.Input('main-map', 'clickData')]
)
def update_alkalinity_plot(clickData):
	if clickData:
		selectedStationName = clickData['points'][0]['text']
	else:
		selectedStationName = 'TC1'
	return AlkalinityDashboardPlot.plot(selectedStationName)

@app.callback(
	dash.dependencies.Output('ammonia-nitrogen', 'figure'),
	[dash.dependencies.Input('main-map', 'clickData')]
)
def update_ammonia_nitrogen_plot(clickData):
	if clickData:
		selectedStationName = clickData['points'][0]['text']
	else:
		selectedStationName = 'TC1'
	return AmmoniaNitrogenDashboardPlot.plot(selectedStationName)

@app.callback(
	dash.dependencies.Output('bacteria-ecoli', 'figure'),
	[dash.dependencies.Input('main-map', 'clickData')]
)
def update_bacteria_ecoli_plot(clickData):
	if clickData:
		selectedStationName = clickData['points'][0]['text']
	else:
		selectedStationName = 'TC1'
	return BacteriaEColiDashboardPlot.plot(selectedStationName)

@app.callback(
	dash.dependencies.Output('chlorophyll-a', 'figure'),
	[dash.dependencies.Input('main-map', 'clickData')]
)
def update_chlorophyll_a_plot(clickData):
	if clickData:
		selectedStationName = clickData['points'][0]['text']
	else:
		selectedStationName = 'TC1'
	return ChlorophyllADashboardPlot.plot(selectedStationName)

@app.callback(
	dash.dependencies.Output('conductivity', 'figure'),
	[dash.dependencies.Input('main-map', 'clickData')]
)
def update_conductivity_plot(clickData):
	if clickData:
		selectedStationName = clickData['points'][0]['text']
	else:
		selectedStationName = 'TC1'
	return ConductivityDashboardPlot.plot(selectedStationName)

@app.callback(
	dash.dependencies.Output('dissolved-oxygen-saturation', 'figure'),
	[dash.dependencies.Input('main-map', 'clickData')]
)
def update_dissolved_oxygen_saturation_plot(clickData):
	if clickData:
		selectedStationName = clickData['points'][0]['text']
	else:
		selectedStationName = 'TC1'
	return DissolvedOxygenSaturationDashboardPlot.plot(selectedStationName)

@app.callback(
	dash.dependencies.Output('enterococcus', 'figure'),
	[dash.dependencies.Input('main-map', 'clickData')]
)
def update_enterococcus_plot(clickData):
	if clickData:
		selectedStationName = clickData['points'][0]['text']
	else:
		selectedStationName = 'TC1'
	return EnterococcusDashboardPlot.plot(selectedStationName)

@app.callback(
	dash.dependencies.Output('nitrate-nitrogen', 'figure'),
	[dash.dependencies.Input('main-map', 'clickData')]
)
def update_nitrate_nitrogen_plot(clickData):
	if clickData:
		selectedStationName = clickData['points'][0]['text']
	else:
		selectedStationName = 'TC1'
	return NitrateNitrogenDashboardPlot.plot(selectedStationName)

@app.callback(
	dash.dependencies.Output('pH', 'figure'),
	[dash.dependencies.Input('main-map', 'clickData')]
)
def update_ph_plot(clickData):
	if clickData:
		selectedStationName = clickData['points'][0]['text']
	else:
		selectedStationName = 'TC1'
	return PHDashboardPlot.plot(selectedStationName)

@app.callback(
	dash.dependencies.Output('salinity', 'figure'),
	[dash.dependencies.Input('main-map', 'clickData')]
)
def update_salinity_plot(clickData):
	if clickData:
		selectedStationName = clickData['points'][0]['text']
	else:
		selectedStationName = 'TC1'
	return SalinityDashboardPlot.plot(selectedStationName)

@app.callback(
	dash.dependencies.Output('total-depth', 'figure'),
	[dash.dependencies.Input('main-map', 'clickData')]
)
def update_total_depth_plot(clickData):
	if clickData:
		selectedStationName = clickData['points'][0]['text']
	else:
		selectedStationName = 'TC1'
	return TotalDepthDashboardPlot.plot(selectedStationName)

@app.callback(
	dash.dependencies.Output('total-dissolved-solids', 'figure'),
	[dash.dependencies.Input('main-map', 'clickData')]
)
def update_total_dissolved_solids_plot(clickData):
	if clickData:
		selectedStationName = clickData['points'][0]['text']
	else:
		selectedStationName = 'TC1'
	return TotalDissolvedSolidsDashboardPlot.plot(selectedStationName)

@app.callback(
	dash.dependencies.Output('total-kjeldahl-nitrogen', 'figure'),
	[dash.dependencies.Input('main-map', 'clickData')]
)
def update_total_kjeldahl_nitrogen_plot(clickData):
	if clickData:
		selectedStationName = clickData['points'][0]['text']
	else:
		selectedStationName = 'TC1'
	return TotalKjeldahlNitrogenDashboardPlot.plot(selectedStationName)

@app.callback(
	dash.dependencies.Output('total-nitrogen', 'figure'),
	[dash.dependencies.Input('main-map', 'clickData')]
)
def update_total_nitrogen_plot(clickData):
	if clickData:
		selectedStationName = clickData['points'][0]['text']
	else:
		selectedStationName = 'TC1'
	return TotalNitrogenDashboardPlot.plot(selectedStationName)

@app.callback(
	dash.dependencies.Output('total-phosphorous', 'figure'),
	[dash.dependencies.Input('main-map', 'clickData')]
)
def update_total_phosphorous_plot(clickData):
	if clickData:
		selectedStationName = clickData['points'][0]['text']
	else:
		selectedStationName = 'TC1'
	return TotalPhosphorousDashboardPlot.plot(selectedStationName)

@app.callback(
	dash.dependencies.Output('total-suspended-solids', 'figure'),
	[dash.dependencies.Input('main-map', 'clickData')]
)
def update_total_suspended_solids_plot(clickData):
	if clickData:
		selectedStationName = clickData['points'][0]['text']
	else:
		selectedStationName = 'TC1'
	return TotalSuspendedSolidsDashboardPlot.plot(selectedStationName)

@app.callback(
	dash.dependencies.Output('water-clarity', 'figure'),
	[dash.dependencies.Input('main-map', 'clickData')]
)
def update_water_clarity_plot(clickData):
	if clickData:
		selectedStationName = clickData['points'][0]['text']
	else:
		selectedStationName = 'TC1'
	return WaterClarityDashboardPlot.plot(selectedStationName)

@app.callback(
	dash.dependencies.Output('water-temp', 'figure'),
	[dash.dependencies.Input('main-map', 'clickData')]
)
def update_water_temperature_plot(clickData):
	if clickData:
		selectedStationName = clickData['points'][0]['text']
	else:
		selectedStationName = 'TC1'
	return WaterTemperatureDashboardPlot.plot(selectedStationName)


=======
                  parameters_selected):
    trace = []
    filtered_stations = cmc_stations
    if counties_selected:
        filtered_stations = filtered_stations[filtered_stations["CityCounty"].apply(
            lambda x: x in counties_selected)]
    if waterbodies_selected:
        filtered_stations = filtered_stations[filtered_stations["WaterBody"].apply(
            lambda x: x in waterbodies_selected)]
    if groups_selected:
        filtered_stations = filtered_stations[filtered_stations["GroupName"].apply(
            lambda x: x in groups_selected)]
    if parameters_selected:
        benthic = False
        if "Benthic" in parameters_selected:
            parameters_selected.remove("Benthic")
            benthic = True
        mask = None
        if parameters_selected:
            mask = station_parameters[parameters_selected].all(axis=1)
        filtered_stations = filtered_stations[filtered_stations["Name"].apply(
            lambda x: (not parameters_selected or x in station_parameters[mask].index) and
            (not benthic or x in benthic_samples["StationName"].values))]

    if filtered_stations.shape != cmc_stations.shape:
        data_complement = cmc_stations[cmc_stations["Name"].apply(lambda x: x not in filtered_stations["Name"])]
        trace.append(go.Scattermapbox(
            lat=data_complement["Lat"],
            lon=data_complement["Long"],
            mode="markers",
            marker={"symbol": "circle", "size": 10, "opacity": .05},
            text=data_complement["Name"],
            hoverinfo="text",
            name="test"
        ))
    trace.append(go.Scattermapbox(
        lat=filtered_stations["Lat"],
        lon=filtered_stations["Long"],
        mode="markers",
        marker={"symbol": "circle", "size": 10},
        text=filtered_stations["Name"],
        hoverinfo="text",
        name="test"
    ))

    return {
        "data": trace,
        "layout": go.Layout(
            autosize=True,
            hovermode="closest",
            showlegend=False,
            height=700,
            mapbox={"accesstoken": mapbox_access_token,
                    "bearing": 0,
                    "center": {"lat": 38.9784, "lon": -76.4922},
                    "zoom": 5,
                    "style": "mapbox://styles/mapbox/light-v9"},
        )

    }
>>>>>>> c1ea83dd3fef261122b7d3e6f37fd97fd617ead0

server = app.server

if __name__ == '__main__':
	app.run_server(debug=True)
