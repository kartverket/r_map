import React, { Component } from "react";
import { map, eventHandler } from "../Maplib/maplibHelper";
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";

export class BackgroundChooser extends Component {
  constructor(props) {
    super(props);
    this.state = { baseLayers: [] };
    eventHandler.RegisterEvent( "MapLoaded", () => this.setState({ baseLayers: map.GetBaseLayers() }) );
  }
  setAsBaseLayer = (baseLayer) =>{
    map.SetBaseLayer(baseLayer);
    map.ZoomToLayer(baseLayer);
    this.setState({ value: baseLayer });
  }
  renderBaseLayers(baseLayers) {
    return baseLayers.map( (baseLayer, index) => {
      return <ToggleButton key={index} value={baseLayer}> {baseLayer.name} </ToggleButton>;
    });
  }
  render() {
    return <ToggleButtonGroup type="radio" name="Backgound" onChange={this.setAsBaseLayer} value={this.state.value}>
        {this.renderBaseLayers(this.state.baseLayers)}
      </ToggleButtonGroup>;
  }
}

