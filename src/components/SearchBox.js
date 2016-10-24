import React, { Component } from 'react';
import { Button, FormGroup, InputGroup, FormControl, Glyphicon } from 'react-bootstrap'

// General purpose search box
class SearchBox extends Component {

    static propTypes = {
        // placeholder value in the search field
        placeholder: React.PropTypes.string,
        // args:(event) called whenever search value changes
        onChange: React.PropTypes.func,
        // args:() called whenever the search is submitted by user (hitting Enter or clicking the search button)
        onSubmit: React.PropTypes.func
    }

    static defaultProps = {
        placeholder: 'Search',
        onChange: ()=>{},
        onSubmit: ()=>{}
    }    

    constructor() {
        super();
        this.state = {
            searchString : '',
        }
    }

    submit = (event) => {
        if (event) event.preventDefault();
        if (!this.state.searchString) return;
        this.props.onSubmit(this.state.searchString);
    }

    render() {
        return (
            <form onSubmit={this.submit}>
                <FormGroup>
                    <InputGroup>
                        <FormControl type="text" placeholder={this.props.placeholder}
                            onChange={(evt) => {
                                this.setState({searchString: evt.target.value});
                                this.props.onChange(evt);
                            }}
                            value={this.state.searchString}>                             
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
