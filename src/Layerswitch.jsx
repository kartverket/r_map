import React, { Component } from "react";
import { map, eventHandler } from "./maplibHelper";
import { Radio } from "antd";

const RadioGroup = Radio.Group;

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
    return baseLayers.map(function(baseLayer, index) {
      return <Radio key={index} value={baseLayer}>
          {baseLayer.name}
        </Radio>;
    });
  }
  render() {
    return <RadioGroup onChange={this.setAsBaseLayer} value={this.state.value}>
        {this.renderBaseLayers(this.state.baseLayers)}
      </RadioGroup>;
  }
}

export default Layerswitch;
