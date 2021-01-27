"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Layers {
  constructor(mapConfig, mapImplementation) {
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

  setUpLayerIndex() {
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

  getLayers() {
    if (this.config !== undefined) {
      return this.config.layers;
    }

    return [];
  }

  compare(a, b) {
    if (a.id < b.id) {
      return -1;
    }

    if (a.id > b.id) {
      return 1;
    }

    return 0;
  }

  arrangeLayers() {
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

  getBaseLayers() {
    return this.getLayers().filter(elem => elem.isBaseLayer === true);
  }

  getOverlayLayers() {
    return this.getLayers().filter(elem => elem.isBaseLayer === false);
  }

  setBaseLayer(isyLayer) {
    var baseLayers = this.getVisibleBaseLayers();

    for (var i = 0; i < baseLayers.length; i++) {
      var baseLayer = baseLayers[i];
      this.hideLayer(baseLayer);
    }

    this.showBaseLayer(isyLayer);
  }

  updateSortingIndex() {
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

  addLayer(isyLayer) {
    this.showLayer(isyLayer);
    this.layers.push(isyLayer);
  }

  showLayer(isyLayer) {
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

  hideLayer(isyLayer) {
    var subLayers = isyLayer.subLayers;
    isyLayer.isVisible = false;

    for (var j = 0; j < subLayers.length; j++) {
      var isySubLayer = subLayers[j];
      this.mapImplementation.HideLayer(isySubLayer);
    }

    isyLayer.mapLayerIndex = -1; //recalculateMapLayerIndexes();
  }

  getVisibleSubLayers() {
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

  getVisibleBaseLayers() {
    return this.getBaseLayers().filter(elem => elem.isVisible === true);
  }

  getLayerById(id) {
    if (this.layers !== undefined) {
      for (var i = 0; i < this.layers.length; i++) {
        var layer = this.layers[i];

        if (layer.id.toString() === id.toString()) {
          return layer;
        }
      }
    }
  }

  moveLayerToIndexInGroup() {
    this.updateSortingIndex();
    this.mapImplementation.UpdateLayerSortIndex(this.config.groups);
    this.mapImplementation.SortLayerBySortIndex();
    this.mapImplementation.RedrawMap();
  }

  moveLayerToIndex(isyLayer, index) {
    var subLayers = isyLayer.subLayers;

    for (var i = 0; i < subLayers.length; i++) {
      var subLayer = subLayers[i];

      if (this.shouldBeVisible(subLayer)) {
        this.mapImplementation.MoveLayerToIndex(subLayer, index);
      }
    }

    this.mapImplementation.RedrawMap();
  }

  moveLayerAbove(isySourceLayer, isyTargetLayer) {
    var targetLayerIndex = this.getMaxLayerIndexForLayer(isyTargetLayer);
    var subLayers = isySourceLayer.subLayers;

    for (var i = 0; i < subLayers.length; i++) {
      var subLayer = subLayers[i];

      if (this.shouldBeVisible(subLayer)) {
        this.mapImplementation.MoveLayerToIndex(subLayer, targetLayerIndex);
      }
    }
  }

  showBaseLayer(isyLayer) {
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

  recalculateMapLayerIndexes() {
    var visibleOverlayLayers = this.getVisibleOverlayLayers();

    for (var i = 0; i < visibleOverlayLayers.length; i++) {
      var layer = visibleOverlayLayers[i];
      layer.mapLayerIndex = this.getMaxLayerIndexForLayer(layer);
    }
  }

  getVisibleOverlayLayers() {
    return this.getOverlayLayers().filter(elem => elem.isVisible === true);
  }

  shouldBeVisible()
  /*isySubLayer*/
  {
    return true;
  }

  getMaxLayerIndexForLayer(isyLayer) {
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

}

exports.default = Layers;
;