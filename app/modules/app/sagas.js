import { eventChannel, END, delay } from 'redux-saga';
import { all, call, put, take } from 'redux-saga/effects';

import { newDumpling, shiftyConnecting, shiftyConnected, shiftyDisconnected,
    shiftyError, shiftyReconnectAttempt } from './actions';
import { SHIFTY_CONNECTED, SHIFTY_DISCONNECTED } from './actionTypes';


const initShiftyConnection = () =>
    eventChannel(emitter => {
        // Connect to NetDumplings default websocket port.
        const socket = new WebSocket('ws://localhost:11348');
        //const socket = new WebSocket('ws://10.0.1.7:11348');
        //const socket = new WebSocket('ws://10.0.1.3:11348');

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
    // Attempt initial connection to shifty.
    yield put(shiftyConnecting());
    let channel = yield call(initShiftyConnection);

    // Configure reconnection settings.
    let reconnecting = false;
    const initialReconnectDelay = 1000;
    const reconnectDelayIncrement = 1000;
    const reconnectDelayMax = 10000;
    let reconnectDelay = initialReconnectDelay;

    while (true) {
        // Take the action from the shifty channel and dispatch it.  This will
        // usually be a DUMPLING action, but may also be an update on the
        // connection status (used for handling reconnects).
        const action = yield take(channel);
        yield put(action);

        if (action.type === SHIFTY_DISCONNECTED) {
            // We lost our shifty connection so attempt to reconnect.
            // TODO: Are we leaving unwanted/dead channels doing this?
            reconnecting = true;
            console.log(
                `Attempting to reconnect to shifty in ${reconnectDelay} ms`);

            yield put(shiftyReconnectAttempt(reconnectDelay));
            yield call(delay, reconnectDelay);

            channel = yield call(initShiftyConnection);
            reconnectDelay += reconnectDelayIncrement;
            reconnectDelay = reconnectDelay > reconnectDelayMax ?
                reconnectDelayMax : reconnectDelay;
        } else if (action.type === SHIFTY_CONNECTED && reconnecting) {
            // We've successfully reconnected.
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