import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Dropdown, Icon, Input, Menu, Table } from 'antd';

import * as actionCreators from '../actions.js';
import { getAsArray, getHostComponentLevels } from '../selectors';
import './style.scss';


class DNSLookup extends React.Component {
    handlehostLevelSelection(e) {
        this.props.actions.setHostComponentLevels(Number(e.key));
    }

    handleHostFilterEntry(e) {
        this.props.actions.setHostFilter(e.target.value);
    }

    render() {
        const columns = [
            {
                title: 'Host',
                dataIndex: 'host',
                sorter: (a, b) => a.host.localeCompare(b.host),
            },
            {
                title: 'Count',
                dataIndex: 'count',
                sorter: (a, b) => a.count - b.count,
                className: 'column-count',
            },
            {
                title: 'Latest',
                dataIndex: 'latest',
                sorter: (a, b) => a.latest - b.latest,
                render: text =>
                    moment(text).format('MMMM DD YYYY, h:mm:ss a'),
            },
        ];

        const hostLevelsMenu = (
            <Menu onClick={e => this.handlehostLevelSelection(e)}>
                <Menu.Item key="0">All</Menu.Item>
                <Menu.Item key="1">1</Menu.Item>
                <Menu.Item key="2">2</Menu.Item>
                <Menu.Item key="3">3</Menu.Item>
                <Menu.Item key="4">4</Menu.Item>
            </Menu>
        );

        return (
            <div className="dns-lookup">
                <h2>DNS lookups</h2>

                <span className="label">{"Host levels: "}</span>
                <Dropdown overlay={hostLevelsMenu} trigger={['click']}>
                    <Button className="value">
                        {this.props.hostComponentLevels === 0 ?
                            'All' : this.props.hostComponentLevels}
                        <Icon type="down"/>
                    </Button>
                </Dropdown>

                <span className="label">Host filter:</span>
                <Input
                    className="value value-host-filter"
                    placeholder="Host filter"
                    onChange={e => this.handleHostFilterEntry(e)}
                />

                <Table
                    className="results-table"
                    dataSource={this.props.dnsLookups}
                    columns={columns}
                    pagination={false}
                    size="middle"
                />
            </div>
        );
    }
}


DNSLookup.propTypes = {
    actions: PropTypes.array.isRequired,
    dnsLookups: PropTypes.array.isRequired,
    hostComponentLevels: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
    dnsLookups: getAsArray(state),
    hostComponentLevels: getHostComponentLevels(state),
});

const mapDispatchToProps = dispatch => {
    return { actions: bindActionCreators(actionCreators, dispatch) };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DNSLookup);
