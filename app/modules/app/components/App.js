import React from 'react';
import { Route } from 'react-router-dom';
import { Switch, NavLink } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import {List, ListItem} from 'material-ui/List';

import dnsLookupModule from 'AppRoot/modules/dnsLookup';
import homeModule from 'AppRoot/modules/home';
import packetCountModule from 'AppRoot/modules/packetCount';
import systemStatusModule from 'AppRoot/modules/systemStatus';
import history from 'AppRoot/services/history';

import styles from './styles';


const App = () => (
    <ConnectedRouter history={history}>
        <div style={styles.app}>
            <List>
                <ListItem
                    primaryText="Home"
                    containerElement={<NavLink to="/" />}
                />
                <ListItem
                    primaryText="DNS lookups"
                    containerElement={<NavLink to="/dnsLookup" />}
                />
                <ListItem
                    primaryText="Packet counts"
                    containerElement={<NavLink to="/packetCount" />}
                />
                <ListItem
                    primaryText="System status"
                    containerElement={<NavLink to="/systemStatus" />}
                />
            </List>

            <div style={styles.activeModule}>
                <Switch>
                    <Route exact path="/" component={homeModule.components.Home} />
                    <Route path="/dnsLookup" component={dnsLookupModule.components.DNSLookup} />
                    <Route path="/packetCount" component={packetCountModule.components.PacketCount} />
                    <Route path="/systemStatus" component={systemStatusModule.components.SystemStatus} />
                </Switch>
            </div>
        </div>
    </ConnectedRouter>
);

export default App;
