"use strict";

var _interopRequireWildcard = require("C:\\code_git\\r_map.github\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("C:\\code_git\\r_map.github\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("C:\\code_git\\r_map.github\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/esm/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("C:\\code_git\\r_map.github\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/esm/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _FeatureInfoItemModule = _interopRequireDefault(require("./FeatureInfoItem.module.scss"));

var _uniqid = _interopRequireDefault(require("uniqid"));

var _store = require("../../Utils/store.js");

var _styles = require("@material-ui/core/styles");

var _Dialog = _interopRequireDefault(require("@material-ui/core/Dialog"));

var _DialogTitle = _interopRequireDefault(require("@material-ui/core/DialogTitle"));

var _DialogContent = _interopRequireDefault(require("@material-ui/core/DialogContent"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Close = _interopRequireDefault(require("@material-ui/icons/Close"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var styles = function styles(theme) {
  return {
    root: {
      margin: 0,
      padding: theme.spacing(2)
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500]
    }
  };
};

var DialogTitle = (0, _styles.withStyles)(styles)(function (props) {
  var children = props.children,
      classes = props.classes,
      onClose = props.onClose,
      other = (0, _objectWithoutProperties2.default)(props, ["children", "classes", "onClose"]);
  return /*#__PURE__*/_react.default.createElement(_DialogTitle.default, Object.assign({
    disableTypography: true,
    className: classes.root
  }, other), /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "h6"
  }, children), onClose ? /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    "aria-label": "close",
    className: classes.closeButton,
    onClick: onClose
  }, /*#__PURE__*/_react.default.createElement(_Close.default, null)) : null);
});
var DialogContent = (0, _styles.withStyles)(function (theme) {
  return {
    root: {
      padding: theme.spacing(2)
    }
  };
})(_DialogContent.default);

var FeatureInfoItem = function FeatureInfoItem() {
  var _React$useState = _react.default.useState(false),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      open = _React$useState2[0],
      setOpen = _React$useState2[1];

  var handleClose = function handleClose() {
    setOpen(false);
    dispatch({
      type: "HIDE_FEATURES",
      info: featureContext.state.info
    });
  };

  var featureContext = (0, _react.useContext)(_store.store);
  var dispatch = featureContext.dispatch;

  var testFormat = function testFormat(s) {
    if (typeof s === 'object') return 'isObject';
    var rX = /^((\d+)|(true|false)|(\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}\+\d{2})|([\w\W]+))$/i;
    var M = rX.exec(s);
    if (!M) return '';

    switch (M[1]) {
      case M[2]:
        return 'isNumeric';

      case M[3]:
        return 'isBoolean';

      case M[4]:
        return 'isDate';

      case M[5]:
        {
          if (M[5].length === 50 || M[5].length === 194) {
            return 'isBboxInternal';
          } else if (M[5].startsWith('{"type":"Point"')) {
            return 'isBboxJsonPoint';
          } else if (M[5].startsWith('{"type":"Polygon"')) {
            return 'isBboxJsonPolygon';
          } else if (M[5].startsWith('BOX(')) {
            return 'isBboxSimple';
          } else {
            return 'isString';
          }
        }

      default:
        return false;
    }
  };

  var prepareItemFormat = function prepareItemFormat(v) {
    var test = testFormat(v);

    switch (test) {
      case 'isNumeric':
        return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, v);

      case 'isBoolean':
        return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, v);

      case 'isDate':
        return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, v);
      // TODO: formatt?

      case 'isBboxInternal':
        return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "BBOX db internal");
      // TODO: klikke for å vise?

      case 'isBboxJsonPoint':
        return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "BBOX point");
      // TODO: klikke for å vise?

      case 'isBboxJsonPolygon':
        return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "BBOX polygon");
      // TODO: klikke for å vise?

      case 'isBboxSimple':
        return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, v);
      // TODO: klikke for å vise?

      case 'isString':
        return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, v);

      default:
        return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null);
    }
  };

  var prepareFeature = function prepareFeature(info) {
    var layers = [];

    for (var key in info) {
      var layer = info[key];
      var featureRow = [];

      if (Array.isArray(layer)) {
        for (var _key in layer) {
          if (_key !== 'name') {
            var feature = layer[_key];

            for (var _key2 in feature) {
              var items = feature[_key2];

              if (typeof items !== "string") {
                for (var _i = 0, _Object$entries = Object.entries(items); _i < _Object$entries.length; _i++) {
                  var _Object$entries$_i = (0, _slicedToArray2.default)(_Object$entries[_i], 2),
                      _key3 = _Object$entries$_i[0],
                      value = _Object$entries$_i[1];

                  featureRow.push( /*#__PURE__*/_react.default.createElement("li", {
                    key: (0, _uniqid.default)(_key3)
                  }, /*#__PURE__*/_react.default.createElement("i", null, _key3, " "), " = ", /*#__PURE__*/_react.default.createElement("strong", null, prepareItemFormat(value)), " "));
                }
              } else {
                featureRow.push( /*#__PURE__*/_react.default.createElement("li", {
                  key: (0, _uniqid.default)(_key2)
                }, /*#__PURE__*/_react.default.createElement("i", null, 'FeatureID', " "), " = ", /*#__PURE__*/_react.default.createElement("strong", null, prepareItemFormat(items)), " "));
              }
            }
          }
        }
      } else {
        for (var _i2 = 0, _Object$entries2 = Object.entries(layer); _i2 < _Object$entries2.length; _i2++) {
          var _Object$entries2$_i = (0, _slicedToArray2.default)(_Object$entries2[_i2], 2),
              _key4 = _Object$entries2$_i[0],
              _value = _Object$entries2$_i[1];

          featureRow.push( /*#__PURE__*/_react.default.createElement("li", {
            key: (0, _uniqid.default)(_key4)
          }, /*#__PURE__*/_react.default.createElement("i", null, _key4, " "), " = ", /*#__PURE__*/_react.default.createElement("strong", null, prepareItemFormat(_value)), " "));
        }
      }

      layers.push( /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
        key: (0, _uniqid.default)(key)
      }, /*#__PURE__*/_react.default.createElement("h3", null, key), /*#__PURE__*/_react.default.createElement("ul", null, featureRow)));
    }

    return /*#__PURE__*/_react.default.createElement("div", {
      className: _FeatureInfoItemModule.default.ulContainer,
      key: (0, _uniqid.default)()
    }, layers);
  };

  var featureContent = function featureContent() {
    if (Array.isArray(featureContext.state.info)) {
      return featureContext.state.info.map(function (info) {
        return prepareFeature(info);
      });
    } else {
      return /*#__PURE__*/_react.default.createElement("div", null, "No info");
    }
  };

  return /*#__PURE__*/_react.default.createElement(_Dialog.default, {
    onClose: handleClose,
    "aria-labelledby": "customized-dialog-title",
    open: open
  }, /*#__PURE__*/_react.default.createElement(DialogTitle, {
    id: "customized-dialog-title",
    onClose: handleClose
  }, "Egenskaper ", /*#__PURE__*/_react.default.createElement("span", null, " ( ", featureContext.state.info ? featureContext.state.info.length : 0, " )")), /*#__PURE__*/_react.default.createElement(DialogContent, {
    dividers: true
  }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    gutterBottom: true
  }, featureContent())));
};

var _default = FeatureInfoItem;
exports.default = _default;