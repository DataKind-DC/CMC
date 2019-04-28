import dash
import dash_bootstrap_components as dbc
import dash_core_components as dcc
import dash_html_components as html
import pandas as pd
import plotly.graph_objs as go
import us
import numpy as np

mapbox_access_token = "pk.eyJ1IjoicHJpeWF0aGFyc2FuIiwiYSI6ImNqbGRyMGQ5YTBhcmkzcXF6YWZldnVvZXoifQ.sN7gyyHTIq1BSfHQRBZdHA"

# Data on individual stations.
cmc_stations = pd.read_csv("data/cmcStations.csv")
cmc_stations = cmc_stations[cmc_stations.Status]

# Data on all samples.
water_quality_samples = pd.read_csv("data/cmcWaterQualitySamples.csv")

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

navbar = dbc.NavbarSimple(
    brand="Chesapeake Monitoring Cooperative",
    brand_href="#",
    sticky="top",
)

body = dbc.Container([
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
])

app.layout = html.Div([navbar, body])


@app.callback(
    dash.dependencies.Output("main-map", "figure"),
    [
        dash.dependencies.Input("county-selected", "value"),
        dash.dependencies.Input("waterbody-selected", "value"),
        dash.dependencies.Input("group-selected", "value"),
        dash.dependencies.Input("parameter-selected", "value")
    ]
)
def update_figure(counties_selected, waterbodies_selected, groups_selected,
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

server = app.server

if __name__ == "__main__":
    app.run_server(debug=True)
