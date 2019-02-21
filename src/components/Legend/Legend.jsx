import React from "react";
import style from "./Legend.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default class Legend extends React.Component {

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
    <div className={style.toggle} onClick={() => this.toggleExpand()}><span className={style.label}>{this.state.expanded ? 'Skjul tegnforklaring' : 'Vis tegnforklaring'} </span> <FontAwesomeIcon icon={this.state.expanded ? ["fas", "angle-up"] : ["fas", "angle-down"]} /></div>
    <div className={this.state.expanded ?  style.legend : style.legend + ' ' + style.closed }>
      <img src={this.props.legendUrl} alt="Legend" />
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