'use strict';

exports.__esModule = true;
exports.AddWmsLayerEntry = undefined;

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Tile = require('ol/layer/Tile');

var _Tile2 = _interopRequireDefault(_Tile);

var _Image = require('ol/layer/Image');

var _Image2 = _interopRequireDefault(_Image);

var _reactBootstrap = require('react-bootstrap');

var _reactFa = require('react-fa');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class representing a layer parsed from capabilities document.
 * This componment is used in AddWmsPanel
 *
 * @class AddWmsLayerEntry
 * @extends React.Component
 */
var AddWmsLayerEntry = exports.AddWmsLayerEntry = (_temp = _class = function (_React$Component) {
    _inherits(AddWmsLayerEntry, _React$Component);

    /**
     * Create the AddWmsLayerEntry.
     *
     * @constructs AddWmsLayerEntry
     */
    function AddWmsLayerEntry(props) {
        _classCallCheck(this, AddWmsLayerEntry);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

        _this.state = {
            // copyright: props.wmsLayer.getSource().getAttributions(),
            // queryable: props.wmsLayer.get('queryable')
        };
        return _this;
    }

    /**
     * The defaultProps.
     * @type {Object}
     */


    /**
     * The prop types.
     * @type {Object}
     */


    /**
     * The render function
     */
    AddWmsLayerEntry.prototype.render = function render() {
        var _props = this.props,
            wmsLayer = _props.wmsLayer,
            layerTextTemplateFn = _props.layerTextTemplateFn,
            layerQueryableText = _props.layerQueryableText;
        var _state = this.state,
            copyright = _state.copyright,
            queryable = _state.queryable;


        var title = wmsLayer.name;
        var layerTextSpan = layerTextTemplateFn(wmsLayer);

        return _react2.default.createElement(
            _reactBootstrap.Checkbox,
            { value: title, className: 'add-wms-layer-checkbox-line' },
            _react2.default.createElement(
                'div',
                { className: 'add-wms-layer-entry' },
                layerTextSpan,
                copyright ? _react2.default.createElement(_reactFa.Icon, { className: 'add-wms-add-info-icon', name: 'copyright' }) : null,
                queryable ? _react2.default.createElement(
                    _reactBootstrap.Tooltip,
                    { title: layerQueryableText, id: layerQueryableText },
                    _react2.default.createElement(_reactFa.Icon, { className: 'add-wms-add-info-icon', name: 'info' })
                ) : null
            )
        );
    };

    return AddWmsLayerEntry;
}(_react2.default.Component), _class.defaultProps = {
    layerQueryableText: 'Layer is queryable',
    layerTextTemplateFn: function layerTextTemplateFn(wmsLayer) {
        var title = wmsLayer.name;
        var abstract = wmsLayer.abstract || '';
        var abstractTextSpan = abstract ? _react2.default.createElement(
            'span',
            null,
            title + ' - ' + abstract + ':'
        ) : _react2.default.createElement(
            'span',
            null,
            '' + title
        );
        return abstractTextSpan;
    } }, _temp);
AddWmsLayerEntry.propTypes = process.env.NODE_ENV !== "production" ? {
    /**
     * Object containing layer information
     * @type {Object}
     */
    wmsLayer: _propTypes2.default.oneOfType([_propTypes2.default.instanceOf(_Tile2.default), _propTypes2.default.instanceOf(_Image2.default)]).isRequired,

    /**
     * Function returning a span with the textual representation of this layer
     * Default: Title of the layer and its abstract (if available)
     * @type {Function}
     */
    layerTextTemplateFn: _propTypes2.default.func,

    /**
     * Optional text to be shown in Tooltip for a layer that can be queried
     * @type {Object}
     */
    layerQueryableText: _propTypes2.default.string } : {};