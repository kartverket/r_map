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
var Categories =
/*#__PURE__*/
function () {
  function Categories(mapConfig) {
    (0, _classCallCheck2.default)(this, Categories);
    this.categories = mapConfig.categories;
  }

  (0, _createClass2.default)(Categories, [{
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