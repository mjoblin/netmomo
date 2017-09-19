import { createSelector } from 'reselect';
import { NAME } from './constants';


export const getARPArray = state => {
    return state[NAME].dumplingData;
};

export const getARP = createSelector(
    getARPArray,
    arp => arp
);
