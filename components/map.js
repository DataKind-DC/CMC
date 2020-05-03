import React, { Component , PureComponent, useState } from 'react';
import ReactMapGL, { Popup, Marker } from 'react-map-gl';
import CityPin from '../components/pin';
import { Container, Row, Col } from 'reactstrap';


function Markers(props) {

   const {data} = props;
   return data.map(
     marker =>
       <Marker key = {marker.Id} longitude={marker.Long} latitude={marker.Lat} >
           <CityPin
               size = { (props.selected === marker.Id) ? 40 : 15}
               fill= { (props.selected === marker.Id) ? '#397FC4' : '#FF9E01'}
               opacity= { (props.selected === marker.Id) ? 1 : 0.8}
               onClick={() => props.callBack(marker)}
               />
       </Marker>
   )
}

function WqpMarkers(props) {
    const {data} = props

    return data.map(
      marker =>
        <Marker key = {marker.index} longitude={marker.Longitude} latitude={marker.Latitude} >
            <CityPin
                size = {7}
                fill= '#FF0000'
                opacity = {0.5}
                />
        </Marker>
    )
}

function Map(props) {
    const default_viewport = {
            width: "100%",
            height: "100%",
            latitude: 38.188830663131526,
            longitude: -77.96888714127523,
            zoom: 6
      }

    const [viewport, setViewport] = useState(default_viewport);
    const handleViewport = (viewport) => setViewport(viewport);

        return (
            <Row style={props.style}>
                <ReactMapGL
                    mapStyle="mapbox://styles/mapbox/outdoors-v9"
                    mapboxApiAccessToken="pk.eyJ1IjoiZGFuYmVybnN0ZWluIiwiYSI6ImNrNXM4ZGZuYzA1eGUzbnA0eGdveHZuZ2kifQ.7atp6EfK9Hp958HvKcDFKA"
                    onViewportChange={handleViewport}
                    {...viewport}>
                    {props.show_wqp
                        ? <WqpMarkers data={props.wqpdata} />
                        : <div></div>
                        }
                    <Markers data={props.stations_data} selected={props.selected.Id} callBack={props.callBack} />

                </ReactMapGL>
            </Row>
        );
}

export default Map;