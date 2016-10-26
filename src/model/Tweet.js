import moment from "moment";

const DATE_FORMAT = "D.M.YYYY HH:mm";

// Immutable representation of a single tweet
class Tweet {

    // i: internal tweet identifier, tweetData: tweet object retrieved from Twitter API
    constructor(i,tweetData) {
        this._data = {
            id: i,                                                           
            text: tweetData.text,                                                
            favs: Number.parseInt(tweetData.favorite_count, 10),                
            date: moment(tweetData.created_at,"ddd MMM D HH:mm:ss Z"),           
            mentions: tweetData.entities.user_mentions.map(m => m.screen_name),  
            hashtags: tweetData.entities.hashtags.map(h => h.text)               
        }
    }

    // sequential number in results
    get id() { return this._data.id; }
    // tweet content
    get text() { return this._data.text; }
    // number of likes (favourites)
    get favs() { return this._data.favs; }
    // tweet creation date
    get date() { return this._data.date; }
    // tweet creaqtion date as formated string
    get dateString() { return this._data.date.format(DATE_FORMAT); }
    // list of @mentions 
    get mentions() { return this._data.mentions; }
    // list of #hashtags
    get hashtags() { return this._data.hashtags; }
}

export default Tweet;