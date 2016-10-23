import React, { Component } from 'react';
import { FormGroup, ControlLabel, Col, FormControl } from 'react-bootstrap';

class FilterEditor extends Component {

    render() {
        return (
            <FormGroup>
                <Col sm={3}><ControlLabel>{this.props.label}</ControlLabel></Col>
                <Col sm={9}><FormControl
                    type="text"
                    placeholder="Enter text"
                    onChange={(event) => { 
                        this.props.onChange(event.target.value);  
                    }}
                  /></Col>
            </FormGroup>                    
        )
    }
}

export default FilterEditor