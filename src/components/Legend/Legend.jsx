import React from "react";
import PropTypes from 'prop-types';

/**
 * Legend to be used in MapComponent
 * @param {*} props
 */
const Legend = props => {
    return (<img src={props.legendUrl} alt={props.legendAlternative} />)
}

Legend.propTypes = {
    legendUrl: PropTypes.string.isRequired,
    legendAlternative: PropTypes.string
};

export default Legend;
