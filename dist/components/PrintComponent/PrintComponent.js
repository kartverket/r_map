"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactBootstrap = require("react-bootstrap");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const printCapabilitiesUrl = 'http://localhost:5000/capabilities'; //'https://ws.geonorge.no/print/kv/capabilities.json'
const printUrl = 'http://localhost:5000/create'; //'https://ws.geonorge.no/print/kv/report.pdf'
const printScales = [250, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000, 250000, 500000, 1000000, 2500000];
const Print = props => {
  const [printCapabilities, setPrintCapabilities] = (0, _react.useState)();
  const [maltype, setMaltype] = (0, _react.useState)();
  const [selectedPrintScale, setScale] = (0, _react.useState)();
  const [selectedDpi, setSelectedDpi] = (0, _react.useState)(128);
  (0, _react.useEffect)(() => {
    fetch(printCapabilitiesUrl).then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    }).then(result => setPrintCapabilities(result)).catch(error => console.warn(error));
  }, []);
  const setPrintBox = () => {};
  const setLayoutType = layout => {
    setMaltype(layout);
    setPrintBox();
  };
  const setPrintScale = scale => {
    setScale(scale);
    setPrintBox();
  };
  const removeKeys = (obj, keys) => {
    var index;
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        switch (typeof obj[prop]) {
          case "string":
            index = keys.indexOf(prop);
            if (index > -1) {
              delete obj[prop];
            }
            break;
          case "object":
            index = keys.indexOf(prop);
            if (index > -1) {
              delete obj[prop];
            } else {
              removeKeys(obj[prop], keys);
            }
            break;
          default:
            break;
        }
      }
    }
  };
  const makePrint = () => {
    let center = window.olMap.getView().getCenter();
    let layers = window.olMap.getLayers().getArray();
    layers = layers.filter(function (layer) {
      return layer.get("name") !== "PrintBox";
    }).filter(function (layer) {
      return layer.getVisible() === true;
    }).sort(function (a, b) {
      return b.layerIndex - (a.layerIndex || Infinity);
    });
    let printJson = {
      attributes: {
        map: {
          center: center,
          dpi: selectedDpi,
          layers: [],
          rotation: 0,
          // ToDo: calculate the angle so that north can be shown correctly
          projection: "EPSG:25833",
          scale: selectedPrintScale
        },
        pos: Number(Math.round(center[0] + "e" + 2) + "e-" + 2) + ", " + Number(Math.round(center[1] + "e" + 2) + "e-" + 2),
        scale_string: "1:" + selectedPrintScale,
        title: "Geonorge Print"
      },
      layout: maltype,
      outputFormat: "pdf",
      outputFilename: "norgeskart-utskrift"
    };
    for (let i = 0; i < layers.length; i++) {
      let printLayer = {};
      let customParams = {
        TRANSPARENT: "true"
      };
      let baseUrl = "";
      let sourceType = "VECTOR";
      if (layers[i].getProperties().config) {
        baseUrl = layers[i].getProperties().config.url[0];
        sourceType = layers[i].getProperties().config.source;
      } else if (layers[i].getSource().getUrl()) {
        baseUrl = layers[i].getSource().getUrl();
      }
      if (layers[0].getSource().constructor.name === 'ImageWMS') {
        sourceType = 'WMS';
      }
      if (baseUrl.substr(0, 2) === "//") {
        baseUrl = "http:" + layers[i].getProperties().config.url[0];
      }
      let testUrl = baseUrl.split("?");
      if (testUrl.length > 1) {
        for (let b = 1; b < testUrl.length; b++) {
          let param = testUrl[b].split("=");
          customParams[param[0]] = testUrl[b].split("=").slice(1).join('=');
        }
        baseUrl = testUrl[0];
      }
      customParams = JSON.parse(JSON.stringify(customParams));
      switch (sourceType) {
        case "WMS":
          printLayer = {
            baseURL: baseUrl,
            customParams: customParams,
            imageFormat: layers[i].getProperties().config ? layers[i].getProperties().config.format : 'image/png',
            layers: [layers[i].getProperties().config ? layers[i].getProperties().config.name : layers[i].getSource().getParams().LAYERS],
            opacity: 1,
            type: sourceType
          };
          if (layers[i].getProperties().config && layers[i].getProperties().config.styles) {
            printLayer.styles = [layers[i].getProperties().config.styles];
          }
          break;
        case "WMTS":
          var identifier = "";
          if (layers[i].getProperties().config.matrixPrefix) {
            identifier = layers[i].getSource().getMatrixSet() + ":";
          }
          printLayer = {
            baseURL: baseUrl,
            customParams: customParams,
            style: "default",
            imageFormat: layers[i].getProperties().config.format,
            layer: layers[i].getProperties().config.name,
            opacity: 1,
            type: layers[i].getProperties().config.source,
            dimensions: null,
            requestEncoding: "KVP",
            dimensionParams: {},
            matrixSet: layers[i].getSource().getMatrixSet(),
            matrices: [{
              identifier: identifier + "0",
              scaleDenominator: 77371428.57142858,
              topLeftCorner: [-2500000, 9045984],
              tileSize: [256, 256],
              matrixSize: [1, 1]
            }, {
              identifier: identifier + "1",
              scaleDenominator: 38685714.28571429,
              topLeftCorner: [-2500000, 9045984],
              tileSize: [256, 256],
              matrixSize: [2, 2]
            }, {
              identifier: identifier + "2",
              scaleDenominator: 19342857.142857146,
              topLeftCorner: [-2500000, 9045984],
              tileSize: [256, 256],
              matrixSize: [4, 4]
            }, {
              identifier: identifier + "3",
              scaleDenominator: 9671428.571428573,
              topLeftCorner: [-2500000, 9045984],
              tileSize: [256, 256],
              matrixSize: [8, 8]
            }, {
              identifier: identifier + "4",
              scaleDenominator: 4835714.285714286,
              topLeftCorner: [-2500000, 9045984],
              tileSize: [256, 256],
              matrixSize: [16, 16]
            }, {
              identifier: identifier + "5",
              scaleDenominator: 2417857.142857143,
              topLeftCorner: [-2500000, 9045984],
              tileSize: [256, 256],
              matrixSize: [32, 32]
            }, {
              identifier: identifier + "6",
              scaleDenominator: 1208928.5714285716,
              topLeftCorner: [-2500000, 9045984],
              tileSize: [256, 256],
              matrixSize: [64, 64]
            }, {
              identifier: identifier + "7",
              scaleDenominator: 604464.2857142858,
              topLeftCorner: [-2500000, 9045984],
              tileSize: [256, 256],
              matrixSize: [128, 128]
            }, {
              identifier: identifier + "8",
              scaleDenominator: 302232.1428571429,
              topLeftCorner: [-2500000, 9045984],
              tileSize: [256, 256],
              matrixSize: [256, 256]
            }, {
              identifier: identifier + "9",
              scaleDenominator: 151116.07142857145,
              topLeftCorner: [-2500000, 9045984],
              tileSize: [256, 256],
              matrixSize: [512, 512]
            }, {
              identifier: identifier + "10",
              scaleDenominator: 75558.03571428572,
              topLeftCorner: [-2500000, 9045984],
              tileSize: [256, 256],
              matrixSize: [1024, 1024]
            }, {
              identifier: identifier + "11",
              scaleDenominator: 37779.01785714286,
              topLeftCorner: [-2500000, 9045984],
              tileSize: [256, 256],
              matrixSize: [2048, 2048]
            }, {
              identifier: identifier + "12",
              scaleDenominator: 18889.50892857143,
              topLeftCorner: [-2500000, 9045984],
              tileSize: [256, 256],
              matrixSize: [4096, 4096]
            }, {
              identifier: identifier + "13",
              scaleDenominator: 9444.754464285716,
              topLeftCorner: [-2500000, 9045984],
              tileSize: [256, 256],
              matrixSize: [8192, 8192]
            }, {
              identifier: identifier + "14",
              scaleDenominator: 4722.377232142858,
              topLeftCorner: [-2500000, 9045984],
              tileSize: [256, 256],
              matrixSize: [16384, 16384]
            }, {
              identifier: identifier + "15",
              scaleDenominator: 2361.188616071429,
              topLeftCorner: [-2500000, 9045984],
              tileSize: [256, 256],
              matrixSize: [32768, 32768]
            }, {
              identifier: identifier + "16",
              scaleDenominator: 1180.5943080357144,
              topLeftCorner: [-2500000, 9045984],
              tileSize: [256, 256],
              matrixSize: [65536, 65536]
            }, {
              identifier: identifier + "17",
              scaleDenominator: 590.2971540178572,
              topLeftCorner: [-2500000, 9045984],
              tileSize: [256, 256],
              matrixSize: [131072, 131072]
            }, {
              identifier: identifier + "18",
              scaleDenominator: 295.1485770089286,
              topLeftCorner: [-2500000, 9045984],
              tileSize: [256, 256],
              matrixSize: [262144, 262144]
            }]
          };
          break;
        case "VECTOR":
          let geojson;
          let styleCollection = {
            version: "2"
          };
          if (layers[i].getSource().getUrl() || layers[i].getSource().getFormat()) {
            if (layers[i].getSource().getUrl()[0].split(".").slice(-1)[0] === 'geojson') {
              geojson = layers[i].getSource().getUrl()[0];
            } else {
              geojson = layers[i].getSource().getUrl() + '&outputFormat=json&srsName=urn:x-ogc:def:crs:EPSG:25833';
            }
            styleCollection["*"] = {
              symbolizers: [{
                type: "polygon",
                fillColor: layers[i].getStyle().getFill().getColor(),
                fillOpacity: 0.6,
                strokeColor: layers[i].getStyle().getStroke().getColor(),
                strokeOpacity: 1,
                strokeWidth: 1,
                strokeLinecap: "round"
              }]
            };
          } else {
            // Assume GeoJson - drawing
            if (layers[i].getProperties().options && layers[i].getProperties().options.GeoJSON) {
              geojson = layers[i].getProperties().options.GeoJSON;
              geojson.features.forEach(function (feature) {
                var symbolizers = [];
                var id = "[IN('" + feature.id + "')]";
                switch (feature.geometry.type) {
                  case 'Point':
                    if (feature.properties.style.regularshape) {
                      var shape = 'circle';
                      var rotation = '0';
                      switch (feature.properties.style.regularshape.points) {
                        case 3:
                          shape = 'triangle';
                          break;
                        case 4:
                          shape = 'square';
                          rotation = '45';
                          break;
                        case 5:
                          shape = 'star';
                          break;
                        case 64:
                          shape = 'circle';
                          break;
                        default:
                          break;
                      }
                      symbolizers.push({
                        fillColor: feature.properties.style.regularshape.fill.color,
                        strokeColor: feature.properties.style.regularshape.fill.color,
                        pointRadius: feature.properties.style.regularshape.radius,
                        graphicName: shape,
                        rotation: rotation,
                        type: "point"
                      });
                    }
                    if (feature.properties.style.text) {
                      var font = feature.properties.style.text.font.split(" ");
                      var fontSize = "15px";
                      var fontFamily = "sans-serif";
                      if (font.length > 1) {
                        fontSize = font[0];
                        fontFamily = font[1];
                      }
                      symbolizers.push({
                        fillColor: feature.properties.style.text.fill.color,
                        strokeColor: feature.properties.style.text.fill.color,
                        fontColor: feature.properties.style.text.fill.color,
                        fontFamily: fontFamily,
                        fontSize: fontSize,
                        strokeWidth: feature.properties.style.text.stroke.width,
                        label: feature.properties.style.text.text,
                        haloColor: "white",
                        haloOpacity: "0.7",
                        haloRadius: "3.0",
                        type: "text"
                      });
                    }
                    break;
                  case 'LineString':
                    if (feature.properties.style.stroke) {
                      var strokeDashstyle = "solid";
                      if (feature.properties.style.stroke.lineDash) {
                        strokeDashstyle = feature.properties.style.stroke.lineDash.toString().replace(",", " ");
                      }
                      symbolizers = [{
                        fillColor: feature.properties.style.stroke.color,
                        label: feature.properties.measurement,
                        labelXOffset: "-40.0",
                        haloColor: "white",
                        haloOpacity: "0.7",
                        haloRadius: "3.0",
                        type: "text"
                      }, {
                        strokeColor: feature.properties.style.stroke.color,
                        strokeWidth: feature.properties.style.stroke.width,
                        strokeDashstyle: strokeDashstyle,
                        type: "line",
                        strokeOpacity: 1,
                        strokeLinecap: "round"
                      }];
                    }
                    break;
                  case 'Polygon':
                    var rgba = feature.properties.style.fill.color.substr(5).split(")")[0].split(",");
                    var opacity = 0.5;
                    if (rgba.length > 3) {
                      opacity = +rgba[3];
                    }
                    symbolizers = [{
                      fillColor: feature.properties.style.fill.color,
                      fillOpacity: opacity,
                      strokeColor: feature.properties.style.stroke.color,
                      strokeWidth: feature.properties.style.stroke.width,
                      type: "polygon"
                    }];
                    break;
                  default:
                    symbolizers = [{
                      fillColor: "red",
                      pointRadius: 5,
                      type: "point"
                    }, {
                      type: "line",
                      strokeColor: "black",
                      strokeOpacity: 1,
                      strokeWidth: 3,
                      strokeLinecap: "round",
                      strokeDashstyle: "dot"
                    }, {
                      type: "polygon",
                      fillColor: "#FF0000",
                      fillOpacity: 0.7,
                      strokeColor: "yellow",
                      strokeOpacity: 1,
                      strokeWidth: 3,
                      strokeLinecap: "round"
                    }];
                }
                styleCollection[id] = {
                  symbolizers: symbolizers
                };
              });
            }
          }
          if (geojson) {
            if (typeof geojson === 'string' || Object.keys(geojson.features).length !== 0) {
              var newGeojson = JSON.parse(JSON.stringify(geojson));
              removeKeys(newGeojson, "style");
              printLayer = {
                geoJson: newGeojson,
                type: "geojson",
                style: styleCollection
              };
            }
          }
          break;
        default:
          console.warn("Unexpected Layer type to print, let's try it");
          printLayer = {
            baseURL: layers[i].getProperties().config.url[0],
            customParams: {
              TRANSPARENT: "true"
            },
            imageFormat: layers[i].getProperties().config.format,
            layers: [layers[i].getProperties().config.name],
            opacity: 0.7,
            type: layers[i].getProperties().config.source
          };
          break;
      }
      if (Object.keys(printLayer).length !== 0) {
        printJson.attributes.map.layers.push(printLayer);
      }
    }
    let jsonData = JSON.stringify(printJson);
    fetch(printUrl, {
      method: "POST",
      body: jsonData
    }).then(res => {
      return res.json();
    }).then(json => {
      let printUrl = json.downloadURL;
      let a = document.createElement("a");
      a.href = printUrl;
      a.download = printUrl;
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "inputGroupSelect02"
  }, "Maltype"), /*#__PURE__*/_react.default.createElement("div", {
    className: "input-group mb-3"
  }, /*#__PURE__*/_react.default.createElement("select", {
    className: "custom-select",
    id: "inputGroupSelect02",
    value: maltype,
    onChange: e => setLayoutType(e.target.value)
  }, /*#__PURE__*/_react.default.createElement("option", null, "Velg..."), printCapabilities ? printCapabilities.layouts.map((layout, i) => /*#__PURE__*/_react.default.createElement("option", {
    value: layout.name
  }, layout.name)) : '')), /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "inputGroupSelect02"
  }, "M\xE5lestokk"), /*#__PURE__*/_react.default.createElement("div", {
    className: "input-group mb-3"
  }, /*#__PURE__*/_react.default.createElement("select", {
    className: "custom-select",
    id: "inputGroupSelect02",
    value: selectedPrintScale,
    onChange: e => setPrintScale(e.target.value)
  }, /*#__PURE__*/_react.default.createElement("option", null, "Velg..."), printScales.map((scale, i) => /*#__PURE__*/_react.default.createElement("option", {
    value: scale
  }, "1:", scale)))), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
    onClick: () => makePrint()
  }, "Lage utskrift"));
};
var _default = Print;
exports.default = _default;