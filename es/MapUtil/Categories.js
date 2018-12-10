function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Categories = function () {
    function Categories(mapConfig) {
        _classCallCheck(this, Categories);

        this.categories = mapConfig.categories;
    }

    Categories.prototype.getCcategories = function getCcategories() {
        return this.categories;
    };

    Categories.prototype.getCategoryById = function getCategoryById(catId) {
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
    };

    return Categories;
}();

export { Categories as default };
;