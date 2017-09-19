import { createSelector } from 'reselect';
import { NAME } from './constants';


export const getFlattenedStatus = state => {
    const status = state[NAME];

    // Flatten the kitchen and eater information to eliminate the
    // 'info_from_shifty' and 'info_from_kitchen/eater' keys.
    const flattenedStatus = { ...status };

    flattenedStatus.dumpling_kitchens = status.dumpling_kitchens.map(
        kitchen => ({ ...kitchen.info_from_shifty, ...kitchen.info_from_kitchen })
    );

    flattenedStatus.dumpling_eaters = status.dumpling_eaters.map(
        eater => ({ ...eater.info_from_shifty, ...eater.info_from_eater })
    );

    return flattenedStatus;
};

export const getSystemStatus = createSelector(
    getFlattenedStatus,
    status => status
);

