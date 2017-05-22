import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import appModule from './app';
import dnsLookupModule from './dnsLookup';
import packetCountModule from './packetCount';
import systemStatusModule from './systemStatus';


const rootReducer = combineReducers({
    app: appModule.reducer,
    dnsLookup: dnsLookupModule.reducer,
    packetCount: packetCountModule.reducer,
    router: routerReducer,
    systemStatus: systemStatusModule.reducer,
});

export default rootReducer;
