sap.ui.define([
    "sap/ui/test/Opa5"
], function (Opa5) {
    "use strict";

    return Opa5.extend("pixelmanager.tests.integration.arrangements.Startup", {
        iStartMyApp: function (oOptions) {
            oOptions = oOptions || {};

            this.iStartMyUIComponent({
                componentConfig: {
                    name: "pixelmanager",
                    async: true
                },
                hash: oOptions.hash || "",
                autoWait: oOptions.autoWait !== false
            });
        }
    });
});
