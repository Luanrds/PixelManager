sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel"
], function (UIComponent, JSONModel) {
    "use strict";

    const NOME_MODELO_APP = "app";
    const CHAVE_TITULO_APP = "appTitle"

    return UIComponent.extend("pixelmanager.Component", {
        metadata: {
            manifest: "json"
        },

        init: function () {
            UIComponent.prototype.init.apply(this, arguments);

            this.setModel(
                new JSONModel(
                {
                    appName: CHAVE_TITULO_APP
                }), NOME_MODELO_APP);
                
            this.getRouter().initialize();
        }
    });
});