import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table } from 'antd';

import { getAsArray } from '../selectors';
import './style.less';


const DNSLookup = ({ dnsLookups }) => {
    const columns = [
        {
            title: 'Host',
            dataIndex: 'host',
            key: 'host',
            sorter: (a, b) => a.host.localeCompare(b.host),
        },
        {
            title: 'Count',
            dataIndex: 'count',
            key: 'count',
            sorter: (a, b) => a.count - b.count,
            className: 'column-count',
        },
        {
            title: 'Latest',
            dataIndex: 'latest',
            key: 'latest',
            sorter: (a, b) => a.latest - b.latest,
            render: (text, record, index) =>
                moment(text).format('MM/DD/YYYY, h:mm:ss a'),
        }
    ];

    return (
        <div>
            <h2>DNS lookups</h2>
            <Table
                dataSource={dnsLookups}
                columns={columns}
                pagination={false}
                size="middle"
            />
        </div>
    );
};


DNSLookup.propTypes = {
    dnsLookups: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    dnsLookups: getAsArray(state)
});

export default connect(
    mapStateToProps,
)(DNSLookup);
