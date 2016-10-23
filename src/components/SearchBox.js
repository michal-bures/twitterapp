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
        this.props.onClick(this.state.user);
    }

    render() {
        return (
            <form onSubmit={this.submit}>
                <FormGroup>
                    <InputGroup>
                        <FormControl type="text" placeholder="Start by entering any twitter username here"
                            onChange={(evt) => {
                                this.setState({user: evt.target.value});
                            }}
                            value={this.state.user}>                             
                        </FormControl>
                        <InputGroup.Button><Button onClick={this.submit}><Glyphicon glyph="search"/></Button></InputGroup.Button>
                    </InputGroup>
                </FormGroup>
            </form>

        );
    }
}

export default SearchBox;
