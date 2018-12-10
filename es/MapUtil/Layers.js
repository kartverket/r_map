function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Layers = function () {
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

    Layers.prototype.setUpLayerIndex = function setUpLayerIndex() {
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
    };

    Layers.prototype.getLayers = function getLayers() {
        if (this.config !== undefined) {
            return this.config.layers;
        }
        return [];
    };

    Layers.prototype.compare = function compare(a, b) {
        if (a.id < b.id) {
            return -1;
        }
        if (a.id > b.id) {
            return 1;
        }
        return 0;
    };

    Layers.prototype.arrangeLayers = function arrangeLayers() {
        if (layersArranged) {
            return;
        }
        layersArranged = true;
        var overlayLayers = this.getOverlayLayers();
        var rearrangeLayers = [];
        for (var k = 0; k < overlayLayers.length; k++) {
            var overlayLayer = overlayLayers[k];
            if (overlayLayer.isVisible) {
                rearrangeLayers.push(overlayLayer);
            }
        }
        rearrangeLayers.sort(compare);
        rearrangeLayers.forEach(function (layer) {
            this.showLayer(layer);
        });
    };

    Layers.prototype.getBaseLayers = function getBaseLayers() {
        return this.getLayers().filter(function (elem) {
            return elem.isBaseLayer === true;
        });
    };

    Layers.prototype.getOverlayLayers = function getOverlayLayers() {
        return this.getLayers().filter(function (elem) {
            return elem.isBaseLayer === false;
        });
    };

    Layers.prototype.setBaseLayer = function setBaseLayer(isyLayer) {
        var baseLayers = this.getVisibleBaseLayers();
        for (var i = 0; i < baseLayers.length; i++) {
            var baseLayer = baseLayers[i];
            this.hideLayer(baseLayer);
        }

        this.showBaseLayer(isyLayer);
    };

    Layers.prototype.updateSortingIndex = function updateSortingIndex() {
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
    };

    Layers.prototype.addLayer = function addLayer(isyLayer) {
        this.showLayer(isyLayer);
        this.layers.push(isyLayer);
    };

    Layers.prototype.showLayer = function showLayer(isyLayer) {
        var subLayers = isyLayer.subLayers;
        for (var j = 0; j < subLayers.length; j++) {
            var isySubLayer = subLayers[j];
            if (this.shouldBeVisible(isySubLayer)) {
                this.mapImplementation.ShowLayer(isySubLayer);
            } else {
                this.mapImplementation.HideLayer(isySubLayer);
            }
        }

        isyLayer.isVisible = true;
        ////recalculateMapLayerIndexes();
        // updateSortingIndex();
        // this.mapImplementation.UpdateLayerSortIndex(this.config.groups);
        // this.mapImplementation.SortLayerBySortIndex();
        // this.mapImplementation.RedrawMap();
    };

    Layers.prototype.hideLayer = function hideLayer(isyLayer) {
        var subLayers = isyLayer.subLayers;
        isyLayer.isVisible = false;
        for (var j = 0; j < subLayers.length; j++) {
            var isySubLayer = subLayers[j];
            this.mapImplementation.HideLayer(isySubLayer);
        }

        isyLayer.mapLayerIndex = -1;
        //recalculateMapLayerIndexes();
    };

    Layers.prototype.getVisibleSubLayers = function getVisibleSubLayers() {
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
    };

    Layers.prototype.getVisibleBaseLayers = function getVisibleBaseLayers() {
        return this.getBaseLayers().filter(function (elem) {
            return elem.isVisible === true;
        });
    };

    Layers.prototype.getLayerById = function getLayerById(id) {
        if (layers !== undefined) {
            for (var i = 0; i < this.layers.length; i++) {
                var layer = this.layers[i];
                if (layer.id.toString() === id.toString()) {
                    return layer;
                }
            }
        }
    };

    Layers.prototype.moveLayerToIndexInGroup = function moveLayerToIndexInGroup() {
        this.updateSortingIndex();
        this.mapImplementation.UpdateLayerSortIndex(this.config.groups);
        this.mapImplementation.SortLayerBySortIndex();
        this.mapImplementation.RedrawMap();
    };

    Layers.prototype.moveLayerToIndex = function moveLayerToIndex(isyLayer, index) {
        var subLayers = isyLayer.subLayers;
        for (var i = 0; i < subLayers.length; i++) {
            var subLayer = subLayers[i];
            if (this.shouldBeVisible(subLayer)) {
                this.mapImplementation.MoveLayerToIndex(subLayer, index);
            }
        }
        this.mapImplementation.RedrawMap();
    };

    Layers.prototype.moveLayerAbove = function moveLayerAbove(isySourceLayer, isyTargetLayer) {
        var targetLayerIndex = this.getMaxLayerIndexForLayer(isyTargetLayer);
        var subLayers = isySourceLayer.subLayers;
        for (var i = 0; i < subLayers.length; i++) {
            var subLayer = subLayers[i];
            if (this.shouldBeVisible(subLayer)) {
                this.mapImplementation.MoveLayerToIndex(subLayer, targetLayerIndex);
            }
        }
    };

    Layers.prototype.showBaseLayer = function showBaseLayer(isyLayer) {
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
    };

    Layers.prototype.recalculateMapLayerIndexes = function recalculateMapLayerIndexes() {
        var visibleOverlayLayers = this.getVisibleOverlayLayers();
        for (var i = 0; i < visibleOverlayLayers.length; i++) {
            var layer = visibleOverlayLayers[i];
            layer.mapLayerIndex = this.getMaxLayerIndexForLayer(layer);
        }
    };

    Layers.prototype.getVisibleOverlayLayers = function getVisibleOverlayLayers() {
        return this.getOverlayLayers().filter(function (elem) {
            return elem.isVisible === true;
        });
    };

    Layers.prototype.shouldBeVisible = function shouldBeVisible() /*isySubLayer*/{
        // todo johben: Logic could include zoom levels in case of a layer with both wms and wfs.
        // I.E.
        // var currentZoomLevel = this.mapImplementation.getCurrentZoomLevel();
        // return subLayer.StartZoomLevel < currentZoomLevel && subLayer.EndZoomLevel > currentZoomLevel
        return true;
    };

    Layers.prototype.getMaxLayerIndexForLayer = function getMaxLayerIndexForLayer(isyLayer) {
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
    };

    return Layers;
}();

export { Layers as default };
;