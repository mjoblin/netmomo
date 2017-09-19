import { createSelector } from 'reselect';
import { NAME } from './constants';


const applyHostFilter = (hosts, filterString) => {
    return hosts.filter(host => host.host.includes(filterString));
};

export const getDumplingData = state => {
    return state[NAME].dumplingData;
};

export const getHostFilter = state => {
    return state[NAME].hostFilter;
};

export const getDNSLookups = state => {
    // Convert entire DNS host/count object into an array of objects per host.
    const dnsLookups = getDumplingData(state);

    if (!dnsLookups || Object.keys(dnsLookups).length <= 0) {
        return [];
    }

    const allLookupsAsArray = Array.from(Object.keys(dnsLookups), host => {
        return {host, key: host, ...dnsLookups[host]};});

    // Reduce the array to the number of desired levels.
    const levelsToKeep = state[NAME].hostComponentLevels;

    if (levelsToKeep === 0) {
        return applyHostFilter(allLookupsAsArray, getHostFilter(state));
    }
    else {
        const reducedArray = allLookupsAsArray.reduce(
            (acc, val) => {
                // Convert host name into truncated host name based on number
                // of host component levels we want to view.
                const truncatedHost =
                    val.host.split('.').slice(-levelsToKeep).join('.');

                const existingTruncatedHostInfo = acc.find(
                    accItem => accItem.host === truncatedHost);

                if (existingTruncatedHostInfo) {
                    // We've already seen a host matching this truncated host
                    // name so we update its information.
                    existingTruncatedHostInfo.count += val.count;
                    if (val.latest > existingTruncatedHostInfo.latest) {
                        existingTruncatedHostInfo.latest = val.latest;
                    }
                } else {
                    // This is a new truncated host for us so we add it to our
                    // array with the truncated host name.
                    const newTruncatedHostInfo = Object.assign({}, val);
                    newTruncatedHostInfo.host = truncatedHost;
                    acc.push(newTruncatedHostInfo);
                }

                return acc;
            },
            []
        );

        return applyHostFilter(reducedArray, getHostFilter(state));
    }
};

export const getHostComponentLevels = state => state[NAME].hostComponentLevels;

export const getAsArray = createSelector(
    getDNSLookups,
    dnsLookups => dnsLookups
);

