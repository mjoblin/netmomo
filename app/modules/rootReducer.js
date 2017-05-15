import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import app from './app';


const rootReducer = combineReducers({
    app: app.reducer,
    router: routerReducer,
});

export default rootReducer;
