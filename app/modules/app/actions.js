import * as t from './actionTypes';


export const newDumpling = dumpling => ({
    type: t.DUMPLING,
    dumpling,
});

export const shiftyConnect = (host, port) => ({ type: t.HUB_CONNECT, host, port });
export const shiftyDisconnect = () => ({ type: t.HUB_DISCONNECT });

export const shiftyConnecting = () => ({ type: t.HUB_CONNECTING });
export const shiftyUnavailable = () => ({ type: t.HUB_UNAVAILABLE });
export const shiftyConnected = () => ({ type: t.HUB_CONNECTED });
export const shiftyDisconnected = () => ({ type: t.HUB_DISCONNECTED });
export const shiftyError = error => ({ type: t.HUB_ERROR, error });
export const shiftyCancelReconnect = () => ({ type: t.HUB_CANCEL_RECONNECT });

export const shiftyReconnectAttempt = delay => ({
    type: t.HUB_RECONNECT_ATTEMPT,
    delay,
});