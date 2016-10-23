import React, { Component } from 'react';
import { Button, FormGroup, InputGroup, FormControl, Glyphicon } from 'react-bootstrap'

class SearchBox extends Component {
    constructor() {
        super();
        this.state = {
            btnClicked : false,
            user : '',
        }
    }

    submit = (event) => {
        if (event) event.preventDefault();
        if (!this.state.user) return;
        this.props.onSubmit(this.state.user);
    }

    render() {
        return (
            <form onSubmit={this.submit}>
                <FormGroup>
                    <InputGroup>
                        <FormControl type="text" placeholder="Start by entering a twitter username"
                            onChange={(evt) => {
                                this.setState({user: evt.target.value});
                                this.props.onChange(evt);
                            }}
                            value={this.state.user}>                             
                        </FormControl>
                        <InputGroup.Button>
                            <Button onClick={this.submit} bsStyle='primary' disabled={this.props.fetching}>
                                {(this.props.fetching ? 
                                    <Glyphicon glyph="refresh" className='spinning'/>:
                                    <Glyphicon glyph="search"/>)}</Button>
                        </InputGroup.Button>
                    </InputGroup>
                </FormGroup>
            </form>

        );
    }
}

export default SearchBox;
