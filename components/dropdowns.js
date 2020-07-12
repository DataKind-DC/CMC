import React, { Component , PureComponent } from 'react';
import dynamic from 'next/dynamic'
import Select from "react-dropdown-select";
import { Container, Row, Col, Input, Label } from 'reactstrap';

import RSelect from "react-select";

function Dropdowns(props) {
    console.log(props.options)
        return (
            <Row className="justify-content-md-center">
                <div style = {{width: '100%', padding: '15px'}} >
                    <RSelect 
                        options={props.options ? props.options : []}
                        placeholder={props.placeholder}
                        isMulti={true}
                        label={props.label}
                        onChange={props.callBack}
                    />
                </div>
            </Row>

        );
}

export default Dropdowns