import React, { Component } from 'react';
import { FormGroup, ControlLabel, Col, FormControl } from 'react-bootstrap';

// General purpose filter value editor
class FilterEditor extends Component {

    static propTypes = {
        // text of the label displayed to the right of the entry field
        label: React.PropTypes.string,
        // placeholder value in the empty entry field
        placeholder: React.PropTypes.placeholder,
        // called whenever filter value changes
        onChange: React.PropTypes.func
    }

    static defaultProps = {
        label: 'Filter',
        placeholder: '',
        onChange: ()=>{},
    }

    render() {
        return (
            <FormGroup bsSize="small">
                <Col sm={3}><ControlLabel>{this.props.label}</ControlLabel></Col>
                <Col sm={9}><FormControl
                    type="text"
                    placeholder={this.props.placeholder}
                    onChange={(event) => { 
                        this.props.onChange(event.target.value);  
                    }}
                  /></Col>
            </FormGroup>                    
        )
    }
}

FilterEditor.propTypes={

}


export default FilterEditor