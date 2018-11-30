"use strict";

exports.__esModule = true;
var Layers = exports.Layers = function Layers(mapImplementation) {
    var config;
    var layers;
    var layersArranged;

    function init(mapConfig) {
        config = mapConfig;
        layers = mapConfig.layers;

        _setUpLayerIndex();

        var baseLayers = getBaseLayers();
        var isBaseLayerVisible = false;
        for (var i = 0; i < baseLayers.length; i++) {
            var baseLayer = baseLayers[i];
            if (baseLayer.visibleOnLoad) {
                setBaseLayer(baseLayer);
                isBaseLayerVisible = true;
            } else if (isBaseLayerVisible === false) {
                baseLayer.visibleOnLoad = true;
                setBaseLayer(baseLayer);
                isBaseLayerVisible = true;
            }
        }

        var overlayLayers = getOverlayLayers();
        for (var j = 0; j < overlayLayers.length; j++) {
            var overlayLayer = overlayLayers[j];
            if (overlayLayer.visibleOnLoad) {
                showLayer(overlayLayer);
            } else {
                hideLayer(overlayLayer);
            }
        }
    }

    function _setUpLayerIndex() {
        var layerIndex = 0;

        var baseLayers = getBaseLayers();
        for (var i = 0; i < baseLayers.length; i++) {
            var baseLayer = baseLayers[i];
            for (var j = 0; j < baseLayer.subLayers.length; j++) {
                baseLayer.subLayers[j].layerIndex = layerIndex;
                layerIndex++;
            }
        }

        var overlayLayers = getOverlayLayers();
        for (var k = 0; k < overlayLayers.length; k++) {
            var overlayLayer = overlayLayers[k];
            for (var l = 0; l < overlayLayer.subLayers.length; l++) {
                overlayLayer.subLayers[l].layerIndex = layerIndex;
                layerIndex++;
            }
        }
    }

    function _getLayers() {
        if (config !== undefined) {
            return config.layers;
        }
        return [];
    }

    function _compare(a, b) {
        if (a.id < b.id) {
            return -1;
        }
        if (a.id > b.id) {
            return 1;
        }
        return 0;
    }

    function arrangeLayers() {
        if (layersArranged) {
            return;
        }
        layersArranged = true;
        var overlayLayers = getOverlayLayers();
        var rearrangeLayers = [];
        for (var k = 0; k < overlayLayers.length; k++) {
            var overlayLayer = overlayLayers[k];
            if (overlayLayer.isVisible) {
                rearrangeLayers.push(overlayLayer);
            }
        }
        rearrangeLayers.sort(_compare);
        rearrangeLayers.forEach(function (layer) {
            showLayer(layer);
        });
    }

    function getBaseLayers() {
        return _getLayers().filter(function (elem) {
            return elem.isBaseLayer === true;
        });
    }

    function getOverlayLayers() {
        return _getLayers().filter(function (elem) {
            return elem.isBaseLayer === false;
        });
    }

    function setBaseLayer(isyLayer) {
        var baseLayers = getVisibleBaseLayers();
        for (var i = 0; i < baseLayers.length; i++) {
            var baseLayer = baseLayers[i];
            hideLayer(baseLayer);
        }

        _showBaseLayer(isyLayer);
    }

    function updateSortingIndex() {
        var index = 1;
        for (var i = 0; i < config.groups.length; i++) {
            if (config.groups[i].isyLayers !== undefined) {
                for (var j = 0; j < config.groups[i].isyLayers.length; j++) {
                    for (var k = 0; k < config.groups[i].isyLayers[j].subLayers.length; k++) {
                        config.groups[i].isyLayers[j].subLayers[k].sortingIndex = index;
                        index += 1;
                    }
                }
            } else {
                break;
            }
        }
    }

    function addLayer(isyLayer) {
        showLayer(isyLayer);
        layers.push(isyLayer);
    }

    function showLayer(isyLayer) {
        var subLayers = isyLayer.subLayers;
        for (var j = 0; j < subLayers.length; j++) {
            var isySubLayer = subLayers[j];
            if (shouldBeVisible(isySubLayer)) {
                mapImplementation.ShowLayer(isySubLayer);
            } else {
                mapImplementation.HideLayer(isySubLayer);
            }
        }

        isyLayer.isVisible = true;
        ////_recalculateMapLayerIndexes();
        // updateSortingIndex();
        // mapImplementation.UpdateLayerSortIndex(config.groups);
        // mapImplementation.SortLayerBySortIndex();
        // mapImplementation.RedrawMap();
    }

    function hideLayer(isyLayer) {
        var subLayers = isyLayer.subLayers;
        isyLayer.isVisible = false;
        for (var j = 0; j < subLayers.length; j++) {
            var isySubLayer = subLayers[j];
            mapImplementation.HideLayer(isySubLayer);
        }

        isyLayer.mapLayerIndex = -1;
        //_recalculateMapLayerIndexes();
    }

    function getVisibleSubLayers() {
        var subLayersOnly = [];
        var visibleOverlays = _getVisibleOverlayLayers();
        for (var i = 0; i < visibleOverlays.length; i++) {
            var isyLayer = visibleOverlays[i];
            for (var j = 0; j < isyLayer.subLayers.length; j++) {
                var subLayer = isyLayer.subLayers[j];
                if (shouldBeVisible(subLayer)) {
                    subLayersOnly.push(subLayer);
                }
            }
        }
        return subLayersOnly;
    }

    function getVisibleBaseLayers() {
        return getBaseLayers().filter(function (elem) {
            return elem.isVisible === true;
        });
    }

    function getLayerById(id) {
        if (layers !== undefined) {
            for (var i = 0; i < layers.length; i++) {
                var layer = layers[i];
                if (layer.id.toString() === id.toString()) {
                    return layer;
                }
            }
        }
    }

    function moveLayerToIndexInGroup() {
        updateSortingIndex();
        mapImplementation.UpdateLayerSortIndex(config.groups);
        mapImplementation.SortLayerBySortIndex();
        mapImplementation.RedrawMap();
    }

    function moveLayerToIndex(isyLayer, index) {
        var subLayers = isyLayer.subLayers;
        for (var i = 0; i < subLayers.length; i++) {
            var subLayer = subLayers[i];
            if (shouldBeVisible(subLayer)) {
                mapImplementation.MoveLayerToIndex(subLayer, index);
            }
        }
        mapImplementation.RedrawMap();
    }

    function moveLayerAbove(isySourceLayer, isyTargetLayer) {
        var targetLayerIndex = _getMaxLayerIndexForLayer(isyTargetLayer);
        var subLayers = isySourceLayer.subLayers;
        for (var i = 0; i < subLayers.length; i++) {
            var subLayer = subLayers[i];
            if (shouldBeVisible(subLayer)) {
                mapImplementation.MoveLayerToIndex(subLayer, targetLayerIndex);
            }
        }
    }

    function _showBaseLayer(isyLayer) {
        var subLayers = isyLayer.subLayers;
        for (var j = 0; j < subLayers.length; j++) {
            var isySubLayer = subLayers[j];
            if (shouldBeVisible(isySubLayer)) {
                mapImplementation.ShowBaseLayer(isySubLayer);
            } else {
                mapImplementation.HideLayer(isySubLayer);
            }
        }

        isyLayer.isVisible = true;
        _recalculateMapLayerIndexes();
    }

    function _recalculateMapLayerIndexes() {
        var visibleOverlayLayers = _getVisibleOverlayLayers();
        for (var i = 0; i < visibleOverlayLayers.length; i++) {
            var layer = visibleOverlayLayers[i];
            layer.mapLayerIndex = _getMaxLayerIndexForLayer(layer);
        }
    }

    function _getVisibleOverlayLayers() {
        return getOverlayLayers().filter(function (elem) {
            return elem.isVisible === true;
        });
    }

    function shouldBeVisible() /*isySubLayer*/{
        // todo johben: Logic could include zoom levels in case of a layer with both wms and wfs.
        // I.E.
        // var currentZoomLevel = mapImplementation.getCurrentZoomLevel();
        // return subLayer.StartZoomLevel < currentZoomLevel && subLayer.EndZoomLevel > currentZoomLevel
        return true;
    }

    function _getMaxLayerIndexForLayer(isyLayer) {
        var subLayers = isyLayer.subLayers;
        var indexes = [];
        for (var i = 0; i < subLayers.length; i++) {
            var subLayer = subLayers[i];
            var thisIndex = mapImplementation.GetLayerIndex(subLayer);
            if (thisIndex !== null) {
                indexes.push(thisIndex);
            }
        }
        return Math.max(indexes);
    }

    return {
        Init: init,
        ArrangeLayers: arrangeLayers,
        GetBaseLayers: getBaseLayers,
        GetOverlayLayers: getOverlayLayers,
        SetBaseLayer: setBaseLayer,
        AddLayer: addLayer,
        HideLayer: hideLayer,
        ShowLayer: showLayer,
        GetVisibleSubLayers: getVisibleSubLayers,
        GetVisibleBaseLayers: getVisibleBaseLayers,
        GetLayerById: getLayerById,
        MoveLayerToIndex: moveLayerToIndex,
        MoveLayerToIndexInGroup: moveLayerToIndexInGroup,
        MoveLayerAbove: moveLayerAbove,
        ShouldBeVisible: shouldBeVisible
    };
};