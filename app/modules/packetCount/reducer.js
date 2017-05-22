import deepcopy from 'deepcopy';

import appModule from 'AppRoot/modules/app';


const DEFAULT_STATE = {};

const packetCountReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case appModule.actionTypes.DUMPLING:
            if (action.dumpling.metadata.chef === 'PacketCountChef') {
                // Update the entire packetCount state with the new payload of
                // the PacketCountChef dumpling.
                return deepcopy(action.dumpling.payload.packet_counts);
            }

            // We ignore all other non-PacketCountChef dumplings.
            return state;
        default:
            return state;
    }
};

export default packetCountReducer;