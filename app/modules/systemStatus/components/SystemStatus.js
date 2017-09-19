import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment-duration-format';
import { Tabs } from 'antd';

import * as selectors from '../selectors';
import Eaters from './Eaters';
import Kitchens from './Kitchens';

const TabPane = Tabs.TabPane;


const SystemStatus = ({ systemStatus }) => {
    return (
        <div>
            <h2>System status</h2>
            uptime: { moment.duration(systemStatus.server_uptime, 'seconds').format(
                          'd [days], h [hrs], mm [mins], ss [secs]') }
            <br />
            dumplings sent: { systemStatus.total_dumplings_sent.toLocaleString() }<br />

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

