"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parsePlainFeatureInfo = exports.parseGmlFeatureInfo = exports.parseFeatureInfo = exports.parseCSV = void 0;

var _fastXmlParser = _interopRequireDefault(require("fast-xml-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
          _item$trim$split2 = _slicedToArray(_item$trim$split, 2),
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
  if (data === "no features were found" || data.includes('Search returned no results')) return '';

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