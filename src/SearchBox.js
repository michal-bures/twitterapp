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
        /*console.log("FETCHING");
        fetch("/tweets?u=totalbiscuit").then((response) => {
          return response.text();
        }).then((body)=> {
          console.log(body);
        });;*/

        return (
            <form onSubmit={this.submit}>
                <FormGroup>
                    <InputGroup>
                        <FormControl type="text" placeholder="Enter twitter user handle"
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
