import React, { Component , PureComponent, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { DateTime } from 'luxon';


function StationSummary(props) {

        const {station} = props;
        const station_length = station.length !== 0;
        return (
            <Row>
            {station_length ?
                    <Col>
                        <p> <b> Station Code:</b> {station.Code} </p>
                        <p> <b> Station Description:</b> {station.NameLong} </p>
                        <p> <b> Water Body:</b> {station.WaterBody} </p>
                        <p> <b> Location: </b> {station.CityCounty}, {station.State} </p>
                        <p> <b> First sampled: </b> {DateTime.fromISO(station.CreatedDate.replace('Z', '')).toLocaleString(DateTime.DATE_FULL)} </p>
                        <p> <b> Most recently sampled: </b> {DateTime.fromISO(station.ModifiedDate.replace('Z', '')).toLocaleString(DateTime.DATE_FULL)} </p>
                    </Col>

                    : <p> </p>

                }
            </Row>

        );
}

export default StationSummary;