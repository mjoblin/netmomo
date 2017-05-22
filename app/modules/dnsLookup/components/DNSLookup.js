import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const DNSLookup = ({ dnsLookup }) => {
    return (
        <div>
            <h2>DNS lookups</h2>
            <table>
                {
                    Object.keys(dnsLookup).map(host => (
                        <tr key={host}>
                            <td>{host}</td>
                            <td>{dnsLookup[host].toLocaleString()}</td>
                        </tr>
                    ))
                }
            </table>
        </div>
    );
};


DNSLookup.propTypes = {
    dnsLookup: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    dnsLookup: state.dnsLookup,
});

export default connect(
    mapStateToProps,
)(DNSLookup);
