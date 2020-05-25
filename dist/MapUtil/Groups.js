"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 *
 */
var Groups = /*#__PURE__*/function () {
  function Groups(mapConfig) {
    _classCallCheck(this, Groups);

    this.groups = mapConfig.groups;
  }

  _createClass(Groups, [{
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