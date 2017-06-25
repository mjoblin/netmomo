import * as t from './actionTypes';


const DEFAULT_STATE = {
    shiftyHost: 'localhost',
    shiftyPort: 11348,
    shiftyConnect: true,
};

const settingsReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case t.SET_SHIFTY_CONNECT:
            return { ...state, shiftyConnect: action.shiftyConnect };
        default:
            return state;
    }
};

export default settingsReducer;
