import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Switch } from 'antd';

import appModule from 'AppRoot/modules/app';
import settingsModule from 'AppRoot/modules/settings';
import './style.scss';


export const ConnectionStatus = class extends React.Component {
    render() {
        const { actions, settings } = this.props;

        return (
            <span className="connection-status">
                <Switch
                    checked={this.props.shiftyConnected}
                    onChange={
                        val => val ?
                            actions.shiftyConnect(settings.shiftyHost, settings.shiftyPort) :
                            actions.shiftyDisconnect()
                    }
                />
                <span className="status-text">
                    { this.props.shiftyConnectionStatus }
                </span>
            </span>
        );
    }
};

ConnectionStatus.displayName = 'ConnectionStatus';

ConnectionStatus.propTypes = {
    shiftyConnectionStatus: PropTypes.string.isRequired,
    shiftyConnected: PropTypes.bool.isRequired,
    settings: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    shiftyConnectionStatus: appModule.selectors.shiftyConnectionStatus(state),
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
)(ConnectionStatus);
