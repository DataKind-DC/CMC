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
                        <Row className="justify-content-md-center">
                        <DateRangePicker startDate={props.start_date} endDate={props.end_date} onApply={props.set_dates}>
                            <input type="text" name="daterange" value={props.start_date.toLocaleString() + ' - ' + props.end_date.toLocaleString()} />
                        </DateRangePicker>
                        </Row>

                        <Dropdowns
                            placeholder={"Select a local group..."}
                            options={props.group_names}
                            selected={props.selected_group_names}
                            label = {'label'}
                            callBack={props.set_group_name} />

                        <Dropdowns
                            placeholder={"Select a parameter..."}
                            options={props.parameters}
                            label = {'label'}
                            callBack={props.set_variable}
                            />

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

                        <Dropdowns
                                placeholder={"Select tidal or non-tidal..."}
                                options={[{'label': 'Tidal', 'value' : true}, {'label': 'Non-Tidal', 'value' : false}]}
                                selected={props.selected_tidal}
                                label = {'label'}
                                callBack={props.set_tidal} />
                        <Dropdowns
                                placeholder={"Select a HUC"}
                                options={props.huc6_names}
                                selected={props.selected_huc6_names}
                                label = {'label'}
                                callBack={props.set_huc6_names} />

                        <Row style={{paddingTop: '10px'}} className="justify-content-md-center">
                            <Label> Minimum water quality samples: {props.water_quality_sample_threshold} </Label>
                            <SliderWithTooltip style={{width:'60%'}}
                                min={0}
                                max={100}
                                onChange={props.change_water_quality_sample_threshold}
                                value={props.water_quality_sample_threshold}
                                defaultValue={5}
                                />
                        </Row>

                        <Row style={{paddingTop: '10px'}} className="justify-content-md-center">
                            <Label> Minimum benthic samples: {props.benthic_sample_threshold} </Label>
                            <SliderWithTooltip style={{width:'60%'}}
                                min={0}
                                max={100}
                                onChange={props.change_benthic_sample_threshold}
                                value={props.benthic_sample_threshold}
                                defaultValue={0}
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

