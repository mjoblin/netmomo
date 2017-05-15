import * as t from './actionTypes';


export const newDumpling = dumpling => ({
    type: t.DUMPLING,
    dumpling,
});

export const shiftyConnecting = () => ({ type: t.SHIFTY_CONNECTING });
export const shiftyConnected = () => ({ type: t.SHIFTY_CONNECTED });
export const shiftyDisconnected = () => ({ type: t.SHIFTY_DISCONNECTED });
export const shiftyError = error => ({ type: t.SHIFTY_ERROR, error });

export const shiftyReconnectAttempt = delay => ({
    type: t.SHIFTY_RECONNECT_ATTEMPT,
    delay,
});