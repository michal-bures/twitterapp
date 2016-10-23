import 'whatwg-fetch';
import React, { Component } from 'react';
import { Table, Glyphicon } from 'react-bootstrap';
import assert from 'assert';
import globals from '../globals.js';

class TweetsTable extends Component {
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
        // apply filters and sorting to the tweet list
        var displayList = this.props.tweets
            // apply sorting
            .sort((a,b) => {
                const va = a[this.state.orderBy];
                const vb = b[this.state.orderBy];
                if (va === vb) return 0;
                if (va > vb) return 1 * (this.state.ascending?1:-1);
                return -1 * (this.state.ascending?1:-1);
        })

        function rowData() {
            if (displayList.size === 0) {
                return <tr><td colSpan={4}>No items match the selected filters!</td></tr>
            } else {
                return displayList.map((tweet, i)=> {
                return (
                    <tr key={tweet.id}>
                        <td>{tweet.id}</td>
                        <td>{tweet.text}</td>
                        <td>{tweet.favs}</td>
                        <td>{tweet.date.format(globals.DATE_FORMAT)}</td>
                    </tr>
                )                            
            })
            }
        }

        function headerCell(title, id) {
            return (
                <th className='clickable no-wrap'
                    onClick={self.toggleSort.bind(self,id)}>
                    {(self.state.orderBy === id ? 
                        <Glyphicon glyph={(self.state.ascending?"chevron-up":"chevron-down")}/>
                    :[])}
                    {title}
                </th>
            ); 
        }

        return (
                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                            {headerCell('#','id')}
                            {headerCell('text','text')}
                            {headerCell(<Glyphicon glyph="star"/>,'favs')}
                            {headerCell('sent','date')}
                        </tr>
                    </thead>
                    <tbody>
                    {rowData()}
                    </tbody>
                </Table>
        );
    }
}

export default TweetsTable;
