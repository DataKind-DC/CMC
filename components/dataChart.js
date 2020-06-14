import React, { Component , PureComponent } from 'react';
import { LineChart, PieChart } from 'react-chartkick'
import 'chart.js'

import Dropdowns from "../components/dropdowns"


function Chart(props) {
    console.log(props.chart_data)
    const new_data = props.chart_data.length
        ? props.chart_data.reduce((acc, item) => {
            acc[item['CreatedDate']] = item['Value']
            return acc
            }, {})
        : {}

    console.log(new_data)

    return (
        <div>
             <Dropdowns
                placeholder={"Select a parameter at this station..."}
                options={props.available_parameters}
                label = {'label'}
                callBack={props.update_chart_data}
                />
            <LineChart data={new_data} xtitle="Date" ytitle={props.unit} messages={{empty: "Select a parameter to learn more."}} />
        </div>
        );
}

export default Chart;


