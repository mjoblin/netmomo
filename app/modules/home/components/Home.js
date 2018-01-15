import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { ConnectionStatus } from 'AppRoot/components';
import appModule from 'AppRoot/modules/app';
import settingsModule from 'AppRoot/modules/settings';
import './style.scss';


export const Home = () => (
    <div className="home">
        <h1>Welcome to netmomo</h1>

        netmomo is a <a href="https://netdumplings.readthedocs.org">NetDumplings</a> dumpling
        eater. It shows you the contents of the dumplings collected from your network.

        <p />
        <div className="shifty-connection-status">
            Dumpling hub connection status: <ConnectionStatus />
        </div>
        <p />

        If you cannot connect to the dumpling hub then try changing
        the <NavLink to='/settings'>Settings.</NavLink>
    </div>
);

Home.propTypes = {
    shiftyConnected: PropTypes.bool.isRequired,
    settings: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    shiftyConnected: appModule.selectors.shiftyConnected(state),
    settings: settingsModule.selectors.getSettings(state),
});

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({
            shiftyConnect: appModule.actions.shiftyConnect,
            shiftyDisconnect: appModule.actions.shiftyDisconnect
        }, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
