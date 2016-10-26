import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import createLogger from 'redux-logger'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

import twitterApp from './reducers';

const loggerMiddleware = createLogger();

let store = createStore(
    twitterApp, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware,
    )
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
