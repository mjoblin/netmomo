import { getAsArray, getDNSLookups, getDumplingData, getHostComponentLevels,
    getHostFilter } from '../selectors';
import intervalDumpling from './intervalDumpling';


describe('dnsLookup selectors', () => {
    let testState = {
        dnsLookup: {
            dumplingData: intervalDumpling.payload.lookups_seen,
            hostComponentLevels: 0,
            hostFilter: '',
        },
        anotherKey: 10,
    };

    // The intervalDumpling JSON converted into an array for display, assuming
    // no filtering or level selection (i.e. everything from the JSON).
    let intervalDataProcessed = [
        {
            "count": 2,
            "host": "10.foo-bar.someplacea.com",
            "key": "10.foo-bar.someplacea.com",
            "latest": 1509932219.2742
        },
        {
            "count": 2,
            "host": "11.foo-bar.someplacea.com",
            "key": "11.foo-bar.someplacea.com",
            "latest": 1509932340.4321
        },
        {
            "count": 4,
            "host": "host.someplacea.com",
            "key": "host.someplacea.com",
            "latest": 1509932435.8489
        },
        {
            "count": 2,
            "host": "d13-c12.b11.a10.someplaceb.net",
            "key": "d13-c12.b11.a10.someplaceb.net",
            "latest": 1509932240.421
        },
        {
            "count": 2,
            "host": "foo-bar.baz.a01.b02.someplaceb.net",
            "key": "foo-bar.baz.a01.b02.someplaceb.net",
            "latest": 1509932412.5508
        },
        {
            "count": 100,
            "host": "one.two.com",
            "key": "one.two.com",
            "latest": 1509932429.334
        },
        {
            "count": 2,
            "host": "one-two.three-four.five.six.net",
            "key": "one-two.three-four.five.six.net",
            "latest": 1509932402.265
        },
        {
            "count": 2,
            "host": "local",
            "key": "local",
            "latest": 1509932220.684
        },
        {
            "count": 4,
            "host": "test.site.com",
            "key": "test.site.com",
            "latest": 1509932368.142
        },
        {
            "count": 2,
            "host": "one.two.three.com",
            "key": "one.two.three.com",
            "latest": 1509932218.175
        }
    ];

    test('getDNSLookups', () => {
        expect(getDNSLookups(testState)).toEqual(intervalDataProcessed);
    });

    test('getAsArray', () => {
    });

    test('getDumplingData', () => {
        expect(getDumplingData(testState))
            .toEqual({ ...testState.dnsLookup.dumplingData });
    });

    test('getHostComponentLevels', () => {
        expect(getHostComponentLevels(testState)).toEqual(0);
        testState.dnsLookup.hostComponentLevels = 1;
        expect(getHostComponentLevels(testState)).toEqual(1);
    });

    // The previous test has chosen to view only 1 level of DNS lookup results
    // (i.e. just com, net, and local) so let's see if the results match what
    // we expect.
    test('getDNSLookups after setting hostComponentLevels', () => {
        expect(getDNSLookups(testState)).toEqual(
            [
                {
                    "count": 114,
                    "host": "com",
                    "key": "10.foo-bar.someplacea.com",
                    "latest": 1509932435.8489
                },
                {
                    "count": 6,
                    "host": "net",
                    "key": "d13-c12.b11.a10.someplaceb.net",
                    "latest": 1509932412.5508
                },
                {
                    "count": 2,
                    "host": "local",
                    "key": "local",
                    "latest": 1509932220.684
                }
            ]
        );
    });

    test('getHostFilter', () => {
        expect(getHostFilter(testState)).toEqual('');
        testState.dnsLookup.hostFilter = 'local';
        expect(getHostFilter(testState)).toEqual('local');
    });

    // The previous test enabled a host filter of 'local' which, given our
    // levels of 1, should result in only one result.
    const singleResult = [
        {
            "count": 2,
            "host": "local",
            "key": "local",
            "latest": 1509932220.684
        }
    ];

    test('getDNSLookups after setting hostFilter to local', () => {
        expect(getDNSLookups(testState)).toEqual(singleResult);
    });

    // Additional partial matches should produce the same result.
    test('getDNSLookups after setting hostFilter to local', () => {
        testState.dnsLookup.hostFilter = 'loca';
        expect(getDNSLookups(testState)).toEqual(singleResult);
    });

    test('getDNSLookups after setting hostFilter to local', () => {
        testState.dnsLookup.hostFilter = 'ocal';
        expect(getDNSLookups(testState)).toEqual(singleResult);
    });

    // Now check for a filter which will match nothing.
    test('getDNSLookups after setting hostFilter to local', () => {
        testState.dnsLookup.hostFilter = 'this_matches_nothing';
        expect(getDNSLookups(testState)).toEqual([]);
    });
});
