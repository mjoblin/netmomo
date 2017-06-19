import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Dropdown, Icon, Input, Menu, Table } from 'antd';

import * as actionCreators from '../actions.js';
import { getAsArray, getHostComponentLevels } from '../selectors';
import './style.css';


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
            <div>
                <h2>DNS lookups</h2>

                <span>{"Host levels: "}</span>
                <Dropdown overlay={hostLevelsMenu} trigger={['click']}>
                    <Button>
                        {this.props.hostComponentLevels === 0 ?
                            'All' : this.props.hostComponentLevels}
                        <Icon type="down"/>
                    </Button>
                </Dropdown>

                <span>Host filter:</span>
                <Input
                    placeholder="Host filter"
                    onChange={e => this.handleHostFilterEntry(e)}
                    style={{ width: '20em' }}
                />

                <Table
                    dataSource={this.props.dnsLookups}
                    columns={columns}
                    pagination={false}
                    size="middle"
                    style={{paddingTop: '1em'}}
                />
            </div>
        );
    }
}


DNSLookup.propTypes = {
    dnsLookups: PropTypes.array.isRequired,
    hostComponentLevels: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
    dnsLookups: getAsArray(state),
    hostComponentLevels: getHostComponentLevels(state),
});

const mapDispatchToProps = dispatch => {
    return { actions: bindActionCreators(actionCreators, dispatch) }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DNSLookup);
