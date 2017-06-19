import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tabs } from 'antd';
import moment from 'moment';

import { getAsArray } from '../selectors';
import PacketCountTable from './PacketCountTable';
import PacketCountChart from './PacketCountChart';


const TabPane = Tabs.TabPane;

class PacketCount extends React.Component {
    constructor(...args) {
        super(...args);

        this.firstTime = true;

        this.state = {
            data: [{when: moment(), y: 0}]
        };
    }

    componentWillReceiveProps(nextProps) {
        /*
        if (this.firstTime) {
            this.setState({
                data: [
                    {when: moment(), y: nextProps.packetCounts.Ethernet}
                ]
            });
            this.firstTime = false;
        }

        let data2 = this.state.data;
        data2 = data2.slice(-5);

        this.setState({
            data: [
                ...data2,
                {when: moment(), y: nextProps.packetCounts.Ethernet}
            ]
        })
        */
    }

    render() {
        const packetCounts = this.props.packetCounts;

        return (
            <div>
                <h2>Packet counts</h2>

                <Tabs defaultActiveKey="packets_table" animated={false}>
                    <TabPane tab="Table" key="packets_table">
                        <PacketCountTable packetCounts={packetCounts} />
                    </TabPane>
                    <TabPane tab="Chart" key="packets_chart">
                        <PacketCountChart data={this.state.data} />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}


PacketCount.propTypes = {
    packetCounts: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    packetCounts: getAsArray(state)
});

export default connect(
    mapStateToProps,
)(PacketCount);

