import * as t from './actionTypes';
import { SHIFTY_CONNECTING, SHIFTY_CONNECTED, SHIFTY_DISCONNECTED,
    SHIFTY_RECONNECTING } from './constants';


const DEFAULT_STATE = {
    shiftyConnectionStatus: SHIFTY_CONNECTING,
};

const appReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case t.SHIFTY_CONNECTING:
            return { ...state, shiftyConnectionStatus: SHIFTY_CONNECTING };
        case t.SHIFTY_CONNECTED:
            return { ...state, shiftyConnectionStatus: SHIFTY_CONNECTED };
        case t.SHIFTY_DISCONNECTED:
            return { ...state, shiftyConnectionStatus: SHIFTY_DISCONNECTED };
        case t.SHIFTY_RECONNECT_ATTEMPT:
            return { ...state, shiftyConnectionStatus: SHIFTY_RECONNECTING };
        default:
            return state;
    }
};

export default appReducer;