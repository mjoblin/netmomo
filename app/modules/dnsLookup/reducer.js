import deepcopy from 'deepcopy';

import appModule from 'AppRoot/modules/app';


const DEFAULT_STATE = {};

const dnsLookupReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case appModule.actionTypes.DUMPLING:
            if (action.dumpling.metadata.chef === 'DNSLookupChef') {
                // Update the entire dnsLookup state with the new payload of
                // the DNSLookupChef dumpling.
                return deepcopy(action.dumpling.payload.lookups_seen);
            }

            // We ignore all other non-DNSLookupChef dumplings.
            return state;
        default:
            return state;
    }
};

export default dnsLookupReducer;