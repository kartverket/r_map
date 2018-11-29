
export const Groups = () => {
    var groups = [];

    function init(mapConfig) {
        groups = mapConfig.groups;
    }

    function getGroups() {
        return groups;
    }

    function getGroupById(groupId) {
        for (var i = 0; i < groups.length; i++) {
            var group = groups[i];
            if (group.groupId.toString() === groupId.toString()) {
                return group;
            }
            for (var j = 0; j < groups[i].subCategories.length; j++) {
                var subcat = groups[i].subCategories[j];
                if (subcat.groupId.toString() === groupId.toString()) {
                    return subcat;
                }
            }
        }
    }

    return {
        Init: init,
        GetGroupById: getGroupById,
        GetGroups: getGroups
    };
};
