import React, { Component , PureComponent } from 'react';
import dynamic from 'next/dynamic'
import Select from "react-dropdown-select";
import { Container, Row, Col, Input, Label, Button } from 'reactstrap';

function Dropdowns(props) {
        return (
            <Row className="justify-content-md-center">
                <div style = {{width: '80%', padding: '15px'}} >
                    <Select
                        style={{width: '100%'}}
                        multi={props.multi == false ? false : true }
                        clearable={true}
                        searchable={true}
                        placeholder={props.placeholder}
                        options={props.options}
                        labelField={props.label}
                        value = {props.label}
                        dropdownHeight="200px"
                        onChange={props.callBack} />
                </div>
            </Row>

        );
}

export default Dropdowns