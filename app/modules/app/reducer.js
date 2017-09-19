import deepcopy from 'deepcopy';

import * as t from './actionTypes';
import { SHIFTY_CONNECTING, SHIFTY_CONNECTED, SHIFTY_DISCONNECTED,
    SHIFTY_RECONNECTING } from './constants';


const DEFAULT_STATE = {
    shiftyConnectionStatus: SHIFTY_DISCONNECTED,
    dumplingsSeen: {},
};

const appReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case t.SHIFTY_CONNECTING:
            // If we're attempting to connect while in reconnect mode then we
            // want to keep the connection status as RECONNECTING. This avoids
            // constantly toggling the status between CONNECTING and
            // RECONNECTING between each reconnect attempt.
            if (state.shiftyConnectionStatus === SHIFTY_RECONNECTING) {
                return state;
            } else {
                return {
                    ...state,
                    shiftyConnectionStatus: SHIFTY_CONNECTING
                };
            }
        case t.SHIFTY_CONNECTED:
            return {
                ...state,
                shiftyConnectionStatus: SHIFTY_CONNECTED
            };
        case t.SHIFTY_DISCONNECTED:
            return {
                ...state,
                shiftyConnectionStatus: SHIFTY_DISCONNECTED
            };
        case t.SHIFTY_RECONNECT_ATTEMPT:
            return {
                ...state,
                shiftyConnectionStatus: SHIFTY_RECONNECTING
            };
        case t.DUMPLING: {
            // Keep track of how many dumplings we've seen from each chef.
            // These will probably not add up to total_dumplings_sent from the
            // SystemStatusChef dumplings because shifty has likely been up
            // longer than this web eater has.
            const newState = deepcopy(state);
            const chef = action.dumpling.metadata.chef;
            newState.dumplingsSeen[chef] =
                (newState.dumplingsSeen[chef] || 0) + 1;

            return newState;
        }
        default:
            return state;
    }
};

export default appReducer;