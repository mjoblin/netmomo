import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment-duration-format';

import Eater from './Eater';
import Kitchens from './Kitchens';


const SystemStatus = ({ systemStatus }) => {
    return (
        <div>
            <h2>System status</h2>
            uptime: { moment.duration(systemStatus.server_uptime, 'seconds').format(
                          'd [days], hh [hrs], mm [mins], ss [secs]') }
            <br />
            dumplings sent: { systemStatus.total_dumplings_sent.toLocaleString() }<br />

            <h3>Kitchens</h3>
            <Kitchens kitchens={systemStatus.dumpling_kitchens} />

            <h3>Eaters</h3>
            <table>
                <thead>
                    <tr>
                        <th>Eater</th>
                        <th>Host</th>
                        <th>Port</th>
                    </tr>
                </thead>
                <tbody>
                {
                    systemStatus.dumpling_eaters.map(eater => {
                        const key = `${eater.info_from_eater.eater_name}_` +
                                    `${eater.info_from_shifty.host}_` +
                                    `${eater.info_from_shifty.port}`;
                        return <Eater key={key} info={eater} />;
                    })
                }
                </tbody>
            </table>
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

