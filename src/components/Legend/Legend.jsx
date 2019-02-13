import React from "react";

const Legend = props => {
  if (props.legendUrl) {
    return (
      <div>
        <img src={props.legendUrl} alt="Legend" />
      </div>
    );
  } else {
    return <div />;
  }
};

export default Legend;
