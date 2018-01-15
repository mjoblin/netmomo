import { eventChannel, delay, END } from 'redux-saga';
import { all, call, fork, put, race, take } from 'redux-saga/effects';

import { newDumpling, shiftyConnecting, shiftyConnect, shiftyConnected,
    shiftyDisconnected, shiftyError, shiftyReconnectAttempt } from './actions';
import { SHIFTY_CANCEL_RECONNECT, SHIFTY_CONNECT, SHIFTY_CONNECTED,
    SHIFTY_DISCONNECT, SHIFTY_DISCONNECTED } from './actionTypes';


// TODO: Consider redux-observable/RxJS for the websocket handling.

/**
 * Attempt to reconnect to shifty after a given delay.
 *
 * @param {string} host - The shifty host.
 * @param {int} port - The shifty port for outgoing dumplings.
 * @param {int} duration - Duration (in seconds) in wait before attempting to
 *  reconnect.
 */
function* reconnectAfterDelay(host, port, duration) {
    yield put(shiftyReconnectAttempt(duration));
    yield call(delay, duration);
    yield put(shiftyConnect(host, port));
}


/**
 * Initialize the connection to shifty, including configuring websocket event
 * handlers.
 *
 * @param {string} host - The shifty host.
 * @param {int} port - The shifty port for outgoing dumplings.
 */
const initShiftyConnection = (host, port) =>
    eventChannel(emitter => {
        // Connect to shifty.
        const shiftyUrl = `ws://${host}:${port}`;

        const socket = new WebSocket(shiftyUrl);

        // Websocket event handlers.
        socket.addEventListener('open', () => {
            console.log('Connected to shifty');
            socket.send(JSON.stringify({ 'eater_name': 'netmomo' }));
            emitter(shiftyConnected());
        });

        socket.addEventListener('close', () => {
            console.log('Connection to dumpling hub closed');
            emitter(shiftyDisconnected());
            emitter(END);
        });

        socket.addEventListener('error', () => {
            emitter(shiftyError({
                message: 'There was an unexpected dumpling hub WebSocket error'
            }));
        });

        socket.addEventListener('message', event => {
            let dumpling;

            try {
                dumpling = JSON.parse(event.data);
            } catch (e) {
                console.error(`Error parsing dumpling: ${e.data}`);
            }

            if (dumpling) {
                emitter(newDumpling(dumpling));
            }
        });

        return () => {
            if ((socket.readyState !== socket.CLOSING) &&
                (socket.readyState !== socket.CLOSED)) {
                console.log('Terminating dumpling hub connection');
                socket.close();
            }
        };
    });

/**
 * Top-level manager for two action sources: new dumplings (from the shifty
 * websocket) which need to be re-emitted to the app; or shifty
 * connection-related actions (coming from the UI, such as requests to connect
 * or disconnect from shifty).
 */
function* watchShiftyConnection() {
    let wantToBeConnected = false;
    let activeShiftyHost, activeShiftyPort;
    let shiftyChannel;

    // Configure reconnection settings.
    let reconnectCount = 0;
    const reconnectDelayIncrement = 1000;
    const reconnectDelayMax = 10000;
    let haveBeenSuccessfullyConnected = false;
    let reconnectTask;

    const externalActions =
        [SHIFTY_CANCEL_RECONNECT, SHIFTY_CONNECT, SHIFTY_DISCONNECT];

    for (;;) {
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

        // Publish the action so others can react to it. We don't do this for
        // the actions coming from an external source as we don't want to
        // duplicate them.
        if (!externalActions.includes(action.type)) {
            yield put(action);
        }

        // Handle the new action.

        if (action.type === SHIFTY_CONNECT) {
            // Attempt a connection to shifty. This will fail if shifty is
            // unavailable, which manifests as a SHIFTY_DISCONNECTED.
            wantToBeConnected = true;
            activeShiftyHost = action.host;
            activeShiftyPort = action.port;

            yield put(shiftyConnecting());
            shiftyChannel = yield call(
                initShiftyConnection, activeShiftyHost, activeShiftyPort);
        } else if (action.type === SHIFTY_DISCONNECTED) {
            // If we got a DISCONNECT while we were already connected then
            // we want to switch into a reconnect state. First connection
            // attempts don't put us into a reconnect cycle.
            if (wantToBeConnected && haveBeenSuccessfullyConnected) {
                reconnectCount++;
                let reconnectDelay = reconnectCount * reconnectDelayIncrement;
                if (reconnectDelay > reconnectDelayMax) {
                    reconnectDelay = reconnectDelayMax;
                }

                console.log(
                    `Attempting to reconnect to dumpling hub in ` +
                    `${reconnectDelay} ms`
                );
                reconnectTask = yield fork(reconnectAfterDelay,
                    activeShiftyHost, activeShiftyPort, reconnectDelay);
            }
        } else if (action.type === SHIFTY_CONNECTED) {
            haveBeenSuccessfullyConnected = true;

            if (reconnectCount > 0) {
                // We've successfully reconnected.
                reconnectCount = 0;
            }
        } else if (action.type === SHIFTY_DISCONNECT) {
            // The user has requested a disconnect from shifty.
            console.log('Disconnecting from shifty');
            wantToBeConnected = false;
            haveBeenSuccessfullyConnected = false;

            if (shiftyChannel) {
                shiftyChannel.close();
                yield put(shiftyDisconnected());
            }

        } else if (action.type === SHIFTY_CANCEL_RECONNECT) {
            // The user has requested that we no longer attempt to reconnect.
            console.log('Cancelling dumpling hub reconnects');
            wantToBeConnected = false;
            haveBeenSuccessfullyConnected = false;

            if (reconnectTask && reconnectTask.isRunning()) {
                reconnectTask.cancel();
            }

            yield put(shiftyDisconnected());
        }
    }
}

export default function* () {
    yield all([
        watchShiftyConnection(),
    ]);
}