import {createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import spotifyReducer from '../reducers/spotify';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            spotify: spotifyReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );
    return store;
}

