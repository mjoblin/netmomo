import { eventChannel, delay } from 'redux-saga';
import { actionChannel, all, call, put, race, take, takeEvery } from 'redux-saga/effects';

import { newDumpling, shiftyConnecting, shiftyConnected, shiftyDisconnected,
    shiftyError, shiftyReconnectAttempt } from './actions';
import { SHIFTY_CANCEL_RECONNECT, SHIFTY_CONNECT, SHIFTY_CONNECTED,
    SHIFTY_DISCONNECT, SHIFTY_DISCONNECTED } from './actionTypes';


const initShiftyConnection = (host, port) =>
    eventChannel(emitter => {
        // Connect to shifty.
        const shiftyUrl = `ws://${host}:${port}`;
        console.log(`Initializing shifty connection: ${shiftyUrl}`);

        const socket = new WebSocket(shiftyUrl);

        // Websocket event handlers.
        socket.addEventListener('open', event => {
            console.log('Connected to shifty');
            socket.send(JSON.stringify({ 'eater_name': 'netmomo' }));
            return emitter(shiftyConnected());
        });

        socket.addEventListener('close', event => {
            console.log('Connection to shifty closed');
            return emitter(shiftyDisconnected());
        });

        socket.addEventListener('error', event => {
            console.log(`shifty error: ${event}`);
            return emitter(shiftyError(event));
        });

        socket.addEventListener('message', event => {
            let dumpling;

            try {
                dumpling = JSON.parse(event.data);
            } catch (e) {
                console.error(`Error parsing dumpling: ${e.data}`);
            }

            if (dumpling) {
                return emitter(newDumpling(dumpling));
            }
        });

        return () => {
            if ((socket.readyState !== socket.CLOSING) &&
                (socket.readyState !== socket.CLOSED)) {
                console.log('Terminating shifty connection');
                socket.close();
            }
        };
    });

function* watchShiftyConnection() {
    let wantToBeConnected = false;
    let firstConnectionAttempt = true;
    let activeShiftyHost, activeShiftyPort;
    let shiftyChannel;

    // Configure reconnection settings.
    let reconnecting = false;
    const initialReconnectDelay = 1000;
    const reconnectDelayIncrement = 1000;
    const reconnectDelayMax = 10000;
    let reconnectDelay = initialReconnectDelay;

    const externalActions =
        [SHIFTY_CANCEL_RECONNECT, SHIFTY_CONNECT, SHIFTY_DISCONNECT];

    while (true) {
        // Wait for an action we care about to come in. This will either be a
        // CONNECT/DISCONNECT action, or (if the shifty channel is open)
        // an action coming from shifty -- which will usually be a DUMPLING
        // action but might also be an action providing an update on the
        // shifty connection status.
        const racers = {
            externalAction: take(externalActions),
        };

        if (shiftyChannel) {
            racers.fromChannel = take(shiftyChannel);
        }

        const newAction = yield race(racers);
        const action = newAction.externalAction || newAction.fromChannel;

        console.log(`ACTION: ${action.type}`);

        // Publish the action so others can react to it. We don't do this for
        // the actions coming from an external source as we don't want to
        // duplicate them.
        if (!externalActions.includes(action.type)) {
            yield put(action);
        }

        // Handle the new action.
        // TODO: Allow for reconnects to be cancelled.
        debugger;

        if (action.type === SHIFTY_CONNECT) {
            // We want to connect to shifty.
            wantToBeConnected = true;
            firstConnectionAttempt = true;
            reconnecting = false;
            activeShiftyHost = action.host;
            activeShiftyPort = action.port;

            // Attempt an initial connection to shifty.
            yield put(shiftyConnecting());
            shiftyChannel = yield call(
                initShiftyConnection, activeShiftyHost, activeShiftyPort);
            reconnectDelay = initialReconnectDelay;
        } else if (action.type === SHIFTY_DISCONNECT) {
            // We no longer want to be connected to shifty.
            wantToBeConnected = false;
            if (shiftyChannel) {
                shiftyChannel.close();
                yield put(shiftyDisconnected());
            }
        } else if (action.type === SHIFTY_DISCONNECTED) {
            // If we got a DISCONNECT while we were already connected then
            // we want to switch into a reconnect state. First connection
            // attempts don't reconnect as those are likely due to a bad
            // host/port.
            reconnecting = wantToBeConnected && !firstConnectionAttempt;

            if (reconnecting) {
                console.log(
                    `Attempting to reconnect to shifty in ${reconnectDelay} ms`);

                yield put(shiftyReconnectAttempt(reconnectDelay));
                yield call(delay, reconnectDelay);

                shiftyChannel = yield call(
                    initShiftyConnection, activeShiftyHost, activeShiftyPort);

                if (wantToBeConnected) {
                    reconnectDelay += reconnectDelayIncrement;
                    reconnectDelay = reconnectDelay > reconnectDelayMax ?
                        reconnectDelayMax : reconnectDelay;
                }
            }
        } else if (action.type === SHIFTY_CONNECTED) {
            firstConnectionAttempt = false;

            if (reconnecting) {
                // We've successfully reconnected.
                reconnecting = false;
                reconnectDelay = initialReconnectDelay;
            }
        } else if (action.type === SHIFTY_CANCEL_RECONNECT) {
            console.log('Cancelling shifty reconnects');
            wantToBeConnected = false;
            reconnecting = false;
            reconnectDelay = initialReconnectDelay;
        }
    }
}

export default function* () {
    yield all([
        watchShiftyConnection(),
    ]);
}