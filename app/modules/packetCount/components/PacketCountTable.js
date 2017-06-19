import React from 'react';
import { Table } from 'antd';

import './style.css';


const PacketCountTable = ({ packetCounts }) => {
    const columns = [
        {
            title: 'Protocol',
            dataIndex: 'protocol',
            key: 'protocol',
            sorter: (a, b) => a.protocol.localeCompare(b.protocol),
            width: 100,
        },
        {
            title: 'Count',
            dataIndex: 'count',
            key: 'count',
            sorter: (a, b) => a.count - b.count,
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
            style={{paddingTop: '1em'}}
        />
    );
};


export default PacketCountTable;