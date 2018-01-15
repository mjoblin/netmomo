import { NAME, HUB_CONNECTED } from './constants';


export const shiftyConnectionStatus = state => {
    return state[NAME].shiftyConnectionStatus;
};

export const shiftyConnected = state => {
    return state[NAME].shiftyConnectionStatus === HUB_CONNECTED;
};
