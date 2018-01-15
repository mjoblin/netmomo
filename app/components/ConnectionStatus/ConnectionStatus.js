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
                    checked={this.props.hubConnected}
                    onChange={
                        val => val ?
                            actions.hubConnect(settings.hubHost, settings.hubPort) :
                            actions.hubDisconnect()
                    }
                />
                <span className="status-text">
                    { this.props.hubConnectionStatus }
                </span>
            </span>
        );
    }
};

ConnectionStatus.displayName = 'ConnectionStatus';

ConnectionStatus.propTypes = {
    hubConnectionStatus: PropTypes.string.isRequired,
    hubConnected: PropTypes.bool.isRequired,
    settings: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    hubConnectionStatus: appModule.selectors.hubConnectionStatus(state),
    hubConnected: appModule.selectors.hubConnected(state),
    settings: settingsModule.selectors.getSettings(state),
});

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({
            hubConnect: appModule.actions.hubConnect,
            hubDisconnect: appModule.actions.hubDisconnect
        }, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectionStatus);
