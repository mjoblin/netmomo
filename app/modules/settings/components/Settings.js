import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, InputNumber, Button } from 'antd';

import ConnectionStatus from 'AppRoot/components/ConnectionStatus';
import appModule from 'AppRoot/modules/app';

import * as actionCreators from '../actions.js';
import { getSettings } from '../selectors';


const Settings = ({ settings, actions, shiftyConnectionStatus }) => {
    return (
        <div>
            <h2>Settings</h2>

            <span>Shifty location:</span>
            <Input
                defaultValue={settings.shiftyHost}
                style={{ width: '15em' }}
            />

            <span>Port:</span>
            <InputNumber
                defaultValue={settings.shiftyPort}
                min={1}
                max={65535}
            />
            <Button
                type="primary"
                disabled={
                    shiftyConnectionStatus !== appModule.constants.SHIFTY_CONNECTED &&
                    shiftyConnectionStatus !== appModule.constants.SHIFTY_DISCONNECTED
                }
            >
                {
                    shiftyConnectionStatus === appModule.constants.SHIFTY_CONNECTED ?
                        'Disconnect' : 'Connect'
                }
            </Button>


            <p/>

            <ConnectionStatus />
        </div>
    )
};

Settings.propTypes = {
    settings: PropTypes.object.isRequired,
    shiftyConnectionStatus: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    settings: getSettings(state),
    shiftyConnectionStatus: appModule.selectors.shiftyConnectionStatus(state),
});

const mapDispatchToProps = dispatch => {
    return { actions: bindActionCreators(actionCreators, dispatch) }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Settings);