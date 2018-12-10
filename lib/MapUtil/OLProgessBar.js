'use strict';

exports.__esModule = true;
exports.OLProgressBar = undefined;

var _EventHandler = require('./EventHandler');

var OLProgressBar = exports.OLProgressBar = function OLProgressBar(eventHandler) {
    var olMap;
    var _progress;
    /*
     Start up functions Start
     */

    function init(map) {
        olMap = map;
        eventHandler.RegisterEvent(_EventHandler.EventTypes.ChangeLayers, _registerProgress);
    }

    function _registerProgress() {
        var element = document.getElementById('progressbar');
        if (element === undefined || element === null) {
            return;
        }
        _progress = new Progress(element);
        olMap.getLayers().forEach(function (layer) {
            var source = layer.getSource();
            if (source) {
                var sourceType = source.get('type');
                switch (sourceType) {
                    case 'ol.source.Vector':
                        source.on('vectorloadstart', function () {
                            _progress.addLoading();
                        });
                        source.on('vectorloadend', function () {
                            _progress.addLoaded();
                        });
                        break;
                    case 'ol.source.ImageWMS':
                        source.on('imageloadstart', function () {
                            _progress.addLoading();
                        });

                        source.on('imageloadend', function () {
                            _progress.addLoaded();
                        });
                        source.on('imageloaderror', function () {
                            _progress.addLoaded();
                        });
                        break;
                    case 'ol.source.TileWMS':
                        source.on('tileloadstart', function () {
                            _progress.addLoading();
                        });

                        source.on('tileloadend', function () {
                            _progress.addLoaded();
                        });
                        source.on('tileloaderror', function () {
                            _progress.addLoaded();
                        });
                        break;
                    case undefined:
                        break;
                    default:
                        break;
                }
            }
        });
    }

    /**
     * Renders a progress bar.
     * @param {Element} el The target element.
     * @constructor
     */
    function Progress(el) {
        this.el = el;
        this.loading = 0;
        this.loaded = 0;
    }

    /**
     * Increment the count of loading tiles.
     */
    Progress.prototype.addLoading = function () {
        if (this.loading === 0) {
            this.show();
        }
        ++this.loading;
        this.update();
    };

    /**
     * Increment the count of loaded tiles.
     */
    Progress.prototype.addLoaded = function () {
        var this_ = this;
        ++this_.loaded;
        if (this_.loaded > this_.loading) {
            this_.loaded = this_.loading;
        }
        this_.update();
    };

    /**
     * Update the progress bar.
     */
    Progress.prototype.update = function () {
        this.el.style.width = (this.loaded / this.loading * 100).toFixed(1) + '%';
        if (this.loading === this.loaded) {
            this.loading = 0;
            this.loaded = 0;
            var this_ = this;
            setTimeout(function () {
                this_.hide();
            }, 500);
        }
    };

    /**
     * Show the progress bar.
     */
    Progress.prototype.show = function () {
        this.el.style.visibility = 'visible';
    };

    /**
     * Hide the progress bar.
     */
    Progress.prototype.hide = function () {
        if (this.loading === this.loaded) {
            this.el.style.visibility = 'hidden';
            this.el.style.width = 0;
        }
    };

    return {
        // Start up start
        Init: init
        // Start up end
    };
};