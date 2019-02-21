import React, { useState } from "react";
import Legend from "./Legend";
import style from "./InlineLegend.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InlineLegend = props => {
  const [expanded, toggleExpand] = useState(false);
  const handleExpand = () => toggleExpand(!expanded);

  const legend = () => {
    if (props.legendUrl) {
      return (
        <div>
          <div className={style.toggle} onClick={() => handleExpand()}>
            <span className={style.label}>
              {expanded ? "Skjul tegnforklaring" : "Vis tegnforklaring"}{" "}
            </span>
            <FontAwesomeIcon icon={expanded ? ["fas", "angle-up"] : ["fas", "angle-down"]} />
          </div>
          <div className={ expanded ? style.legend : style.legend + " " + style.closed }>
            <Legend legendUrl={props.legendUrl} legendAlternative="Legend" />
          </div>
        </div>
      );
    } else {
      return "";
    }
  };

  return <div>{legend()}</div>;
};

export default InlineLegend;
