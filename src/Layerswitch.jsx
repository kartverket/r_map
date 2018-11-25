import React, { Component } from "react";

class Layerswitch extends Component {
  constructor(props) {
    super(props);
    this.state = { map: '' };
  }
  componentWillReceiveProps(props) {
    this.setState({ map: props.map })
    console.log(this.state.map);
  }
  render() {
    let baseLayerList = <li />;
    if (this.state.map) {
      console.log(this.state.map.GetBaseLayers());
      this.baseLayers = this.state.map.GetBaseLayers();
      baseLayerList = this.baseLayers.map(function (baseLayer, index) {
        return <li key={index}>{baseLayer.name}</li>;
      });
    } 
  
    return <ul>{baseLayerList}</ul>;
  }
}

export default Layerswitch;
