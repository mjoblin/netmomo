import deepcopy from 'deepcopy';

import appModule from 'AppRoot/modules/app';
import * as t from './actionTypes';


const DEFAULT_STATE = {
    dumplingData: {},
    hostComponentLevels: 0, // 0 means all levels
    hostFilter: '',
};

const dnsLookupReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case appModule.actionTypes.DUMPLING:
            if (action.dumpling.metadata.chef === 'DNSLookupChef' &&
                action.dumpling.payload.lookups_seen
            ) {
                // Update the entire dnsLookup.dumplingData state with the new
                // payload of the DNSLookupChef dumpling, but only for the
                // lookups_seen history of all lookups (we ignore the as-they-
                // happen individual lookups which have a 'lookup' key instad
                // of a 'lookups_seen' key).
                return {
                    ...state,
                    dumplingData: deepcopy(action.dumpling.payload.lookups_seen),
                };
            }

            // We ignore all other non-DNSLookupChef dumplings.
            return state;
        case t.SET_HOST_COMPONENT_LEVELS:
            return {
                ...state,
                hostComponentLevels: action.hostComponentLevels,
            };
        case t.SET_HOST_FILTER:
            return {
                ...state,
                hostFilter: action.hostFilter,
            };
        default:
            return state;
    }
};

export default dnsLookupReducer;