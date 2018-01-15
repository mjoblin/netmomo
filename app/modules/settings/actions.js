import * as t from './actionTypes';


export const setHubHost = hubHost => ({
    type: t.SET_HUB_HOST,
    hubHost,
});

export const setHubPort = hubPort => ({
    type: t.SET_HUB_PORT,
    hubPort,
});
