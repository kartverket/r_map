import React, { Component } from "react";
import { map, eventHandler } from "../maplib/maplibHelper";
import { NavItem, Nav } from "react-bootstrap";

export class Layerswitch extends Component {
  constructor(props) {
    super(props);
    this.state = { baseLayers: [] };
    eventHandler.RegisterEvent("MapLoaded", () =>
      this.setState({ baseLayers: map.GetBaseLayers() })
    );
  }
  setAsBaseLayer = (baseLayer) =>{
    map.SetBaseLayer(baseLayer);
    map.ZoomToLayer(baseLayer);
    this.setState({ value: baseLayer });
  }
  renderBaseLayers(baseLayers) {
    return baseLayers.map(function(baseLayer, index) {
      return <NavItem key={index} eventKey={baseLayer}>
          {baseLayer.name}
      </NavItem>;
    });
  }
  render() {
    return <Nav bsStyle="pills" stacked onSelect={this.setAsBaseLayer} value={this.state.value}>
        {this.renderBaseLayers(this.state.baseLayers)}
      </Nav>;
  }
}

