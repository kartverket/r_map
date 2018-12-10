function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Groups = function () {
    function Groups(mapConfig) {
        _classCallCheck(this, Groups);

        this.groups = mapConfig.groups;
    }

    Groups.prototype.getGroups = function getGroups() {
        return this.groups;
    };

    Groups.prototype.getGroupById = function getGroupById(groupId) {
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
    };

    return Groups;
}();

export { Groups as default };
;