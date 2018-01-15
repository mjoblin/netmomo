import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { notification } from 'antd';

import appModule from 'AppRoot/modules/app';


export const Notifications = class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            connectedToShifty: props.shiftyConnectionStatus ===
                appModule.constants.SHIFTY_CONNECTED,
        };
    }

    componentWillReceiveProps(nextProps) {
        const connectedToShifty = nextProps.shiftyConnectionStatus ===
            appModule.constants.SHIFTY_CONNECTED;

        if (connectedToShifty !== this.state.connectedToShifty) {
            if (connectedToShifty) {
                notification.success({
                    message: 'Connected to dumpling hub',
                    description: 'The dumpling hub connection has been established.',
                });
            } else {
                notification.warning({
                    message: 'Disconnected from dumpling hub',
                    description: 'The connection to the dumpling hub has been lost.',
                });

            }

            this.setState({ ...this.state, connectedToShifty });
        }
    }

    render() {
        return (null);
    }
};

Notifications.displayName = 'Notifications';

Notifications.propTypes = {
    shiftyConnectionStatus: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    shiftyConnectionStatus: appModule.selectors.shiftyConnectionStatus(state),
});

export default connect(
    mapStateToProps
)(Notifications);

