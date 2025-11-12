sap.ui.define([
    "pixelmanager/app/BaseController"
], function (BaseController) {
    "use strict";

    return BaseController.extend("pixelmanager.app.imagens.ImagemBaseController", {
        rotaAdicaoDeImagem: "AdicionarImagem",

        navegarParaAdicaoDeImagem: function () {
            const ID_NOVA_IMAGEM = 0;
            return this.navegarPara(this.rotaAdicaoDeImagem, {
                id: ID_NOVA_IMAGEM
            });
        }
    });
});
