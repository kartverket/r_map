import React, { useState } from "react";
import PropTypes from 'prop-types';
import Legend from "./Legend";
import style from "./InlineLegend.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InlineLegend = props => {
  const [expanded, toggleExpand] = useState(false);

  const legend = () => {
    if (props.legendUrl) {
      return (
        <>
          <div className={style.toggle} onClick={() => toggleExpand(!expanded)}>
            <span className={style.label}>
              {expanded ? "Skjul tegnforklaring" : "Vis tegnforklaring"}{" "}
            </span>
            <FontAwesomeIcon icon={expanded ? ["fas", "angle-up"] : ["fas", "angle-down"]} />
          </div>
          <div className={ expanded ? style.legend : style.legend + " " + style.closed }>
            <Legend legendUrl={props.legendUrl} legendAlternative="Legend" />
          </div>
        </>
      );
    } else {
      return "";
    }
  };

  return <div>{legend()}</div>;
};

InlineLegend.propTypes = {
  legendUrl: PropTypes.string
};

export default InlineLegend;
