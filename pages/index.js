import React, { Component , PureComponent } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import dynamic from 'next/dynamic'
import Head from 'next/head'
import cmcdata from "../public/cmcdata_subset.json"
import Dropdowns from "../components/dropdowns"
import DatePicker from "react-datepicker";
import { Container, Row, Col } from 'reactstrap';
import Chart from "../components/dataChart"
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import moment from "moment";
import 'moment-timezone';

class Home extends PureComponent {
    state = {
        filtered_data: [],
        chart_data: [],
        GroupNames: null,
        variables: null,
        selectedGroupNames: null,
        selectedVariables: null,
        selected: {index: null, StationName: null}, /// individual row selected
        startDate: moment().subtract(2, "year"),
        endDate: moment(),
        availableVariablesAtLocation: null,
        selectedVariableAtLocation: null
        };


    Map = dynamic(() => import('../components/map'), {ssr: false});

    changeLocation = (e) => {
        console.log(e.index)
        this.setState({
            selected : cmcdata.filter((item)=> item['index'] == e.index)[0]
        }, () => {
            this.updateChartData()
        })
    }


    getUnique = (e, d) => {
        const result = [];
        const map = new Map();
        for (const item of d) {
            if(!map.has(item[e])){
                map.set(item[e], true);    // set any value to Map
                var obj = {};
                obj[e] = item[e];
                result.push(obj);
            }
        }
        return result

    }

    setGroupName = (e) => {
        console.log(e)
        this.setState({
            selectedGroupNames: e[0].GroupName
        }, () => {
        this.setFilteredData()
        })
    }

    setVariable = (e) => {
        this.setState({
            selectedVariables: e[0].variable
        }, () => {
        this.setFilteredData()
        })
    }

     setDates = (startDate, endDate) => {
        this.setState({
            startDate : startDate,
            endDate : endDate
        }, () => {
        this.setFilteredData()
        })
    }

     resetLocation = () => {
        this.setState({
            selected: {index: null, StationName: null},
            chart_data: null,
            selectedVariableAtLocation: null

            })
     }

     setVariableAtLocation = (e) => {
        console.log(e)
        this.setState({
            selectedVariableAtLocation: e[0].variable
        }, () => {
        this.updateChartData()
        })
    }


    filterData = () => {
        const new_data = (this.state.selectedGroupNames)
                            ? cmcdata.filter((item) => item['GroupName'] == this.state.selectedGroupNames)
                            : cmcdata
        const filtered_data = (this.state.selectedVariables)
                            ? new_data.filter((item) => item['variable'] == this.state.selectedVariables)
                            : new_data
        const final_data = (this.state.startDate)
                            ? filtered_data.filter(a => new Date(a.Date) - this.state.startDate > 0)
                            : filtered_data
        const ultimate_data = (this.state.endDate)
                            ? final_data.filter(a => new Date(a.Date) - this.state.endDate < 0)
                            : final_data

        return ultimate_data
    }


    setFilteredData = () => {
        this.resetLocation()
        const new_data = this.filterData()
        this.setState({
                filtered_data : new_data
            })
    }


    formatVals = (item, objs) => {
        const a = item.Date
        const b = parseFloat(item.value)
        objs[a] = b
    }

    updateChartData = () => {
        console.log(this.state.selected.GroupName)

        const chart_data_by_group = (this.state.selected.StationName)
            ? cmcdata.filter((item) => item['StationName'] == this.state.selected.StationName)
            : cmcdata

        const newVariables = this.getUnique('variable', chart_data_by_group)

        this.setState({
            availableVariablesAtLocation: newVariables
        }, () => {
        const new_chart_data = (this.state.selectedVariableAtLocation)
            ? chart_data_by_group.filter((item) => item['variable'] == this.state.selectedVariableAtLocation)
            : chart_data_by_group.filter((item) => item['variable'] == this.state.availableVariablesAtLocation[0])

        const chart_data = {}
        new_chart_data.map((item) => {this.formatVals(item, chart_data)})

            this.setState({
                chart_data: chart_data,
        })

        })
    }



    componentDidMount = () => {
        this.setState({
            filtered_data: cmcdata,
            GroupNames: this.getUnique('GroupName', cmcdata),
            variables: this.getUnique('variable', cmcdata)
        })
    }

    render() {
        const selected = this.state.selected
        console.log(selected)
        return (
        <Container>
            <Head></Head>
            <Row>
            <Col xs={10} style = {{position: 'fixed'}}>
                    <this.Map style = {{ height: '700px', width: '100%', zIndex: 1}}  data = {this.state.filtered_data} selected = {this.state.selected} callBack = {this.changeLocation} />
            </Col>
            <Col style = {{zIndex: 1001, position: 'relative', height: '400px', opacity: 1, margin: '10px'}} xs={4}>
                <Row className="justify-content-md-center" style={{ border : "solid 1px #b1b5b5", backgroundColor: 'white', borderRadius: '25px', padding: '20px', margin: '5px'}}>
                    <Col style = {{width: '500px'}} >
                        <Row>
                            <b> Filter the stations on the map by group name, parameter, or date collected. </b>
                        </Row>
                        <Row style={{padding: '5px'}} className="justify-content-md-center">
                            <Dropdowns placeholder={"Select a local group..."} options={this.state.GroupNames} label = {'GroupName'} callBack={this.setGroupName} />
                        </Row>
                        <Row style={{padding: '5px'}} className="justify-content-md-center">
                            <Dropdowns placeholder={"Select a parameter..."} options={this.state.variables} label = {'variable'} callBack={this.setVariable} />
                        </Row>
                        <Row style={{paddingtop: '10px'}} className="justify-content-md-center">
                            <DateRangePicker
                                  startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                                  startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                                  endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                                  endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                                  onDatesChange={({ startDate, endDate }) => this.setDates(startDate, endDate)} // PropTypes.func.isRequired,
                                  focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                  onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                            />
                        </Row>
                    </Col>
                </Row>
                 <Row className="justify-content-md-center" style={{ border : "solid 1px #b1b5b5", backgroundColor: 'white', borderRadius: '25px', padding: '10px'}}>
                    <Col>
                        { selected.StationName !== null
                        ? <b> Selected station: {selected.StationName} </b>
                        : <b> Click a station on the map and select an available parameter to see data. </b>
                        }
                        <Dropdowns placeholder={"available parameters..."}
                            options={this.state.availableVariablesAtLocation}
                            label = {'variable'}
                            callBack={this.setVariableAtLocation}
                            />
                        <Chart data = {this.state.chart_data} unit= {this.state.selected.unit} />
                    </Col>
                 </Row>
            </Col>
         </Row>
         </Container>
        );
    }
}

export default Home