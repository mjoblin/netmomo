import React from 'react';
import PropTypes from 'prop-types';


const Kitchens = ({ kitchens }) => {
    return (
        <div>
            kitchens yo
        </div>
    );
};


Kitchens.propTypes = {
    kitchens: PropTypes.array.isRequired,
};

export default Kitchens;

