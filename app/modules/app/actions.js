import * as t from './actionTypes';


export const newDumpling = dumpling => ({
    type: t.DUMPLING,
    dumpling,
});

export const hubConnect = (host, port) => ({ type: t.HUB_CONNECT, host, port });
export const hubDisconnect = () => ({ type: t.HUB_DISCONNECT });

export const hubConnecting = () => ({ type: t.HUB_CONNECTING });
export const hubUnavailable = () => ({ type: t.HUB_UNAVAILABLE });
export const hubConnected = () => ({ type: t.HUB_CONNECTED });
export const hubDisconnected = () => ({ type: t.HUB_DISCONNECTED });
export const hubError = error => ({ type: t.HUB_ERROR, error });
export const hubCancelReconnect = () => ({ type: t.HUB_CANCEL_RECONNECT });

export const hubReconnectAttempt = delay => ({
    type: t.HUB_RECONNECT_ATTEMPT,
    delay,
});