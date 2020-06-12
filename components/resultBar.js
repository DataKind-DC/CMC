import React, { Component , PureComponent } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Dropdowns from "../components/dropdowns"
import DatePicker from "react-datepicker";
import { Container, Row, Col, Input, Label } from 'reactstrap';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import moment from "moment";
import 'moment-timezone';
import Toggle from 'react-toggle';

import StationSummary from '../components/stationSummaryPanel'


const ResultBar = (props) => {
        return (
            <Row style={{ border : "solid 1px #DEDEDE", backgroundColor: 'white', height: '100%'}}>
                    <StationSummary station = {props.selected} />
                 </Row>
        );
}


export default ResultBar

