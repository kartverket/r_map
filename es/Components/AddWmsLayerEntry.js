var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import OlLayerTile from 'ol/layer/Tile';
import OlLayerImage from 'ol/layer/Image';
import { Checkbox, Tooltip } from "react-bootstrap";

import { Icon } from 'react-fa';

/**
 * Class representing a layer parsed from capabilities document.
 * This componment is used in AddWmsPanel
 *
 * @class AddWmsLayerEntry
 * @extends React.Component
 */
export var AddWmsLayerEntry = (_temp = _class = function (_React$Component) {
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
            copyright: props.wmsLayer.getSource().getAttributions(),
            queryable: props.wmsLayer.get('queryable')
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


        var title = wmsLayer.get('title');
        var layerTextSpan = layerTextTemplateFn(wmsLayer);

        return React.createElement(
            Checkbox,
            { value: title, className: 'add-wms-layer-checkbox-line' },
            React.createElement(
                'div',
                { className: 'add-wms-layer-entry' },
                layerTextSpan,
                copyright ? React.createElement(Icon, { className: 'add-wms-add-info-icon', name: 'copyright' }) : null,
                queryable ? React.createElement(
                    Tooltip,
                    { title: layerQueryableText, id: layerQueryableText },
                    React.createElement(Icon, { className: 'add-wms-add-info-icon', name: 'info' })
                ) : null
            )
        );
    };

    return AddWmsLayerEntry;
}(React.Component), _class.defaultProps = {
    layerQueryableText: 'Layer is queryable',
    layerTextTemplateFn: function layerTextTemplateFn(wmsLayer) {
        var title = wmsLayer.get('title');
        var abstract = wmsLayer.get('abstract');
        var abstractTextSpan = abstract ? React.createElement(
            'span',
            null,
            title + ' - ' + abstract + ':'
        ) : React.createElement(
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
    wmsLayer: PropTypes.oneOfType([PropTypes.instanceOf(OlLayerTile), PropTypes.instanceOf(OlLayerImage)]).isRequired,

    /**
     * Function returning a span with the textual representation of this layer
     * Default: Title of the layer and its abstract (if available)
     * @type {Function}
     */
    layerTextTemplateFn: PropTypes.func,

    /**
     * Optional text to be shown in Tooltip for a layer that can be queried
     * @type {Object}
     */
    layerQueryableText: PropTypes.string } : {};