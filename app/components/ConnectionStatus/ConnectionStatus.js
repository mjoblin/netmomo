import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Switch } from 'antd';

import appModule from 'AppRoot/modules/app';
import settingsModule from 'AppRoot/modules/settings';


class ConnectionStatus extends React.Component {
    render() {
        const { actions, settings } = this.props;

        return (
            <span>
                <Switch
                    checked={this.props.shiftyConnected}
                    onChange={
                        val => val ?
                            actions.shiftyConnect(settings.shiftyHost, settings.shiftyPort) :
                            actions.shiftyDisconnect()
                    }
                />
                <span> { this.props.shiftyConnectionStatus }</span>
            </span>
        );
    }
}


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
