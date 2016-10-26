import Immutable from 'immutable'
import Filter from '../model/Filter'
import Tweet from '../model/Tweet'
import assert from 'assert'

import { 
    FETCH_TWEETS_REQUEST, 
    FETCH_TWEETS_ERROR,
    FETCH_TWEETS_RESPONSE,
    PURGE_TWEETS,
    SHOW_STATS,
    HIDE_STATS,
    SET_FILTER
} from '../actions/index'

const twitterApp = (state = Immutable.fromJS({
    fetching : false,
    tweets : null,
    statsModalVisible : false,
    error: null,
    orderBy: 'id',
    orderAscending: true,
    // sequence filter types
    filters: Immutable.List.of(
        Filter.date,
        Filter.fullText,
        Filter.tweetLength,
        Filter.mentions,
        Filter.hashtags,
        Filter.favourites,
        Filter.hashtag,
        Filter.mention
    ),
    // active filter values (key is index of filter in filters)
    filterValues : Immutable.Map(),
}), action) => {
    switch (action.type) {
    case FETCH_TWEETS_REQUEST:
        return state.merge({
            fetching: true,
            error: null
        });
    case FETCH_TWEETS_ERROR:
        if (!state.get('fetching')) return state; // we no longer care about the response
        return state.merge({            
            error: action.message,
            fetching: false
        });
    case FETCH_TWEETS_RESPONSE:
        if (!state.get('fetching')) return state; // we no longer care about the response
        return state.merge({            
            tweets: Array.from(JSON.parse(action.body))
                        .map((tweetData,i) => new Tweet(i, tweetData)),
            error: null,
            fetching: false            
        });
    case PURGE_TWEETS:
        return state.merge({            
            tweets: null,
            error: null,
            fetching: false
        });
    case SHOW_STATS:
        return state.merge({
            statsModalVisible:true,
        });
    case HIDE_STATS:
        return state.merge({            
            statsModalVisible:false,
        });
    case SET_FILTER:
        assert.equal(typeof action.index, 'number');
        return state.updateIn(['filterValues', action.index], val => action.value);
    default:
        return state
    }
}

export default twitterApp