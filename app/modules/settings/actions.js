import * as t from './actionTypes';


export const setShiftyHost = shiftyHost => ({
    type: t.SET_SHIFTY_HOST,
    shiftyHost,
});

export const setShiftyPort = shiftyPort => ({
    type: t.SET_SHIFTY_PORT,
    shiftyPort,
});
