import React, { Component , PureComponent } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import dynamic from 'next/dynamic'
import Head from 'next/head'
import cmcdata from "../public/cmcdata_subset.json"
import Dropdowns from "../components/dropdowns"
import DatePicker from "react-datepicker";
import { Container, Row, Col, Input, Label } from 'reactstrap';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import moment from "moment";
import 'moment-timezone';
import Toggle from 'react-toggle';

const SideBar = (props) => {
        return (
            <Row style={{ border : "solid 1px #b1b5b5", backgroundColor: 'white', height: '100%'}}>
                <Col>
                        <Row>
                            <b> Filter the stations on the map by group name, parameter, or date collected. </b>
                        </Row>
                        <Row style={{padding: '5px'}} className="justify-content-md-center">
                            <Dropdowns
                                placeholder={"Select a local group..."}
                                options={props.group_names}
                                label = {'label'}
                                callBack={props.set_group_name} />
                        </Row>
                        <Row style={{padding: '5px'}} className="justify-content-md-center">
                            <Dropdowns
                                placeholder={"Select a parameter..."}
                                options={props.variables}
                                label = {'variable'}
                                callBack={props.set_variable} />
                        </Row>
                        <Row style={{paddingtop: '10px'}} className="justify-content-md-center">
                            <DateRangePicker
                                  startDate={props.start_date}
                                  startDateId="your_unique_start_date_id"
                                  endDate={props.end_date}
                                  endDateId="your_unique_end_date_id"
                                  onDatesChange={props.set_dates}
                            />
                        </Row>
                        <Row style={{padding: '10px'}} className="justify-content-md-center">
                            <Toggle
                              id='toggle_wqp_layer'
                              defaultChecked={props.wqp_status}
                              icons={false}
                              onClick={props.toggle_wqp}
                            />
                            <label htmlFor='toggle_wqp_layer'>Display WQP stations</label>
                        </Row>
                </Col>
            </Row>
        );
}


export default SideBar

