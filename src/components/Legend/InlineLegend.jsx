import React from "react";
import Legend from './Legend';
import style from "./InlineLegend.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class InlineLegend extends React.Component {

constructor(props) {
  super(props);
  this.state = {
    expanded: false
  };
}
toggleExpand() {
  this.setState(prevState => ({
    expanded: !prevState.expanded
  }));
}

legend() {

  if (this.props.legendUrl) {
  return (
    <div>
    <div className={style.toggle} onClick={() => this.toggleExpand()}>
        <span className={style.label}>{this.state.expanded ? 'Skjul tegnforklaring' : 'Vis tegnforklaring'} </span>
        <FontAwesomeIcon icon={this.state.expanded ? ["fas", "angle-up"] : ["fas", "angle-down"]} />
    </div>
    <div className={this.state.expanded ?  style.legend : style.legend + ' ' + style.closed }>
        <Legend legendUrl={this.props.legendUrl} legendAlternative="Legend" />
    </div>
  </div>
  );
  } else {
    return "";
  }
}
render() {
  return <div>{this.legend()}</div>
}
}
