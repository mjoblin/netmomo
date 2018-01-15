import * as t from './actionTypes';


const DEFAULT_STATE = {
    hubHost: 'localhost',
    hubPort: 11348,
};

const settingsReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case t.SET_HUB_HOST:
            return { ...state, hubHost: action.hubHost };
        case t.SET_HUB_PORT:
            return { ...state, hubPort: action.hubPort };
        default:
            return state;
    }
};

export default settingsReducer;
