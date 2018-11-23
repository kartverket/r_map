import proj4 from "proj4";
import {
    transformExtent,
    get
} from 'ol/proj';
import TileLayer from "ol/layer/Tile";
import ImageLayer from "ol/layer/Image";
import ImageWMS from 'ol/source/ImageWMS.js';
import TileWMS from "ol/source/TileWMS";
import queryString from 'query-string'
/**
 * @ngdoc method
 * @name addWmsToMapFromCap
 *
 * @description
 * Add a new ol.Layer object to the map from a capabilities parsed
 * ojbect.
 *
 * @param {ol.map} map to add the layer
 * @param {Object} getCapLayer object to convert
 * @param {string} style of the style to use
 */
export const addWmsToMapFromCap = (map, getCapLayer, style = null) => {
    var isNewLayer = true;
    var returnLayer;

    map.getLayers().forEach(function (layer) {
        if (layer.get('name') === (getCapLayer.Name || getCapLayer.Title)) {
            isNewLayer = false;
            var visibility = layer.getVisible();
            if (visibility === false) {
                layer.setVisible(true);
            } else if (visibility === true) {
                layer.setVisible(false);
            }
            returnLayer = layer;
        }
    });
    if (isNewLayer) {
        returnLayer = createOlWMSFromCap(map, getCapLayer);
        map.addLayer(returnLayer);
    }
    return returnLayer;
}

export const addWmsToMapFromConfig = (map, wmslayer, project) => {
    var isNewLayer = true;
    var returnLayer;

    map.getLayers().forEach(function (layer) {
        if (layer.get('name') === wmslayer.layers) {
            isNewLayer = false;
            var visibility = layer.getVisible();
            if (visibility === false) {
                layer.setVisible(true);
            } else if (visibility === true) {
                layer.setVisible(false);
            }
            returnLayer = layer;
        }
    });
    if (isNewLayer) {
        returnLayer = createOlWMSFromCap(map, wmslayer, project);
        map.addLayer(returnLayer);
    }
    return returnLayer;
}

/**
 * @description
 * Parse an object describing a layer from
 * a getCapabilities document parsing. Create a ol.Layer WMS
 * from this object and add it to the map with all known
 * properties.
 *
 * @param {ol.map} map to add the layer
 * @param {Object} getCapLayer object to convert
 * @param {string} url of the wms service (we want this one instead
 *  of the one from the capabilities to be sure its persistent)
 * @return {ol.Layer} the created layer
 */
