"use strict";

var _interopRequireDefault = require("C:\\code_git\\r_map.github\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parsePlainFeatureInfo = exports.parseGmlFeatureInfo = exports.parseCSV = exports.parseFeatureInfo = void 0;

var _slicedToArray2 = _interopRequireDefault(require("C:\\code_git\\r_map.github\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/esm/slicedToArray"));

var _fastXmlParser = _interopRequireDefault(require("fast-xml-parser"));

var parseFeatureInfo = function parseFeatureInfo(data, format) {
  switch (format) {
    case 'text/plain':
      {
        return parsePlainFeatureInfo(data);
      }

    case 'text/html':
      {
        return data;
      }

    case 'text/xml':
      {
        // ArcGis Simple XML with just fields
        // Or GML v ?
        return parseGmlFeatureInfo(data);
      }

    case 'text/xml; subtype=gml/3.1.1':
      {
        return parseGmlFeatureInfo(data);
      }

    case 'application/vnd.ogc.gml':
      {
        return parseGmlFeatureInfo(data);
      }

    case 'application/vnd.ogc.gml/3.1.1':
      {
        return parseGmlFeatureInfo(data);
      }

    case 'application/json':
      {
        return data;
      }

    default:
      return parsePlainFeatureInfo(data);
  }
};

exports.parseFeatureInfo = parseFeatureInfo;

var parseCSV = function parseCSV(data) {
  var cellDelims = ";";
  var lineDelims = "; ";
  var line = [];
  var lines = [];
  var layer = {};
  var layername = '';

  if (data.startsWith('@')) {
    layername = data.substring(data.indexOf('@') + 1, data.indexOf(' '));
    data = data.substring(data.indexOf(' ') + 1);
  }

  data = data.split(lineDelims);
  data.pop();

  for (var i = 0; i < data.length; i++) {
    line = data[i].split(cellDelims);
    lines.push(line);
  }

  layer[layername] = mergeArrayToObject(lines[0], lines[1]);
  return [layer];
};

exports.parseCSV = parseCSV;

var parseGmlFeatureInfo = function parseGmlFeatureInfo(data) {
  var returnValue = '';

  var parsedGml = _fastXmlParser.default.parse(data, {
    ignoreAttributes: false,
    ignoreNameSpace: true,
    attributeNamePrefix: "",
    allowBooleanAttributes: true
  });

  if (parsedGml.msGMLOutput) {
    returnValue = parsedGml.msGMLOutput;
  } else if (parsedGml.FeatureCollection) {
    returnValue = parsedGml.FeatureCollection.featureMember;
  }

  return [returnValue];
};

exports.parseGmlFeatureInfo = parseGmlFeatureInfo;

var mergeArrayToObject = function mergeArrayToObject(array_1, array_2) {
  var obj = {};

  for (var i = 0; i < array_1.length; i++) {
    obj[array_1[i]] = array_2[i];
  }

  return obj;
};

var arrayToObject = function arrayToObject(array) {
  return array.reduce(function (obj, item) {
    if (typeof item === 'string' && item.length > 0) {
      var _item$trim$split = item.trim().split(' :'),
          _item$trim$split2 = (0, _slicedToArray2.default)(_item$trim$split, 2),
          key = _item$trim$split2[0],
          value = _item$trim$split2[1];

      obj[key] = value.replace(/'/g, '').trim();
    } else {
      if (item.objid) {
        obj[item.objid] = item;
      } else if (item.fid) {
        obj[item.fid] = item;
      } else {
        obj[0] = item;
      }
    }

    return obj;
  }, {});
};

var parsePlainFeatureInfo = function parsePlainFeatureInfo(data) {
  var parsedFeatureInfo;
  if (data === "no features were found") return '';

  if (data.includes('Layer')) {
    var featureInfo = data.split("\n\n");
    featureInfo.shift();
    parsedFeatureInfo = featureInfo.map(function (layer) {
      var r_layer = {};
      var subf = layer.split(/(Layer[^\r\n]*)/);
      subf.shift();
      var layerName = subf.splice(0, 1)[0].split('Layer ')[1].replace(/'/g, '');
      r_layer[layerName] = subf.map(function (f) {
        var feature = f.split(/(Feature[^\r\n]*)/);
        feature.shift();
        var feature1 = feature.splice(0, 1)[0].split('Feature ')[1].replace(/:/g, '').trim();

        if (Array.isArray(feature) && feature[0].length > 1) {
          feature = feature.map(function (item) {
            item = item.trim().replace(/=/g, ':').split('\n');
            return arrayToObject(item);
          });
          return arrayToObject(feature);
        } else {
          return {
            feature: feature1
          };
        }
      });
      return r_layer;
    });
  } else if (parseCSV(data).length !== 0) {
    parsedFeatureInfo = parseCSV(data);
  } else {
    parsedFeatureInfo = [data];
  }

  return parsedFeatureInfo;
};

exports.parsePlainFeatureInfo = parsePlainFeatureInfo;