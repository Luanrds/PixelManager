sap.ui.define([
    "pixelmanager/app/BaseController"
], function (BaseController) {
    "use strict";

    return BaseController.extend("pixelmanager.app.imagens.ImagemBaseController", {
        rotaAdicaoDeImagem: "AdicionarImagem",

        navegarParaAdicaoDeImagem: function () {
            const zero = 0;
            return this.navegarPara(this.rotaAdicaoDeImagem, {
                id: zero
            });
        }
    });
});
