import 'whatwg-fetch';
import React, { Component } from 'react';
import SearchBox from './SearchBox.js';
import { Table } from 'react-bootstrap';
//import Reactable from 'reactable';
//const Table = Reactable.Table;

class App extends Component {
    constructor() {
        super();
        this.state = {
            tweets : [],
            isLoading : false,
        }
        //Temporary
        this.onClick('reactjs');
    }

    onClick(searchUser) {
        //TODO url encode
        fetch("/tweets?u="+searchUser).then((response) => {
            return response.text();
        }).then((body)=> {
            this.setState({tweets:Array.from(JSON.parse(body))});
        });
    }

    render() {
        return (
            <div className="container">
                <SearchBox onClick={this.onClick.bind(this)}/>
                <Table striped bordered condensed hover>
                    <thead>
                         <tr><th>#</th><th>Text</th><th>Favs</th></tr>
                    </thead>
                    <tbody>
                         {this.state.tweets.map((tweet, i)=> {
                            return <tr key={i}><td>{i}</td><td>{tweet.text}</td><td>{tweet.favorite_count}</td></tr>;
                         })}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default App;
