import { eventChannel, delay, END } from 'redux-saga';
import { all, call, fork, put, race, take } from 'redux-saga/effects';

import { newDumpling, hubConnecting, hubConnect, hubConnected,
    hubDisconnected, hubError, hubReconnectAttempt } from './actions';
import { HUB_CANCEL_RECONNECT, HUB_CONNECT, HUB_CONNECTED,
    HUB_DISCONNECT, HUB_DISCONNECTED } from './actionTypes';


// TODO: Consider redux-observable/RxJS for the websocket handling.

/**
 * Attempt to reconnect to hub after a given delay.
 *
 * @param {string} host - The hub host.
 * @param {int} port - The hub port for outgoing dumplings.
 * @param {int} duration - Duration (in seconds) in wait before attempting to
 *  reconnect.
 */
function* reconnectAfterDelay(host, port, duration) {
    yield put(hubReconnectAttempt(duration));
    yield call(delay, duration);
    yield put(hubConnect(host, port));
}


/**
 * Initialize the connection to hub, including configuring websocket event
 * handlers.
 *
 * @param {string} host - The hub host.
 * @param {int} port - The hub port for outgoing dumplings.
 */
const initHubConnection = (host, port) =>
    eventChannel(emitter => {
        // Connect to hub.
        const hubUrl = `ws://${host}:${port}`;

        const socket = new WebSocket(hubUrl);

        // Websocket event handlers.
        socket.addEventListener('open', () => {
            console.log('Connected to dumpling hub');
            socket.send(JSON.stringify({ 'eater_name': 'netmomo' }));
            emitter(hubConnected());
        });

        socket.addEventListener('close', () => {
            console.log('Connection to dumpling hub closed');
            emitter(hubDisconnected());
            emitter(END);
        });

        socket.addEventListener('error', () => {
            emitter(hubError({
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
 * Top-level manager for two action sources: new dumplings (from the hub
 * websocket) which need to be re-emitted to the app; or hub
 * connection-related actions (coming from the UI, such as requests to connect
 * or disconnect from hub).
 */
function* watchHubConnection() {
    let wantToBeConnected = false;
    let activeHubHost, activeHubPort;
    let hubChannel;

    // Configure reconnection settings.
    let reconnectCount = 0;
    const reconnectDelayIncrement = 1000;
    const reconnectDelayMax = 10000;
    let haveBeenSuccessfullyConnected = false;
    let reconnectTask;

    const externalActions =
        [HUB_CANCEL_RECONNECT, HUB_CONNECT, HUB_DISCONNECT];

    for (;;) {
        // Wait for an action we care about to come in. This will either be a
        // CONNECT/DISCONNECT action, or (if the hub channel is open)
        // an action coming from hub -- which will usually be a DUMPLING
        // action but might also be an action providing an update on the
        // hub connection status.
        const racers = {
            externalAction: take(externalActions),
        };

        if (hubChannel) {
            racers.fromChannel = take(hubChannel);
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

        if (action.type === HUB_CONNECT) {
            // Attempt a connection to hub. This will fail if hub is
            // unavailable, which manifests as a HUB_DISCONNECTED.
            wantToBeConnected = true;
            activeHubHost = action.host;
            activeHubPort = action.port;

            yield put(hubConnecting());
            hubChannel = yield call(
                initHubConnection, activeHubHost, activeHubPort);
        } else if (action.type === HUB_DISCONNECTED) {
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
                    activeHubHost, activeHubPort, reconnectDelay);
            }
        } else if (action.type === HUB_CONNECTED) {
            haveBeenSuccessfullyConnected = true;

            if (reconnectCount > 0) {
                // We've successfully reconnected.
                reconnectCount = 0;
            }
        } else if (action.type === HUB_DISCONNECT) {
            // The user has requested a disconnect from hub.
            console.log('Disconnecting from dumpling hub');
            wantToBeConnected = false;
            haveBeenSuccessfullyConnected = false;

            if (hubChannel) {
                hubChannel.close();
                yield put(hubDisconnected());
            }

        } else if (action.type === HUB_CANCEL_RECONNECT) {
            // The user has requested that we no longer attempt to reconnect.
            console.log('Cancelling dumpling hub reconnects');
            wantToBeConnected = false;
            haveBeenSuccessfullyConnected = false;

            if (reconnectTask && reconnectTask.isRunning()) {
                reconnectTask.cancel();
            }

            yield put(hubDisconnected());
        }
    }
}

export default function* () {
    yield all([
        watchHubConnection(),
    ]);
}