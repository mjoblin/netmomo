import { getSystemStatus } from '../selectors';
import intervalDumpling from './intervalDumpling';


describe('systemStatus selectors', () => {
    const testState = {
        systemStatus: intervalDumpling.payload,
        anotherKey: 10,
    };

    test('getSystemStatus', () => {
        expect(getSystemStatus(testState)).toEqual({
            'dumpling_eater_count': 2,
            'dumpling_eaters': [
                {
                    'eater_name': 'netmomo',
                    'host': '::1',
                    'port': 58725,
                },
                {
                    'eater_name': 'dumplingprinter',
                    'host': '::1',
                    'port': 58897,
                },
            ],
            'dumpling_kitchen_count': 1,
            'dumpling_kitchens': [
                {
                    'chefs': [
                        'netdumplings.dumplingchefs.ARPChef',
                        'netdumplings.dumplingchefs.DNSLookupChef',
                        'netdumplings.dumplingchefs.PacketCountChef',
                    ],
                    'filter': 'tcp or icmp or udp or arp',
                    'interface': 'en0',
                    'kitchen_name': 'default_kitchen',
                    'poke_interval': 5,
                    'host': '::1',
                    'port': 58872,
                },
            ],
            'server_uptime': 295.175053,
            'total_dumplings_sent': 383,
        });
    });
});
