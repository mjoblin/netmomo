import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import rootReducer from 'AppRoot/modules/rootReducer';
import rootSaga from 'AppRoot/modules/rootSaga';
import history from 'AppRoot/services/history';


export default function configureStore(initialState) {
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        rootReducer,
        initialState,
        composeWithDevTools(
            applyMiddleware(
                routerMiddleware(history),
                sagaMiddleware
            )
        )
    );

    sagaMiddleware.run(rootSaga);

    // Enable hot reloading of reducers and sagas.
    if (module.hot) {
        module.hot.accept('AppRoot/modules/rootReducer', () => {
            const nextRootReducer = require('AppRoot/modules/rootReducer');
            store.replaceReducer(nextRootReducer);
        });

        module.hot.accept('AppRoot/modules/rootSaga', () => {
            console.warn('Unable to reload AppRoot/modules/rootSaga');
        });
    }

    return store;
}
