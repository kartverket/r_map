"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _PositionModule = _interopRequireDefault(require("./Position.module.scss"));

var _coordinate = require("ol/coordinate.js");

var _MousePosition = _interopRequireDefault(require("ol/control/MousePosition"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const Position = () => {
  const [projection, setProjectionString] = (0, _react.useState)();
  (0, _react.useEffect)(() => {
    createOlMousePositionControl(window.olMap);
  });
  /**
   * Creates and adds the mouse position control to the map.
   *
   * @param {OlMap} The OpenLayers map
   */

  const createOlMousePositionControl = map => {
    const existingControls = map.getControls();
    const mousePositionControl = existingControls.getArray().find(c => c instanceof _MousePosition.default);
    setProjectionString(map.getView().getProjection().getCode());

    const customFormat = coordinate => (0, _coordinate.format)(coordinate, '{y}N, {x}Ø');

    if (!mousePositionControl) {
      const options = {
        name: 'ol-mouse-position',
        coordinateFormat: customFormat,
        target: document.getElementById('mouse-position'),
        undefinedHTML: '&nbsp;',
        projection: projection
      };
      const mousePositionControl = new _MousePosition.default(options);
      map.addControl(mousePositionControl);
    }
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    className: _PositionModule.default.mouseposition
  }, /*#__PURE__*/_react.default.createElement("span", null, projection), /*#__PURE__*/_react.default.createElement("div", {
    id: "mouse-position"
  }));
};

var _default = Position;
exports.default = _default;