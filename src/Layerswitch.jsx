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
      return "icon-radio-checked";
    } else {
      return "icon-radio-unchecked";
    }
  }
  setAsBaseLayer(baseLayer) {
    map.SetBaseLayer(baseLayer);
    map.ZoomToLayer(baseLayer);
    this.setState({ baseLayers: map.GetBaseLayers() });
  }
  renderBaseLayers(baseLayers) {
    let that = this;
    return baseLayers.map(function(baseLayer, index) {
      return <li style={{ listStyleType: "none" }} key={index} onClick={() => that.setAsBaseLayer(baseLayer)}>
          <div className="row">
            <div className="col-xs-1">
              <span className={that.getBaseLayerStyle(baseLayer)} />
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
