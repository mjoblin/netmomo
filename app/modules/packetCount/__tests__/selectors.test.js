import { getDumplingData, getPacketCounts, getProtocolFilter } from '../selectors';
import packetDumpling from './packetDumpling';


describe('packetCount selectors', () => {
    const testState = {
        packetCount: {
            dumplingData: packetDumpling.payload.packet_counts,
            protocolFilter: '',
        },
        anotherKey: 10,
    };

    test('getDumplingData', () => {
        expect(getDumplingData(testState)).toEqual(testState.packetCount.dumplingData);
    });

    test('getPacketCounts', () => {
        expect(getPacketCounts(testState)).toEqual([
            {
                protocol: 'ARP',
                key: 'ARP',
                count: 13,
            },
            {
                protocol: 'DNS',
                key: 'DNS',
                count: 24,
            },
            {
                protocol: 'Ethernet',
                key: 'Ethernet',
                count: 3509,
            },
            {
                protocol: 'TCP',
                key: 'TCP',
                count: 3093,
            },
            {
                protocol: 'UDP',
                key: 'UDP',
                count: 402,
            },
        ]);
    });

    test('getProtocolFilter', () => {
        expect(getProtocolFilter(testState)).toEqual('');
        testState.packetCount.protocolFilter = 'test_filter';
        expect(getProtocolFilter(testState)).toEqual('test_filter');
    });
});
