import React from "react";

const Legend = props => {
  // console.log(props.legendUrl);
  return (
    <div>
      <img src={props.legendUrl} alt="Legend" />
    </div>
  );
};

export default Legend;
