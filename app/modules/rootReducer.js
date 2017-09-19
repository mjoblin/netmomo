import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import appModule from './app';
import arpModule from './arp';
import dnsLookupModule from './dnsLookup';
import packetCountModule from './packetCount';
import settingsModule from './settings';
import systemStatusModule from './systemStatus';


const rootReducer = combineReducers({
    app: appModule.reducer,
    arp: arpModule.reducer,
    dnsLookup: dnsLookupModule.reducer,
    packetCount: packetCountModule.reducer,
    router: routerReducer,
    settings: settingsModule.reducer,
    systemStatus: systemStatusModule.reducer,
});

export default rootReducer;
