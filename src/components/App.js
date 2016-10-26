import React, { Component } from 'react';
import { Alert, Modal, Panel, Form, Glyphicon } from 'react-bootstrap';

import Immutable from 'immutable';
import SearchBox from './SearchBox';
import filters from '../filters';
import FilterEditor from './FilterEditor';
import Stats from './Stats';
import SortableTable from './SortableTable';
import Tweet from '../Tweet';
import { connect } from 'react-redux';

// Root application component
class App extends Component {

    static propTypes = {
        // the URL (or subpath) from which the app will retrieve tweets via a simple GET request
        tweetsServiceURL: React.PropTypes.string,
        // sequence of available Filters (see filters)
        filters: React.PropTypes.instanceOf(Immutable.List),
    }

    static defaultProps = {
        tweetsServiceURL: '/tweets',
        filters: Immutable.List.of(
            filters.date,
            filters.fullText,
            filters.tweetLength,
            filters.mentions,
            filters.hashtags,
            filters.favourites,
            filters.hashtag,
            filters.mention
        ),
        // Immutable.List<Tweet> : list of all retrieved tweets (unsorted, unfiltered); see Tweet for tweet properties
        tweets : null,
        // active filter values (key is index of filter in this.props.filters)
        filterValues : Immutable.Map(),
        // whether the statistics modal window is currently displayed
        showStats : false,
    }

    constructor() {
        super();
        this.state = {

        }
    }

    fetchTweets(user) {
        this.setState({fetching:true, error:null});
        fetch(this.props.tweetsServiceURL+"?u="+encodeURIComponent(user)).then((response) => {
            if (!this.props.fetching) return; // we no longer want the data
            this.setState({fetching:false});
            if (response.status >= 200 && response.status < 300) {
                return response.text();
            } else if (response.status >= 400 && response.status < 500) {
                this.showError('No data for this user!');
            } else {
                this.showError('Ooops! Something went wrong while fetching user data from Twitter. (Code '+response.status+')');
            }
        }).then((body)=> {
            if (body) {
                this.loadTweets(Array.from(JSON.parse(body)));
            }
        });
    }

    // display error message in the results area
    showError(err) {
        this.setState({error: err});
    }

    // show statistics modal
    showStats() {
        this.setState({showStats : true});
    }

    // hide statistics modal
    hideStats() {
        this.setState({showStats : false});
    }

    // forget results
    resetResults() {
        this.setState({tweets: null, error: null })
    }

    render() {

        const renderResults=() => {
            if (this.props.fetching) {
                // currently loading data - show nothing
                return;
            } else if (this.props.error) {
                // error occured while getting data - display it 
                return (
                    <Alert bsStyle="danger">
                      <p>{this.props.error}</p>
                    </Alert>
                );
            } else if (!this.props.tweets) {
                // waiting for user selection - show nothing
                return;
            } else {
                // display results
                // apply filters the tweet list
                var displayList = this.props.tweets.filter((item) => {
                        // ok only if all filters match
                        return this.props.filters.every((filter, i) => {
                            if (!filter.apply(item, this.state.filterValues.get(i))) {
                                return false;
                            }
                            return true;
                        });
                    })
                

                return (<div>
                    <Panel header="Filters" collapsible>
                        <Form horizontal bsSize="small">
                        {this.props.filters.map((filter, key) => { return (
                            <FilterEditor key={key}
                                label={filter.label}
                                value={this.state.filterValues.get(key)}
                                placeholder={filter.prompt}
                                onChange={(value) => {
                                    this.setState({filterValues : this.state.filterValues.set(key, value)});
                                }}
                                validator={filter.validateValue.bind(filter)}
                            />
                        )})}
                        </Form>
                    </Panel>
                    <a href="#" onClick={this.showStats.bind(this)}>Show statistics</a>
                    <SortableTable 
                        columns={Immutable.List.of(
                            {id:"id", label:"#"},
                            {id:"text", label:"text"},
                            {id:"favs", label:<Glyphicon glyph="star"/>},
                            {id:"date", label:"sent", display:"dateString"}
                        )}
                        records={displayList}/>
                    <Modal show={this.state.showStats} onHide={this.hideStats.bind(this)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Statistics</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Stats tweets={this.props.tweets}/>
                        </Modal.Body>
                    </Modal>
                    </div>
                    
                );            
            }

        }

        return (
            <div className="container">
                <h2>Twitter browser demo</h2>
                <SearchBox/>
                {renderResults()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    tweets: state.tweets,
    showStats : false
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

App = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default App;
