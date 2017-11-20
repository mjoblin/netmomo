import deepcopy from 'deepcopy';

import appModule from 'AppRoot/modules/app';


const DEFAULT_STATE = {
    dumpling_eater_count: 0,
    dumpling_eaters: [],
    dumpling_kitchen_count: 0,
    dumpling_kitchens: [],
    server_uptime: 0,
    total_dumplings_sent: 0,
};

const systemStatusReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case appModule.actionTypes.DUMPLING:
            if (action.dumpling.metadata.chef === 'SystemStatusChef') {
                // Update the entire systemStatus state with the new payload of
                // the SystemStatusChef dumpling.
                return deepcopy(action.dumpling.payload);
            }

            // We ignore all other non-SystemStatusChef dumplings.
            return state;
        default:
            return state;
    }
};

export default systemStatusReducer;
