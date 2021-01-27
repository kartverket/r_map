"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OLStylesMeasure = exports.OLStylesSLD = exports.OLStylesJson = exports.OLStylesDefault = void 0;

var _style = require("ol/style");

var _xml = require("ol/xml");

const OLStylesDefault = () => {
  var styles = function styles() {
    var fill = new _style.Fill({
      color: 'rgba(255,0,0,0.8)'
    });
    var stroke = new _style.Stroke({
      color: '#3399CC',
      width: 2.25
    });
    return [new _style.Style({
      image: new _style.Circle({
        fill: fill,
        stroke: stroke,
        radius: 8
      }),
      fill: fill,
      stroke: stroke
    })];
  };

  return {
    Styles: styles
  };
};

exports.OLStylesDefault = OLStylesDefault;

const OLStylesJson = style => {
  var _zIndex = 0;

  function _createStyle(feature, jsonstyle, hover) {
    var jsonobject = typeof jsonstyle === "object" ? jsonstyle : JSON.parse(jsonstyle);
    var currentstyle = [];
    _zIndex++;
    currentstyle.push(new _style.Style({
      fill: _createFillStyle(jsonobject),
      icon: _createIconStyle(jsonobject, hover),
      image: _createImageStyle(jsonobject, hover),
      stroke: _createStrokeStyle(jsonobject, hover),
      text: _createTextStyle(feature, jsonobject, hover),
      zIndex: _zIndex
    }));
    return currentstyle;
  }

  function _createFillStyle(jsonstyle) {
    if (jsonstyle.fill) {
      return new _style.Fill(jsonstyle.fill);
    }
  }

  function _createIconStyle(jsonstyle) {
    if (jsonstyle.icon) {
      return new _style.Icon(jsonstyle.icon);
    }
  }

  function _createImageStyle(jsonstyle, hover) {
    if (jsonstyle.image) {
      return new _style.Circle({
        radius: hover ? jsonstyle.image.radius * 1.2 : jsonstyle.image.radius,
        fill: _createFillStyle(jsonstyle.image),
        stroke: _createStrokeStyle(jsonstyle.image)
      });
    } else if (jsonstyle.regularshape) {
      var angle = parseInt(jsonstyle.regularshape.angle, 10);
      var rotation = parseInt(jsonstyle.regularshape.rotation, 10);
      return new _style.RegularShape({
        fill: _createFillStyle(jsonstyle.regularshape),
        stroke: _createStrokeStyle(jsonstyle.regularshape),
        radius: hover ? jsonstyle.regularshape.radius * 1.2 : jsonstyle.regularshape.radius,
        radius2: hover ? jsonstyle.regularshape.radius2 * 1.2 : jsonstyle.regularshape.radius2,
        points: jsonstyle.regularshape.points,
        rotation: rotation > 0 ? Math.PI / rotation : 0,
        angle: angle > 0 ? Math.PI / angle : 0
      });
    }
  }

  function _createStrokeStyle(jsonstyle, hover) {
    if (jsonstyle.stroke) {
      if (hover) {
        jsonstyle.stroke.width *= 2;
      }

      return new _style.Stroke(jsonstyle.stroke);
    }
  }

  function _createTextStyle(feature, jsonstyle, hover) {
    if (jsonstyle.text) {
      if (hover) {
        if (jsonstyle.text.scale) {
          jsonstyle.text.scale *= 1.2;
        }

        if (jsonstyle.text.rotation) {
          jsonstyle.text.rotation *= -1;
        }
      }

      return new _style.Text({
        font: jsonstyle.text.font,
        offsetX: jsonstyle.text.offsetX,
        offsetY: jsonstyle.text.offsetY,
        scale: jsonstyle.text.scale,
        rotation: jsonstyle.text.rotation,
        text: _parseTextFilter(feature, jsonstyle.text.text),
        textAlign: jsonstyle.text.textAlign,
        textBaseline: jsonstyle.text.textBaseline,
        fill: _createFillStyle(jsonstyle.text),
        stroke: _createStrokeStyle(jsonstyle.text)
      });
    }
  }

  function _parseTextFilter(feature, text) {
    if (text) {
      var pos0 = text.indexOf('{');

      if (pos0 < 0) {
        return text;
      }

      if (text === '{_id}') {
        return feature.getId();
      }

      var label = '';

      while (pos0 >= 0) {
        if (pos0 > 0) {
          label += text.substr(0, pos0);
          text = text.slice(pos0);
          pos0 = text.indexOf('{');
        }

        var pos1 = text.indexOf('}');
        var fieldname = text.substr(pos0 + 1, pos1 - pos0 - 1);
        var fieldvalue = feature.get(fieldname);

        if (fieldvalue) {
          label += fieldvalue;
        }

        text = text.slice(pos1 + 1);
        pos0 = text.indexOf('{');
      }

      return label + text;
    }
  }

  var getStyle = function getStyle(feature) {
    if (feature) {
      var properties = feature.getProperties();

      if (properties.style) {
        feature.setStyle(_createStyle(feature, properties.style));
        return;
      }

      return _createStyle(feature, style);
    }

    return [];
  };

  var getHoverStyle = function getHoverStyle(feature) {
    if (feature) {
      return _createStyle(feature, style, true);
    }

    return [];
  };

  return {
    GetStyle: getStyle,
    GetHoverStyle: getHoverStyle
  };
};

exports.OLStylesJson = OLStylesJson;

