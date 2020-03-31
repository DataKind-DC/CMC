import React, { Component , PureComponent } from 'react';
import { LineChart, PieChart } from 'react-chartkick'
import 'chart.js'


class Chart extends PureComponent {
    state = {
        chart_data : this.props.data
    }

    render() {

        return (
            <LineChart data={this.props.data} xtitle="Date" ytitle={this.props.unit} messages={{empty: "Select a location and parameter."}} />

        );
    }
}

export default Chart;


