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


const Settings = ({ settings, actions, shiftyConnectionStatus }) => {
    const shiftyConnected = appModule.constants.SHIFTY_CONNECTED;
    const shiftyDisconnected = appModule.constants.SHIFTY_DISCONNECTED;
    const shiftyReconnecting = appModule.constants.SHIFTY_RECONNECTING;

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
                <span className="label">Shifty location:</span>
                <Input
                    className="value value-shifty-host"
                    defaultValue={settings.shiftyHost}
                    onChange={e => actions.setShiftyHost(e.target.value)}
                />

                <span className="label">Port:</span>
                <InputNumber
                    className="value"
                    defaultValue={11348}
                    min={1}
                    max={65535}
                    onChange={e => typeof(e) === 'number' && actions.setShiftyPort(e)}
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
                <span className="label">Shifty connection status:</span>
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