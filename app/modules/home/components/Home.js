import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Switch } from 'antd';

import appModule from 'AppRoot/modules/app';
import settingsModule from 'AppRoot/modules/settings';


const Home = ({ actions, shiftyConnected, settings }) => (
    <div>
        <h1>Welcome to netmomo</h1>
        netmomo is a <a href="https://netdumplings.readthedocs.org">NetDumplings</a> dumpling
        eater. It shows you the contents of the dumplings collected from your
        network.

        <p />
        Connect to shifty:
        <Switch
            checked={shiftyConnected}
            onChange={
                val => val ? actions.shiftyConnect(settings.shiftyHost, settings.shiftyPort) : actions.shiftyDisconnect()}
        />
        <p />
        If you cannot connect to shifty then go to <NavLink to='/settings'>Settings.</NavLink>
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
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home);