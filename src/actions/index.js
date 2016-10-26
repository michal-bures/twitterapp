import 'whatwg-fetch';

export const FETCH_TWEETS_REQUEST = 'FETCH_TWEETS_REQUEST';
export const FETCH_TWEETS_RESPONSE = 'FETCH_TWEEETS_RESPONSE';
export const FETCH_TWEETS_ERROR = 'FETCH_TWEEETS_ERROR';
export const PURGE_TWEETS = 'PURGE_TWEETS';
export const SHOW_STATS = 'SHOW_STATS';
export const HIDE_STATS = 'HIDE_STATS';
export const SET_FILTER = 'SET_FILTER';


export const startFetching = (user) => {
    return {
        type: FETCH_TWEETS_REQUEST,
        user: user
    }
}

export const processResponse = (body) => {
    return {
        type: FETCH_TWEETS_RESPONSE,
        body: body
    }
}

export const processError = (message) => {
    return {
        type: FETCH_TWEETS_ERROR,
        message: message
    }
}

export const fetchTweets = (user) => {
    return function(dispatch) {
        if (!user) return;
        dispatch(startFetching(user));

        return fetch("/tweets?u="+encodeURIComponent(user))
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.text();
                } else if (response.status >= 400 && response.status < 500) {
                    dispatch(processError('No data for this user!'));
                } else {
                    dispatch(processError('Ooops! Something went wrong while fetching user data from Twitter. (Code '+response.status+')'));
                }
            })
            .then((body)=> {
                if (body) dispatch(processResponse(body));
            });      
    }
}

export const showStats = () => {
    return {
        type: SHOW_STATS
    }
}

export const hideStats = () => {
    return {
        type: HIDE_STATS
    }
}

export const purgeTweets = () => {
    return {
        type: PURGE_TWEETS
    }
}

export const setFilter = (index, value) => {
    return {
        type: SET_FILTER,
        index: index,
        value: value
    }
}
