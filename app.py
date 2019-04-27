import dash
import dash_core_components as dcc
import dash_html_components as html
import pandas as pd
import plotly.graph_objs as go
import us

mapbox_access_token = "pk.eyJ1IjoicHJpeWF0aGFyc2FuIiwiYSI6ImNqbGRyMGQ5YTBhcmkzcXF6YWZldnVvZXoifQ.sN7gyyHTIq1BSfHQRBZdHA"

water_quality_samples = pd.read_csv("data/cmcWaterQualitySamples.csv")
station_identifier_columns = [
    "StationName",
    "StationCode",
    "Latitude",
    "Longitude",
    "GroupName"
]
all_stations = water_quality_samples[station_identifier_columns].drop_duplicates()

app = dash.Dash(__name__)

app.layout = html.Div([
    html.Div([
        html.H1("Chesapeake Monitoring Collective")
    ], style={
        "textAlign": "center",
        "padding-bottom": "10",
        "padding-top": "10"}),
    html.Div([
        dcc.Dropdown(id="group-selected",
                     options=[{"label": group, "value": group} for group in all_stations["GroupName"].unique()],
                     value=None,
                     multi=True,
                     style={
                         "display": "block",
                         "margin-left": "auto",
                         "margin-right": "auto",
                         "width": "50%"
                     }
                     )
    ]),
    html.Div(dcc.Graph(id="main-map"))
], className="container")


@app.callback(
    dash.dependencies.Output("main-map", "figure"),
    [dash.dependencies.Input("group-selected", "value")]

)
def update_figure(selected):
    trace = []
    if selected is None:
        filtered_stations = all_stations
    else:
        filtered_stations = all_stations[all_stations["GroupName"].apply(lambda x: x in selected)]
    trace.append(go.Scattermapbox(
        lat=filtered_stations["Latitude"],
        lon=filtered_stations["Longitude"],
        mode="markers",
        marker={"symbol": "circle", "size": 10},
        text=filtered_stations["StationName"],
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
                    "pitch": 30, "zoom": 6,
                    "style": "mapbox://styles/mapbox/light-v9"},
        )

    }

server = app.server

if __name__ == "__main__":
    app.run_server(debug=True)
