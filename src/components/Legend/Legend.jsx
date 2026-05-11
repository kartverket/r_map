import React from "react";

/**
 * Legend to be used in MapComponent
 * @param {*} props
 */
const Legend = props => {
    return (<img src={props.legendUrl} alt={props.legendAlternative} />)
}

export default Legend;
