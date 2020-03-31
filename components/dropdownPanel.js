import React, { Component , PureComponent } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import dynamic from 'next/dynamic'
import Head from 'next/head'
import cmcdata from "../public/cmcdata_subset.json"
import Dropdowns from "../components/dropdowns"
import DatePicker from "react-datepicker";
import { Container, Row, Col } from 'reactstrap';

class dropDownPanel extends PureComponent {

    render() {

        return (
            <Col style = {{width: '400px', opacity: 0.8, backgroundColor: 'white', border : "solid 1px #b1b5b5", padding: '20px', margin: '5px', zIndex: 100, position:"fixed"}}>
                        <Row className="justify-content-md-center" style={{padding: '5px'}}>
                            <Dropdowns style = {{width: '80%', backgroundColor: 'white'}} placeholder={"Select a local group..."} options={this.props.GroupNames} label = {'GroupName'} callBack={this.props.setGroupName} />
                        </Row>
                        <Row className="justify-content-md-center" style={{padding: '5px'}} >
                            <Dropdowns  style = {{width: '80%', backgroundColor: 'white'}} placeholder={"Select a parameter..."} options={this.props.variables} label = {'variable'} callBack={this.props.setVariable} />
                        </Row>
                        <Row className="justify-content-md-center" style = {{backgroundColor: 'white', padding: 'auto'}}>
                            <DateRangePicker
                                  startDate={this.props.startDate} // momentPropTypes.momentObj or null,
                                  startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                                  endDate={this.props.endDate} // momentPropTypes.momentObj or null,
                                  endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                                  onDatesChange={({ startDate, endDate }) => this.props.setDates(startDate, endDate)} // PropTypes.func.isRequired,
                                  focusedInput={this.props.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                  onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                            />
                        </Row>
                    </Col>
        );
    }
}

export default dropDownPanel