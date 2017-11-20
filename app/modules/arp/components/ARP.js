import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table } from 'antd';

import { getARP } from '../selectors';
import './style.scss';


export const ARP = class extends React.Component {
    render() {
        const columns = [
            {
                title: 'Operation',
                dataIndex: 'operation',
            },
            {
                title: 'Source HW',
                dataIndex: 'src_hw',
            },
            {
                title: 'Source IP',
                dataIndex: 'src_ip',
            },
            {
                title: 'Dest HW',
                dataIndex: 'dst_hw',
            },
            {
                title: 'Dest IP',
                dataIndex: 'dst_ip',
            },
            {
                title: 'Notes',
                dataIndex: 'notes',
            },
            {
                title: 'When',
                dataIndex: 'time',
                sorter: (a, b) => a.time - b.time,
                render: (text, record) =>
                    moment.unix(record.time).format('MMMM DD YYYY, h:mm:ss a'),
            },
        ];

        return (
            <div className="arp">
                <h2>ARP</h2>

                <Table
                    className="results-table"
                    dataSource={this.props.arp}
                    columns={columns}
                    pagination={false}
                    size="middle"
                />
            </div>
        );
    }
};


ARP.propTypes = {
    arp: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    arp: getARP(state),
});


export default connect(
    mapStateToProps
)(ARP);
