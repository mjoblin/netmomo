import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, InputNumber, Button } from 'antd';

import ConnectionStatus from 'AppRoot/components/ConnectionStatus';
import appModule from 'AppRoot/modules/app';

import * as actionCreators from '../actions.js';
import { getSettings } from '../selectors';
import './style.scss';


export const Settings = ({ settings, actions, hubConnectionStatus }) => {
    const hubConnected = appModule.constants.HUB_CONNECTED;
    const hubDisconnected = appModule.constants.HUB_DISCONNECTED;
    const hubReconnecting = appModule.constants.HUB_RECONNECTING;

    let hubActionButtonText, hubActionButtonClickHandler;

    if (hubConnectionStatus === hubConnected) {
        hubActionButtonText = 'Disconnect';
        hubActionButtonClickHandler = actions.hubDisconnect;
    } else if (hubConnectionStatus === hubReconnecting) {
        hubActionButtonText = 'Cancel Reconnect';
        hubActionButtonClickHandler = actions.hubCancelReconnect;
    } else  {
        hubActionButtonText = 'Connect';
        hubActionButtonClickHandler =
            () => { actions.hubConnect(settings.hubHost, settings.hubPort); };
    }

    return (
        <div className="settings">
            <h2>Settings</h2>

            <div>
                <span className="label">Dumpling hub host:</span>
                <Input
                    className="value value-hub-host"
                    defaultValue={settings.hubHost}
                    onChange={e => actions.setHubHost(e.target.value)}
                />

                <span className="label">port:</span>
                <InputNumber
                    className="value"
                    defaultValue={11348}
                    min={1}
                    max={65535}
                    onChange={e => typeof(e) === 'number' && actions.setHubPort(e)}
                />
                <Button
                    type="primary"
                    onClick={hubActionButtonClickHandler}
                    disabled={
                        hubConnectionStatus !== hubConnected &&
                        hubConnectionStatus !== hubDisconnected &&
                        hubConnectionStatus !== hubReconnecting
                    }
                >
                    {hubActionButtonText}
                </Button>
            </div>

            <div>
                <span className="label">Dumpling hub connection status:</span>
                <ConnectionStatus className="value" />
            </div>
        </div>
    );
};

Settings.propTypes = {
    actions: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    hubConnectionStatus: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    settings: getSettings(state),
    hubConnectionStatus: appModule.selectors.hubConnectionStatus(state),
});

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({
            ...actionCreators,
            hubConnect: appModule.actions.hubConnect,
            hubDisconnect: appModule.actions.hubDisconnect,
            hubCancelReconnect: appModule.actions.hubCancelReconnect,
        }, dispatch)
    };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings);