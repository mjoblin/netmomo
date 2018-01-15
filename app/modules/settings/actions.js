import * as t from './actionTypes';


export const setHubHost = shiftyHost => ({
    type: t.SET_HUB_HOST,
    shiftyHost,
});

export const setHubPort = shiftyPort => ({
    type: t.SET_HUB_PORT,
    shiftyPort,
});
