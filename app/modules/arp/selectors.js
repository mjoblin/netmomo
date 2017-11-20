import { createSelector } from 'reselect';
import { NAME } from './constants';


const getARPArray = state => {
    return state[NAME].dumplingData;
};

export const getARP = createSelector(
    getARPArray,
    arp => arp
);
