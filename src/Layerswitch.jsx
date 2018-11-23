import React, { Component } from "react";
import { map, eventHandler, olMap, mapConfig, addLayer2 } from "./maplibHelper";
import {
  getWMSCapabilities,
  mergeDefaultParams,
  parseWmsCapabilities
} from "./Utils/MapHelper";
import PropTypes from "prop-types";
import queryString from "query-string";
import setQuery from "set-query-string";

class Layerswitch extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  render() {
    return <div className="Layerswitch">Test</div>;
  }
}

export default Layerswitch;
