"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Guid = /*#__PURE__*/function () {
  function Guid() {
    _classCallCheck(this, Guid);
  }

  _createClass(Guid, null, [{
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