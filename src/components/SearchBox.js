import React from "react";
import { Alert, Button, FormGroup, InputGroup, FormControl, Glyphicon } from "react-bootstrap"
import { connect } from "react-redux";
import { fetchTweets, purgeTweets } from "../actions";


// General purpose search box
let SearchBox = ({placeholder, onChange, onSubmit, fetching, error}) => {

    let currentInput;

    return (
            <form onSubmit={ event => {
                if (event) event.preventDefault();
                if (!currentInput) return;
                onSubmit(currentInput);
            }}>
                <FormGroup>
                    <InputGroup>
                        <FormControl type="text" placeholder={placeholder}
                            onChange={(evt) => {
                                currentInput = evt.target.value;
                                onChange(currentInput);
                            }}>
                        </FormControl>
                        <InputGroup.Button>
                            <Button type="submit" bsStyle="primary" disabled={fetching}>
                                {(fetching ? 
                                    <Glyphicon glyph="refresh" className="spinning"/>:
                                    <Glyphicon glyph="search"/>)}</Button>
                        </InputGroup.Button>
                    </InputGroup>
                </FormGroup>
                {error && <Alert bsStyle="danger">
                      <p>{error}</p>
                    </Alert>}
            </form>

    );
    
}

SearchBox.propTypes = {
    // placeholder value in the search field
    placeholder: React.PropTypes.string,
    // args:(event) called whenever search value changes
    onChange: React.PropTypes.func,
    // args:() called whenever the search is submitted by user (hitting Enter or clicking the search button)
    onSubmit: React.PropTypes.func,
    // error message to be displayed below the search box
    error: React.PropTypes.string
}

// === State tree mapping ===

const mapStateToProps = (state) => {
  return {
    placeholder: "Start by entering username",
    fetching: state.get("fetching"),
    error: state.get("error"),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (user) => {
      dispatch(fetchTweets(user));
    },
    onChange: () => {
      dispatch(purgeTweets());
    }
  }
}

SearchBox = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchBox);

export default SearchBox;
