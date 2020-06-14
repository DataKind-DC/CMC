import React, { Component , PureComponent } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import dynamic from 'next/dynamic'
import Head from 'next/head'
import DatePicker from "react-datepicker";
import { Container, Row, Col, Input, Label } from 'reactstrap';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import moment from "moment";
import 'moment-timezone';
import { DateTime } from 'luxon';

import Dropdowns from "../components/dropdowns"
import Chart from "../components/dataChart"


function StationSummary(props) {
    const {station} = props;
    return (
        <Row style={{ backgroundColor: 'white', height: '100%'}}>


        {station.length !== 0 ?
                <Col style={{paddingTop: '10px'}}>
                    <b> Station Details: {station.NameLong} </b>
                    <br />
                    <i> {station.CityCounty}, {station.State} </i>
                    <br />
                    <br />
                    <p> <b> Monitored by: </b>  {station.station_group} </p>
                    <p> <b> First sampled: </b> {DateTime.fromISO(station.CreatedDate.replace('Z', '')).toLocaleString(DateTime.DATE_MED)} </p>
                    <p> <b> Most recently sampled: </b> {DateTime.fromISO(station.ModifiedDate.replace('Z', '')).toLocaleString(DateTime.DATE_MED)} </p>
                </Col>
                : <Col> </Col>
            }
        </Row>
    );
}


function StationParameterSummary(props) {
    const { samples } = props;
    return (
        <Row className="align-items-center">
        {samples != null
            ? <Col>
                <div >
                    <b> Total samples collected </b>
                    <br />
                    <b> {samples} </b>
                </div>
              </Col>
            : <p> </p>
            }
        </Row>
    );
}

function ResultBar(props) {
    return (
        <div>
            {props.selected.length !== 0
                ? <div>
                    <StationSummary station = {props.selected} />
                    <StationParameterSummary samples={props.samples}/>
                    <Chart chart_data={props.chart_data} update_chart_data={props.update_chart_data} available_parameters={props.available_parameters} />
                  </div>
                : <p> Select a station to learn more </p>
            }
        </div>
    );

}



export default ResultBar

