import * as t from './actionTypes';


const DEFAULT_STATE = {
    shiftyHost: 'localhost',
    shiftyPort: 11348,
};

const settingsReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case t.SET_SHIFTY_HOST:
            return { ...state, shiftyHost: action.shiftyHost };
        case t.SET_SHIFTY_PORT:
            return { ...state, shiftyPort: action.shiftyPort };
        default:
            return state;
    }
};

export default settingsReducer;
