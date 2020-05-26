import React from 'react'
import PropTypes from 'prop-types'

/**
 * Legend to be used in MapComponent
 * @param {*} props
 */
const Legend = props => {
  let width = ''
  if (props.legendSize && props.legendSize[0] > 400) {
    width = '100%'
  }
  return (<img src={ props.legendUrl } alt={ props.legendAlternative } style={ { width: width }}/>)
}

Legend.propTypes = {
  legendUrl: PropTypes.string.isRequired,
  legendAlternative: PropTypes.string
}

export default Legend
