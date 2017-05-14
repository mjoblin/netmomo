import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';


const filter = (state = '', action) => {
    switch (action.type) {
        case 'FILTER':
            return action.filter;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    filter,
    router: routerReducer,
});

export default rootReducer;
