import React, { Component } from "react";
import { map, eventHandler } from "../Maplib/maplibHelper";
import { MenuItem, NavDropdown } from "react-bootstrap";

export class BackgroundChooser extends Component {
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
      return <MenuItem key={index} eventKey={baseLayer}>
          {baseLayer.name}
      </MenuItem>;
    });
  }
  render() {
    return <NavDropdown onSelect={this.setAsBaseLayer} value={this.state.value} title="Backgound">
        {this.renderBaseLayers(this.state.baseLayers)}
      </NavDropdown>;
  }
}

