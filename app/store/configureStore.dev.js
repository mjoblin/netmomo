import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import DevTools from '../containers/DevTools';
import history from '../history';
import rootReducer from '../modules/rootReducer';


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
