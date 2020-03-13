"use strict";

var _interopRequireDefault = require("/Users/carstenmielke/Projekte/r_map.github/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("/Users/carstenmielke/Projekte/r_map.github/node_modules/@babel/runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("/Users/carstenmielke/Projekte/r_map.github/node_modules/@babel/runtime/helpers/esm/createClass"));

var Guid = /*#__PURE__*/function () {
  function Guid() {
    (0, _classCallCheck2.default)(this, Guid);
  }

  (0, _createClass2.default)(Guid, null, [{
    key: "s4",
    value: function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
  }, {
    key: "newGuid",
    value: function newGuid() {
      return "".concat(this.s4() + this.s4(), "-").concat(this.s4(), "-").concat(this.s4(), "-").concat(this.s4(), "-").concat(this.s4()).concat(this.s4()).concat(this.s4());
    }
  }]);
  return Guid;
}();

exports.default = Guid;