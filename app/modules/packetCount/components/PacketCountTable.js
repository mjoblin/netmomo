import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';


export const PacketCountTable = ({ packetCounts }) => {
    const columns = [
        {
            title: 'Protocol',
            dataIndex: 'protocol',
            key: 'protocol',
            sorter: (a, b) => a.protocol.localeCompare(b.protocol),
        },
        {
            title: 'Count',
            dataIndex: 'count',
            key: 'count',
            sorter: (a, b) => a.count - b.count,
            render: text => text.toLocaleString(),
            className: 'column-count',
            width: 100,
        },
    ];

    return (
        <Table
            dataSource={packetCounts}
            columns={columns}
            pagination={false}
            size="middle"
        />
    );
};


PacketCountTable.propTypes = {
    packetCounts: PropTypes.object.isRequired,
};


export default PacketCountTable;
