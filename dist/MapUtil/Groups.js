"use strict";

var _interopRequireDefault = require("C:\\code_git\\r_map.github\\node_modules\\@babel\\runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("C:\\code_git\\r_map.github\\node_modules\\@babel\\runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("C:\\code_git\\r_map.github\\node_modules\\@babel\\runtime/helpers/esm/createClass"));

/**
 *
 */
var Groups =
/*#__PURE__*/
function () {
  function Groups(mapConfig) {
    (0, _classCallCheck2.default)(this, Groups);
    this.groups = mapConfig.groups;
  }

  (0, _createClass2.default)(Groups, [{
    key: "getGroups",
    value: function getGroups() {
      return this.groups;
    }
  }, {
    key: "getGroupById",
    value: function getGroupById(groupId) {
      for (var i = 0; i < this.groups.length; i++) {
        var group = this.groups[i];

        if (group.groupId.toString() === groupId.toString()) {
          return group;
        }

        for (var j = 0; j < this.groups[i].subCategories.length; j++) {
          var subcat = this.groups[i].subCategories[j];

          if (subcat.groupId.toString() === groupId.toString()) {
            return subcat;
          }
        }
      }
    }
  }]);
  return Groups;
}();

exports.default = Groups;