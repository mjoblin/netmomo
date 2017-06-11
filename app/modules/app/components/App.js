import React from 'react';
import { Route } from 'react-router-dom';
import { Switch, NavLink } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Menu } from 'antd';

import dnsLookupModule from 'AppRoot/modules/dnsLookup';
import homeModule from 'AppRoot/modules/home';
import packetCountModule from 'AppRoot/modules/packetCount';
import systemStatusModule from 'AppRoot/modules/systemStatus';
import history from 'AppRoot/services/history';

import styles from './styles';


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentSelection: "home",
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.setState({
            currentSelection: e.key,
        });
    }

    render() {
        return (
            <ConnectedRouter history={history}>
                <div style={styles.app}>
                    <Menu
                        theme="dark"
                        mode="inline"
                        onClick={this.handleClick}
                        selectedKeys={[this.state.currentSelection]}
                    >
                        <Menu.Item key="home">
                            <NavLink to="/">Home</NavLink>
                        </Menu.Item>
                        <Menu.Item key="dns">
                            <NavLink to="/dnsLookup">DNS lookups</NavLink>
                        </Menu.Item>
                        <Menu.Item key="packets">
                            <NavLink to="/packetCount">Packet counts</NavLink>
                        </Menu.Item>
                        <Menu.Item key="status">
                            <NavLink to="/systemStatus">System status</NavLink>
                        </Menu.Item>
                    </Menu>

                    <div style={styles.activeModule}>
                        <Switch>
                            <Route
                                exact path="/"
                                component={homeModule.components.Home}
                            />
                            <Route
                                path="/dnsLookup"
                                component={dnsLookupModule.components.DNSLookup}
                            />
                            <Route
                                path="/packetCount"
                                component={packetCountModule.components.PacketCount}
                            />
                            <Route
                                path="/systemStatus"
                                component={systemStatusModule.components.SystemStatus}
                            />
                        </Switch>
                    </div>
                </div>
            </ConnectedRouter>
        );
    }
}

export default App;