export const createOlWMSFromCap = (map, getCapLayer, project) => {
    var attribution, attributionUrl, metadata, errors = [];
    if (getCapLayer) {
        if (getCapLayer.Attribution !== undefined) {
            if (Array.isArray(getCapLayer.Attribution)) {
                console.warn('');
            } else {
                attribution = getCapLayer.Attribution.Title;
                if (getCapLayer.Attribution.OnlineResource) {
                    attributionUrl = getCapLayer.Attribution.OnlineResource;
                }
            }
        }
        if (Array.isArray(getCapLayer.MetadataURL)) {
            metadata = getCapLayer.MetadataURL[0].OnlineResource;
        }

        var layerParam = {
            LAYERS: getCapLayer.layers
        };
        if (getCapLayer.version) {
            layerParam.VERSION = getCapLayer.version;
        }

        var projCode = map.getView().getProjection().getCode();

        var layer = createOlWMS(map, layerParam, {
            url: getCapLayer.url,
            label: getCapLayer.title,
            attribution: attribution,
            attributionUrl: attributionUrl,
            projection: projCode,
            legend: getCapLayer.legendurl,
            group: getCapLayer.group,
            metadata: metadata,
            extent: getLayerExtentFromGetCap(map,
                getCapLayer),
            minResolution: getResolutionFromScale(
                map.getView().getProjection(),
                getCapLayer.MinScaleDenominator),
            maxResolution: getResolutionFromScale(
                map.getView().getProjection(),
                getCapLayer.MaxScaleDenominator)
        });

        if (Array.isArray(getCapLayer.Dimension)) {
            for (var i = 0; i < getCapLayer.Dimension.length; i++) {
                if (getCapLayer.Dimension[i].name === 'elevation') {
                    layer.set('elevation',
                        getCapLayer.Dimension[i].values.split(','));
                }
                if (getCapLayer.Dimension[i].name === 'time') {
                    layer.set('time',
                        getCapLayer.Dimension[i].values.split(','));
                }
            }
        }
        if (Array.isArray(getCapLayer.Style) &&
            getCapLayer.Style.length > 1) {
            layer.set('style', getCapLayer.Style);
        }

        layer.set('advanced', !!(layer.get('elevation') ||
            layer.get('time') || layer.get('style')));

        layer.set('errors', errors);

        map.on('singleclick', function (evt) {
            var viewResolution = (map.getView().getResolution());
            var url = layer.getSource().getGetFeatureInfoUrl(
                evt.coordinate, viewResolution, map.getView().getProjection(), {
                    INFO_FORMAT: 'text/plain'
                });
            if (url) {
                fetch(url).then(
                    function (response) {
                        console.log('FeatureInfo : ' + response.data)
                    });
            }
        });

        return layer;
    }

}
export const getWMSCapabilities= (url) =>{
    var defer = $q.defer();
    var counter = 0;
    var newUrl;
    var request = function (url) {
      if (url) {
        if (counter === 0) {
          newUrl = mergeDefaultParams(url, {
            service: 'WMS',
            request: 'GetCapabilities'
          });
        } else {                
          newUrl = gnUrlUtils.append('//www.norgeskart.no/ws/px.py', url);
        }

        //send request and decode result
        $http.get(newUrl)
          .then(function (result) {
            try {
              defer.resolve(displayFileContent(result.data));
            } catch (e) {
              defer.reject('capabilitiesParseError');
            }
          }, function errorCallback() {
            if (counter < 1) {
              counter++;
              request(newUrl);
            } else {
              defer.reject('capabilities error');
            }
          });
      } else {
        defer.reject();
      }
    };
    request(url);
    return defer.promise;
  },

  export const getWMTSCapabilities = (url) => {
    var defer = $q.defer();
    if (url) {
      url = mergeDefaultParams(url, {
        REQUEST: 'GetCapabilities',
        service: 'WMTS'
      });

      if (gnUrlUtils.isValid(url)) {
        $http.get(url, {
            cache: true
          })
          .then(function (result) {
            if (data) {
              defer.resolve(parseWMTSCapabilities(result.data));
            } else {
              defer.reject();
            }
          });
      }
    }
    return defer.promise;
  },

  export const getWFSCapabilities = (url, version) => {
    var defer = $q.defer();
    if (url) {
      defaultVersion = '1.1.0';
      version = version || defaultVersion;
      url = mergeDefaultParams(url, {
        REQUEST: 'GetCapabilities',
        service: 'WFS',
        version: version
      });

      $http.get(url, {
          cache: true
        })
        .then(function (result) {
          var xfsCap = parseWFSCapabilities(result.data);

          if (!xfsCap || xfsCap.exception !== undefined) {
            defer.reject({
              msg: 'wfsGetCapabilitiesFailed',
              owsExceptionReport: xfsCap
            });
          } else {
            defer.resolve(xfsCap);
          }
        });
    }
    return defer.promise;
  },

