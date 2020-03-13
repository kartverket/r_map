"use strict";

var _interopRequireWildcard = require("/Users/carstenmielke/Projekte/r_map.github/node_modules/@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("/Users/carstenmielke/Projekte/r_map.github/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("/Users/carstenmielke/Projekte/r_map.github/node_modules/@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _PositionModule = _interopRequireDefault(require("./Position.module.scss"));

var _coordinate = require("ol/coordinate.js");

var _MousePosition = _interopRequireDefault(require("ol/control/MousePosition"));

var Position = function Position() {
  var _useState = (0, _react.useState)(),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      projection = _useState2[0],
      setProjectionString = _useState2[1];

  (0, _react.useEffect)(function () {
    createOlMousePositionControl(window.olMap);
  });
  /**
   * Creates and adds the mouse position control to the map.
   *
   * @param {OlMap} The OpenLayers map
   */

  var createOlMousePositionControl = function createOlMousePositionControl(map) {
    var existingControls = map.getControls();
    var mousePositionControl = existingControls.getArray().find(function (c) {
      return c instanceof _MousePosition.default;
    });
    setProjectionString(map.getView().getProjection().getCode());

    var customFormat = function customFormat(coordinate) {
      return (0, _coordinate.format)(coordinate, '{y}N, {x}Ø');
    };

    if (!mousePositionControl) {
      var options = {
        name: 'ol-mouse-position',
        coordinateFormat: customFormat,
        target: document.getElementById('mouse-position'),
        undefinedHTML: '&nbsp;',
        projection: projection
      };

      var _mousePositionControl = new _MousePosition.default(options);

      map.addControl(_mousePositionControl);
    }
  };

  return _react.default.createElement("div", {
    className: _PositionModule.default.mouseposition
  }, _react.default.createElement("span", null, projection), _react.default.createElement("div", {
    id: "mouse-position"
  }));
};

var _default = Position;
exports.default = _default;