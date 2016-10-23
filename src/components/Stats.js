import React, { Component } from 'react';

class Stats extends Component {
    render() {
        const tweets = this.props.tweets;

        const totalLikes = tweets.reduce((sum, curr) => sum + curr.favs, 0);
        const avgLikes = totalLikes / tweets.size;
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
