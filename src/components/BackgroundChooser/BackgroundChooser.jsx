import React, { Component } from "react";
import { map, eventHandler } from "../../MapUtil/maplibHelper";
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import "./BackgroundChooser.scss";
/**
 * Panel containing a list of backgroundLayers.
 *
 * @class The AddWmsPanel
 * @extends React.Component
 */
export default class BackgroundChooser extends Component {
  constructor(props) {
    super(props);
    this.state = { baseLayers: [] };
    eventHandler.RegisterEvent("MapLoaded", () =>
      this.setState({ baseLayers: map.GetBaseLayers() })
      
    );
  }  
  setAsBaseLayer = baseLayer => {
    map.SetBaseLayer(baseLayer);
    map.ZoomToLayer(baseLayer);
    this.setState({ value: baseLayer });
  }
  renderBaseLayers(baseLayers) {
    return baseLayers.map((baseLayer, index) => {   
      
      return (        
        <ToggleButton key={index} className={'icon_' + baseLayer.id} value={baseLayer}>
          
        </ToggleButton>  
      );
    });
  }
  render() {
    return (
      <ToggleButtonGroup
        type="radio"
        name="Backgound"
        className="backgroundChooser"
        onChange={this.setAsBaseLayer}
        value={this.state.value}
      >
        {this.renderBaseLayers(this.state.baseLayers)}
      </ToggleButtonGroup>
    );
  }
}
