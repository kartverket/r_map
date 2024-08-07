"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapConfig = exports.Category = void 0;
const Category = config => {
  var defaults = {
    catId: "",
    name: "",
    parentId: "",
    subCategories: [],
    isOpen: false
  };
  return Object.assign({}, defaults, config);
};
exports.Category = Category;
const MapConfig = config => {
  var defaults = {
    name: "",
    comment: "",
    useCategories: true,
    categories: [],
    numZoomLevels: 10,
    newMaxRes: 21664,
    newMaxScale: 81920000,
    renderer: "canvas",
    center: [-1, 1],
    zoom: 5,
    layers: [],
    coordinate_system: "EPSG:25833",
    matrixSet: "EPSG:25833",
    extent: [-1, -1, -1, -1],
    extentUnits: 'm',
    proxyHost: "",
    groups: []
  };
  return Object.assign({}, defaults, config); // mapConfigInstance
};
exports.MapConfig = MapConfig;