import React, { Component } from 'react';
import { FormGroup, ControlLabel, Col, FormControl , Tooltip} from 'react-bootstrap';
import assert from 'assert';

// General purpose filter value editor
class FilterEditor extends Component {

    static propTypes = {
        // text of the label displayed to the right of the entry field
        label: React.PropTypes.string,
        // placeholder value in the empty entry field
        placeholder: React.PropTypes.string,
        // called whenever filter value changes
        onChange: React.PropTypes.func,
        // filter value validator function - should return null if result matches, otherwise error message
        validator: React.PropTypes.func,
        // initial filter value ()
        value: React.PropTypes.string
    }

    static defaultProps = {
        label: 'Filter',
        placeholder: '',
        value: '',
        onChange: ()=>{},
        validator: ()=>{return null}
    }

    constructor(props) {
        super(props);
        this.state = {
            // current value in the input box (values that fail validation are not stored)
            currentValue : props.value,
            // actual value in the input box (stores even invalid values unlike state.currentValue)
            actualValue : props.value,
            // currently displayed error message
            errorMessage : '',
        }
    }

    // update filter value
    setVal(val) {
        this.setState({actualValue:val});
        var err = this.props.validator(val);
        if (err) {
            assert.equal(typeof err, 'string');
            this.setState({errorMessage:err});
        } else {
            this.setState({errorMessage:''});
            this.setState({currentValue:val});
            this.props.onChange(val);
        }
    }

    render() {
        return (
            <FormGroup bsSize="small" validationState={(this.state.errorMessage?'error':
                                                       (this.state.currentValue.length>0?'success':
                                                        undefined))}>
                <Col sm={3}><ControlLabel>{this.props.label}</ControlLabel></Col>
                <Col sm={9}><FormControl
                    type="text"
                    value={this.state.actualValue}
                    placeholder={this.props.placeholder}
                    onChange={(event) => { 
                        this.setVal(event.target.value);
                    }}
                  /><FormControl.Feedback />{(this.state.errorMessage?<Tooltip placement="bottom" className="in" id="tooltip-bottom">{this.state.errorMessage}</Tooltip>:'')}
                  </Col>
            </FormGroup>                    
        )
    }
}

export default FilterEditor