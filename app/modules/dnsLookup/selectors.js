import { createSelector } from 'reselect';
import { NAME } from './constants';


export const getDNSLookups = state => state[NAME];

export const getAsArray = createSelector(
    getDNSLookups,
    dnsLookups => Array.from(
        Object.keys(dnsLookups), host => {return {host, ...dnsLookups[host]};})
);