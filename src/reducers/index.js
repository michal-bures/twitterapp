import Tweet from '../Tweet.js'

import { 
    FETCH_TWEETS_REQUEST, 
    FETCH_TWEETS_ERROR,
    FETCH_TWEETS_RESPONSE,
    PURGE_TWEETS,
} from '../actions/index'

const twitterApp = (state = {
    fetching : false,
    tweets : null,
    showStats : false,
    error: null,
}, action) => {
    switch (action.type) {
    case FETCH_TWEETS_REQUEST:
        return {
            fetching: true,
            error: null
        }
    case FETCH_TWEETS_ERROR:
        if (!state.fetching) return state; // we no longer care about the response
        return {
            error: action.message,
            fetching: false
        }
    case FETCH_TWEETS_RESPONSE:
        if (!state.fetching) return state; // we no longer care about the response
        return {
            tweets: Array.from(JSON.parse(action.body))
                        .map((tweetData,i) => new Tweet(i, tweetData)),
            error: null,
            fetching: false            
        }
    case PURGE_TWEETS:
        return {
            tweets: null,
            error: null,
            fetching: false
        }
    default:
        return state
    }
}

export default twitterApp