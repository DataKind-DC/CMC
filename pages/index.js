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
        selectedUSStates: [],
        selectedWaterBody: [],
        selected: [],
        startDate: moment().subtract(2, "year"),
        endDate: moment(),
        availableVariablesAtLocation: [],
        selectedVariableAtLocation: null,
        summary_data: {},
        station_sample_count: null,
        station_sample_data: []
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
    updateChartData = (e) => {
        console.log(e)
        const new_chart_data = this.state.station_sample_data.filter(item => item.Name == e[0].value)
        console.log(new_chart_data)

            this.setState({
                chart_data: new_chart_data,
        })
    }

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
            selectedVariables: e.map(item => item['value'] )
        }, () => {
        this.update_stations()
        })
    }

    setUSState = (e) => {
       console.log(e)
       this.setState({
            selectedUSStates: e.map(item => item['value'] )
        }, () => {
        this.update_stations()
        })
    }

    setWaterBody = (e) => {
       console.log(e)
       this.setState({
            selectedWaterBody: e.map(item => item['value'] )
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
                let state_options = data.map((item) => { return item.State }).flat().filter((x, i, a) => a.indexOf(x) === i).sort().map((item) => { return {'label': item, 'value' : item} } )
                let water_body_options = data.map((item) => { return item.WaterBody }).flat().filter((x, i, a) => a.indexOf(x) === i).sort().map((item) => { return {'label': item, 'value' : item} } )
                this.setState({
                    all_stations_data: data,
                    stations_data: data,
                    us_states: state_options,
                    water_bodies: water_body_options
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
        const query = `?$expand=Parameter($select=Id,Code,Name,Units,Tier)&$filter=Event/StationId eq ${station_id} and QaFlagId eq 2&$count=true&$select=Parameter,Value,CreatedDate`
        axios.get('https://cmc.vims.edu/odata/PublicSamples' + query).then(res => {
            console.log(res.data.value)
            let flatten_sample_data = res.data['value'].map(item => { return Object.assign({}, ...function _flatten(o) {
                return [].concat(...Object.keys(o).map(k =>
                    typeof o[k] === 'object'
                        ? _flatten(o[k])
                        : (
                            { [k]: o[k] }
                            )
                        )
                        )
                    } (item))
                }
            )

            flatten_sample_data = flatten_sample_data.map((item) => {
                item['Name'] = item.Name.toLowerCase()
                return item
                })
            const available_parameters = flatten_sample_data.map((item) => { return item.Name }).flat().filter((x, i, a) => a.indexOf(x) === i).sort().map((item) => { return {'label': item, 'value' : item} } )

            this.setState({
                station_sample_count: res.data['@odata.count'],
                station_sample_data: flatten_sample_data,
                availableVariablesAtLocation: available_parameters
            })
        })
    }

    update_stations = () => {
        const filter_length = this.state.selectedGroupNames.length + this.state.selectedUSStates.length + this.state.selectedVariables.length + this.state.selectedWaterBody

        let filtered_stations = this.state.all_stations_data

        if (filter_length == 0) {
            this.setState({ stations_data : filtered_stations })
        } else {
            if (this.state.selectedWaterBody.length != 0) {
                filtered_stations = filtered_stations.filter(item => this.state.selectedWaterBody.some(water_body => item['WaterBody'] == water_body))///.startsWith(this.state.selectedGroupNames))
            }

            if (this.state.selectedUSStates.length != 0) {
                filtered_stations = filtered_stations.filter(item => this.state.selectedUSStates.some(station_state => item['State'] == station_state))///.startsWith(this.state.selectedGroupNames))
            }

            if (this.state.selectedGroupNames.length != 0) {
                filtered_stations = filtered_stations.filter(item => this.state.selectedGroupNames.some(group_name => item['Code'].includes(group_name)))///.startsWith(this.state.selectedGroupNames))
            }

            /// stations supplying data with those parameters (for filtering stations)
            if (this.state.selectedVariables.length != 0) {
                const subset_param_data = this.state.parameter_data.filter((item) => item['ParameterGroups'].some((subitem) => subitem.Parameter.Name.toLowerCase() == this.state.selectedVariables))
                const new_stations_data = subset_param_data.map((item) => { return item['Id'] })
                filtered_stations = filtered_stations.filter((item) => new_stations_data.includes(item['Id']))
            }

            ///console.log(filtered_stations)
            this.setState({ stations_data : filtered_stations })
        }
    }

    change_location = (e) => {
        const station_group = this.state.group_names.find(element => element.value == e.Code.split('.')[0]).label;
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
        <Container style={{maxWidth: '100%'}}>
            <Head></Head>
                <NavBar />
                    <Row style = {{height: '600px', padding: '0px'}}>
                    <Col xs={3} >
                        <SideBar
                                group_names={this.state.group_names}
                                set_group_name={this.setGroupName}
                                selected_groups={this.state.selectedGroupLabels}
                                variables={this.state.variables}
                                set_variable={this.setVariable}
                                us_states={this.state.us_states}
                                set_us_states={this.setUSState}
                                selected_us_states={this.state.selectedUSStates}
                                water_bodies={this.state.water_bodies}
                                set_water_bodies={this.setWaterBody}
                                selected_water_bodies={this.state.selectedWaterBody}
                                start_date={this.state.startDate}
                                end_date={this.state.endDate}
                                set_dates={({ startDate, endDate }) => this.setDates(startDate, endDate)}
                                wqp_status={this.state.show_wqp}
                                toggle_wqp={() => this.setState({show_wqp: !this.state.show_wqp})}
                            />
                    </Col>
                    <Col xs={6} style={{height: '700px'}} >
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
                    <Col xs={3} style = {{height: '700px'}}>
                         <ResultBar
                            selected={this.state.selected}
                            samples={this.state.station_sample_count}
                            available_parameters={this.state.availableVariablesAtLocation}
                            update_chart_data={this.updateChartData}
                            chart_data={this.state.chart_data}
                         />
                    </Col>
             </Row>
         </Container>
        );
    }
}

export default Home