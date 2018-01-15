import * as t from './actionTypes';


const DEFAULT_STATE = {
    shiftyHost: 'localhost',
    shiftyPort: 11348,
};

const settingsReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case t.SET_HUB_HOST:
            return { ...state, shiftyHost: action.shiftyHost };
        case t.SET_HUB_PORT:
            return { ...state, shiftyPort: action.shiftyPort };
        default:
            return state;
    }
};

export default settingsReducer;
