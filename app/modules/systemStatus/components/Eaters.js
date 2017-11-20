import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';


export const Eaters = ({ eaters }) => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'eater_name',
        },
        {
            title: 'Host',
            dataIndex: 'host',
        },
        {
            title: 'Port',
            dataIndex: 'port',
        },
    ];

    return (
        <Table
            dataSource={eaters}
            columns={columns}
            pagination={false}
            rowKey={row => `${row.eater_name}_${row.host}_${row.port}`}
            size="middle"
        />
    );
};


Eaters.propTypes = {
    eaters: PropTypes.array.isRequired,
};

export default Eaters;
