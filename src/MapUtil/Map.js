import {
    EventTypes
} from './EventHandler'
import ProjectionUtil from './ProjectionUtil'
import Categories from './Categories'
import Groups from './Groups'
import Layers from './Layers'

export const Map = (mapImplementation, eventHandler, featureInfo) => {
    /*
        Start up functions Start
     */

    var mapConfiguration;
    var categoryHandler;
    var groupHandler;
    var layerHandler;

    function init(targetId, mapConfig) {
        _loadCustomCrs();

        mapConfiguration = mapConfig;
        var olMap = mapImplementation.InitMap(targetId, mapConfig);
        layerHandler = new Layers(mapConfig, mapImplementation)
        groupHandler = new Groups(mapConfig)
        categoryHandler = new Categories(mapConfig)
        eventHandler.TriggerEvent(EventTypes.MapLoaded);
        return olMap;
    }

    function _loadCustomCrs() {
        ProjectionUtil.loadCustomCrs();

        ProjectionUtil.addCustomProj('EPSG:25832');
        ProjectionUtil.addCustomProj('EPSG:25833');
        ProjectionUtil.addCustomProj('EPSG:25834');
        ProjectionUtil.addCustomProj('EPSG:25835');
        ProjectionUtil.addCustomProj('EPSG:25836');
        ProjectionUtil.addCustomProj('EPSG:32632');
        ProjectionUtil.addCustomProj('EPSG:32633');
        ProjectionUtil.addCustomProj('EPSG:32634');
        ProjectionUtil.addCustomProj('EPSG:32635');
        ProjectionUtil.addCustomProj('EPSG:32636');
        ProjectionUtil.addCustomProj('EPSG:4258');
    }

    function changeView(viewPropertyObject) {
        mapImplementation.ChangeView(viewPropertyObject);
    }

    function redrawMap() {
        mapImplementation.RedrawMap();
    }

    function refreshMap() {
        mapImplementation.RefreshMap();
    }

    function refreshLayerByGuid(guid, featureObj) {
        mapImplementation.RefreshLayerByGuid(guid, featureObj);
    }

    /*
        Start up functions End
     */

    /*
        Layer functions Start
     */

    function addLayer(isyLayer) {
        layerHandler.addLayer(isyLayer);
    }

    function addDataToLayer(isyLayer, data) {
        mapImplementation.AddDataToLayer(isyLayer.subLayers[0], data);
    }

    function removeDataFromLayer(isyLayer, data) {
        mapImplementation.RemoveDataFromLayer(isyLayer.subLayers[0], data);
    }

    function clearLayer(isyLayer) {
        mapImplementation.ClearLayer(isyLayer.subLayers[0]);
    }

    function showLayer(isyLayer) {
        layerHandler.showLayer(isyLayer);
    }

    function hideLayer(isyLayer) {
        layerHandler.hideLayer(isyLayer);
    }

    function setLayerOpacity(isyLayer, value) {
        var subLayers = isyLayer.subLayers;
        for (var j = 0; j < subLayers.length; j++) {
            var isySubLayer = subLayers[j];
            mapImplementation.SetLayerOpacity(isySubLayer, value);
        }
        mapImplementation.RedrawMap();
    }

    function setBaseLayer(isyLayer) {
        layerHandler.setBaseLayer(isyLayer);
    }

    function getBaseLayers() {
        return layerHandler.getBaseLayers();
    }

    function getFirstVisibleBaseLayer() {
        return layerHandler.getVisibleBaseLayers()[0];
    }

    function getOverlayLayers() {
        return layerHandler.getOverlayLayers();
    }

    function getVisibleSubLayers() {
        return layerHandler.getVisibleSubLayers();
    }

    function getLayerById(id) {
        return layerHandler.getLayerById(id);
    }

    function moveLayerToIndex(isyLayer, index) {
        layerHandler.moveLayerToIndex(isyLayer, index);
    }

    function moveLayerToIndexInGroup() {
        layerHandler.moveLayerToIndexInGroup();
    }

    function moveLayerAbove(isySourceLayer, isyTargetLayer) {
        layerHandler.moveLayerAbove(isySourceLayer, isyTargetLayer);
    }

    function _shouldBeVisible(subLayer) {
        return layerHandler.shouldBeVisible(subLayer);
    }

    /*
        Layer functions End
     */

    /*
     Categories functions Start
     */

    function getCategoryById(id) {
        return categoryHandler.getCategoryById(id);
    }

    function getCategories() {
        return categoryHandler.getCategories();
    }

    /*
     Categories functions End
     */

    /*
     Groups functions Start
     */

    function getGroupById(id) {
        return groupHandler.GetGroupById(id);
    }

    function getGroups() {
        return groupHandler.GetGroups();
    }

    /*
     Groups functions End
     */

    /*
        Export functions Start
     */

    function exportMap(callback) {
        mapImplementation.ExportMap(callback);
    }

    function activateExport(options) {
        mapImplementation.ActivateExport(options);
    }

    function deactivateExport() {
        mapImplementation.DeactivateExport();
    }

    function renderSync() {
        return mapImplementation.RenderSync();
    }

    /*
        Export functions End
     */

    /*
        Feature Info Start
     */

    function setImageInfoMarker(path) {
        featureInfo.SetInfoMarkerPath(path);
        featureInfo.CreateDefaultInfoMarker();
    }

    function setInfoMarker(element, removeCurrent) {
        featureInfo.SetInfoMarker(element, removeCurrent);
    }

    function removeInfoMarker() {
        featureInfo.RemoveInfoMarker();
    }

    function removeInfoMarkers() {
        featureInfo.RemoveInfoMarkers();
    }

    function showHighlightedFeatures(layerguid, features) {
        mapImplementation.ShowHighlightedFeatures(layerguid, features);
    }

    function clearHighlightedFeatures() {
        mapImplementation.ClearHighlightedFeatures();
    }

    function setHighlightStyle(style) {
        mapImplementation.SetHighlightStyle(style);
    }

    function activateInfoClick() {
        mapImplementation.ActivateInfoClick(_handlePointSelect);
    }

    function showInfoMarker(coordinate) {
        featureInfo.ShowInfoMarker(coordinate);
    }

    function showInfoMarkers(coordinates) {
        featureInfo.ShowInfoMarkers(coordinates);
    }

    function deactivateInfoClick() {
        mapImplementation.DeactivateInfoClick();
    }

    function activateBoxSelect() {
        mapImplementation.ActivateBoxSelect(_handleBoxSelect);
    }

    function deactivateBoxSelect() {
        mapImplementation.DeactivateBoxSelect();
    }

    function initEdit(isySubLayer) {
        return mapImplementation.InitEdit(isySubLayer);
    }

    function describeFeature(isySubLayer, geometryType) {
        mapImplementation.DescribeFeature(isySubLayer, geometryType);
    }

    function activateEditClick() {
        mapImplementation.ActivateEditSelect(_handleEditSelect);
    }

    function deactivateEditClick() {
        mapImplementation.DeactivateEditSelect();
    }

    function updateFeature(feature) {
        mapImplementation.UpdateFeature(feature);
    }

    function insertFeature(feature, source) {
        return mapImplementation.InsertFeature(feature, source);
    }

    function deleteFeature(feature) {
        return mapImplementation.DeleteFeature(feature);
    }

    function getSupportedGetFeatureInfoFormats(isySubLayer, callback) {
        featureInfo.GetSupportedGetFeatureInfoFormats(isySubLayer, callback);
    }

    function getSupportedGetFeatureFormats(isySubLayer, callback) {
        featureInfo.GetSupportedGetFeatureFormats(isySubLayer, callback);
    }

    function arrangeLayers() {
        if (getConfigLayerCount() === getLayerCount()) {
            layerHandler.arrangeLayers();
        }
    }

    function convertGmlToGeoJson(gml) {
        return mapImplementation.ConvertGmlToGeoJson(gml);
    }

    function _handlePointSelect(coordinate) {
        featureInfo.HandlePointSelect(coordinate, _getLayersSupportingGetFeatureInfo());
    }

    function _getLayersSupportingGetFeatureInfo() {
        var visibleSubLayers = getVisibleSubLayers();
        return visibleSubLayers.filter(function (subLayer) {
            if (subLayer.featureInfo) {
                return subLayer.featureInfo.supportsGetFeatureInfo === true;
            } else {
                return false;
            }
        });
    }

    function _handleBoxSelect(boxExtent) {
        featureInfo.HandleBoxSelect(boxExtent, _getLayersSupportingGetFeature());
    }

    function _getLayersSupportingGetFeature() {
        var visibleSubLayers = getVisibleSubLayers();
        return visibleSubLayers.filter(function (subLayer) {
            return subLayer.featureInfo.supportsGetFeature === true;
        });
    }

    function _handleEditSelect(coordinate) {
        mapImplementation.HandlePointSelect(coordinate);
    }

    /*
        Feature Info End
     */

    /*
        Measure Start
     */

    function activateMeasure(options) {
        mapImplementation.ActivateMeasure(options);
    }

    function deactivateMeasure() {
        mapImplementation.DeactivateMeasure();
    }

    /*
        Measure End
     */

    /*
     Measure line Start
     */

    function activateMeasureLine(options) {
        mapImplementation.ActivateMeasureLine(options);
    }

    function deactivateMeasureLine() {
        mapImplementation.DeactivateMeasureLine();
    }

    /*
     Measure line End
     */

    /*
     Add Feature Start
     */

    function activateAddLayerFeature(options) {
        mapImplementation.ActivateAddLayerFeature(options);
    }

    function deactivateAddLayerFeature() {
        mapImplementation.DeactivateAddLayerFeature();
    }

    /*
     Add Feature End
     */

    /*
     Add Feature Gps Start
     */

    function activateAddFeatureGps(options) {
        mapImplementation.ActivateAddFeatureGps(options);
    }

    function addCoordinatesGps(coordinates) {
        mapImplementation.AddCoordinatesGps(coordinates);
    }

    function deactivateAddFeatureGps() {
        mapImplementation.DeactivateAddFeatureGps();
    }

    /*
     Add Feature Gps End
     */

    /*
     Modify Feature Start
     */

    function activateModifyFeature(options) {
        mapImplementation.ActivateModifyFeature(options);
    }

    function deactivateModifyFeature() {
        mapImplementation.DeactivateModifyFeature();
    }

    /*
     Modify Feature End
     */

    /*
     DrawFeature Start
     */

    function activateDrawFeature(options) {
        mapImplementation.ActivateDrawFeature(options);
    }

    function deactivateDrawFeature(options) {
        mapImplementation.DeactivateDrawFeature(options);
    }

    /*
     DrawFeature End
     */

    /*
     Offline Start
     */

    function initOffline() {
        mapImplementation.InitOffline();
    }

    function activateOffline() {
        mapImplementation.ActivateOffline();
    }

    function startCaching(zoomLevelMin, zoomLevelMax, extentView) {
        mapImplementation.StartCaching(zoomLevelMin, zoomLevelMax, extentView);
    }

    function stopCaching() {
        mapImplementation.StopCaching();
    }

    function deleteDatabase(callback, zoomlevels, eventhandler) {
        mapImplementation.DeleteDatabase(callback, zoomlevels, eventhandler);
    }

    function cacheDatabaseExist() {
        return mapImplementation.CacheDatabaseExist();
    }

    function calculateTileCount(zoomLevelMin, zoomLevelMax, extentView) {
        return mapImplementation.CalculateTileCount(zoomLevelMin, zoomLevelMax, extentView);
    }

    function getResource(url, contentType, callback) {
        mapImplementation.GetResource(url, contentType, callback);
    }

    function getConfigResource(url, contentType, callback) {
        mapImplementation.GetConfigResource(url, contentType, callback);
    }

    function getResourceFromJson(url, contentType, callback) {
        mapImplementation.GetResourceFromJson(url, contentType, callback);
    }

    function getLayerResource(key, name, url) {
        mapImplementation.GetLayerResource(key, name, url);
    }

    function deactivateOffline() {
        mapImplementation.DeactivateOffline();
    }

    /*
     Offline End
     */

    /*
     HoverInfo Start
     */
    function activateHoverInfo() {
        mapImplementation.ActivateHoverInfo();
    }

    function deactivateHoverInfo() {
        mapImplementation.DeactivateHoverInfo();
    }

    /*
     HoverInfo End
     */


    /*
     PrintBoxSelect Start
     */
    function activatePrintBoxSelect(options) {
        mapImplementation.ActivatePrintBoxSelect(options);
    }

    function deactivatePrintBoxSelect() {
        mapImplementation.DeactivatePrintBoxSelect();
    }

    /*
     PrintBoxSelect End
     */

    /*
     AddLayerUrl Start
     */
    function activateAddLayerUrl(options) {
        mapImplementation.ActivateAddLayerUrl(options);
    }

    function deactivateAddLayerUrl() {
        mapImplementation.DeactivateAddLayerUrl();
    }

    /*
     AddLayerUrl End
     */

    /*
        Utility functions Start
     */

    function extentToGeoJson(x, y) {
        mapImplementation.ExtentToGeoJson(x, y);
    }

    function setStateFromUrlParams(viewPropertyObject) {
        mapImplementation.ChangeView(viewPropertyObject);

        if (viewPropertyObject.layers) {
            var layerGuids = viewPropertyObject.layers;
            var guids = layerGuids.split(",");
            guids.forEach(function (guid) {
                var layer = getLayerById(guid);
                if (layer) {
                    if (layer.isBaseLayer === true) {
                        setBaseLayer(layer);
                    } else {
                        showLayer(layer);
                    }
                }
            });
        }
    }

    function setLegendGraphics(isyLayer) {
        isyLayer.legendGraphicUrls = [];
        for (var i = 0; i < isyLayer.subLayers.length; i++) {
            var subLayer = isyLayer.subLayers[i];
            if (isyLayer.isVisible && _shouldBeVisible(subLayer)) {
                isyLayer.legendGraphicUrls.push(subLayer.legendGraphicUrl);
            }
        }
    }

    function addZoom() {
        mapImplementation.AddZoom();
    }

    function addZoomSlider() {
        mapImplementation.AddZoomSlider();
    }

    function addZoomToExtent(extent) {
        mapImplementation.AddZoomToExtent(extent);
    }

    function addScaleLine() {
        mapImplementation.AddScaleLine();
    }

    /*function addVectorTestData(){
        var callback = function(data){
            showHighlightedFeatures(featureParser.Parse(data));
        };
        var url = 'assets/mapConfig/testdata.json';
        httpHelper.get(url).success(callback);
    }*/

    function zoomToLayer(isySubLayer) {
        mapImplementation.ZoomToLayer(isySubLayer);
    }

    function zoomToLayers(isySubLayers) {
        mapImplementation.ZoomToLayers(isySubLayers);
    }

    function fitExtent(extent) {
        mapImplementation.FitExtent(extent);
    }

    function getCenter() {
        return mapImplementation.GetCenter();
    }

    function setCenter(center) {
        return mapImplementation.SetCenter(center);
    }

    function getZoom() {
        return mapImplementation.GetZoom();
    }

    function setZoom(zoom) {
        mapImplementation.SetZoom(zoom);
    }

    function getRotation() {
        return mapImplementation.GetRotation();
    }

    function setRotation(angle, anchor) {
        mapImplementation.SetRotation(angle, anchor);
    }

    function getEpsgCode() {
        return mapImplementation.GetEpsgCode();
    }

    function getVectorLayers(isySubLayer, source) {
        return mapImplementation.GetVectorLayers(isySubLayer, source);
    }

    function getConfigLayerCount() {
        if (mapConfiguration) {
            var totalCount = 0;
            mapConfiguration.layers.forEach(function (layer) {
                if (layer.isVisible) {
                    layer.subLayers.forEach(function () {
                        totalCount++;
                    });
                }
            });
            return totalCount;
        }
    }

    function getLayerCount() {
        return mapImplementation.GetLayerCount();
    }

    function getCenterFromExtent(extent) {
        return mapImplementation.GetCenterFromExtent(extent);
    }

    function getScale() {
        return mapImplementation.GetScale();
    }

    function getFeatureCollection(isySubLayer) {
        return mapImplementation.GetFeatureCollection(isySubLayer);
    }

    function getFeaturesInMap(isySubLayer) {
        return mapImplementation.GetFeaturesInMap(isySubLayer);
    }

    function getFeatureExtent(feature) {
        return mapImplementation.GetFeatureExtent(feature);
    }

    function getLegendStyles(isySubLayer) {
        return mapImplementation.GetLegendStyles(isySubLayer);
    }

    function getExtent() {
        return mapImplementation.GetExtent();
    }

    function getUrlObject() {
        return mapImplementation.GetUrlObject();
    }

    function getGeolocation() {
        return mapImplementation.GetGeolocation();
    }

    function removeGeolocation() {
        return mapImplementation.RemoveGeolocation();
    }

    function infoClickSimulation(coordinate) {
        _handlePointSelect(coordinate);
    }

    function setTranslateOptions(translate) {
        mapImplementation.SetTranslateOptions(translate);
    }

    function transformCoordinates(fromEpsg, toEpsg, coordinates) {
        return mapImplementation.TransformCoordinates(fromEpsg, toEpsg, coordinates);
    }

    function transformFromGeographic(coordinates) {
        return mapImplementation.TransformFromGeographic(coordinates);
    }

    function transformToGeographic(coordinates) {
        return mapImplementation.TransformToGeographic(coordinates);
    }

    function removeIsyToken() {
        mapImplementation.RemoveIsyToken();
    }

    function setIsyToken(token) {
        mapImplementation.SetIsyToken(token);
    }

    function showCustomMessage(message) {
        mapImplementation.ShowCustomMessage(message);
    }

    /*
        Utility functions End
     */

    return {
        // Start up start
        Init: init,
        // Start up end

        /***********************************/

        // Layer start
        AddLayer: addLayer,
        AddDataToLayer: addDataToLayer,
        RemoveDataFromLayer: removeDataFromLayer,
        ClearLayer: clearLayer,
        ShowLayer: showLayer,
        HideLayer: hideLayer,
        GetOverlayLayers: getOverlayLayers,
        GetBaseLayers: getBaseLayers,
        GetLayerById: getLayerById,
        GetFirstVisibleBaseLayer: getFirstVisibleBaseLayer,
        SetBaseLayer: setBaseLayer,
        SetStateFromUrlParams: setStateFromUrlParams,
        SetLayerOpacity: setLayerOpacity,
        MoveLayerToIndex: moveLayerToIndex,
        MoveLayerAbove: moveLayerAbove,
        MoveLayerToIndexInGroup: moveLayerToIndexInGroup,
        // Layer end

        /***********************************/

        // Category start
        GetCategoryById: getCategoryById,
        GetCategories: getCategories,
        // Category end

        /***********************************/

        // Groups start
        GetGroupById: getGroupById,
        GetGroups: getGroups,
        // Category end

        /***********************************/

        // Export start
        RenderSync: renderSync,
        ExportMap: exportMap,
        ActivateExport: activateExport,
        DeactivateExport: deactivateExport,
        // Export end

        /***********************************/

        // Feature Info start
        ActivateInfoClick: activateInfoClick,
        DeactivateInfoClick: deactivateInfoClick,
        ShowHighlightedFeatures: showHighlightedFeatures,
        ClearHighlightedFeatures: clearHighlightedFeatures,
        SetHighlightStyle: setHighlightStyle,
        SetInfoMarker: setInfoMarker,
        SetImageInfoMarker: setImageInfoMarker,
        GetSupportedGetFeatureInfoFormats: getSupportedGetFeatureInfoFormats,
        GetSupportedGetFeatureFormats: getSupportedGetFeatureFormats,
        RemoveInfoMarker: removeInfoMarker,
        RemoveInfoMarkers: removeInfoMarkers,
        ActivateBoxSelect: activateBoxSelect,
        DeactivateBoxSelect: deactivateBoxSelect,
        GetFeatureCollection: getFeatureCollection,
        GetFeaturesInMap: getFeaturesInMap,
        GetFeatureExtent: getFeatureExtent,
        // Feature Info end

        /***********************************/

        // Feature edit start
        InitEdit: initEdit,
        ActivateEditClick: activateEditClick,
        DeactivateEditClick: deactivateEditClick,
        UpdateFeature: updateFeature,
        InsertFeature: insertFeature,
        DeleteFeature: deleteFeature,
        // Feature edit end

        /***********************************/

        // Hover Info start
        ActivateHoverInfo: activateHoverInfo,
        DeactivateHoverInfo: deactivateHoverInfo,
        // Hover Info end

        /***********************************/

        // Measure start
        ActivateMeasure: activateMeasure,
        DeactivateMeasure: deactivateMeasure,
        // Measure end

        /***********************************/

        // Offline start
        InitOffline: initOffline,
        ActivateOffline: activateOffline,
        StartCaching: startCaching,
        StopCaching: stopCaching,
        DeleteDatabase: deleteDatabase,
        CacheDatabaseExist: cacheDatabaseExist,
        CalculateTileCount: calculateTileCount,
        GetResource: getResource,
        GetConfigResource: getConfigResource,
        GetLayerResource: getLayerResource,
        DeactivateOffline: deactivateOffline,
        GetResourceFromJson: getResourceFromJson,
        // Offline end

        /***********************************/

        // MeasureLine start
        ActivateMeasureLine: activateMeasureLine,
        DeactivateMeasureLine: deactivateMeasureLine,
        // MeasureLine end

        /***********************************/

        // AddLayerFeature start
        ActivateAddLayerFeature: activateAddLayerFeature,
        DeactivateAddLayerFeature: deactivateAddLayerFeature,
        // AddLayerFeature end

        /***********************************/

        // AddFeatureGps start
        ActivateAddFeatureGps: activateAddFeatureGps,
        AddCoordinatesGps: addCoordinatesGps,
        DeactivateAddFeatureGps: deactivateAddFeatureGps,
        // AddFeatureGps end

        /***********************************/

        // ModifyFeature start
        ActivateModifyFeature: activateModifyFeature,
        DeactivateModifyFeature: deactivateModifyFeature,
        // ModifyFeature end

        /***********************************/

        // DrawFeature start
        ActivateDrawFeature: activateDrawFeature,
        DeactivateDrawFeature: deactivateDrawFeature,
        // DrawFeature end

        /***********************************/

        // PrintBoxSelect Start
        ActivatePrintBoxSelect: activatePrintBoxSelect,
        DeactivatePrintBoxSelect: deactivatePrintBoxSelect,
        // PrintBoxSelect End

        /***********************************/

        // AddLayerUrl Start
        ActivateAddLayerUrl: activateAddLayerUrl,
        DeactivateAddLayerUrl: deactivateAddLayerUrl,
        // AddLayerUrl End

        /***********************************/

        // Utility start
        ArrangeLayers: arrangeLayers,
        ConvertGmlToGeoJson: convertGmlToGeoJson,
        SetLegendGraphics: setLegendGraphics,
        ExtentToGeoJson: extentToGeoJson,
        AddZoom: addZoom,
        AddZoomSlider: addZoomSlider,
        AddZoomToExtent: addZoomToExtent,
        AddScaleLine: addScaleLine,
        ZoomToLayer: zoomToLayer,
        ZoomToLayers: zoomToLayers,
        FitExtent: fitExtent,
        GetCenter: getCenter,
        SetCenter: setCenter,
        GetZoom: getZoom,
        SetZoom: setZoom,
        GetRotation: getRotation,
        SetRotation: setRotation,
        GetEpsgCode: getEpsgCode,
        GetVectorLayers: getVectorLayers,
        GetCenterFromExtent: getCenterFromExtent,
        GetScale: getScale,
        ChangeView: changeView,
        GetLegendStyles: getLegendStyles,
        RedrawMap: redrawMap,
        RefreshMap: refreshMap,
        RefreshLayerByGuid: refreshLayerByGuid,
        ShowInfoMarker: showInfoMarker,
        ShowInfoMarkers: showInfoMarkers,
        GetExtent: getExtent,
        GetVisibleSubLayers: getVisibleSubLayers,
        GetUrlObject: getUrlObject,
        GetGeolocation: getGeolocation,
        RemoveGeolocation: removeGeolocation,
        InfoClickSimulation: infoClickSimulation,
        SetTranslateOptions: setTranslateOptions,
        TransformCoordinates: transformCoordinates,
        TransformFromGeographic: transformFromGeographic,
        TransformToGeographic: transformToGeographic,
        DescribeFeature: describeFeature,
        RemoveIsyToken: removeIsyToken,
        SetIsyToken: setIsyToken,
        ShowCustomMessage: showCustomMessage
        //AddVectorTestData: addVectorTestData
        // Utility end
    };
};
