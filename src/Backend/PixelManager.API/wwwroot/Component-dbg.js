sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel"
], function (UIComponent, JSONModel) {
    "use strict";

    return UIComponent.extend("pixelmanager.Component", {
        metadata: { manifest: "json" },

        init: function () {
            UIComponent.prototype.init.apply(this, arguments);
            this.setModel(new JSONModel(
                { 
                    appName: "Pixel Manager"
                }), "app");
                
            this.getRouter().initialize();
        }
    });
});