import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment-duration-format';


const SystemStatus = ({ systemStatus }) => {
    const haveEaters =
        systemStatus.dumpling_eater_count && systemStatus.dumpling_eater_count >= 1;

    return (
        <div>
            <h2>System status</h2>
            uptime: { moment.duration(systemStatus.server_uptime, 'seconds').format(
                          'd [days], hh [hrs], mm [mins], ss [secs]') }
            <br />
            dumplings sent: { systemStatus.total_dumplings_sent.toLocaleString() }<br />
            kitchens: { systemStatus.dumpling_kitchen_count }<br />
            eaters: { systemStatus.dumpling_eater_count }<br />
            {
                haveEaters && systemStatus.dumpling_eaters.map(
                    eater => eater.info_from_eater.eater_name ).join(', ')
            }
        </div>
    );
};


SystemStatus.propTypes = {
    systemStatus: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    systemStatus: state.systemStatus,
});

export default connect(
    mapStateToProps,
)(SystemStatus);

