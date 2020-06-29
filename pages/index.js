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
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { DateTime } from 'luxon';


import NavBar from '../components/navBar'
import SideBar from '../components/sideBar'
import ResultBar from '../components/resultBar'
import StatBar from '../components/statBar'
import DropDowns from '../components/dropdowns'

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
        parameters: null,
        selected_group_names: [],
        selectedGroupLabels: [],
        selectedVariables: [],
        selected_us_states: [],
        selected_water_bodies: [],
        selected: {},
        start_date: DateTime.local().minus({years: 2}),
        end_date: DateTime.local(),
        availableVariablesAtLocation: [],
        selectedVariableAtLocation: null,
        summary_data: {},
        station_sample_count: null,
        station_sample_data: [],
        sample_threshold: 5,
        show_modal: false,
        parameter_definition: null,
        selected_parameter_definition: null
        };


    MarkerMap = dynamic(() => import('../components/map'), {ssr: false});

    get_summary = () => {
        const res = axios.get('https://cmc.vims.edu/odata/GetHomeStats')
            .then(res => {
                    this.setState({summary_data: res.data[0]})
    })
    }

    updateChartData = (e) => {
        if (e.length) {
            const new_chart_data = this.state.station_sample_data.filter(
                item => item.Name == e[0].value
            )
            this.setState({
                chart_data: new_chart_data,
            })
        } else {
            this.setState({
                chart_data: []
            })
        }
    }

    set_parameter_definition = (e) => {
        this.setState({
            selected_parameter_definition: e[0].label,
            parameter_definition: "[insert parameter definition here]"
            })
    }

    setGroupName = (e) => {
        const { selected_group_names, selectedGroupLabels } = this.state;
        this.setState({
            selected_group_names: e.map(item => item['value'] ),
            selectedGroupLabels: e.map(item => item.label)
        }, () => {
            this.update_stations()
        })
    }

    setVariable = (e) => {
       this.setState({
            selectedVariables: e.map(item => item['value'] )
        }, () => {
        this.update_stations()
        })
    }

    setUSState = (e) => {
       this.setState({
            selected_us_states: e.map(item => item['value'] )
        }, () => {
        this.update_stations()
        })
    }

    setWaterBody = (e) => {
       this.setState({
            selected_water_bodies: e.map(item => item['value'] )
        }, () => {
        this.update_stations()
        })
    }

    setDates = (start_date, end_date) => {
        console.log(start_date)
        console.log(end_date)
        this.setState({
            start_date : start_date,
            end_date : end_date
        }, () => {
        this.update_stations()
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

    mergeById = (a1, a2) => {
        return a1.map(itm => ({
            ...a2.find((item) => (item.StationId === itm.Id) && item),
            ...itm
        }));
    }

    load_station_richness = (stations) => {
        axios.get('https://cmc.vims.edu/odata/GetBenthicStationRichness')
                    .then(res => {
                        let benthic_richness = res.data.map((item) => (({ StationId, EventCount }) => ({ StationId, EventCount }))(item))
                        });
        axios.get('https://cmc.vims.edu/odata/GetStationRichness')
                    .then(res => {
                        const data = res.data
                        let station_richness = data.map((item) => (({ StationId, EventCount }) => ({ StationId, EventCount }))(item))
                        const new_station_data = this.mergeById(stations, station_richness).filter(function (el) {
                            return el.EventCount >= 0
                            });
                        return new_station_data

                        });
    }

    load_all_station_data = () => {
        axios.get('https://cmc.vims.edu/odata/Stations?$select=Id,Code,Name,NameLong,Lat,Long,CityCounty,Fips,State,WaterBody,CreatedDate,ModifiedDate')
            .then(res => {
                const data = res.data['value']
                let state_options = data.map((item) => { return item.State }).flat().filter((x, i, a) => a.indexOf(x) === i).sort().map((item) => { return {'label': item, 'value' : item} } )
                let water_body_options = data.map((item) => { return item.WaterBody }).flat().filter((x, i, a) => a.indexOf(x) === i).sort().map((item) => { return {'label': item, 'value' : item} } )

                axios.get('https://cmc.vims.edu/odata/GetStationRichness')
                    .then(res => {
                        const rich_data = res.data
                        let station_richness = rich_data.map((item) => (({ StationId, EventCount }) => ({ StationId, EventCount }))(item))
                        let new_station_data = this.mergeById(data, station_richness).filter(function (el) {
                            return el.EventCount >= 0
                            });

                        new_station_data.map(item => {
                            item['ModifiedDate'] = DateTime.fromISO(item['ModifiedDate'])
                            item['CreatedDate'] = DateTime.fromISO(item['CreatedDate'])
                        })

                        this.setState({
                            all_stations_data: new_station_data,
                            us_states: state_options,
                            water_bodies: water_body_options
                        })

                        this.update_stations()

                        this.state.stations_data.length !== 0
                        ? this.change_station(this.state.stations_data[0])
                        : console.log('no stations available')
                        });
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
                const parameter_types = data.map((item) => { return item.ParameterGroups.map((subitem) => subitem.Parameter.Name.toLowerCase()) })
                const parameter_array = parameter_types.flat()
                const unique_parameters = parameter_array.filter((x, i, a) => a.indexOf(x) === i).sort()
                const unique_parameters_dropdown = unique_parameters.map((item) => { return {'label': item, 'value' : item} } )

                this.setState({
                    parameter_data: data,
                    parameters: unique_parameters_dropdown,
                })
            })
    }

    get_station_samples = () => {
        const station_id = this.state.selected.Id
        const query = `?$expand=Parameter($select=Id,Code,Name,Units,Tier)&$filter=Event/StationId eq ${station_id} and QaFlagId eq 2&$count=true&$select=Parameter,Value,CreatedDate`
        axios.get('https://cmc.vims.edu/odata/PublicSamples' + query).then(res => {
            var data = res.data['value']
            data.forEach(
                function(o) {
                     Object.keys(o).forEach(function(key) {
                      if (o[key] === null) {
                        o[key] = '';
                      }
                     })

                    Object.keys(o.Parameter).forEach(function(key) {
                      if (o.Parameter[key] === null) {
                        o.Parameter[key] = '';
                      }
                    });
                });

            let flatten_sample_data = data.map(item => { return Object.assign({}, ...function _flatten(o) {
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
        const filter_length = this.state.selected_group_names.length + this.state.selected_us_states.length + this.state.selectedVariables.length + this.state.selected_water_bodies + this.state.sample_threshold

        let filtered_stations = this.state.all_stations_data
        filtered_stations = filtered_stations.filter(item => item.ModifiedDate >= this.state.start_date)
        console.log(filtered_stations)

        if (filter_length == 0) {
            this.setState({ stations_data : filtered_stations })
        } else {
            if (this.state.selected_water_bodies.length != 0) {
                filtered_stations = filtered_stations.filter(item => this.state.selected_water_bodies.some(water_body => item['WaterBody'] == water_body))///.startsWith(this.state.selected_group_names))
            }

            if (this.state.selected_us_states.length != 0) {
                filtered_stations = filtered_stations.filter(item => this.state.selected_us_states.some(station_state => item['State'] == station_state))///.startsWith(this.state.selected_group_names))
            }

            if (this.state.selected_group_names.length != 0) {
                filtered_stations = filtered_stations.filter(item => this.state.selected_group_names.some(group_name => item['Code'].includes(group_name)))///.startsWith(this.state.selected_group_names))
            }

            if (this.state.sample_threshold > 0) {
                filtered_stations = filtered_stations.filter(item => item.EventCount > this.state.sample_threshold)
            }

            /// stations supplying data with those parameters (for filtering stations)
            if (this.state.selectedVariables.length != 0) {
                console.log(this.state.parameter_data)
                const subset_param_data = this.state.parameter_data.filter((item) => item.ParameterGroups.filter((subitem) =>
                    this.state.selectedVariables.some((selectVar) => subitem.Parameter.Name.toLowerCase() === subitem)))
                console.log(subset_param_data)
                const new_stations_data = subset_param_data.map((item) => { return item['Id'] }).flat()
                console.log(new_stations_data)
                filtered_stations = filtered_stations.filter(item => new_stations_data.includes(item['Id']))
                console.log(filtered_stations)
            }
            this.setState({ stations_data : filtered_stations })
        }
    }

    change_station = (e) => {
        const station_group = this.state.group_names.find(element => element.value == e.Code.split('.')[0]).label;
        const station = this.state.stations_data.filter((item)=> item.Id == e.Id)[0]
        station.station_group = station_group
        this.setState({
            selected: station
        }, () => {
            this.get_station_samples()
        })
    }

    toggle_modal = () => this.setState({show_modal: !this.state.show_modal})

    set_dates = (event, picker) => {
        this.setState({
            start_date: DateTime.fromJSDate(picker.startDate.toDate()),
            end_date: DateTime.fromJSDate(picker.endDate.toDate())
            })
        this.update_stations()
    }

        set_start_date = (e) => this.setState({start_date: e})

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
                <NavBar
                    toggle_modal = {this.toggle_modal}
                />
                    <Row style = {{height: '600px', padding: '0px'}}>
                    <Col xs={3} >
                        <SideBar
                                group_names={this.state.group_names}
                                selected_groups={this.state.selectedGroupLabels}
                                parameters={this.state.parameters}
                                us_states={this.state.us_states}
                                selected_us_states={this.state.selected_us_states}
                                water_bodies={this.state.water_bodies}
                                selected_water_bodies={this.state.selected_water_bodies}
                                start_date={this.state.start_date}
                                end_date={this.state.end_date}
                                date_range={this.state.date_range}
                                show_wqp={this.state.show_wqp}
                                sample_threshold={this.state.sample_threshold}

                                change_sample_threshold={(value) => { this.setState({sample_threshold: value}); this.update_stations()}}
                                set_variable={this.setVariable}
                                set_group_name={this.setGroupName}
                                set_us_states={this.setUSState}
                                set_water_bodies={this.setWaterBody}
                                set_dates={this.set_dates}
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
                                callBack = {this.change_station}
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
                    <div>
                      <Modal isOpen={this.state.show_modal} toggle={this.toggle_modal} >
                        <ModalHeader toggle={this.toggle_modal}>Parameter Definitions</ModalHeader>
                        <ModalBody>
                            Select a chemical or biological parameter from the dropdown to receive more information.
                            <Dropdowns
                                multi={false}
                                placeholder={"Select a parameter..."}
                                options={this.state.parameters}
                                label = {'label'}
                                callBack={this.set_parameter_definition}
                                />
                            {this.state.parameter_definition
                                ? <p> <b> {this.state.selected_parameter_definition.charAt(0).toUpperCase() + this.state.selected_parameter_definition.slice(1)} </b> is {this.state.parameter_definition} </p>
                                : <div></div> }
                        </ModalBody>
                        <ModalFooter>
                          <Button color="primary" onClick={this.toggle_modal}>Close</Button>{' '}
                        </ModalFooter>
                      </Modal>
                    </div>
             </Row>
         </Container>
        );
    }
}

export default Home