const getLayerExtentFromGetCap = (map, getCapLayer) => {
    var extent = null;
    var layer = getCapLayer;
    var proj = map.getView().getProjection();

    //var ext = layer.BoundingBox[0].extent;
    //var olExtent = [ext[1],ext[0],ext[3],ext[2]];
    // TODO fix using layer.BoundingBox[0].extent
    // when sextant fix his capabilities

    var setProjectionFromEPSG = function (bbox) {
        var epsg_url = 'https://epsg.io/?format=json&q=' + bbox.crs.split(':')[1];
        return fetch(epsg_url)
            .then(function (response) {
                var results = response.data.results;
                if (results && results.length > 0) {
                    for (var i = 0, ii = results.length; i < ii; i++) {
                        var result = results[i];
                        if (result) {
                            if (result['code'] && result['code'].length > 0 && result['proj4'] && result['proj4'].length > 0) {
                                proj4.defs('EPSG:' + result['code'], result['proj4']);
                            }
                        }
                    }
                }
            });
    };

    var bboxProp;
    ['EX_GeographicBoundingBox', 'WGS84BoundingBox'].forEach(
        function (prop) {
            if (Array.isArray(layer[prop])) {
                bboxProp = layer[prop];
            }
        });

    if (bboxProp) {
        extent = transformExtent(bboxProp, 'EPSG:4326', proj);
    } else if (Array.isArray(layer.BoundingBox)) {
        for (var i = 0; i < layer.BoundingBox.length; i++) {
            var bbox = layer.BoundingBox[i];
            if (!get(bbox.crs)) {
                // eslint-disable-next-line
                setProjectionFromEPSG(bbox).then( () => {
                    extent = transformExtent(bbox.extent, bbox.crs || 'EPSG:4326', proj);
                });
            } else {
                if (bbox.crs === proj.getCode() || layer.BoundingBox.length === 1) {
                    extent = transformExtent(bbox.extent, bbox.crs || 'EPSG:4326', proj);
                    break;
                }
            }
        }
    }
    return extent;
}

/**
 * @description
 * Compute the resolution from a given scale
 *
 * @param {ol.Projection} projection of the map
 * @param {number} scale to convert
 * @return {number} resolution
 */
export const getResolutionFromScale = (projection, scale) => {
    return scale && scale * 0.00028 / projection.getMetersPerUnit();
}

/**
 * @description
 * Create a new ol.Layer object, based on given options.
 *
 * @param {ol.Map} map to add the layer
 * @param {Object} layerParams contains the PARAMS that is given to
 *  the ol.source object
 * @param {Object} layerOptions options to pass to layer constructor
 * @param {Object} layerOptions options to pass to layer constructor
 */
export const createOlWMS = (map, layerParams, layerOptions) => {
    var options = layerOptions || {};

    var source, olLayer;
    const singleTileWMS = false; // testing singleTile
    if (singleTileWMS) {
        source = new ImageWMS({
            params: layerParams,
            url: options.url,
            crossOrigin: 'anonymous',
            projection: layerOptions.projection,
            ratio: getImageSourceRatio(map, 2048)
        });
    } else {
        source = new TileWMS({
            params: layerParams,
            url: options.url,
            crossOrigin: 'anonymous',
            projection: layerOptions.projection
            // ,gutter: 15
        });
    }

    layerOptions = {
        url: options.url,
        type: 'WMS',
        opacity: options.opacity,
        visible: options.visible,
        preload: Infinity,
        source: source,
        legend: options.legend,
        attribution: options.attribution,
        attributionUrl: options.attributionUrl,
        label: options.label,
        group: options.group,
        advanced: options.advanced,
        minResolution: options.minResolution,
        maxResolution: options.maxResolution,
        cextent: options.extent,
        name: layerParams.LAYERS
    };
    if (singleTileWMS) {
        olLayer = new TileLayer(layerOptions);
    } else {
        olLayer = new ImageLayer(layerOptions);
    }

    if (options.metadata) {
        olLayer.set('metadataUrl', options.metadata);
        var params = queryString.parse(options.metadata);
        var uuid = params.uuid || params.id;
        if (!uuid) {
            var res = new RegExp(/#\/metadata\/(.*)/g).exec(options.metadata);
            if (Array.isArray(res) && res.length === 2) {
                uuid = res[1];
            }
        }
        if (uuid) {
            olLayer.set('metadataUuid', uuid);
        }
    }
    // ngeoDecorateLayer(olLayer);
    olLayer.displayInLayerManager = true;

    return olLayer;
}

const getImageSourceRatio = (map, maxWidth) => {
    var width = (map.getSize() && map.getSize()[0])
    var ratio = maxWidth / width;
    ratio = Math.floor(ratio * 100) / 100;
    return Math.min(1.5, Math.max(1, ratio));
  };