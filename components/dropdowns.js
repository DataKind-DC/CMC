import React, { Component , PureComponent } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import dynamic from 'next/dynamic'
import cmcdata from "../public/cmcdata_subset.json"
import Select from "react-dropdown-select";

class Dropdowns extends PureComponent {

    render() {

        return (
            <div style = {this.props.style} >
                <Select clearable={true} searchable={true} placeholder={this.props.placeholder} options={this.props.options} labelField={this.props.label} value = {this.props.label} dropdownHeight="500px" onChange={this.props.callBack} />
            </div>
        );
    }
}

export default Dropdowns