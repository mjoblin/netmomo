import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { notification } from 'antd';

import appModule from 'AppRoot/modules/app';


export const Notifications = class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            connectedToHub: props.hubConnectionStatus ===
                appModule.constants.HUB_CONNECTED,
        };
    }

    componentWillReceiveProps(nextProps) {
        const connectedToHub = nextProps.hubConnectionStatus ===
            appModule.constants.HUB_CONNECTED;

        if (connectedToHub !== this.state.connectedToHub) {
            if (connectedToHub) {
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

            this.setState({ ...this.state, connectedToHub });
        }
    }

    render() {
        return (null);
    }
};

Notifications.displayName = 'Notifications';

Notifications.propTypes = {
    hubConnectionStatus: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    hubConnectionStatus: appModule.selectors.hubConnectionStatus(state),
});

export default connect(
    mapStateToProps
)(Notifications);

