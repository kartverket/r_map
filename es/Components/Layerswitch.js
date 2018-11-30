function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";
import { map, eventHandler } from "../Maplib/maplibHelper";
import { NavItem, Nav } from "react-bootstrap";

export var Layerswitch = function (_Component) {
  _inherits(Layerswitch, _Component);

  function Layerswitch(props) {
    _classCallCheck(this, Layerswitch);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.setAsBaseLayer = function (baseLayer) {
      map.SetBaseLayer(baseLayer);
      map.ZoomToLayer(baseLayer);
      _this.setState({ value: baseLayer });
    };

    _this.state = { baseLayers: [] };
    eventHandler.RegisterEvent("MapLoaded", function () {
      return _this.setState({ baseLayers: map.GetBaseLayers() });
    });
    return _this;
  }

  Layerswitch.prototype.renderBaseLayers = function renderBaseLayers(baseLayers) {
    return baseLayers.map(function (baseLayer, index) {
      return React.createElement(
        NavItem,
        { key: index, eventKey: baseLayer },
        baseLayer.name
      );
    });
  };

  Layerswitch.prototype.render = function render() {
    return React.createElement(
      Nav,
      { bsStyle: "pills", stacked: true, onSelect: this.setAsBaseLayer, value: this.state.value },
      this.renderBaseLayers(this.state.baseLayers)
    );
  };

  return Layerswitch;
}(Component);