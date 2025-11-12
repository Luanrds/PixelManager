sap.ui.define([
    "sap/ui/test/Opa5",
    "pixelmanager/tests/integration/integration/arrangements/Startup",
    "pixelmanager/tests/integration/integration/pages/imagens/editar/JornadaEdicaoImagem"
], function (Opa5, Startup, JornadaEdicaoImagem) {
    "use strict";

    Opa5.extendConfig({
        arrangements: new Startup(),
        viewNamespace: "pixelmanager.app",
        autoWait: true,
        timeout: 45
    });
});