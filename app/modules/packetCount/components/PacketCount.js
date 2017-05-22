import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const PacketCount = ({ packetCount }) => {
    return (
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
    );
};


PacketCount.propTypes = {
    packetCount: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    packetCount: state.packetCount,
});

export default connect(
    mapStateToProps,
)(PacketCount);

