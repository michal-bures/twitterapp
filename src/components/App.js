import React from 'react';
import { Modal, Panel, Form, Glyphicon } from 'react-bootstrap';

import Immutable from 'immutable';
import SearchBox from './SearchBox';
import { connect } from 'react-redux';
import FilterEditor from './FilterEditor';
import Stats from './Stats';
import SortableTable from './SortableTable';
import { showStats, hideStats, setFilter } from '../actions';

// Root application component
let App = ({
    dispatch,
    statsModalVisible,
    filters,
    filterValues,
    tweets,
    onShowStats,
    onCloseStats,
    onSetFilter,
}) => {

    const renderResults=() => {
        if (!tweets) {
            // currently loading data - show nothing
            return;
        } else {
            // display results
            // apply filters to the tweet list
            var displayList = tweets.filter((item) => {
                // ok only if all filters match
                return filters.every((filter, i) => {
                    if (!filter.apply(item, filterValues.get(i))) {
                        return false;
                    }
                    return true;
                });
            })
        

            return (<div>
                <Panel header="Filters" collapsible>
                    <Form horizontal bsSize="small">
                    {filters.map((filter, key) => { return (
                        <FilterEditor key={key}
                            label={filter.label}
                            value={filterValues.get(key)}
                            placeholder={filter.prompt}
                            onChange={(value) => {
                                onSetFilter(key, value);
                            }}
                            validator={filter.validateValue.bind(filter)}
                        />
                    )})}
                    </Form>
                </Panel>
                <a href="#" onClick={onShowStats}>Show statistics</a>

                <SortableTable 
                    columns={Immutable.List.of(
                        {id:"id", label:"#"},
                        {id:"text", label:"text"},
                        {id:"favs", label:<Glyphicon glyph="star"/>},
                        {id:"date", label:"sent", display:"dateString"}
                    )}
                    records={displayList}/>
                <Modal show={statsModalVisible} onHide={onCloseStats}>
                    <Modal.Header closeButton>
                        <Modal.Title>Statistics</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Stats tweets={tweets}/>
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

App.propTypes = {
    // sequence of available Filters (see filters)
    filters: React.PropTypes.instanceOf(Immutable.List),

    //
    filterValues: React.PropTypes.instanceOf(Immutable.Map),
}

const mapStateToProps = (state) => {
  return {
    tweets: state.get('tweets'),
    statsModalVisible : state.get('statsModalVisible'),
    filters: state.get('filters'),
    filterValues : state.get('filterValues'),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onShowStats: () => {
        dispatch(showStats());
    },
    onCloseStats: () => {
        dispatch(hideStats());
    },
    onSetFilter: (filterId, value) => {
        dispatch(setFilter(filterId, value));
    }
  }
}

App = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default App;
