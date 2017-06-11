import React from 'react';
import PropTypes from 'prop-types';


const Eater = ({ info }) => {
    return (
        <tr>
            <td>{ info.info_from_eater.eater_name }</td>
            <td>{ info.info_from_shifty.host }</td>
            <td>{ info.info_from_shifty.port }</td>
        </tr>
    );
};


Eater.propTypes = {
    info: PropTypes.object.isRequired,
};

export default Eater;

