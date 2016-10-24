import moment from "moment";

const DATE_FORMAT = 'D.M.YYYY HH:mm';

// Immutable representation of a single tweet
class Tweet {

    // i: internal tweet identifier, tweetData: tweet object retrieved from Twitter API
    constructor(i,tweetData) {
        this._data = {
            id: i,                                                           // sequential number in results
            text: tweetData.text,                                                // tweet content
            favs: Number.parseInt(tweetData.favorite_count, 10),                 // number of likes (favourites)
            retweets: Number.parseInt(tweetData.retweet_count, 10),              // number of retweets
            date: moment(tweetData.created_at,'ddd MMM D HH:mm:ss Z'),           // tweet creation date
            mentions: tweetData.entities.user_mentions.map(m => m.screen_name),  // list of @mentions 
            hashtags: tweetData.entities.hashtags.map(h => h.text)               // list of #hashtags
        }
    }

    get id() { return this._data.id; }
    get text() { return this._data.text; }
    get favs() { return this._data.favs; }
    get retweets() { return this._data.retweets; }
    get date() { return this._data.date; }
    get dateString() { return this._data.date.format(DATE_FORMAT); }
    get mentions() { return this._data.mentions; }
    get hashtags() { return this._data.hashtags; }
}

export default Tweet;