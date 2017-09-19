import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from 'AppRoot/modules/rootReducer';
import history from 'AppRoot/services/history';


export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(routerMiddleware(history))
        )
    );

    return store;
}
