"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Categories =
/*#__PURE__*/
function () {
  function Categories(mapConfig) {
    _classCallCheck(this, Categories);

    this.categories = mapConfig.categories;
  }

  _createClass(Categories, [{
    key: "getCcategories",
    value: function getCcategories() {
      return this.categories;
    }
  }, {
    key: "getCategoryById",
    value: function getCategoryById(catId) {
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
  }]);

  return Categories;
}();

exports.default = Categories;
;