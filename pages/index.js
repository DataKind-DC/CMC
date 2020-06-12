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

import NavBar from '../components/navBar'
import SideBar from '../components/sideBar'
import ResultBar from '../components/resultBar'
import StatBar from '../components/statBar'

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
        selectedGroupLabels: [],
        selectedVariables: [],
        selected: [],
        startDate: moment().subtract(2, "year"),
        endDate: moment(),
        availableVariablesAtLocation: null,
        selectedVariableAtLocation: null,
        summary_data: {}
        };


    MarkerMap = dynamic(() => import('../components/map'), {ssr: false});

    get_summary = () => {
        const res = axios.get('https://cmc.vims.edu/odata/GetHomeStats')
            .then(res => {
                    this.setState({summary_data: res.data[0]})
    })
    }

///    getUnique = (e, d) => {
///        const result = [];
///        const map = new Map();
///        for (const item of d) {
///            if(!map.has(item[e])){
///                map.set(item[e], true);    // set any value to Map
///                var obj = {};
///                obj[e] = item[e];
///                result.push(obj);
///            }
///        }
///        return result
///
///    }
///
///    updateChartData = () => {
///        const chart_data_by_group = (this.state.selected.StationName)
///            ? cmcdata.filter((item) => item['StationName'] == this.state.selected.StationName)
///            : cmcdata
///
///        const newVariables = this.getUnique('variable', chart_data_by_group)
///
///        this.setState({
///            availableVariablesAtLocation: newVariables
///        }, () => {
///        const new_chart_data = (this.state.selectedVariableAtLocation)
///            ? chart_data_by_group.filter((item) => item['variable'] == this.state.selectedVariableAtLocation)
///            : chart_data_by_group.filter((item) => item['variable'] == this.state.availableVariablesAtLocation[0])
///
///        const chart_data = {}
///        new_chart_data.map((item) => {this.formatVals(item, chart_data)})
///
///            this.setState({
///                chart_data: chart_data,
///        })
///
///        })
///    }
///
    setGroupName = (e) => {
        console.log(e)
        const { selectedGroupNames, selectedGroupLabels } = this.state;
        this.setState({
            selectedGroupNames: e.map(item => item['value'] ),
            selectedGroupLabels: e.map(item => item.label)
        }, () => {
            console.log(this.state.selectedGroupNames)
            this.update_stations()
        })
    }

    setVariable = (e) => {
        console.log(e)
       this.setState({
            selectedVariables: e.length !== 0 ? e.map(item => item.variable) : []
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
        this.setState({
            selectedVariableAtLocation: e[0].variable
        }, () => {
        this.updateChartData()
        })
    }

    load_all_station_data = () => {
        axios.get('https://cmc.vims.edu/odata/Stations?$select=Id,Code,Name,NameLong,Lat,Long,CityCounty,Fips,State,WaterBody,CreatedDate,ModifiedDate')
            .then(res => {
                const data = res.data['value']
                this.setState({
                    all_stations_data: data,
                    stations_data: data,
                })

            })
    }

    load_groups_data = () => {
        axios.get("https://cmc.vims.edu/odata/Groups?$select=Id,Code,Name&$orderby=Name")
                .then(res => {
                    const data = res.data['value'];
                    const group_names = data.map((item) => { return {'label' : item.Name, 'value': item.Code}})

                    this.setState({
                        group_names: group_names
                    })
                })
    }

    load_parameter_data = () => {
        axios.get('https://cmc.vims.edu/odata/Groups?$expand=ParameterGroups($select=Parameter;$expand=Parameter($select=Name))&$select=Id,Code')
            .then(res => {
                const data = res.data['value'];
               ///const parameter_data = data.map((item) => {(item.ParameterGroups)})
                const parameter_types = data.map((item) => { return item.ParameterGroups.map((subitem) => subitem.Parameter.Name.toLowerCase()) })
                const parameter_array = parameter_types.flat()
                const unique_parameters = parameter_array.filter((x, i, a) => a.indexOf(x) === i).sort()
                const unique_parameters_dropdown = unique_parameters.map((item) => { return {'label': item, 'value' : item} } )

                this.setState({
                    parameter_data: data,
                    variables: unique_parameters_dropdown,
                })

            })
    }


    get_station_data = () => {
        const station_id = this.state.selected.Id
        const get_payload = {
            '?$expand': ['Event($expand=Station,Group),Parameter'],
            '$filter': [`Event/StationId eq ${station_id} and QaFlagId eq 2`]
            }

        ///axios.get('https://cmc.vims.edu/odata/PublicSamples', {params : get_payload})
        ///    .then(res => {
        ///        this.get_station_data();
        ///    })
    }

    update_stations = () => {
        console.log(this.state.selectedGroupNames)
        console.log(this.state.selectedVariables)

        let filtered_stations = this.state.all_stations_data

        if (this.state.selectedGroupNames.length == 0 && (this.state.selectedVariables.length == 0)) {
            console.log(filtered_stations)
            this.setState({ stations_data : filtered_stations })
        } else {

            if (this.state.selectedGroupNames.length != 0) {
                filtered_stations = this.state.all_stations_data.filter(item => this.state.selectedGroupNames.some(group_name => item['Code'].includes(group_name)))///.startsWith(this.state.selectedGroupNames))
            }
            /// stations supplying data with those parameters (for filtering stations)
            if (this.state.selectedVariables.length != 0) {
                const subset_param_data = this.state.parameter_data.filter((item) => item['ParameterGroups'].some((subitem) => subitem.Parameter.Name.toLowerCase() == this.state.selectedVariables))
                const new_stations_data = subset_param_data.map((item) => { return item['Id'] })
                filtered_stations = filtered_stations.filter((item) => new_stations_data.includes(item['Id']))
            }

            console.log(filtered_stations)
            this.setState({ stations_data : filtered_stations })
        }
    }

    change_location = (e) => {
        const station_group = this.state.group_names.find(element => element.variable == e.Code.split('.')[0]).label;
        const station = this.state.stations_data.filter((item)=> item.Id == e.Id)[0]
        station.station_group = station_group
        this.setState({
            selected : station
        }, () => {
            this.get_station_data()
        })
    }


    componentDidMount = () => {
        this.load_all_station_data();
        this.load_parameter_data();
        this.load_groups_data();
        this.get_summary();

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
            <Col style = {{height: '100vh'}}>
                    <SideBar
                        group_names={this.state.group_names}
                        set_group_name={this.setGroupName}
                        selected_groups={this.state.selectedGroupLabels}
                        variables={this.state.variables}
                        set_variable={this.setVariable}
                        start_date={this.state.startDate}
                        end_date={this.state.endDate}
                        set_dates={({ startDate, endDate }) => this.setDates(startDate, endDate)}
                        wqp_status={this.state.show_wqp}
                        toggle_wqp={() => this.setState({show_wqp: !this.state.show_wqp})}
                    />
            </Col>
            <Col xs={6}>
                <Row style={{height: '70%'}}>
                    <this.MarkerMap
                        style = {{ width: '100%'}}
                        stations_data={this.state.stations_data}
                        wqpdata = {this.state.wqp_station_data}
                        show_wqp = {this.state.show_wqp}
                        selected = {this.state.selected}
                        callBack = {this.change_location}
                    />
                </Row>
                <StatBar summary_data={this.state.summary_data}/>
            </Col>
            <Col style = {{height: '100vh'}}>
                 <ResultBar selected={this.state.selected}/>
            </Col>
         </Row>
         </Container>
        );
    }
}

export default Home