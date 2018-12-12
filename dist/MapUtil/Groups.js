"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Groups = function () {
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
;