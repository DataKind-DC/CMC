import React, { Component , PureComponent } from 'react';
import dynamic from 'next/dynamic'
import Select from "react-dropdown-select";
import { Container, Row, Col, Input, Label } from 'reactstrap';

function Dropdowns(props) {
        return (
            <Row className="justify-content-md-center">
                <div style = {{width: '80%', padding: '15px'}} >
                    <Select
                        style={{width: '100%'}}
                        clearable={true}
                        searchable={true}
                        placeholder={props.placeholder}
                        options={props.options}
                        labelField={props.label}
                        value = {props.label}
                        dropdownHeight="200px"
                        onChange={props.callBack}
                        multi={props.multi ? props.multi : true} />
                </div>
            </Row>

        );
}

export default Dropdowns