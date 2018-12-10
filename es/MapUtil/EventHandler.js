
export var EventHandler = function EventHandler() {
    var callBacks = [];

    function registerEvent(eventType, callBack) {
        callBacks.push({
            eventType: eventType,
            callBack: callBack
        });
    }

    function unRegisterEvent(eventType, callBack) {
        for (var i = 0; i < callBacks.length; i++) {
            if (callBacks[i].eventType === eventType && callBacks[i].callBack === callBack) {
                callBacks.splice(i, 1);
                break;
            }
        }
    }

    function triggerEvent(eventType, args) {
        for (var i = 0; i < callBacks.length; i++) {
            var callBack = callBacks[i];
            if (callBack.eventType === eventType) {
                callBack.callBack(args);
            }
        }
    }

    return {
        RegisterEvent: registerEvent,
        UnRegisterEvent: unRegisterEvent,
        TriggerEvent: triggerEvent
    };
};

export var EventTypes = {
    ChangeCenter: "ChangeCenter",
    ChangeResolution: "ChangeResolution",
    ChangeLayers: "ChangeLayers",
    FeatureInfoStart: "FeatureInfoStart",
    FeatureInfoEnd: "FeatureInfoEnd",
    MapConfigLoaded: "MapConfigLoaded",
    MapLoaded: "MapLoaded",
    MapMoveend: "MapMoveend",
    ShowExportPanel: "ShowExportPanel",
    MeasureMouseMove: "MeasureMouseMove",
    LoadingLayerEnd: "LoadingLayerEnd",
    LayerCreated: "LayerCreated",
    CachingStart: "CachingStart",
    CachingEnd: "CachingEnd",
    CachingProgress: "CachingProgress",
    StatusPouchDbChanged: "StatusPouchDbChanged",
    MeasureEnd: "MeasureEnd",
    DrawFeatureMouseMove: "DrawFeatureMouseMove",
    DrawFeatureEnd: "DrawFeatureEnd",
    DrawFeatureSelect: "DrawFeatureSelect",
    AddLayerFeatureEnd: "AddLayerFeatureEnd",
    ModifyFeatureEnd: "ModifyFeatureEnd",
    RefreshSourceDone: "RefreshSourceDone",
    ZoomIn: "ZoomIn",
    ZoomOut: "ZoomOut",
    TransactionSuccessful: "TransactionSuccessful",
    TransactionFailed: "TransactionFailed",
    TransactionInsertEnd: "TransactionInsertEnd",
    TransactionUpdateEnd: "TransactionUpdateEnd",
    TransactionRemoveEnd: "TransactionRemoveEnd",
    FeatureHasBeenDescribed: "FeatureHasBeenDescribed",
    GeolocationUpdated: "GeolocationUpdated",
    PrintBoxSelectReturnValue: "PrintBoxSelectReturnValue",
    MapClickCoordinate: "MapClickCoordinate",
    AddLayerUrlEnd: "AddLayerUrlEnd"
};