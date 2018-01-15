import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment-duration-format';
import { Tabs } from 'antd';

import * as selectors from '../selectors';
import Eaters from './Eaters';
import Kitchens from './Kitchens';
import './style.scss';

const TabPane = Tabs.TabPane;


export const SystemStatus = ({ systemStatus }) => {
    return (
        <div className="system-status">
            <h2>System status</h2>
            <div className="summary">
                <span className="label">Dumpling hub uptime:</span>
                <span className="value">
                    { moment.duration(systemStatus.server_uptime, 'seconds').format(
                          'd [days], h [hrs], mm [mins], ss [secs]') }
                </span>
                <br />
                <span className="label">Dumplings in:</span>
                <span className="value">
                    { systemStatus.total_dumplings_in &&
                      systemStatus.total_dumplings_in.toLocaleString() }
                </span>
                <br />
                <span className="label">Dumplings out:</span>
                <span className="value">
                    { systemStatus.total_dumplings_out &&
                      systemStatus.total_dumplings_out.toLocaleString() }
                </span>
            </div>

            <Tabs defaultActiveKey="kitchens" animated={false}>
                <TabPane tab="Kitchens" key="kitchens">
                    <Kitchens kitchens={systemStatus.dumpling_kitchens} />
                </TabPane>
                <TabPane tab="Eaters" key="eaters">
                    <Eaters eaters={systemStatus.dumpling_eaters} />
                </TabPane>
            </Tabs>
        </div>
    );
};


SystemStatus.propTypes = {
    systemStatus: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    systemStatus: selectors.getSystemStatus(state),
});

export default connect(
    mapStateToProps
)(SystemStatus);

