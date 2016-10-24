import React, { Component } from 'react';
import Immutable from 'immutable';

// Displays statistic about a list of tweets
class Stats extends Component {
    static propTypes = {
        // list of Tweets - must contain list of Tweet objects (see Tweet.js)
        tweets : React.PropTypes.instanceOf(Immutable.List).isRequired,
    }

    render() {
        const tweets = this.props.tweets;

        const totalLikes = tweets.reduce((sum, curr) => sum + curr.favs, 0);
        const avgLikes = (totalLikes / tweets.size).toFixed(1);
        const mentions = tweets.reduce((obj,curr) => {
            curr.mentions.forEach(m => obj[m] = ++obj[m] || 1);
            return obj;
        }, {});

        return (
            <ul>
                <li>Total likes: {totalLikes}</li>
                <li>Likes per tweet: {avgLikes}</li>
                <li>Mentions:
                <ul>
                    {Object.keys(mentions)
                        .sort((a, b) => {
                            if (mentions[a] === mentions[b]) return 0;
                            return (mentions[a] < mentions[b] ? 1 : -1);
                        })
                        .map((key) => {
                        const val = mentions[key];
                        return (
                            <li key={key}>{key}: {val}x</li>
                        );  
                    })}
                </ul>
                </li>
            </ul>
        );
    }
}

export default Stats;
