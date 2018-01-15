import deepcopy from 'deepcopy';

import * as t from './actionTypes';
import { HUB_CONNECTING, HUB_CONNECTED, HUB_DISCONNECTED,
    HUB_RECONNECTING } from './constants';


const DEFAULT_STATE = {
    shiftyConnectionStatus: HUB_DISCONNECTED,
    dumplingsSeen: {},
};

const appReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case t.HUB_CONNECTING:
            // If we're attempting to connect while in reconnect mode then we
            // want to keep the connection status as RECONNECTING. This avoids
            // constantly toggling the status between CONNECTING and
            // RECONNECTING between each reconnect attempt.
            if (state.shiftyConnectionStatus === HUB_RECONNECTING) {
                return state;
            } else {
                return {
                    ...state,
                    shiftyConnectionStatus: HUB_CONNECTING
                };
            }
        case t.HUB_CONNECTED:
            return {
                ...state,
                shiftyConnectionStatus: HUB_CONNECTED
            };
        case t.HUB_DISCONNECTED:
            return {
                ...state,
                shiftyConnectionStatus: HUB_DISCONNECTED
            };
        case t.HUB_RECONNECT_ATTEMPT:
            return {
                ...state,
                shiftyConnectionStatus: HUB_RECONNECTING
            };
        case t.DUMPLING: {
            // Keep track of how many dumplings we've seen from each chef.
            // These will probably not add up to total_dumplings_out from the
            // SystemStatusChef dumplings because shifty has likely been up
            // longer than this web eater has -- and there might be multiple
            // eaters listening.
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