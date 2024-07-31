"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
class Categories {
  constructor(mapConfig) {
    this.categories = mapConfig.categories;
  }
  getCcategories() {
    return this.categories;
  }
  getCategoryById(catId) {
    for (var i = 0; i < this.categories.length; i++) {
      var cat = this.categories[i];
      if (cat.catId.toString() === catId.toString()) {
        return cat;
      }
      for (var j = 0; j < this.categories[i].subCategories.length; j++) {
        var subcat = this.categories[i].subCategories[j];
        if (subcat.catId.toString() === catId.toString()) {
          return subcat;
        }
      }
    }
  }
}
exports.default = Categories;
;