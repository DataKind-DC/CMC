import React, { Component , PureComponent } from 'react';
import ReactMapGL, { Popup, Marker } from 'react-map-gl';
import CityPin from '../components/pin';
import { Container, Row, Col } from 'reactstrap';


class Markers extends PureComponent {
  state = {
    data : this.props.data
    }


  render() {
    const {data} = this.props;

    return data.map(
      city =>
        <Marker key = {city.index} longitude={city.Longitude} latitude={city.Latitude} >
            <CityPin
                size = { (this.props.selected === city.index) ? 40 : 15}
                fill= { (this.props.selected === city.index) ? '#397FC4' : '#FF9E01'}
                opacity= { (this.props.selected === city.index) ? 1 : 0.8}
                onClick={() => this.props.callBack(city)}
                />
        </Marker>
    )
  }
}

class Map extends PureComponent {
    state = {
        viewport: {
            width: "100%",
            height: "100%",
            latitude: 38.188830663131526,
            longitude: -77.96888714127523,
            zoom: 6
      },
    };

    render() {
        return (
            <Row style={this.props.style}>
                <ReactMapGL
                    mapStyle="mapbox://styles/mapbox/outdoors-v9"
                    mapboxApiAccessToken="pk.eyJ1IjoiZGFuYmVybnN0ZWluIiwiYSI6ImNrNXM4ZGZuYzA1eGUzbnA0eGdveHZuZ2kifQ.7atp6EfK9Hp958HvKcDFKA"
                    onViewportChange={(viewport) => this.setState({viewport})}
                    {...this.state.viewport}>
                    <Markers data={this.props.data} selected={this.props.selected.index} callBack={this.props.callBack} />

                </ReactMapGL>
            </Row>
        );
    }
}

export default Map;