import "whatwg-fetch";

export const FETCH_TWEETS_REQUEST = "FETCH_TWEETS_REQUEST";
export const FETCH_TWEETS_RESPONSE = "FETCH_TWEEETS_RESPONSE";
export const FETCH_TWEETS_ERROR = "FETCH_TWEEETS_ERROR";
export const PURGE_TWEETS = "PURGE_TWEETS";
export const SHOW_STATS = "SHOW_STATS";
export const HIDE_STATS = "HIDE_STATS";
export const SET_FILTER = "SET_FILTER";

// notifes the UI that tweets fetching has begon
export const startFetching = (user) => {
    return {
        type: FETCH_TWEETS_REQUEST,
        user: user
    }
}

// processes the response from tweet fetching request
export const processResponse = (body) => {
    return {
        type: FETCH_TWEETS_RESPONSE,
        body: body
    }
}

// notifies the UI that tweets fetching has failed with the specified error message
export const processError = (message) => {
    return {
        type: FETCH_TWEETS_ERROR,
        message: message
    }
}

// async action that fetches the tweets for a specified user and displays the result
export const fetchTweets = (user) => {
    return function(dispatch) {
        if (!user) return;
        dispatch(startFetching(user));

        return fetch("/tweets?u="+encodeURIComponent(user))
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.text();
                } else if (response.status >= 400 && response.status < 500) {
                    dispatch(processError("No data for this user!"));
                } else {
                    dispatch(processError("Ooops! Something went wrong while fetching user data from Twitter. (Code "+response.status+")"));
                }
            })
            .then((body)=> {
                if (body) dispatch(processResponse(body));
            });      
    }
}

// display the statistics modal
export const showStats = () => {
    return {
        type: SHOW_STATS
    }
}

// hide the statistics modal
export const hideStats = () => {
    return {
        type: HIDE_STATS
    }
}

// forget all currently loaded tweets
export const purgeTweets = () => {
    return {
        type: PURGE_TWEETS
    }
}

// set filter with the specified index to the specified value
export const setFilter = (index, value) => {
    return {
        type: SET_FILTER,
        index: index,
        value: value
    }
}
