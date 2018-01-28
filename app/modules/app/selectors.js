import { NAME, HUB_CONNECTED } from './constants';


export const hubConnectionStatus = state => {
    return state[NAME].hubConnectionStatus;
};

export const hubConnected = state => {
    return state[NAME].hubConnectionStatus === HUB_CONNECTED;
};
