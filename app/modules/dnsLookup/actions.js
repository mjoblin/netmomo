import * as t from './actionTypes';


export const setHostComponentLevels = hostComponentLevels => ({
    type: t.SET_HOST_COMPONENT_LEVELS,
    hostComponentLevels,
});

export const setHostFilter = hostFilter => ({
    type: t.SET_HOST_FILTER,
    hostFilter,
});
