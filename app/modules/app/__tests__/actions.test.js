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

describe('app actions (hub)', () => {
    test('hubConnect', () => {
        const host = 'localhost';
        const port = 11348;

        const expectedAction = {
            type: actionTypes.HUB_CONNECT,
            host,
            port,
        };

        expect(actions.hubConnect(host, port)).toEqual(expectedAction);
    });

    test('hubDisconnect', () => {
        const expectedAction = {
            type: actionTypes.HUB_DISCONNECT,
        };

        expect(actions.hubDisconnect()).toEqual(expectedAction);
    });

    test('hubConnecting', () => {
        const expectedAction = {
            type: actionTypes.HUB_CONNECTING,
        };

        expect(actions.hubConnecting()).toEqual(expectedAction);
    });

    test('hubUnavailable', () => {
        const expectedAction = {
            type: actionTypes.HUB_UNAVAILABLE,
        };

        expect(actions.hubUnavailable()).toEqual(expectedAction);
    });

    test('hubConnected', () => {
        const expectedAction = {
            type: actionTypes.HUB_CONNECTED,
        };

        expect(actions.hubConnected()).toEqual(expectedAction);
    });

    test('hubDisconnected', () => {
        const expectedAction = {
            type: actionTypes.HUB_DISCONNECTED,
        };

        expect(actions.hubDisconnected()).toEqual(expectedAction);
    });

    test('hubError', () => {
        const error = 'test error';

        const expectedAction = {
            type: actionTypes.HUB_ERROR,
            error,
        };

        expect(actions.hubError(error)).toEqual(expectedAction);
    });

    test('hubCancelReconnect', () => {
        const expectedAction = {
            type: actionTypes.HUB_CANCEL_RECONNECT,
        };

        expect(actions.hubCancelReconnect()).toEqual(expectedAction);
    });

    test('hubReconnectAttempt', () => {
        const delay = 10;

        const expectedAction = {
            type: actionTypes.HUB_RECONNECT_ATTEMPT,
            delay,
        };

        expect(actions.hubReconnectAttempt(delay)).toEqual(expectedAction);
    });
});
