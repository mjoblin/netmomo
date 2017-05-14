import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import history from '../history';
import rootReducer from '../reducers';


export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(routerMiddleware(history)),
        )
    );

    return store;
}
