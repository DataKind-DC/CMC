import React, { Component , PureComponent } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Dropdowns from "../components/dropdowns"
import DatePicker from "react-datepicker";
import { Container, Row, Col } from 'reactstrap';
import Chart from "../components/dataChart"
import 'react-dates/initialize';
import moment from "moment";
import 'moment-timezone';
import axios from "axios";

import StationSummary from '../components/stationSummaryPanel'
import NavBar from '../components/navBar'
import SideBar from '../components/sideBar'

import wqpdata from "../public/wqp_stations.json"


class Home extends PureComponent {
    state = {
        wqp_station_data: [],
        all_stations_data: [],
        stations_data: [],
        station_ids: [],
        group_names: [],
        parameter_data: [],
        show_wqp: true,
        chart_data: [],
        GroupNames: null,
        variables: null,
        selectedGroupNames: [],
        selectedVariables: [],
        selected: [], /// individual row selected
        startDate: moment().subtract(2, "year"),
        endDate: moment(),
        availableVariablesAtLocation: null,
        selectedVariableAtLocation: null
        };


    MarkerMap = dynamic(() => import('../components/map'), {ssr: false});

    changeLocation = (e) => {
        console.log(e.Id)
        this.setState({
            selected : this.state.stations_data.filter((item)=> item.Id == e.Id)[0]
        }, () => {
            console.log('new')
            this.get_station_data()
          ///  this.updateChartData()
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
            selectedGroupNames: e.length !== 0 ? e[0].variable : null
        }, () => {
        this.update_stations()
        })
    }

    setVariable = (e) => {
        console.log(e)
        this.setState({
            selectedVariables: e.length !== 0 ? e[0].variable : null
        }, () => {
        this.update_stations()
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

    load_station_data = () => {
        axios.get('https://cmc.vims.edu/odata/Stations')
            .then(res => {
                const data = res.data['value'];

                this.setState({
                    all_stations_data: data,
                    stations_data: data,
                })

            })
    }

    load_parameter_data = () => {
        axios.get('https://cmc.vims.edu/odata/Groups?$expand=CmcMemberUser,CmcMemberUser2,CmcMemberUser3,ParameterGroups($select=Parameter,LabId,DetectionLimit;$expand=Parameter)&$orderby=Name')
            .then(res => {
                const data = res.data['value'];
               ///const parameter_data = data.map((item) => {(item.ParameterGroups)})
                const parameter_types = data.map((item) => { return item.ParameterGroups.map((subitem) => subitem.Parameter.Name) })
                const parameter_array = parameter_types.flat()
                const unique_parameters = parameter_array.filter((x, i, a) => a.indexOf(x) === i)
                const unique_parameters_dropdown = unique_parameters.map((item) => { return {'variable' : item}})

                const group_names = data.map((item) => { return {'label' : item.Name, 'variable': item.Code}})


                this.setState({
                    parameter_data: data,
                    variables: unique_parameters_dropdown,
                    group_names: group_names
                })

            })
    }


    get_station_data = () => {
        const station_id = this.state.selected.Id
        const get_payload = {
            '?$expand': ['Event($expand=Station,Group),Parameter'],
            '$filter': [`Event/StationId eq ${station_id} and QaFlagId eq 2`]
            }

        axios.get('https://cmc.vims.edu/odata/PublicSamples', {params : get_payload})
            .then(res => {        this.get_station_data();
                console.log(res.data)
            })


    }


    update_stations = () => {
    ///    const param_data = this.state.parameter_data;
///
    ///    /// parameters with a certain code for a station
    ///    const subset_param_data = (this.state.selectedVariables === null)
    ///                        ? param_data
    ///                        : param_data.filter((item) => item['ParameterGroups'].some((subitem) => subitem['Parameter']['Name'] == this.state.selectedVariables))
///
        const subset_stations_by_group_name = (this.state.selectedGroupNames === null)
                                                    ? this.state.all_stations_data
                                                    : this.state.all_stations_data.filter(item => item['Code'].startsWith(this.state.selectedGroupNames))


        /// stations supplying data with those parameters (for filtering stations)
       /// const new_stations_data = subset_param_data.map((item) => { return item['Id'] })
       /// console.log(new_stations_data)
///
       /// const final_data = subset_stations_by_group_name.filter((item) => new_stations_data.includes(item['Id']))
       /// console.log(final_data)

        this.setState({ stations_data : subset_stations_by_group_name })

    }


    componentDidMount = () => {
        this.load_station_data();
        this.load_parameter_data();

        this.setState({
            wqp_station_data : wqpdata
        })
    }

    render() {

        return (
        <Container>
            <Head></Head>
            <NavBar />
            <Row>
            <Col style = {{width: '20%'}}>
                    <SideBar
                        group_names={this.state.group_names}
                        set_group_name={this.setGroupName}
                        variables={this.state.variables}
                        set_variable={this.setVariable}
                        start_date={this.state.startDate}
                        end_date={this.state.endDate}
                        set_dates={({ startDate, endDate }) => this.setDates(startDate, endDate)}
                        wqp_status={this.state.show_wqp}
                        toggle_wqp={() => this.setState({show_wqp: !this.state.show_wqp})}
                    />
            </Col>
            <Col>
                <Row style={{height: '80%'}}>
                    <this.MarkerMap
                        style = {{ width: '100%'}}
                        stations_data={this.state.stations_data}
                       /* data = {this.state.filtered_data} */
                        wqpdata = {this.state.wqp_station_data}
                        show_wqp = {this.state.show_wqp}
                        selected = {this.state.selected}
                        callBack = {this.changeLocation}
                    />
                </Row>
                <Row style={{ border : "solid 1px #b1b5b5", backgroundColor: 'white'}}>
                    <StationSummary station = {this.state.selected} />
                </Row>
            </Col>
            <Col style = {{ height: '100%' }}>
                 <Row className="justify-content-md-center" style={{ border : "solid 1px #b1b5b5", backgroundColor: 'white'}}>
                    <StationSummary station = {this.state.selected} />
                 </Row>
            </Col>
         </Row>
         </Container>
        );
    }
}

export default Home