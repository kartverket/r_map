import React, { useState } from "react"
import PropTypes from "prop-types"
import Legend from "./Legend"
import { ExpandLess, ExpandMore } from "@material-ui/icons"
import style from "./InlineLegend.module.scss"
/**
 * Legend to be used in the ServicePanel
 * @param {*} props
 */
const InlineLegend = props => {
  const [expanded, toggleExpand] = useState(false)

  const legend = () => {
    if (props.legendUrl) {
      return (
        <>
          <div className={ style.toggle } onClick={ () => toggleExpand(!expanded) }>
            <span className={ style.label }>
              { expanded ? "Skjul tegnforklaring" : "Vis tegnforklaring" }{ " " }
            </span>
            { expanded ? <ExpandLess /> : <ExpandMore /> }
          </div>
          <div className={ expanded ? style.legend : style.legend + " " + style.closed }>
            <Legend legendSize={ props.legendSize ? props.legendSize : '' } legendUrl={ props.legendUrl } legendAlternative="Legend" />
          </div>
        </>
      )
    } else {
      return ""
    }
  }

  return <div>{ legend() }</div>
}

InlineLegend.propTypes = {
  legendUrl: PropTypes.string
}

export default InlineLegend
