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


export const Settings = ({ settings, actions, shiftyConnectionStatus }) => {
    const shiftyConnected = appModule.constants.HUB_CONNECTED;
    const shiftyDisconnected = appModule.constants.HUB_DISCONNECTED;
    const shiftyReconnecting = appModule.constants.HUB_RECONNECTING;

    let shiftyActionButtonText, shiftyActionButtonClickHandler;

    if (shiftyConnectionStatus === shiftyConnected) {
        shiftyActionButtonText = 'Disconnect';
        shiftyActionButtonClickHandler = actions.shiftyDisconnect;
    } else if (shiftyConnectionStatus === shiftyReconnecting) {
        shiftyActionButtonText = 'Cancel Reconnect';
        shiftyActionButtonClickHandler = actions.shiftyCancelReconnect;
    } else  {
        shiftyActionButtonText = 'Connect';
        shiftyActionButtonClickHandler =
            () => { actions.shiftyConnect(settings.shiftyHost, settings.shiftyPort); };
    }

    return (
        <div className="settings">
            <h2>Settings</h2>

            <div>
                <span className="label">Dumpling hub host:</span>
                <Input
                    className="value value-hub-host"
                    defaultValue={settings.shiftyHost}
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
                    onClick={shiftyActionButtonClickHandler}
                    disabled={
                        shiftyConnectionStatus !== shiftyConnected &&
                        shiftyConnectionStatus !== shiftyDisconnected &&
                        shiftyConnectionStatus !== shiftyReconnecting
                    }
                >
                    {shiftyActionButtonText}
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
    shiftyConnectionStatus: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    settings: getSettings(state),
    shiftyConnectionStatus: appModule.selectors.shiftyConnectionStatus(state),
});

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({
            ...actionCreators,
            shiftyConnect: appModule.actions.shiftyConnect,
            shiftyDisconnect: appModule.actions.shiftyDisconnect,
            shiftyCancelReconnect: appModule.actions.shiftyCancelReconnect,
        }, dispatch)
    };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings);