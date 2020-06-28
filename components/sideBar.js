import React, { Component , PureComponent } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { Container, Row, Col, Input, Label, CustomInput, Button } from 'reactstrap';
import moment from "moment";
import 'moment-timezone';
import Toggle from 'react-toggle';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import { Calendar } from 'react-date-range';
import DateRangePicker from 'react-bootstrap-daterangepicker';


import Dropdowns from "../components/dropdowns"

const SliderWithTooltip = createSliderWithTooltip(Slider);


function SideBar(props) {
        return (
            <Row middle="xs" style={{ alignItems: 'center', justifyContent: 'center', 'minHeight' : '100%' }}>
                <Col middle="xs">
                    <div>
                        <h5 style={{ justifyContent: 'center', paddingBottom: '0.5rem' }} className="font-weight-light" >Filter stations</h5>
                        <Row className="justify-content-md-center">
                        <Label>By date: &nbsp;</Label>
                        <DateRangePicker startDate={props.start_date} endDate={props.end_date} onApply={props.set_dates}>
                            <input type="text" name="daterange" value={props.start_date.toLocaleString() + ' - ' + props.end_date.toLocaleString()} />
                        </DateRangePicker>
                        </Row>


                        <Dropdowns
                            placeholder={"By local group..."}
                            options={props.group_names}
                            selected={props.selected_groups}
                            label = {'label'}
                            callBack={props.set_group_name} />

                        <Dropdowns
                            placeholder={"By parameter..."}
                            options={props.parameters}
                            label = {'label'}
                            callBack={props.set_variable}
                            />

                        <Dropdowns
                            placeholder={"By state..."}
                            options={props.us_states}
                            selected={props.selected_state}
                            label = {'label'}
                            callBack={props.set_us_states} />

                        <Dropdowns
                            placeholder={"By water body..."}
                            options={props.water_bodies}
                            selected={props.selected_water_bodies}
                            label = {'label'}
                            callBack={props.set_water_bodies} />


                        <Row style={{paddingTop: '10px'}} className="justify-content-md-center">
                            <Label> By minimum number of samples: {props.sample_threshold} </Label>
                            <SliderWithTooltip style={{width:'60%'}}
                                min={0}
                                max={100}
                                onChange={props.change_sample_threshold}
                                value={props.sample_threshold}
                                defaultValue={5}
                                />
                        </Row>

                        <Row style={{paddingTop: '20px'}} className="justify-content-md-center">
                            <Toggle
                              id='toggle_wqp_layer'
                              defaultChecked={props.show_wqp}
                              icons={false}
                              onClick={props.toggle_wqp}
                            />
                            <Label
                                style={{paddingLeft: '10px'}}
                                htmlFor='toggle_wqp_layer'>
                                Display WQP stations
                            </Label>
                        </Row>
                    </div>
                </Col>
            </Row>
        );
}


export default SideBar

