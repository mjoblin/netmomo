import React from 'react';
import { Route } from 'react-router-dom';
import { Switch, NavLink } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Layout, Menu, Icon } from 'antd';

import dnsLookupModule from 'AppRoot/modules/dnsLookup';
import homeModule from 'AppRoot/modules/home';
import packetCountModule from 'AppRoot/modules/packetCount';
import settingsModule from 'AppRoot/modules/settings';
import systemStatusModule from 'AppRoot/modules/systemStatus';
import history from 'AppRoot/services/history';

import styles from './styles';


const { Content, Footer, Sider } = Layout;


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
                <Layout style={{ height: '100vh' }}>
                    <Sider style={{ overflow: 'auto' }}>
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
                            <Menu.Item key="settings">
                                <NavLink to="/settings">Settings</NavLink>
                            </Menu.Item>
                        </Menu>
                    </Sider>

                    <Layout>
                        <Content style={{ margin: '2em' }}>
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
                                <Route
                                    path="/settings"
                                    component={settingsModule.components.Settings}
                                />
                            </Switch>
                        </Content>

                        <Footer>
                            footer
                        </Footer>
                    </Layout>
                </Layout>
            </ConnectedRouter>
        );
    }
}

export default App;
