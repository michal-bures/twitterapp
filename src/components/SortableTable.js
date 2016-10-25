import 'whatwg-fetch';
import React, { Component } from 'react';
import { Table, Glyphicon } from 'react-bootstrap';
import assert from 'assert';
import Immutable from 'immutable';

// Genral purpose sortable table
class SortableTable extends Component {
    
    static propTypes = {
        // List of table columns, each column expected to have following properties:
        // - id ... the record property name that is used for displaying and sorting values in this column
        // - label ... column header content
        // - display (optional) ... if specified, uses this property for final display instead of id
        columns : React.PropTypes.instanceOf(Immutable.List).isRequired,
        // List of records to be displayed
        records : React.PropTypes.instanceOf(Immutable.List).isRequired,
    }

    static defaultProps = {}

    constructor() {
        super();
        this.state = {
            // key used for table ordering
            orderBy : 'id',
            // wheter the table is sorted in ascending (true) or descending (false) order 
            ascending : true,
        }
    }

    // toggle table ordering by the specified field
    toggleSort(field) {
        assert.equal(typeof field,"string");
        if (this.state.orderBy === field) {
            this.setState({ ascending : !this.state.ascending });
        } else {
            this.setState({ orderBy : field, ascending: true });
        }
    }

    render() {
        const self = this;
        var orderedList = this.props.records
            // apply sorting
            .sort((a,b) => {
                const va = a[this.state.orderBy];
                const vb = b[this.state.orderBy];
                if (va === vb) return 0;
                if (va > vb) return 1 * (this.state.ascending?1:-1);
                return -1 * (this.state.ascending?1:-1);
        })

        function rowData() {
            if (orderedList.size === 0) {
                return <tr><td colSpan={self.props.columns.size}>No items match the selected filters!</td></tr>
            } else {
                return orderedList.map((rec,i)=> {
                    return (
                    <tr key={i} className={'sortable-table-row-'+i}>
                        {self.props.columns.map( (col,j) => <td key={j}>{rec[col.display || col.id]}</td>)}
                    </tr>
                    )                            
                });
            }
        }

        // renders active sort indicator if applicable to the given column
        function sortIndicator(col) {
            if (self.state.orderBy === col.id) {
                return <Glyphicon glyph={(self.state.ascending?"chevron-up":"chevron-down")}/>;
            } else {
                return;
            }
        }

        return (
                <Table striped bordered condensed>
                    <thead>
                        <tr>{this.props.columns.map( (col,i) =>
                                <th key={i}
                                    className='clickable no-wrap'
                                    onClick={self.toggleSort.bind(self,col.id)}>
                                    {sortIndicator(col)}{col.label}
                                </th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {rowData()}
                    </tbody>
                </Table>
        );
    }
}

export default SortableTable;
