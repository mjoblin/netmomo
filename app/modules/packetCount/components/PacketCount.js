import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tabs } from 'antd';

import { getAsArray } from '../selectors';
import PacketCountTable from './PacketCountTable';
import PacketCountChart from './PacketCountChart';
import './style.scss';


const TabPane = Tabs.TabPane;

class PacketCount extends React.Component {
    constructor(...args) {
        super(...args);

        this.firstTime = true;

        this.state = {
            data: [],
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.packetCounts) {
            this.setState({
                data: nextProps.packetCounts.map(protocol => {
                    return {
                        x: protocol.protocol,
                        y: protocol.count,
                        width: 50
                    };
                }),
            });
        }
    }

    render() {
        const packetCounts = this.props.packetCounts;

        return (
            <div className="packet-count">
                <h2>Packet counts</h2>

                <Tabs defaultActiveKey="packets_table" animated={false}>
                    <TabPane tab="Table" key="packets_table">
                        <PacketCountTable packetCounts={packetCounts} />
                    </TabPane>
                    <TabPane tab="Chart" key="packets_chart" >
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
    mapStateToProps
)(PacketCount);

