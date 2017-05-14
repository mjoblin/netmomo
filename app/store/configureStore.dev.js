import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from '../modules/rootReducer';
import DevTools from '../services/DevTools';
import history from '../services/history';


export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(routerMiddleware(history)),
            DevTools.instrument()
        )
    );

    return store;
}
