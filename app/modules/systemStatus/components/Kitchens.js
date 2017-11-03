import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';


export const Kitchens = ({ kitchens }) => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'kitchen_name',
        },
        {
            title: 'Host',
            dataIndex: 'host',
        },
        {
            title: 'Port',
            dataIndex: 'port',
        },
        {
            title: 'Interface',
            dataIndex: 'interface',
        },
        {
            title: 'Filter',
            dataIndex: 'filter',
        },
        {
            title: 'Poke (secs)',
            dataIndex: 'poke_interval',
        },
        {
            title: 'Chefs',
            dataIndex: 'chefs',
            render: chefs => chefs.map(
                chef => <span key={chef}>{chef}<br /></span>),
        },
    ];

    return (
        <Table
            dataSource={kitchens}
            columns={columns}
            pagination={false}
            rowKey={row => `${row.kitchen_name}_${row.host}_${row.port}`}
            size="middle"
        />
    );
};


Kitchens.propTypes = {
    kitchens: PropTypes.array.isRequired,
};

export default Kitchens;

