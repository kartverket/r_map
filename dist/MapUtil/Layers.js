"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Layers =
/*#__PURE__*/
function () {
  function Layers(mapConfig, mapImplementation) {
    _classCallCheck(this, Layers);

    this.mapImplementation = mapImplementation;
    this.config = mapConfig;
    this.layers = mapConfig.layers;
    this.layersArranged = null;
    this.setUpLayerIndex();
    var baseLayers = this.getBaseLayers();
    var isBaseLayerVisible = false;

    for (var i = 0; i < baseLayers.length; i++) {
      var baseLayer = baseLayers[i];

      if (baseLayer.visibleOnLoad) {
        this.setBaseLayer(baseLayer);
        isBaseLayerVisible = true;
      } else if (isBaseLayerVisible === false) {
        baseLayer.visibleOnLoad = true;
        this.setBaseLayer(baseLayer);
        isBaseLayerVisible = true;
      }
    }

    var overlayLayers = this.getOverlayLayers();

    for (var j = 0; j < overlayLayers.length; j++) {
      var overlayLayer = overlayLayers[j];

      if (overlayLayer.visibleOnLoad) {
        this.showLayer(overlayLayer);
      } else {
        this.hideLayer(overlayLayer);
      }
    }
  }

  _createClass(Layers, [{
    key: "setUpLayerIndex",
    value: function setUpLayerIndex() {
      var layerIndex = 0;
      var baseLayers = this.getBaseLayers();

      for (var i = 0; i < baseLayers.length; i++) {
        var baseLayer = baseLayers[i];

        for (var j = 0; j < baseLayer.subLayers.length; j++) {
          baseLayer.subLayers[j].layerIndex = layerIndex;
          layerIndex++;
        }
      }

      var overlayLayers = this.getOverlayLayers();

      for (var k = 0; k < overlayLayers.length; k++) {
        var overlayLayer = overlayLayers[k];

        for (var l = 0; l < overlayLayer.subLayers.length; l++) {
          overlayLayer.subLayers[l].layerIndex = layerIndex;
          layerIndex++;
        }
      }
    }
  }, {
    key: "getLayers",
    value: function getLayers() {
      if (this.config !== undefined) {
        return this.config.layers;
      }

      return [];
    }
  }, {
    key: "compare",
    value: function compare(a, b) {
      if (a.id < b.id) {
        return -1;
      }

      if (a.id > b.id) {
        return 1;
      }

      return 0;
    }
  }, {
    key: "arrangeLayers",
    value: function arrangeLayers() {
      if (this.layersArranged) {
        return;
      }

      this.layersArranged = true;
      var overlayLayers = this.getOverlayLayers();
      var rearrangeLayers = [];

      for (var k = 0; k < overlayLayers.length; k++) {
        var overlayLayer = overlayLayers[k];

        if (overlayLayer.isVisible) {
          rearrangeLayers.push(overlayLayer);
        }
      }

      rearrangeLayers.sort(this.compare);
      rearrangeLayers.forEach(function (layer) {
        this.showLayer(layer);
      });
    }
  }, {
    key: "getBaseLayers",
    value: function getBaseLayers() {
      return this.getLayers().filter(function (elem) {
        return elem.isBaseLayer === true;
      });
    }
  }, {
    key: "getOverlayLayers",
    value: function getOverlayLayers() {
      return this.getLayers().filter(function (elem) {
        return elem.isBaseLayer === false;
      });
    }
  }, {
    key: "setBaseLayer",
    value: function setBaseLayer(isyLayer) {
      var baseLayers = this.getVisibleBaseLayers();

      for (var i = 0; i < baseLayers.length; i++) {
        var baseLayer = baseLayers[i];
        this.hideLayer(baseLayer);
      }

      this.showBaseLayer(isyLayer);
    }
  }, {
    key: "updateSortingIndex",
    value: function updateSortingIndex() {
      var index = 1;

      for (var i = 0; i < this.config.groups.length; i++) {
        if (this.config.groups[i].isyLayers !== undefined) {
          for (var j = 0; j < this.config.groups[i].isyLayers.length; j++) {
            for (var k = 0; k < this.config.groups[i].isyLayers[j].subLayers.length; k++) {
              this.config.groups[i].isyLayers[j].subLayers[k].sortingIndex = index;
              index += 1;
            }
          }
        } else {
          break;
        }
      }
    }
  }, {
    key: "addLayer",
    value: function addLayer(isyLayer) {
      this.showLayer(isyLayer);
      this.layers.push(isyLayer);
    }
  }, {
    key: "showLayer",
    value: function showLayer(isyLayer) {
      var subLayers = isyLayer.subLayers;

      for (var j = 0; j < subLayers.length; j++) {
        var isySubLayer = subLayers[j];

        if (this.shouldBeVisible(isySubLayer)) {
          this.mapImplementation.ShowLayer(isySubLayer);
        } else {
          this.mapImplementation.HideLayer(isySubLayer);
        }
      }

      isyLayer.isVisible = true; ////recalculateMapLayerIndexes();
      // updateSortingIndex();
      // this.mapImplementation.UpdateLayerSortIndex(this.config.groups);
      // this.mapImplementation.SortLayerBySortIndex();
      // this.mapImplementation.RedrawMap();
    }
  }, {
    key: "hideLayer",
    value: function hideLayer(isyLayer) {
      var subLayers = isyLayer.subLayers;
      isyLayer.isVisible = false;

      for (var j = 0; j < subLayers.length; j++) {
        var isySubLayer = subLayers[j];
        this.mapImplementation.HideLayer(isySubLayer);
      }

      isyLayer.mapLayerIndex = -1; //recalculateMapLayerIndexes();
    }
  }, {
    key: "getVisibleSubLayers",
    value: function getVisibleSubLayers() {
      var subLayersOnly = [];
      var visibleOverlays = this.getVisibleOverlayLayers();

      for (var i = 0; i < visibleOverlays.length; i++) {
        var isyLayer = visibleOverlays[i];

        for (var j = 0; j < isyLayer.subLayers.length; j++) {
          var subLayer = isyLayer.subLayers[j];

          if (this.shouldBeVisible(subLayer)) {
            subLayersOnly.push(subLayer);
          }
        }
      }

      return subLayersOnly;
    }
  }, {
    key: "getVisibleBaseLayers",
    value: function getVisibleBaseLayers() {
      return this.getBaseLayers().filter(function (elem) {
        return elem.isVisible === true;
      });
    }
  }, {
    key: "getLayerById",
    value: function getLayerById(id) {
      if (this.layers !== undefined) {
        for (var i = 0; i < this.layers.length; i++) {
          var layer = this.layers[i];

          if (layer.id.toString() === id.toString()) {
            return layer;
          }
        }
      }
    }
  }, {
    key: "moveLayerToIndexInGroup",
    value: function moveLayerToIndexInGroup() {
      this.updateSortingIndex();
      this.mapImplementation.UpdateLayerSortIndex(this.config.groups);
      this.mapImplementation.SortLayerBySortIndex();
      this.mapImplementation.RedrawMap();
    }
  }, {
    key: "moveLayerToIndex",
    value: function moveLayerToIndex(isyLayer, index) {
      var subLayers = isyLayer.subLayers;

      for (var i = 0; i < subLayers.length; i++) {
        var subLayer = subLayers[i];

        if (this.shouldBeVisible(subLayer)) {
          this.mapImplementation.MoveLayerToIndex(subLayer, index);
        }
      }

      this.mapImplementation.RedrawMap();
    }
  }, {
    key: "moveLayerAbove",
    value: function moveLayerAbove(isySourceLayer, isyTargetLayer) {
      var targetLayerIndex = this.getMaxLayerIndexForLayer(isyTargetLayer);
      var subLayers = isySourceLayer.subLayers;

      for (var i = 0; i < subLayers.length; i++) {
        var subLayer = subLayers[i];

        if (this.shouldBeVisible(subLayer)) {
          this.mapImplementation.MoveLayerToIndex(subLayer, targetLayerIndex);
        }
      }
    }
  }, {
    key: "showBaseLayer",
    value: function showBaseLayer(isyLayer) {
      var subLayers = isyLayer.subLayers;

      for (var j = 0; j < subLayers.length; j++) {
        var isySubLayer = subLayers[j];

        if (this.shouldBeVisible(isySubLayer)) {
          this.mapImplementation.ShowBaseLayer(isySubLayer);
        } else {
          this.mapImplementation.HideLayer(isySubLayer);
        }
      }

      isyLayer.isVisible = true;
      this.recalculateMapLayerIndexes();
    }
  }, {
    key: "recalculateMapLayerIndexes",
    value: function recalculateMapLayerIndexes() {
      var visibleOverlayLayers = this.getVisibleOverlayLayers();

      for (var i = 0; i < visibleOverlayLayers.length; i++) {
        var layer = visibleOverlayLayers[i];
        layer.mapLayerIndex = this.getMaxLayerIndexForLayer(layer);
      }
    }
  }, {
    key: "getVisibleOverlayLayers",
    value: function getVisibleOverlayLayers() {
      return this.getOverlayLayers().filter(function (elem) {
        return elem.isVisible === true;
      });
    }
  }, {
    key: "shouldBeVisible",
    value: function shouldBeVisible()
    /*isySubLayer*/
    {
      // todo johben: Logic could include zoom levels in case of a layer with both wms and wfs.
      // I.E.
      // var currentZoomLevel = this.mapImplementation.getCurrentZoomLevel();
      // return subLayer.StartZoomLevel < currentZoomLevel && subLayer.EndZoomLevel > currentZoomLevel
      return true;
    }
  }, {
    key: "getMaxLayerIndexForLayer",
    value: function getMaxLayerIndexForLayer(isyLayer) {
      var subLayers = isyLayer.subLayers;
      var indexes = [];

      for (var i = 0; i < subLayers.length; i++) {
        var subLayer = subLayers[i];
        var thisIndex = this.mapImplementation.GetLayerIndex(subLayer);

        if (thisIndex !== null) {
          indexes.push(thisIndex);
        }
      }

      return Math.max(indexes);
    }
  }]);

  return Layers;
}();

exports.default = Layers;
;