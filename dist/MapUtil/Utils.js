"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
class Guid {
  static s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  static newGuid() {
    return "".concat(this.s4() + this.s4(), "-").concat(this.s4(), "-").concat(this.s4(), "-").concat(this.s4(), "-").concat(this.s4()).concat(this.s4()).concat(this.s4());
  }
}
exports.default = Guid;