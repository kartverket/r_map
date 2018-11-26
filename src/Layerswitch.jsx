import React, { Component } from "react";
import { map, eventHandler } from "./maplibHelper";
import { Radio } from "antd";

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
class Layerswitch extends Component {
  constructor(props) {
    super(props);
    this.state = { baseLayers: [] };
    eventHandler.RegisterEvent("MapLoaded", () =>
      this.setState({ baseLayers: map.GetBaseLayers() })
    );
  }
  setAsBaseLayer=(e) =>{
    let baseLayer = e.target.value
    map.SetBaseLayer(baseLayer);
    map.ZoomToLayer(baseLayer);
    this.setState({value: e.target.value });
  }
  renderBaseLayers(baseLayers) {
    const radioStyle = { display: "block", height: "30px", lineHeight: "30px" };
    return baseLayers.map(function(baseLayer, index) {
      return <RadioButton style={radioStyle} key={index} value={baseLayer}>
          {baseLayer.name}
      </RadioButton>;
    });
  }
  render() {

    return <RadioGroup onChange={this.setAsBaseLayer} value={this.state.value}>
        {this.renderBaseLayers(this.state.baseLayers)}
      </RadioGroup>;
  }
}

export default Layerswitch;
