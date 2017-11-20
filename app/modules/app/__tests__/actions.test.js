import * as actions from '../actions';
import * as actionTypes from '../actionTypes';
import arpPacketDumpling from './arpPacketDumpling.json';


describe('app actions (general)', () => {
    test('newDumpling', () => {
        const dumpling = arpPacketDumpling;

        const expectedAction = {
            type: actionTypes.DUMPLING,
            dumpling,
        };

        expect(actions.newDumpling(dumpling)).toEqual(expectedAction);
    });
});

describe('app actions (shifty)', () => {
    test('shiftyConnect', () => {
        const host = 'localhost';
        const port = 11348;

        const expectedAction = {
            type: actionTypes.SHIFTY_CONNECT,
            host,
            port,
        };

        expect(actions.shiftyConnect(host, port)).toEqual(expectedAction);
    });

    test('shiftyDisconnect', () => {
        const expectedAction = {
            type: actionTypes.SHIFTY_DISCONNECT,
        };

        expect(actions.shiftyDisconnect()).toEqual(expectedAction);
    });

    test('shiftyConnecting', () => {
        const expectedAction = {
            type: actionTypes.SHIFTY_CONNECTING,
        };

        expect(actions.shiftyConnecting()).toEqual(expectedAction);
    });

    test('shiftyUnavailable', () => {
        const expectedAction = {
            type: actionTypes.SHIFTY_UNAVAILABLE,
        };

        expect(actions.shiftyUnavailable()).toEqual(expectedAction);
    });

    test('shiftyConnected', () => {
        const expectedAction = {
            type: actionTypes.SHIFTY_CONNECTED,
        };

        expect(actions.shiftyConnected()).toEqual(expectedAction);
    });

    test('shiftyDisconnected', () => {
        const expectedAction = {
            type: actionTypes.SHIFTY_DISCONNECTED,
        };

        expect(actions.shiftyDisconnected()).toEqual(expectedAction);
    });

    test('shiftyError', () => {
        const error = 'test error';

        const expectedAction = {
            type: actionTypes.SHIFTY_ERROR,
            error,
        };

        expect(actions.shiftyError(error)).toEqual(expectedAction);
    });

    test('shiftyCancelReconnect', () => {
        const expectedAction = {
            type: actionTypes.SHIFTY_CANCEL_RECONNECT,
        };

        expect(actions.shiftyCancelReconnect()).toEqual(expectedAction);
    });

    test('shiftyReconnectAttempt', () => {
        const delay = 10;

        const expectedAction = {
            type: actionTypes.SHIFTY_RECONNECT_ATTEMPT,
            delay,
        };

        expect(actions.shiftyReconnectAttempt(delay)).toEqual(expectedAction);
    });
});
