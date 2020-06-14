import React, { Component , PureComponent } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { Container, Row, Col, Input, Label } from 'reactstrap';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import moment from "moment";
import 'moment-timezone';
import Toggle from 'react-toggle';

import Dropdowns from "../components/dropdowns"


function SideBar(props) {
        return (
            <Row middle="xs" style={{ alignItems: 'center', justifyContent: 'center', 'minHeight' : '100%' , backgroundColor: 'white'}}>
                <Col middle="xs">
                    <div style={{ }} >
                        <Dropdowns
                            placeholder={"Select a local group..."}
                            options={props.group_names}
                            selected={props.selected_groups}
                            label = {'label'}
                            callBack={props.set_group_name} />

                        <Dropdowns
                            placeholder={"Select a parameter..."}
                            options={props.variables}
                            label = {'label'}
                            callBack={props.set_variable} />

                        <Dropdowns
                                placeholder={"Select a state..."}
                                options={props.us_states}
                                selected={props.selected_state}
                                label = {'label'}
                                callBack={props.set_us_states} />

                        <Dropdowns
                                placeholder={"Select a water body..."}
                                options={props.water_bodies}
                                selected={props.selected_water_bodies}
                                label = {'label'}
                                callBack={props.set_water_bodies} />

                        <Row style={{paddingTop: '10px'}} className="justify-content-md-center">
                            <DateRangePicker
                                  startDate={props.start_date}
                                  startDateId="your_unique_start_date_id"
                                  endDate={props.end_date}
                                  endDateId="your_unique_end_date_id"
                                  onDatesChange={props.set_dates}
                            />
                        </Row>
                        <Row style={{paddingTop: '20px'}} className="justify-content-md-center">
                            <Toggle
                              id='toggle_wqp_layer'
                              defaultChecked={props.wqp_status}
                              icons={false}
                              onClick={props.toggle_wqp}
                            />
                            <Label htmlFor='toggle_wqp_layer'>Display WQP stations</Label>
                        </Row>
                    </div>
                </Col>
            </Row>
        );
}


export default SideBar

