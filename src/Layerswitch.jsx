import React, { Component } from "react";
import { map, eventHandler } from "./maplibHelper";

class Layerswitch extends Component {
  constructor(props) {
    super(props);
    this.state = { baseLayers: [] };
    eventHandler.RegisterEvent("MapLoaded", () =>
      this.setState({ baseLayers: map.GetBaseLayers() })
    );
  }
  getBaseLayerStyle(baseLayer) {
    if (baseLayer.isVisible) {
      return "icon-radio-checked pointer-cursor";
    } else {
      return "icon-radio-unchecked pointer-cursor";
    }
  }
  setAsBaseLayer(baseLayer) {
    map.SetBaseLayer(baseLayer);
    map.ZoomToLayer(baseLayer);
    this.setState({ baseLayers: map.GetBaseLayers() });
  }
  renderBaseLayers(baseLayers) {
    return baseLayers.map(function(baseLayer, index) {
      return <li key={index} onClick={() => this.setAsBaseLayer(baseLayer)} >
      <div className="row">
                <div className="col-xs-1">
                    <span style={this.getBaseLayerStyle(baseLayer)}></span>
                </div>
                <div className="col-xs-11">
                    <span>{baseLayer.name}</span>
                </div>
            </div>
      </li>;
    });
  }
  render() {
    return <ul>{this.renderBaseLayers(this.state.baseLayers)}</ul>;
  }
}

export default Layerswitch;
