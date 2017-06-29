import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Switch, NavLink } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Layout, Menu } from 'antd';

import { ConnectionStatus } from 'AppRoot/components';
import dnsLookupModule from 'AppRoot/modules/dnsLookup';
import homeModule from 'AppRoot/modules/home';
import packetCountModule from 'AppRoot/modules/packetCount';
import settingsModule from 'AppRoot/modules/settings';
import systemStatusModule from 'AppRoot/modules/systemStatus';
import history from 'AppRoot/services/history';
import dumplingImage from 'AppRoot/assets/dumpling_web.png';

import notificationModule from 'AppRoot/modules/notifications';
import styles from './styles';

const { Content, Sider } = Layout;
const { Notifications } = notificationModule.components;


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentSelection: "/",
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.setState({
            ...this.state,
            currentSelection: e.key,
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ...this.state,
            currentSelection: nextProps.routerPath,
        });
    }

    render() {
        return (
            <ConnectedRouter history={history}>
                <Layout style={{ height: '100vh' }}>
                    <Sider style={{ overflow: 'auto' }}>
                        <div style={styles.nettlerLogoContainer}>
                            <img src={dumplingImage} style={styles.nettlerLogoImage} />
                            <span style={styles.nettlerLogoText}>{"netmomo"}</span>
                        </div>

                        <Menu
                            theme="dark"
                            mode="inline"
                            onClick={this.handleClick}
                            selectedKeys={[this.state.currentSelection]}
                        >
                            <Menu.Item key="/">
                                <NavLink to="/">Home</NavLink>
                            </Menu.Item>
                            <Menu.Item key="/dnsLookup">
                                <NavLink to="/dnsLookup">DNS lookups</NavLink>
                            </Menu.Item>
                            <Menu.Item key="/packetCount">
                                <NavLink to="/packetCount">Packet counts</NavLink>
                            </Menu.Item>
                            <Menu.Item key="/systemStatus">
                                <NavLink to="/systemStatus">System status</NavLink>
                            </Menu.Item>
                            <Menu.Item key="/settings">
                                <NavLink to="/settings">Settings</NavLink>
                            </Menu.Item>
                        </Menu>

                        <div style={{ margin: '1em', position: 'absolute', bottom: 10 }} >
                            <ConnectionStatus />
                        </div>
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
                    </Layout>
                    
                    <Notifications />
                </Layout>
            </ConnectedRouter>
        );
    }
}

App.propTypes = {
    routerPath: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    routerPath: _.get(state, 'router.location.pathname', '/'),
});

export default connect(
    mapStateToProps,
)(App);
