import { createSelector } from 'reselect';
import { NAME } from './constants';


export const getDumplingData = state => {
    return state[NAME].dumplingData;
};

export const getProtocolFilter = state => {
    return state[NAME].protocolFilter;
};

export const getPacketCounts = state => {
    return Array.from(Object.keys(getDumplingData(state)),
        protocol => ({ protocol, count: state[NAME].dumplingData[protocol] }));
};

export const getAsArray = createSelector(
    getPacketCounts,
    packetCounts => packetCounts
);

