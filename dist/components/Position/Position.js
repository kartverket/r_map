"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

require("./Position.scss");

var _proj = require("ol/proj.js");

var _extent = require("ol/extent.js");

var _coordinate = require("ol/coordinate.js");

var _View = _interopRequireDefault(require("ol/View"));

var _MousePosition = _interopRequireDefault(require("ol/control/MousePosition"));

var _ProjectionUtil = _interopRequireDefault(require("../../MapUtil/ProjectionUtil"));

var _this = void 0;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Position = function Position(props) {
  var _useState = (0, _react.useState)(),
      _useState2 = _slicedToArray(_useState, 2),
      projection = _useState2[0],
      setProjectionString = _useState2[1];

  (0, _react.useEffect)(function () {
    createOlMousePositionControl(window.olMap);
  }, [window.olMap]);
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
  /**
   * Handler to set projection of map - called if coordinate system in
   * CoordinateReferenceSystemCombo was changed
   *
   * @param {Object} crsObj The object returned by CoordinateReferenceSystemCombo
   *
   */


  var setProjection = function setProjection(crsObj) {
    var _this$props = _this.props,
        map = _this$props.map,
        mapScales = _this$props.mapScales;
    var currentProjection = map.getView().getProjection();
    var newProj = (0, _proj.get)("EPSG:".concat(crsObj.code));
    var fromToTransform = (0, _proj.getTransform)(currentProjection, newProj);
    var currentExtent = map.getView().calculateExtent(map.getSize());
    var transformedExtent = (0, _extent.applyTransform)(currentExtent, fromToTransform);
    var resolutions = mapScales.map(function (scale) {
      return _ProjectionUtil.default.getResolutionForScale(scale, newProj.getUnits());
    }).reverse();
    var newView = new _View.default({
      projection: newProj,
      resolutions: resolutions
    });
    map.setView(newView);
    newView.fit(transformedExtent);
    var mousePositionControl = map.getControls().getArray().find(function (c) {
      return c instanceof _MousePosition.default;
    });

    if (mousePositionControl) {
      var isWgs84 = map.getView().getProjection().getCode() === "EPSG:4326";

      var wgs84Format = function wgs84Format(coordinate) {
        return coordinate.map(function (coord) {
          return _ProjectionUtil.default.toDms(coord);
        });
      };

      mousePositionControl.setProjection(newProj);
      mousePositionControl.setCoordinateFormat(isWgs84 ? wgs84Format : (0, _coordinate.createStringXY)(2));
    }
  };

  return _react.default.createElement("div", {
    className: "mouseposition"
  }, _react.default.createElement("span", null, projection), _react.default.createElement("div", {
    id: "mouse-position"
  }));
};

var _default = Position;
exports.default = _default;