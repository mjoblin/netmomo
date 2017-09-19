import appModule from 'AppRoot/modules/app';


const DEFAULT_STATE = {
    dumplingData: [],
};

const arpReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case appModule.actionTypes.DUMPLING:
            if (action.dumpling.metadata.chef === 'ARPChef') {
                // Update the entire dnsLookup.dumplingData state with the new
                // payload of the ARPChef dumpling.
                const payload = action.dumpling.payload;
                const key = `${payload.src_hw}_${payload.dst_hw}_${payload.time}`;

                return {
                    ...state,
                    dumplingData: [
                        ...state.dumplingData,
                        {
                            key,
                            ...action.dumpling.payload
                        }
                    ]
                };
            }

            // We ignore all other non-ARPChef dumplings.
            return state;
        default:
            return state;
    }
};

export default arpReducer;
