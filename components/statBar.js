import React, { Component , PureComponent } from 'react';
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { Row, Col } from 'reactstrap';
import axios from "axios";
import _ from 'lodash';


const StatBar = (props) => {
        const select_vars = ['SamplesCount', 'BenthicSamplesCount', 'WaterBodyCount', 'StationCount', 'BenthicStationCount', 'MonitorsCount', 'MonitorHoursSum', 'GroupsCount']
        const subset = _.pick(props.summary_data, select_vars);
        const show_data = Object.entries(subset).map(([key, value]) => ( <h5> {key} : {value} </h5> ) )

        return (
            <Row style={{ border : "solid 1px #DEDEDE", backgroundColor: 'white', height: '100%'}}>
                {show_data}
            </Row>
        );
}


export default StatBar

