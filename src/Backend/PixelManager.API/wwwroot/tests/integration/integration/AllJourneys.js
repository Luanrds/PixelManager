sap.ui.define([
    "sap/ui/test/Opa5",
    "pixelmanager/tests/integration/integration/arrangements/Startup",
    "pixelmanager/tests/integration/integration/pages/imagens/JornadaCriacao",
    "pixelmanager/tests/integration/integration/pages/imagens/JornadaEdicao",
    "pixelmanager/tests/integration/integration/pages/imagens/JornadaDetalhe",
    "pixelmanager/tests/integration/integration/pages/imagens/JornadaLista"
], function (Opa5, Startup) {
    "use strict";

    Opa5.extendConfig({
        arrangements: new Startup(),
        viewNamespace: "pixelmanager.app",
        autoWait: true,
        timeout: 45
    });
});