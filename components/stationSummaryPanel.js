import React, { Component , PureComponent, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { DateTime } from 'luxon';


function StationSummary(props) {
        const {station} = props;
        return (
            <Row>
            {station.length !== 0 ?
                    <Col>
                        <p> <b> {station.NameLong} </b> </p>
                        <p> <b> Monitored by: {station.station_group} </b> </p>
                        <p> <b> Location: </b> {station.CityCounty}, {station.State} </p>
                        <p> <b> First sampled on: </b> {DateTime.fromISO(station.CreatedDate.replace('Z', '')).toLocaleString(DateTime.DATE_FULL)} </p>
                        <p> <b> Most recently sampled on: </b> {DateTime.fromISO(station.ModifiedDate.replace('Z', '')).toLocaleString(DateTime.DATE_FULL)} </p>
                    </Col>
                    : <p> </p>
                }
            </Row>
        );
}

export default StationSummary;