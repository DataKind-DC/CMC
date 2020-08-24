import React, { Component , PureComponent } from 'react';
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { Row, Col } from 'reactstrap';
import axios from "axios";
import _ from 'lodash';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWater , faClock, faUserClock, faUsers, faTable, faUser, faStar } from "@fortawesome/free-solid-svg-icons";


function StatBar(props) {
        let select_vars = [
        ///   { variable: 'MonitorHoursSum', label: 'Monitoring Hours', icon: faUserClock },
            { variable: 'StationCount', label: 'Water Stations', icon: faStar },
            { variable: 'SamplesCount', label: 'Water Samples', icon: faTable },
        ///    { variable: 'WaterBodyCount', label: 'Rivers/Streams', icon: faWater },
            { variable: 'BenthicStationCount', label: 'Benthic Stations', icon: faStar },
            { variable: 'BenthicSamplesCount', label: 'Benthic Samples', icon: faTable },
        ///    { variable: 'MonitorsCount', label: 'Monitors', icon: faUser },
        ///    { variable: 'GroupsCount', label: 'Organizations', icon: faUsers },

            ]

        select_vars = select_vars.map(item => {
            item['value'] = props.summary_data[item.variable]
            return item
        })

        const show_data = select_vars.map(item => (
            <Col >
                <div >
                <Row style={{justifyContent: 'center'}}>
                    <b style={{fontSize: '20px'}}> {parseFloat(item.value).toLocaleString()} </b>
                </Row>
                <Row style={{justifyContent: 'center'}}>
                    <p> {item.label} </p>
                </Row>
                </div>
             { /*   <FontAwesomeIcon size='md' icon={item.icon} /> */}
            </Col>
            )
            )

        return (
                <Row xs={4} style={{ borderRight : "solid 1px #DEDEDE", borderLeft:  "solid 1px #DEDEDE", backgroundColor: 'white', height: props.height }}>
                    {show_data}
                </Row>
        );
}


export default StatBar

