import * as t from './actionTypes';


export const newDumpling = dumpling => ({
    type: t.DUMPLING,
    dumpling,
});

export const shiftyConnect = (host, port) => ({ type: t.SHIFTY_CONNECT, host, port });
export const shiftyDisconnect = () => ({ type: t.SHIFTY_DISCONNECT });

export const shiftyConnecting = () => ({ type: t.SHIFTY_CONNECTING });
export const shiftyUnavailable = () => ({ type: t.SHIFTY_UNAVAILABLE });
export const shiftyConnected = () => ({ type: t.SHIFTY_CONNECTED });
export const shiftyDisconnected = () => ({ type: t.SHIFTY_DISCONNECTED });
export const shiftyError = error => ({ type: t.SHIFTY_ERROR, error });
export const shiftyCancelReconnect = () => ({ type: t.SHIFTY_CANCEL_RECONNECT });

export const shiftyReconnectAttempt = delay => ({
    type: t.SHIFTY_RECONNECT_ATTEMPT,
    delay,
});