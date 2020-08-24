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
import inside from '@turf/boolean-point-in-polygon'
import { point } from '@turf/helpers'
import _ from "lodash"

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
        selected_parameters: [],
        selected_us_states: [],
        selected_water_bodies: [],
        selected_tidal: [],
        selected_huc6_names: [],
        drawn_areas: [],
        selected: {},
        start_date: DateTime.local().minus({years: 2}),
        end_date: DateTime.local(),
        availableVariablesAtLocation: [],
        selectedVariableAtLocation: null,
        summary_data: {},
        station_sample_count: null,
        station_sample_data: [],
        water_quality_sample_threshold: 5,
        benthic_sample_threshold: 0,
        show_modal: false,
        parameter_definition: null,
        selected_parameter_definition: null
        };

    MarkerMap = dynamic(() => import('../components/map'), {ssr: false});

    // get_summary = () => {
    //     const res = axios.get('https://cmc.vims.edu/odata/GetHomeStats')
    //         .then(res => {
    //                 this.setState({summary_data: res.data[0]})
    // })
    // }

    mode = (array) => {
        let set = Array.from(new Set(array));
        let counts = set.map(a=>array.filter(b=>b==a).length);
        if (counts.length > 1) {
        let indices = counts.map((a,b)=>Math.max(...counts)===a?b:0).filter(b=>b!==0);
        let mode = indices.map(a=>set[a]);
        return mode;
        } else {
            return set[0]
        }
    }

    updateChartData = (e) => {
        if (e.length) {
            const new_chart_data = this.state.station_sample_data.filter(
                item => item.Name == e[0].value
            )
            console.log(this.mode(new_chart_data.map((item) => { return item.Units }).flat()))
            const y_axis = this.mode(new_chart_data.map((item) => { return item.Units }).flat())

            this.setState({
                chart_data: new_chart_data,
                y_axis: y_axis
            })
        } else {
            this.setState({
                chart_data: [],
                y_axis: ''
            })
        }
    }

    set_parameter_definition = (e) => {
        this.setState({
            selected_parameter_definition: e[0].label,
            parameter_definition: "[insert parameter definition here]"
            })
    }

    setDropdownValue = (e, variable) => {
       this.setState({
            [variable]: e.map(item => item['value'] )
        }, () => {
        this.filter_stations()
        })
    }

    setDates = (start_date, end_date) => {
        this.setState({
            start_date : start_date,
            end_date : end_date
        }, () => {
        this.filter_stations()
        })
    }

     setVariableAtLocation = (e) => {
        this.setState({
            selectedVariableAtLocation: e[0].variable
        }, () => {
        this.updateChartData()
        })
    }

    mergeById = (a, b, merge_a, merge_b) => {
        return a.map(itm => ({
            ...b.find((item) => (item[merge_b] === itm[merge_a]) && item),
            ...itm
        }));
    }

    load_all_station_data = () => {
        axios.all([
            axios.get('https://cmc.vims.edu/odata/GetBenthicStationRichness'),
            axios.get('https://cmc.vims.edu/odata/GetStationRichness'),
            axios.get('https://cmc.vims.edu/odata/Stations?$select=Id,Code,Name,NameLong,Lat,Long,CityCounty,Fips,State,WaterBody,CreatedDate,ModifiedDate,Tidal,Huc6Name')
        ])
            .then(axios.spread((benthic, notBenthic, stations) => {
                let benthic_richness = benthic.data.map((item) => (({ StationId, EventCount, GroupNames }) => ({ StationId, EventCount, GroupNames }))(item))
                benthic_richness.map(station => {
                    delete Object.assign(station, {['BenthicEventCount']: station.EventCount})['EventCount']
                })
                
                let station_richness = notBenthic.data.map((item) => (({ StationId, EventCount, GroupNames }) => ({ StationId, EventCount, GroupNames }))(item))
                station_richness.map(station => {
                    delete Object.assign(station, {['WaterQualityEventCount']: station.EventCount})['EventCount']
                })

                const all_richness = this.mergeById(station_richness, benthic_richness, 'StationId', 'StationId')

                const data = stations.data['value'];
                let state_options = data.map((item) => { return item.State }).flat().filter((x, i, a) => a.indexOf(x) === i).sort().map((item) => { return {'label': item, 'value' : item} } );
                let water_body_options = data.map((item) => { return item.WaterBody }).flat().filter((x, i, a) => a.indexOf(x) === i).sort().map((item) => { return {'label': item, 'value' : item} } );
                let huc6_name_options = data.map((item) => { return item.Huc6Name }).flat().filter((x, i, a) => a.indexOf(x) === i).sort().map((item) => { return {'label': item, 'value' : item} } );

                let new_station_data = this.mergeById(data, all_richness, 'Id', "StationId").filter(function (el) {
                            return el.WaterQualityEventCount >= 0 || el.BenthicEventCount >= 0
                            });

                new_station_data.map(item => {
                    item['ModifiedDate'] = DateTime.fromISO(item['ModifiedDate'])
                    item['CreatedDate'] = DateTime.fromISO(item['CreatedDate'])
                })

                this.setState({
                    all_stations_data: new_station_data,
                    us_states: state_options,
                    water_bodies: water_body_options,
                    huc6_name_options: huc6_name_options
                })

                this.filter_stations()

                this.state.stations_data.length !== 0
                ? this.change_station(this.state.stations_data[0])
                : console.log('no stations available')
                }))
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
                const parameters_by_station = data.map((item) => { return { 'Code': item.Code, 'Parameters' : item.ParameterGroups.map((subitem) => subitem.Parameter.Name.toLowerCase()) } } )

                const parameter_types = data.map((item) => { return item.ParameterGroups.map((subitem) => subitem.Parameter.Name.toLowerCase()) } )
                const parameter_array = parameter_types.flat().filter(item => !(item.includes(' blank')))
                const unique_parameters = parameter_array.filter((x, i, a) => a.indexOf(x) === i).sort()
                const unique_parameters_dropdown = unique_parameters.map((item) => { return {'label': item, 'value' : item} } )

                this.setState({
                    parameter_data: parameters_by_station,
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

    filter_stations = () => {
        const filter_length = 
            this.state.selected_group_names.length + 
            this.state.selected_us_states.length + 
            this.state.selected_parameters.length + 
            this.state.selected_water_bodies.length + 
            this.state.water_quality_sample_threshold +
            this.state.benthic_sample_threshold + 
            this.state.selected_tidal.length + 
            this.state.selected_huc6_names.length + 
            this.state.drawn_areas.length

        console.log('Filter length: ', filter_length)
        let filtered_stations = this.state.all_stations_data
        console.log('Length of all stations:', this.state.all_stations_data.length, " Length of filtered stations:", this.state.stations_data.length)
        // filtered_stations = filtered_stations.filter(item => item.ModifiedDate >= this.state.start_date)

        if (filter_length == 0) {
            this.setState({ stations_data : filtered_stations })
        } else {
            if (this.state.selected_water_bodies.length != 0) {
                filtered_stations = filtered_stations.filter(item => this.state.selected_water_bodies.some(filter_item => item['WaterBody'] == filter_item))
            }

            if (this.state.selected_huc6_names.length != 0) {
                filtered_stations = filtered_stations.filter(item => this.state.selected_huc6_names.some(filter_item => item['Huc6Name'] == filter_item))
            }

            if (this.state.selected_us_states.length != 0) {
                filtered_stations = filtered_stations.filter(item => this.state.selected_us_states.some(filter_item => item['State'] == filter_item))
            }

            if (this.state.selected_group_names.length != 0) {
                filtered_stations = filtered_stations.filter(item => this.state.selected_group_names.some(filter_item => item['Code'].includes(filter_item)))
            }

            if (this.state.selected_tidal.length != 0) {
                filtered_stations = filtered_stations.filter(item => this.state.selected_tidal.some(filter_item => item['Tidal'] == filter_item))
            }

            if (this.state.water_quality_sample_threshold > 0) {
                filtered_stations = filtered_stations.filter(item => item.WaterQualityEventCount  >= this.state.water_quality_sample_threshold)
            }
            
            if (this.state.benthic_sample_threshold > 0) {
                filtered_stations = filtered_stations.filter(item => item.BenthicEventCount  >= this.state.benthic_sample_threshold)
            }

            if (this.state.drawn_areas.length != 0) {
                filtered_stations = filtered_stations.filter(item => this.state.drawn_areas.some(filter_item => inside(point(Object.values(_.pick(item, ['Long', 'Lat']))), filter_item['features'][0])))
            }

            /// stations supplying data with those parameters (for filtering stations)
            if (this.state.selected_parameters.length != 0) {
                const subset_stations_with_selected_parameters = this.state.parameter_data.filter((item) => item.Parameters.some((parameter_list) => this.state.selected_parameters.includes(parameter_list))).map((item) => { return item['Code'] })
                filtered_stations = filtered_stations.filter(item => subset_stations_with_selected_parameters.includes(item['Code'].split('.')[0]))
            }
            this.setState({ stations_data : filtered_stations })
        }

        this.set_summary_data()
    }

    set_summary_data = () => {
        const stations_data = this.state.stations_data
        console.log('stations data length', stations_data.length)

        const water_quality_stations = stations_data.filter(station => station.hasOwnProperty('WaterQualityEventCount'))
        const water_quality_events_count = water_quality_stations.reduce((total, station) => total + station.WaterQualityEventCount, 0)
// set both to events, name stats accordingly
        const benthic_stations = stations_data.filter(station => station.hasOwnProperty('BenthicEventCount'))
        const benthic_sample_event_count = benthic_stations.reduce((total, station) => total + station.BenthicEventCount, 0)
        console.log('wqs length', water_quality_stations.length, 'b len', benthic_stations)
        this.setState({
            summary_data: {
                StationCount: water_quality_stations.length,
                SamplesCount: water_quality_events_count,
                BenthicStationCount: benthic_stations.length,
                BenthicSamplesCount: benthic_sample_event_count
            }
        })
        console.log('Did the thing', this.state.summary_data)
    }

    change_station = (e) => {
        console.log(e)
        const station = this.state.stations_data.filter((item)=> item.Id == e.Id)[0]
        console.log(station)
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
        this.filter_stations()
    }

    draw_area = (e) => {
        console.log(this.state.drawn_areas);
        this.setState({ drawn_areas: [...this.state.drawn_areas, e] });
        this.filter_stations()
    }

    delete_area = (e) => {
        const new_drawn_areas = this.state.drawn_areas.filter(item => item.features[0].id != e.features[0].id)
        this.setState({ drawn_areas: new_drawn_areas })
        this.filter_stations()
    }


    componentDidMount = () => {
        this.load_all_station_data();
        this.load_parameter_data();
        this.load_groups_data();
        // this.get_summary();
        this.setState({
            wqp_station_data : wqpdata
        })
    }

    render() {
        return (
        <Container style={{maxWidth: '100%', padding: 0}}>
            <Head></Head>
                <NavBar
                    toggle_modal = {this.toggle_modal}
                />
                    <Row style = {{padding: '0px'}}>
                    <Col xs={3} >
                        <SideBar
                                group_names={this.state.group_names}
                                parameters={this.state.parameters}
                                us_states={this.state.us_states}
                                water_bodies={this.state.water_bodies}
                                huc6_names={this.state.huc6_name_options}
                                selected_group_names={this.state.selectedGroupLabels}
                                selected_us_states={this.state.selected_us_states}
                                selected_water_bodies={this.state.selected_water_bodies}
                                start_date={this.state.start_date}
                                end_date={this.state.end_date}
                                date_range={this.state.date_range}
                                show_wqp={this.state.show_wqp}
                                water_quality_sample_threshold={this.state.water_quality_sample_threshold}
                                benthic_sample_threshold={this.state.benthic_sample_threshold}
                                set_dates={this.set_dates}


                                set_variable={e => this.setDropdownValue(e, 'selected_parameters')}
                                set_group_name={e => this.setDropdownValue(e, 'selected_group_names')}
                                set_us_states={e => this.setDropdownValue(e, 'selected_us_states')}
                                set_water_bodies={e => this.setDropdownValue(e, 'selected_water_bodies')}
                                set_tidal={e => this.setDropdownValue(e, 'selected_tidal')}
                                set_huc6_names={e => this.setDropdownValue(e, 'selected_huc6_names')}
                                change_water_quality_sample_threshold={(value) => { this.setState({water_quality_sample_threshold: value}); this.filter_stations()}}
                                change_benthic_sample_threshold={(value) => {this.setState({'benthic_sample_threshold': value}); this.filter_stations()}}
                                toggle_wqp={() => this.setState({show_wqp: !this.state.show_wqp})}
                            />
                    </Col>
                    <Col xs={6} >
                        <Row style={{height: '80%'}}>
                            <this.MarkerMap
                                style = {{ width: '100%'}}
                                stations_data={this.state.stations_data}
                                wqpdata = {this.state.wqp_station_data}
                                drawn_areas={this.state.drawn_areas}
                                on_draw_area={this.draw_area}
                                on_delete_area={this.delete_area}
                                show_wqp = {this.state.show_wqp}
                                selected = {this.state.selected}
                                callBack = {this.change_station}
                            />
                        </Row>
                        <StatBar height='20%' summary_data={this.state.summary_data}/>
                    </Col>
                    <Col xs={3} style = {{height: '700px'}}>
                         <ResultBar
                            selected={this.state.selected}
                            samples={this.state.station_sample_count}
                            available_parameters={this.state.availableVariablesAtLocation}
                            update_chart_data={this.updateChartData}
                            chart_data={this.state.chart_data}
                            unit={this.state.y_axis}
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