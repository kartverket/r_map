/**
 *
 */
export default class Groups  {

  constructor(mapConfig) {
    this.groups = mapConfig.groups;
  }

  getGroups() {
    return this.groups;
  }

  getGroupById(groupId) {
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
}
