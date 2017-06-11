import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory';
import moment from 'moment';


class PacketCount extends React.Component {
    constructor(...args) {
        super(...args);

        this.firstTime = true;

        this.state = {
            data: [{when: moment(), y: 0}]
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.firstTime) {
            this.setState({
                data: [
                    {when: moment(), y: nextProps.packetCount.Ethernet}
                ]
            });
            this.firstTime = false;
        }

        let data2 = this.state.data;
        data2 = data2.slice(-5);

        this.setState({
            data: [
                ...data2,
                {when: moment(), y: nextProps.packetCount.Ethernet}
            ]
        })
    }

    render() {
        const packetCount = this.props.packetCount;

        return (
            <div>
                <div>
                    <h2>Packet counts</h2>
                    <table>
                        {
                            Object.keys(packetCount).map(protocol => (
                                <tr key={protocol}>
                                    <td>{protocol}</td>
                                    <td>{packetCount[protocol].toLocaleString()}</td>
                                </tr>
                            ))
                        }
                    </table>
                </div>
                <div>
                    <VictoryChart
                        theme={VictoryTheme.material}
                        width={1400}
                        height={800}
                        padding={100}
                        animate={{duration: 500, onLoad: {duration: 1000}}}
                        easing="linear"
                    >
                        <VictoryLine
                            interpolation="linear"
                            data={this.state.data}
                            x={d => moment(d.when).format('hh:mm:ss')}
                            scale="log"
                        />
                    </VictoryChart>
                </div>
            </div>
        );
    }
}


PacketCount.propTypes = {
    packetCount: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    packetCount: state.packetCount,
});

export default connect(
    mapStateToProps,
)(PacketCount);

