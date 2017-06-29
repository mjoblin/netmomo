import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import appModule from 'AppRoot/modules/app';


class ConnectionStatus extends React.Component {
    render() {
        const statusColorMap = {};
        statusColorMap[appModule.constants.SHIFTY_CONNECTING] = '#D0D030';
        statusColorMap[appModule.constants.SHIFTY_CONNECTED] = '#30D030';
        statusColorMap[appModule.constants.SHIFTY_DISCONNECTED] = '#F03030';
        statusColorMap[appModule.constants.SHIFTY_RECONNECTING] = '#D0D030';

        return (
            <span>
                <span style={{ color: statusColorMap[this.props.shiftyConnectionStatus] }}>
                    { this.props.shiftyConnectionStatus }
                </span>
            </span>
        )
    }
}


ConnectionStatus.propTypes = {
    shiftyConnectionStatus: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    shiftyConnectionStatus: appModule.selectors.shiftyConnectionStatus(state),
});

export default connect(
    mapStateToProps,
)(ConnectionStatus);
