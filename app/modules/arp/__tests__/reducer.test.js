import reducer from '../reducer';


const defaultState = {
    dumplingData: [],
};

const testARPDumpling = {
    metadata: {
        chef: 'ARPChef',
    },
    payload: {
        dst_hw: "01:01:01:01:01:01",
        dst_ip: "192.168.1.1",
        notes: "source device is new",
        operation: "reply",
        src_hw: "02:02:02:02:02:02",
        src_ip: "192.168.1.2",
        time: 1508700000.111111,
    }
};

describe('arp reducer', () => {
    test('initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual(defaultState);
    });

    test('app/DUMPLING action', () => {
        expect(
            reducer(defaultState, {
                type: 'app/DUMPLING',
                dumpling: testARPDumpling,
            })
        ).toEqual({
            dumplingData: [{
                key: '02:02:02:02:02:02_01:01:01:01:01:01_1508700000.111111',
                ...testARPDumpling.payload,
            }],
        });
    });
});