const OLStylesSLD = () => {
  var styles = [new _style.Style({
    fill: new _style.Fill({
      color: 'rgba(255, 255, 255, 0.6)'
    }),
    stroke: new _style.Stroke({
      color: '#319FD3',
      width: 2
    }),
    image: new _style.Circle({
      radius: 3,
      fill: new _style.Fill({
        color: 'rgba(255, 255, 255, 0.6)'
      }),
      stroke: new _style.Stroke({
        color: '#319FD3',
        width: 2
      })
    }),
    text: new _style.Text({
      font: '12px Calibri,sans-serif',
      fill: new _style.Fill({
        color: '#000'
      }),
      stroke: new _style.Stroke({
        color: '#fff',
        width: 3
      })
    })
  })];
  var sld;
  /*
   Style({
   fill: new Fill(),
   image: new Image(),
   stroke: new Stroke(),
   text: new Text()
   }
   */

  /*
   var parseSymbolizer = function(symbolizernode){
   return symbolizernode;
   };
   var parseStyle = function(stylenode){
   var rulenodes = stylenode.getElementsByTagName('Rule');
   $(rulenodes).each(function(ruleindex, rulenode){
   $(rulenode.childNodes).each(function(index, childnode) {
   if (childnode.nodeName.indexOf('Symbolizer') > 0) {
   var symbolizer = parseSymbolizer(childnode, ruleindex);
   }
   });
   });
   };
   */

  var readers = {
    sld: {
      StyledLayerDescriptor: function StyledLayerDescriptor(node, sld) {
        sld.version = node.getAttribute("version");
        this.readChildNodes(node, sld);
      },
      Name: function Name(node, obj) {
        obj.name = this.getChildValue(node);
      },
      Title: function Title(node, obj) {
        obj.title = this.getChildValue(node);
      },
      Abstract: function Abstract(node, obj) {
        obj.description = this.getChildValue(node);
      },
      NamedLayer: function NamedLayer(node, sld) {
        var layer = {
          userStyles: [],
          namedStyles: []
        };
        this.readChildNodes(node, layer); // give each of the user styles this layer name

        for (var i = 0, len = layer.userStyles.length; i < len; ++i) {
          layer.userStyles[i].layerName = layer.name;
        }

        if (Array.isArray(sld.namedLayers)) {
          sld.namedLayers.push(layer);
        } else {
          sld.namedLayers[layer.name] = layer;
        }
      },
      NamedStyle: function NamedStyle(node, layer) {
        layer.namedStyles.push(this.getChildName(node.firstChild));
      },
      UserStyle: function UserStyle(node, layer) {
        var self = this;
        var obj = {
          defaultsPerSymbolizer: true,
          rules: []
        };
        this.featureTypeCounter = -1;
        this.readChildNodes(node, obj);
        var style;
        var isDefault = obj.isDefault ? obj.isDefault : false;

        if (this.multipleSymbolizers) {
          delete obj.defaultsPerSymbolizer;
          style = new _style.Style(obj);
        } else {
          obj.rules.each(function (item, rule) {
            var polygonstyle = rule.symbolizer.Polygon;
            var pointstyle = rule.symbolizer.Point;
            var linestyle = rule.symbolizer.Line;
            var textstyle = rule.symbolizer.Text;
            var fillstyle, strokestyle, imagestyle;

            if (polygonstyle) {
              if (polygonstyle.fill) {
                fillstyle = new _style.Fill({
                  color: self.getColorValue(polygonstyle.fillColor, polygonstyle.fillOpacity)
                });
              }

              if (polygonstyle.stroke) {
                if (polygonstyle.strokeColor !== undefined && polygonstyle.strokeWidth !== undefined) {
                  strokestyle = new _style.Stroke({
                    color: self.getColorValue(polygonstyle.strokeColor, polygonstyle.strokeOpacity),
                    width: parseInt(polygonstyle.strokeWidth.trim(), 10),
                    lineDash: polygonstyle.strokeDashstyle ? polygonstyle.strokeDashstyle.split(' ') : undefined
                  });
                }
              }
            } else if (pointstyle) {
              if (pointstyle.fill) {
                fillstyle = new _style.Fill({
                  color: self.getColorValue(pointstyle.fillColor, pointstyle.fillOpacity)
                });
              }

              if (pointstyle.stroke) {
                if (pointstyle.strokeColor !== undefined || pointstyle.strokeWidth !== undefined) {
                  strokestyle = new _style.Stroke({
                    color: self.getColorValue(pointstyle.strokeColor, pointstyle.strokeOpacity),
                    width: pointstyle.strokeWidth ? parseInt(pointstyle.strokeWidth.trim(), 10) : undefined,
                    lineDash: pointstyle.strokeDashstyle ? pointstyle.strokeDashstyle.split(' ') : undefined
                  });
                }
              }

              if (pointstyle.label) {
                if (pointstyle.outlineColor === undefined) {
                  pointstyle.outlineColor = '#ffffff';
                }

                if (pointstyle.outlineWidth === undefined) {
                  pointstyle.outlineWidth = '3';
                }

                textstyle = new _style.Text({
                  textAlign: self.getAlignValue(pointstyle.labelAnchorPointX),
                  textBaseline: self.getBaselineValue(pointstyle.labelAnchorPointY),
                  font: self.getFontValue(pointstyle),
                  text: pointstyle.label,
                  fill: new _style.Fill({
                    color: self.getColorValue(pointstyle.fontColor, pointstyle.fontOpacity)
                  }),
                  stroke: new _style.Stroke({
                    color: pointstyle.outlineColor ? self.getColorValue(pointstyle.outlineColor) : self.getColorValue(pointstyle.fontColor, pointstyle.fontOpacity),
                    width: pointstyle.outlineWidth ? parseInt(pointstyle.outlineWidth, 10) : undefined
                  }),
                  offsetX: pointstyle.labelXOffset ? parseInt(pointstyle.labelXOffset, 10) : undefined,
                  offsetY: pointstyle.labelYOffset ? parseInt(pointstyle.labelYOffset, 10) : undefined,
                  rotation: pointstyle.rotation ? parseFloat(pointstyle.rotation) : undefined
                });
              }

              if (pointstyle.graphic) {
                if (pointstyle.externalGraphic) {
                  var imageopacity = pointstyle.fillOpacity ? parseFloat(pointstyle.fillOpacity) : undefined;
                  imagestyle = new _style.Icon({
                    opacity: imageopacity,
                    //size: [2*pointstyle.pointRadius, 2*pointstyle.pointRadius],
                    //scale: 0.4,
                    src: pointstyle.externalGraphic
                  });
                  fillstyle = undefined;
                  strokestyle = undefined;
                } else {
                  switch (pointstyle.graphicName) {
                    case 'circle':
                      imagestyle = new _style.Circle({
                        radius: parseInt(pointstyle.pointRadius, 10),
                        stroke: strokestyle,
                        fill: fillstyle
                      });
                      break;

                    case 'cross':
                      imagestyle = new _style.RegularShape({
                        radius: parseInt(pointstyle.pointRadius, 10),
                        radius2: 0,
                        points: 4,
                        stroke: strokestyle,
                        fill: fillstyle
                      });
                      break;

                    case 'star':
                      imagestyle = new _style.RegularShape({
                        radius: parseInt(pointstyle.pointRadius, 10),
                        radius2: parseInt(pointstyle.pointRadius, 10) / 3,
                        points: 5,
                        stroke: strokestyle,
                        fill: fillstyle
                      });
                      break;

                    case 'square':
                      imagestyle = new _style.RegularShape({
                        radius: parseInt(pointstyle.pointRadius, 10),
                        points: 4,
                        angle: Math.PI / 4,
                        stroke: strokestyle,
                        fill: fillstyle
                      });
                      break;

                    case 'triangle':
                      imagestyle = new _style.RegularShape({
                        radius: parseInt(pointstyle.pointRadius, 10),
                        points: 3,
                        stroke: strokestyle,
                        fill: fillstyle
                      });
                      break;

                    case 'x':
                      imagestyle = new _style.RegularShape({
                        radius: parseInt(pointstyle.pointRadius, 10),
                        radius2: 0,
                        points: 4,
                        angle: Math.PI / 4,
                        stroke: strokestyle,
                        fill: fillstyle
                      });
                      break;

                    default:
                      break;
                  }
                }
              }
            } else if (linestyle) {
              if (linestyle.fill) {
                fillstyle = new _style.Fill({
                  color: self.getColorValue(linestyle.fillColor, linestyle.fillOpacity)
                });
              }

              if (linestyle.stroke) {
                strokestyle = new _style.Stroke({
                  color: self.getColorValue(linestyle.strokeColor, linestyle.strokeOpacity),
                  width: self.getStrokeWidth(linestyle.strokeWidth),
                  lineDash: self.getStrokeDashstyle(linestyle.strokeDashstyle)
                });
              }

              if (linestyle.graphic && linestyle.graphicName === 'circle') {
                imagestyle = new _style.Circle({
                  radius: parseInt(linestyle.pointRadius, 10),
                  fill: fillstyle
                });
                fillstyle = undefined;
              }
            }

            style = new _style.Style({
              fill: fillstyle,
              image: imagestyle,
              stroke: strokestyle
            });
            layer.userStyles.push({
              isDefault: isDefault,
              style: style,
              rule: rule
            });

            if (textstyle) {
              style = new _style.Style({
                text: textstyle
              });
              layer.userStyles.push({
                isDefault: isDefault,
                style: style,
                rule: rule
              });
            }
          });
        }
      },
      IsDefault: function IsDefault(node, style) {
        if (this.getChildValue(node) === "1") {
          style.isDefault = true;
        }
      },
      FeatureTypeStyle: function FeatureTypeStyle(node, style) {
        ++this.featureTypeCounter;
        var obj = {
          rules: this.multipleSymbolizers ? style.rules : []
        };
        this.readChildNodes(node, obj);

        if (!this.multipleSymbolizers) {
          style.rules = obj.rules;
        }
      },
      Rule: function Rule(node, obj) {
        var rule = {
          symbolizer: []
        };
        rule.symbolizer = {
          fill: false,
          stroke: false,
          graphic: false
        };
        this.readChildNodes(node, rule);
        obj.rules.push(rule);
      },
      ElseFilter: function ElseFilter(node, rule) {
        rule.elseFilter = true;
      },
      MinScaleDenominator: function MinScaleDenominator(node, rule) {
        rule.minScaleDenominator = parseFloat(this.getChildValue(node));
      },
      MaxScaleDenominator: function MaxScaleDenominator(node, rule) {
        rule.maxScaleDenominator = parseFloat(this.getChildValue(node));
      },
      LabelPlacement: function LabelPlacement(node, symbolizer) {
        this.readChildNodes(node, symbolizer);
      },
      PointPlacement: function PointPlacement(node, symbolizer) {
        var config = {};
        this.readChildNodes(node, config);
        config.labelRotation = config.rotation;
        delete config.rotation;
        var labelAlign,
            x = symbolizer.labelAnchorPointX,
            y = symbolizer.labelAnchorPointY;

        if (x <= 1 / 3) {
          labelAlign = 'l';
        } else if (x > 1 / 3 && x < 2 / 3) {
          labelAlign = 'c';
        } else if (x >= 2 / 3) {
          labelAlign = 'r';
        }

        if (y <= 1 / 3) {
          labelAlign += 'b';
        } else if (y > 1 / 3 && y < 2 / 3) {
          labelAlign += 'm';
        } else if (y >= 2 / 3) {
          labelAlign += 't';
        }

        config.labelAlign = labelAlign;
      },
      AnchorPoint: function AnchorPoint(node, symbolizer) {
        this.readChildNodes(node, symbolizer);
      },
      AnchorPointX: function AnchorPointX(node, symbolizer) {
        var labelAnchorPointX = this.readers.ogc._expression.call(this, node); // always string, could be empty string


        if (labelAnchorPointX) {
          symbolizer.labelAnchorPointX = labelAnchorPointX;
        }
      },
      AnchorPointY: function AnchorPointY(node, symbolizer) {
        var labelAnchorPointY = this.readers.ogc._expression.call(this, node); // always string, could be empty string


        if (labelAnchorPointY) {
          symbolizer.labelAnchorPointY = labelAnchorPointY;
        }
      },
      Displacement: function Displacement(node, symbolizer) {
        this.readChildNodes(node, symbolizer);
      },
      DisplacementX: function DisplacementX(node, symbolizer) {
        var labelXOffset = this.readers.ogc._expression.call(this, node); // always string, could be empty string


        if (labelXOffset) {
          symbolizer.labelXOffset = labelXOffset;
        }
      },
      DisplacementY: function DisplacementY(node, symbolizer) {
        var labelYOffset = this.readers.ogc._expression.call(this, node); // always string, could be empty string


        if (labelYOffset) {
          symbolizer.labelYOffset = labelYOffset;
        }
      },
      LinePlacement: function LinePlacement(node, symbolizer) {
        this.readChildNodes(node, symbolizer);
      },
      PerpendicularOffset: function PerpendicularOffset(node, symbolizer) {
        var labelPerpendicularOffset = this.readers.ogc._expression.call(this, node); // always string, could be empty string


        if (labelPerpendicularOffset) {
          symbolizer.labelPerpendicularOffset = labelPerpendicularOffset;
        }
      },
      Label: function Label(node, symbolizer) {
        var value = this.readers.ogc._expression.call(this, node);

        if (value) {
          symbolizer.label = value;
        }
      },
      Font: function Font(node, symbolizer) {
        this.readChildNodes(node, symbolizer);
      },
      Halo: function Halo(node, symbolizer) {
        // halo has a fill, so send fresh object
        var obj = {};
        this.readChildNodes(node, obj);
        symbolizer.haloRadius = obj.haloRadius;
        symbolizer.haloColor = obj.fillColor;
        symbolizer.haloOpacity = obj.fillOpacity;
      },
      Radius: function Radius(node, symbolizer) {
        var radius = this.readers.ogc._expression.call(this, node);

        if (radius !== null) {
          // radius is only used for halo
          symbolizer.haloRadius = radius;
        }
      },

      /*
      RasterSymbolizer: function (node, rule) {
          var config = {};
          this.readChildNodes(node, config);
          if (this.multipleSymbolizers) {
              config.zIndex = this.featureTypeCounter;
              rule.symbolizers.push(
                  new OpenLayers.Symbolizer.Raster(config)
              );
          } else {
              rule.symbolizer["Raster"] = OpenLayers.Util.applyDefaults(
                  config, rule.symbolizer["Raster"]
              );
          }
      },
      */
      Geometry: function Geometry(node, obj) {
        obj.geometry = {};
        this.readChildNodes(node, obj.geometry);
      },
      ColorMap: function ColorMap(node, symbolizer) {
        symbolizer.colorMap = [];
        this.readChildNodes(node, symbolizer.colorMap);
      },
      ColorMapEntry: function ColorMapEntry(node, colorMap) {
        var q = node.getAttribute("quantity");
        var o = node.getAttribute("opacity");
        colorMap.push({
          color: node.getAttribute("color"),
          quantity: q !== null ? parseFloat(q) : undefined,
          label: node.getAttribute("label") || undefined,
          opacity: o !== null ? parseFloat(o) : undefined
        });
      },

      /*
      LineSymbolizer: function (node, rule) {
          var config = {};
          this.readChildNodes(node, config);
          if (this.multipleSymbolizers) {
              config.zIndex = this.featureTypeCounter;
              rule.symbolizers.push(
                  new OpenLayers.Symbolizer.Line(config)
              );
          } else {
              rule.symbolizer["Line"] = config;
          }
      },
      PolygonSymbolizer: function (node, rule) {
          var config = {
              fill: false,
              stroke: false
          };
          if (!this.multipleSymbolizers) {
              config = rule.symbolizer["Polygon"] || config;
          }
          this.readChildNodes(node, config);
          if (this.multipleSymbolizers) {
              config.zIndex = this.featureTypeCounter;
              rule.symbolizers.push(
                  new OpenLayers.Symbolizer.Polygon(config)
              );
          } else {
              rule.symbolizer["Polygon"] = config;
          }
      },
      PointSymbolizer: function (node, rule) {
          var config = {
              fill: false,
              stroke: false,
              graphic: false
          };
          if (!this.multipleSymbolizers) {
              config = rule.symbolizer["Point"] || config;
          }
          this.readChildNodes(node, config);
          if (this.multipleSymbolizers) {
              config.zIndex = this.featureTypeCounter;
              rule.symbolizers.push(
                  new OpenLayers.Symbolizer.Point(config)
              );
          } else {
              rule.symbolizer["Point"] = config;
          }
      },
      TextSymbolizer: function (node, rule) {
          var config = {};
          this.readChildNodes(node, config);
          if (this.multipleSymbolizers) {
              config.zIndex = this.featureTypeCounter;
              rule.symbolizers.push(
                  new OpenLayers.Symbolizer.Text(config)
              );
          } else {
              rule.symbolizer["Text"] = config;
          }
      },
      */
      Stroke: function Stroke(node, symbolizer) {
        symbolizer.stroke = true;
        this.readChildNodes(node, symbolizer);
      },
      Fill: function Fill(node, symbolizer) {
        symbolizer.fill = true;
        this.readChildNodes(node, symbolizer);
      },
      CssParameter: function CssParameter(node, symbolizer) {
        var cssProperty = node.getAttribute("name");
        var symProperty = this.cssMap[cssProperty]; // for labels, fill should map to fontColor and fill-opacity
        // to fontOpacity

        if (symbolizer.label) {
          if (cssProperty === 'fill') {
            symProperty = "fontColor";
          } else if (cssProperty === 'fill-opacity') {
            symProperty = "fontOpacity";
          }
        }

        if (symProperty) {
          // Limited support for parsing of OGC expressions
          var value = this.readers.ogc._expression.call(this, node); // always string, could be an empty string


          if (value) {
            symbolizer[symProperty] = value;
          }
        }
      },
      Graphic: function Graphic(node, symbolizer) {
        symbolizer.graphic = true;
        var graphic = {}; // painter's order not respected here, clobber previous with next

        this.readChildNodes(node, graphic); // directly properties with names that match symbolizer properties

        var properties = ["stroke", "strokeColor", "strokeWidth", "strokeOpacity", "strokeLinecap", "fill", "fillColor", "fillOpacity", "graphicName", "rotation", "graphicFormat"];
        var prop, value;

        for (var i = 0, len = properties.length; i < len; ++i) {
          prop = properties[i];
          value = graphic[prop];

          if (value !== undefined) {
            symbolizer[prop] = value;
          }
        } // set other generic properties with specific graphic property names


        if (graphic.opacity !== undefined) {
          symbolizer.graphicOpacity = graphic.opacity;
        }

        if (graphic.size !== undefined) {
          var pointRadius = graphic.size / 2;

          if (isNaN(pointRadius)) {
            // likely a property name
            symbolizer.graphicWidth = graphic.size;
          } else {
            symbolizer.pointRadius = graphic.size / 2;
          }
        }

        if (graphic.href !== undefined) {
          symbolizer.externalGraphic = graphic.href;
        }

        if (graphic.rotation !== undefined) {
          symbolizer.rotation = graphic.rotation;
        }
      },
      ExternalGraphic: function ExternalGraphic(node, graphic) {
        this.readChildNodes(node, graphic);
      },
      Mark: function Mark(node, graphic) {
        this.readChildNodes(node, graphic);
      },
      WellKnownName: function WellKnownName(node, graphic) {
        graphic.graphicName = this.getChildValue(node);
      },
      Opacity: function Opacity(node, obj) {
        var opacity = this.readers.ogc._expression.call(this, node); // always string, could be empty string


        if (opacity) {
          obj.opacity = opacity;
        }
      },
      Size: function Size(node, obj) {
        var size = this.readers.ogc._expression.call(this, node); // always string, could be empty string


        if (size) {
          obj.size = size;
        }
      },
      Rotation: function Rotation(node, obj) {
        var rotation = this.readers.ogc._expression.call(this, node); // always string, could be empty string


        if (rotation) {
          obj.rotation = rotation;
        }
      },
      OnlineResource: function OnlineResource(node, obj) {
        obj.href = this.getAttributeNS(node, this.namespaces.xlink, "href");
      },
      Format: function Format(node, graphic) {
        graphic.graphicFormat = this.getChildValue(node);
      }
    },
    ogc: {
      _expression: function _expression(node) {
        // only the simplest of ogc:expression handled
        // "some text and an <PropertyName>attribute</PropertyName>"}
        var obj,
            value = "";

        for (var child = node.firstChild; child; child = child.nextSibling) {
          switch (child.nodeType) {
            case 1:
              obj = this.readNode(child);

              if (obj.property) {
                value += "${" + obj.property + "}";
              } else if (obj.value !== undefined) {
                value += obj.value;
              }

              break;

            case 3: // text node

            case 4:
              // cdata section
              value += child.nodeValue;
              break;

            default:
              break;
          }
        }

        return value;
      },
      Filter: function Filter(node, parent) {
        // Filters correspond to subclasses of OpenLayers.Filter.
        // Since they contain information we don't persist, we
        // create a temporary object and then pass on the filter
        // (ogc:Filter) to the parent obj.
        var obj = {
          fids: [],
          filters: []
        };
        this.readChildNodes(node, obj);

        if (obj.fids.length > 0) {
          parent.filter = {
            fids: obj.fids
          };
        } else if (obj.filters.length > 0) {
          parent.filter = obj.filters[0];
        }
      },
      FeatureId: function FeatureId(node, obj) {
        var fid = node.getAttribute("fid");

        if (fid) {
          obj.fids.push(fid);
        }
      },
      And: function And(node, obj) {
        var filter = {
          filters: ["&&"]
        };
        this.readChildNodes(node, filter);
        obj.filters.push(filter);
      },
      Or: function Or(node, obj) {
        var filter = {
          filters: ["||"]
        };
        this.readChildNodes(node, filter);
        obj.filters.push(filter);
      },
      Not: function Not(node, obj) {
        var filter = {
          filters: ["!"]
        };
        this.readChildNodes(node, filter);
        obj.filters.push(filter);
      },
      PropertyIsLike: function PropertyIsLike(node, obj) {
        var filter = {
          operator: "=="
        };
        this.readChildNodes(node, filter);
        obj.filters.push(filter);
      },
      PropertyIsEqualTo: function PropertyIsEqualTo(node, obj) {
        var filter = {
          operator: "=="
        };
        this.readChildNodes(node, filter);
        obj.filters.push(filter);
      },
      PropertyIsNotEqualTo: function PropertyIsNotEqualTo(node, obj) {
        var filter = {
          operator: "!="
        };
        this.readChildNodes(node, filter);
        obj.filters.push(filter);
      },
      PropertyIsLessThan: function PropertyIsLessThan(node, obj) {
        var filter = {
          operator: "<"
        };
        this.readChildNodes(node, filter);
        obj.filters.push(filter);
      },
      PropertyIsGreaterThan: function PropertyIsGreaterThan(node, obj) {
        var filter = {
          operator: ">"
        };
        this.readChildNodes(node, filter);
        obj.filters.push(filter);
      },
      PropertyIsLessThanOrEqualTo: function PropertyIsLessThanOrEqualTo(node, obj) {
        var filter = {
          operator: "<="
        };
        this.readChildNodes(node, filter);
        obj.filters.push(filter);
      },
      PropertyIsGreaterThanOrEqualTo: function PropertyIsGreaterThanOrEqualTo(node, obj) {
        var filter = {
          operator: ">="
        };
        this.readChildNodes(node, filter);
        obj.filters.push(filter);
      },
      PropertyIsBetween: function PropertyIsBetween(node, obj) {
        var filter = {
          operator: ".."
        };
        this.readChildNodes(node, filter);
        obj.filters.push(filter);
      },
      Literal: function Literal(node, obj) {
        obj.value = this.getChildValue(node);
      },
      PropertyName: function PropertyName(node, filter) {
        filter.property = this.getChildValue(node);
      },
      LowerBoundary: function LowerBoundary(node, filter) {
        filter.lowerBoundary = this.readers.ogc._expression.call(this, node);
      },
      UpperBoundary: function UpperBoundary(node, filter) {
        filter.upperBoundary = this.readers.ogc._expression.call(this, node);
      },

      /*"Intersects": function(node, obj) {
       this.readSpatial(node, obj, OpenLayers.Filter.Spatial.INTERSECTS);
       },
       "Within": function(node, obj) {
       this.readSpatial(node, obj, OpenLayers.Filter.Spatial.WITHIN);
       },
       "Contains": function(node, obj) {
       this.readSpatial(node, obj, OpenLayers.Filter.Spatial.CONTAINS);
       },
       "DWithin": function(node, obj) {
       this.readSpatial(node, obj, OpenLayers.Filter.Spatial.DWITHIN);
       },
       "Distance": function(node, obj) {
       obj.distance = parseInt(this.getChildValue(node), 10);
       obj.distanceUnits = node.getAttribute("units");
       },*/

      /*"Function": function(node, obj) {
       //TODO write decoder for it
       return;
       },*/
      PropertyIsNull: function PropertyIsNull(node, obj) {
        var filter = {
          operator: "NULL"
        };
        this.readChildNodes(node, filter);
        obj.filters.push(filter);
      }
    }
  };

  var parseSld = function parseSld(response, zindex) {
    if (typeof response === 'undefined') {
      return styles;
    }

    if (typeof response === 'string') {
      response = (0, _xml.parse)(response);
    }

    sld = {
      namedLayers: []
    };
    this.readChildNodes(response, sld);
    /*
     var userStyles = response.getElementsByTagName('UserStyle');
       var thisstyle = [];
     $(userStyles).each(function(index, userstyle){
     if (index === 0) {
     thisstyle.push(parseStyle(userstyle));
     }
     });
     */

    styles = []; //styles.push(sld.namedLayers[0].userStyles[1]);
    //styles.push(sld.namedLayers[0].userStyles[0].style);

    var scales = {
      maxScaleDenominator: 1,
      minScaleDenominator: Infinity
    };
    sld.namedLayers[0].userStyles.each(function (index, userstyle) {
      var style = userstyle.style;

      if (zindex) {
        style.setZIndex(zindex);
      }

      styles.push(style);

      if (userstyle.rule) {
        if (userstyle.rule.maxScaleDenominator && scales.maxScaleDenominator < userstyle.rule.maxScaleDenominator) {
          scales.maxScaleDenominator = userstyle.rule.maxScaleDenominator;
        }

        if (userstyle.rule.minScaleDenominator && scales.minScaleDenominator > userstyle.rule.minScaleDenominator) {
          scales.minScaleDenominator = userstyle.rule.minScaleDenominator;
        }
      }
    });

    if (scales.maxScaleDenominator === 1) {
      scales.maxScaleDenominator = undefined;
    }

    if (scales.minScaleDenominator === Infinity) {
      scales.minScaleDenominator = undefined;
    }

    return scales;
  };

  var parseFilterProperty = function parseFilterProperty(filter, feature) {
    if (feature === undefined) {
      return false;
    }

    if (filter === undefined) {
      return false;
    }

    var featurevalue, value;
    var condition = false;
    featurevalue = feature.get(filter.property);

    if (featurevalue) {
      switch (filter.operator) {
        case '==':
          switch (typeof featurevalue) {
            case 'string':
              value = filter.value;
              condition = featurevalue === value;
              break;

            case 'number':
              value = parseInt(filter.value, 10);
              condition = parseInt(featurevalue, 10) === value;
              break;

            default:
              break;
          }

          break;

        case '>':
          value = parseInt(filter.value, 10);
          condition = parseInt(featurevalue, 10) > value;
          break;

        case '<':
          value = parseInt(filter.value, 10);
          condition = parseInt(featurevalue, 10) < value;
          break;

        case '>=':
          value = parseInt(filter.value, 10);
          condition = parseInt(featurevalue, 10) >= value;
          break;

        case '<=':
          value = parseInt(filter.value, 10);
          condition = parseInt(featurevalue, 10) <= value;
          break;

        case '!=':
          switch (typeof featurevalue) {
            case 'string':
              value = filter.value;
              condition = featurevalue !== value;
              break;

            case 'number':
              value = parseInt(filter.value, 10);
              condition = parseInt(featurevalue, 10) !== value;
              break;

            default:
              break;
          }

          break;

        case 'NULL':
          switch (typeof featurevalue) {
            case 'string':
              condition = featurevalue.length === 0;
              break;

            case 'number':
              value = parseInt(filter.value, 10);
              condition = parseInt(featurevalue, 10) !== value;
              break;

            default:
              break;
          }

          break;

        case '..':
          featurevalue = parseInt(featurevalue, 10);
          condition = featurevalue >= parseInt(filter.lowerBoundary, 10) && featurevalue <= parseInt(filter.upperBoundary, 10);
          break;

        default:
          break;
      }
    } else {
      switch (filter.operator) {
        case 'NULL':
          condition = true;
          break;

        default:
          break;
      }
    }

    return condition;
  };

  var setHidden = function setHidden(feature, hidden) {
    var ishidden = feature.get("isHidden");

    if (ishidden === undefined) {
      feature.set("isHidden", hidden);
    }
  };

  var parseFilter = function parseFilter(filter, feature) {
    if (feature === undefined) {
      return false;
    }

    if (filter === undefined) {
      return true;
    }

    if (filter.filters === undefined) {
      return parseFilterProperty(filter, feature);
    }

    if (filter.filters.length <= 1) {
      return true;
    }

    var i;
    var condition = false;

    switch (filter.filters[0]) {
      case '&&':
        for (i = 1; i < filter.filters.length; i++) {
          condition = parseFilter(filter.filters[i], feature);

          if (!condition) {
            break;
          }
        }

        break;

      case '||':
        for (i = 1; i < filter.filters.length; i++) {
          condition = parseFilter(filter.filters[i], feature);

          if (condition) {
            break;
          }
        }

        break;

      case '!':
        break;

      default:
        break;
    }

    return condition;
  };

  var getStyle = function getStyle(feature, scale) {
    return _getValidStyle(feature, scale);
  };

  var getHoverStyle = function getHoverStyle(feature, scale) {
    var style = _getValidStyle(feature, scale, true);

    if (style === undefined) {
      // No hoverstyle, use ordinary style
      style = _getValidStyle(feature, scale);
    }

    return style;
  };

  var _getValidStyle = function _getValidStyle(feature, scale, hover) {
    if (hover === undefined) {
      hover = false;
    }

    var userStyles = [];
    var textstyle, label, featurelabel; //var geometrytype = feature.getGeometry().getType();

    if (sld) {
      sld.namedLayers[0].userStyles.each(function (item, userStyle) {
        if (hover && !userStyle.isDefault) {
          //if (_validateGeometryStyle(geometrytype, userStyle.style)) {
          if (parseFilter(userStyle.rule.filter, feature)) {
            if (_validateScale(userStyle.rule, scale)) {
              textstyle = userStyle.style.getText();

              if (textstyle) {
                label = textstyle.getText();
                textstyle = Object.assign({}, userStyle.style);
                featurelabel = _getAttributeValue(label, feature);
                textstyle.getText().setText(featurelabel);
              } else {
                userStyles.push(userStyle.style);
              }
            }
          } //}

        } else if (!hover && userStyle.isDefault) {
          //if (_validateGeometryStyle(geometrytype, userStyle.style)) {
          if (parseFilter(userStyle.rule.filter, feature)) {
            if (_validateScale(userStyle.rule, scale)) {
              textstyle = userStyle.style.getText();

              if (textstyle) {
                label = textstyle.getText();
                textstyle = Object.assign({}, userStyle.style);
                featurelabel = _getAttributeValue(label, feature);
                textstyle.getText().setText(featurelabel);
              } else {
                userStyles.push(userStyle.style);
              }
            }
          }
        } //}

      });

      if (textstyle) {
        userStyles.push(textstyle);
      }

      if (userStyles.length > 0) {
        return userStyles;
      } else {
        if (!hover) {
          setHidden(feature, true);
        }
      }

      return undefined;
    }

    return styles; //sld.namedLayers[0].userStyles;
  };

  var _getAttributeValue = function _getAttributeValue(label, feature) {
    if (label.indexOf('${') >= 0) {
      label = label.slice(label.indexOf('${') + 2);

      if (label.indexOf('}') >= 0) {
        label = label.slice(0, label.indexOf('}'));
      }
    }

    return feature.get(label);
  };

  var _validateScale = function _validateScale(rule, scale) {
    if (rule === undefined) {
      return true;
    }

    var maxScale = rule.maxScaleDenominator ? rule.maxScaleDenominator : Infinity;
    var minScale = rule.minScaleDenominator ? rule.minScaleDenominator : 1;
    return scale <= maxScale && scale >= minScale;
  }; //var _validateGeometryStyle = function(geometrytype, style){
  //    var validstyle = true;
  //    switch (geometrytype){
  //        case 'Polygon':
  //        case 'MultiPolygon':
  //            break;
  //        case 'Point':
  //        case 'MultiPoint':
  //            if (style.getImage() || style.getText()){
  //                break;
  //            }
  //            validstyle = false;
  //            break;
  //        case 'LineString':
  //            break;
  //        default:
  //            break;
  //    }
  //    return validstyle;
  //};


  var getStyleForLegend = function getStyleForLegend() {
    if (sld) {
      return sld.namedLayers[0].userStyles;
    }

    return undefined;
  };

  return {
    Sld: sld,
    Styles: styles,
    ParseSld: parseSld,
    GetStyle: getStyle,
    GetStyleForLegend: getStyleForLegend,
    GetHoverStyle: getHoverStyle,
    defaultPrefix: "sld",
    namespaces: {
      sld: "http://www.opengis.net/sld",
      ogc: "http://www.opengis.net/ogc",
      gml: "http://www.opengis.net/gml",
      xlink: "http://www.w3.org/1999/xlink",
      xsi: "http://www.w3.org/2001/XMLSchema-instance"
    },
    namespaceAlias: {
      "http://www.opengis.net/sld": "sld",
      "http://www.opengis.net/ogc": "ogc",
      "http://www.opengis.net/gml": "gml",
      "http://www.w3.org/1999/xlink": "xlink",
      "http://www.w3.org/2001/XMLSchema-instance": "xsi"
    },
    getChildValue: function getChildValue(node, def) {
      var value = def || "";

      if (node) {
        for (var child = node.firstChild; child; child = child.nextSibling) {
          switch (child.nodeType) {
            case 3: // text node

            case 4:
              // cdata section
              value += child.nodeValue;
              break;

            default:
              break;
          }
        }
      }

      return value;
    },
    readChildNodes: function readChildNodes(node, obj) {
      if (!obj) {
        obj = {};
      }

      var children = node.childNodes;
      var child;

      for (var i = 0, len = children.length; i < len; ++i) {
        child = children[i];

        if (child.nodeType === 1) {
          this.readNode(child, obj);
        }
      }

      return obj;
    },
    readNode: function readNode(node, obj) {
      if (!obj) {
        obj = {};
      }

      var group = this.readers[node.namespaceURI ? this.namespaceAlias[node.namespaceURI] : this.defaultPrefix];

      if (group) {
        var local = node.localName || node.nodeName.split(":").pop();
        var reader = group[local] || group["*"];

        if (reader) {
          reader.apply(this, [node, obj]);
        }
      }

      return obj;
    },
    readers: readers,
    cssMap: {
      "stroke": "strokeColor",
      "stroke-opacity": "strokeOpacity",
      "stroke-width": "strokeWidth",
      "stroke-linecap": "strokeLinecap",
      "stroke-dasharray": "strokeDashstyle",
      "fill": "fillColor",
      "fill-opacity": "fillOpacity",
      "font-family": "fontFamily",
      "font-size": "fontSize",
      "font-weight": "fontWeight",
      "font-style": "fontStyle"
    },
    getCssProperty: function getCssProperty(sym) {
      var css = null;

      for (var prop in this.cssMap) {
        if (this.cssMap[prop] === sym) {
          css = prop;
          break;
        }
      }

      return css;
    },
    getAttributeNodeNS: function getAttributeNodeNS(node, uri, name) {
      var attributeNode = null;

      if (node.getAttributeNodeNS) {
        attributeNode = node.getAttributeNodeNS(uri, name);
      } else {
        var attributes = node.attributes;
        var potentialNode, fullName;

        for (var i = 0, len = attributes.length; i < len; ++i) {
          potentialNode = attributes[i];

          if (potentialNode.namespaceURI === uri) {
            fullName = potentialNode.prefix ? potentialNode.prefix + ":" + name : name;

            if (fullName === potentialNode.nodeName) {
              attributeNode = potentialNode;
              break;
            }
          }
        }
      }

      return attributeNode;
    },
    getAttributeNS: function getAttributeNS(node, uri, name) {
      var attributeValue = "";

      if (node.getAttributeNS) {
        attributeValue = node.getAttributeNS(uri, name) || "";
      } else {
        var attributeNode = this.getAttributeNodeNS(node, uri, name);

        if (attributeNode) {
          attributeValue = attributeNode.nodeValue;
        }
      }

      return attributeValue;
    },
    pixelRatio: 1,
    getStrokeDashstyle: function getStrokeDashstyle(dashstyle) {
      if (dashstyle) {
        dashstyle = dashstyle.split(' ');

        for (var i = 0; i < dashstyle.length; i++) {
          dashstyle[i] = parseInt(dashstyle[i], 10) * this.pixelRatio; // * (3/4);
        }

        return dashstyle;
      } else {
        return undefined;
      }
    },
    getStrokeWidth: function getStrokeWidth(width) {
      return parseInt(width.trim(), 10) * this.pixelRatio;
    },
    getFontValue: function getFontValue(style) {
      var self = this; // "bold 10px Verdana"

      var font = '';
      font = self.addFontValue(font, style.fontStyle);
      font = self.addFontValue(font, style.fontWeight);

      if (style.fontSize) {
        if (style.fontSize.indexOf('px') < 0) {
          font = self.addFontValue(font, style.fontSize);
          font += 'px';
        } else {
          font = self.addFontValue(font, style.fontSize);
        }
      }

      font = self.addFontValue(font, style.fontFamily);
      return font.trim();
    },
    addFontValue: function addFontValue(font, value) {
      if (value === undefined) {
        return font;
      }

      if (font.length > 0) {
        font += ' ';
      }

      return font + value;
    },
    getAlignValue: function getAlignValue(align) {
      if (align === undefined) {
        return 'center';
      }

      var alignvalue = parseFloat(align);

      if (alignvalue === 0) {
        return 'left';
      } else if (alignvalue > 0 && alignvalue < 1) {
        return 'center';
      } else {
        return 'right';
      }
    },
    getBaselineValue: function getBaselineValue(baseline) {
      if (baseline === undefined) {
        return 'middle';
      }

      var baselinevalue = parseFloat(baseline);

      if (baselinevalue === 0) {
        return 'bottom';
      } else if (baselinevalue > 0 && baselinevalue < 1) {
        return 'middle';
      } else {
        return 'top';
      }
    },
    getColorValue: function getColorValue(colorvalue, opacityvalue) {
      //if (colorvalue === undefined){
      //    return colorvalue;
      //}
      if (colorvalue === undefined) {
        colorvalue = "#000000";
      }

      var color = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(colorvalue.trim());

      if (color.length < 4) {
        return undefined;
      }

      var rgb = {
        r: parseInt(color[1], 16),
        g: parseInt(color[2], 16),
        b: parseInt(color[3], 16),
        a: opacityvalue ? parseFloat(opacityvalue.trim()) : 1,
        getValue: function getValue() {
          return [this.r, this.g, this.b, this.a];
        }
      };
      return rgb.getValue();
    },
    getGraphicFormat: function getGraphicFormat(href) {
      var format;

      for (var key in this.graphicFormats) {
        if (this.graphicFormats[key].test(href)) {
          format = key;
          break;
        }
      }

      return format || this.defaultGraphicFormat;
    },
    defaultGraphicFormat: "image/png",
    graphicFormats: {
      "image/jpeg": /\.jpe?g$/i,
      "image/gif": /\.gif$/i,
      "image/png": /\.png$/i
    },
    multipleSymbolizers: false,
    featureTypeCounter: null,
    defaultSymbolizer: {
      fillColor: "#808080",
      fillOpacity: 1,
      strokeColor: "#000000",
      strokeOpacity: 1,
      strokeWidth: 1,
      pointRadius: 3,
      graphicName: "square"
    }
  };
};

exports.OLStylesSLD = OLStylesSLD;

const OLStylesMeasure = () => {
  var styles = function styles() {
    return new _style.Style({
      fill: new _style.Fill({
        color: 'rgba(255, 255, 255, 0.8)'
      }),
      stroke: new _style.Stroke({
        color: '#ffcc33',
        width: 2
      }),
      image: new _style.Circle({
        radius: 7,
        fill: new _style.Fill({
          color: '#ffcc33'
        })
      })
    });
  };

  var drawStyles = function drawStyles() {
    return new _style.Style({
      fill: new _style.Fill({
        color: 'rgba(255, 255, 255, 0.5)'
      }),
      stroke: new _style.Stroke({
        color: 'rgba(160, 0, 0, 0.5)',
        width: 2
      }),
      image: new _style.Circle({
        radius: 5,
        fill: new _style.Fill({
          color: 'rgba(160, 0, 0, 0.8)'
        }),
        stroke: new _style.Stroke({
          color: 'rgba(255, 255, 255, 0.8)',
          width: 2
        })
      })
    });
  };

  return {
    DrawStyles: drawStyles,
    Styles: styles
  };
};

exports.OLStylesMeasure = OLStylesMeasure;