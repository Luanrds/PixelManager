sap.ui.define([
    "pixelmanager/app/BaseController"
], function (BaseController) {
    "use strict";

    return BaseController.extend("pixelmanager.app.imagens.ImagemBaseController", {
        _nomeModeloImagem: "imagem",
        rotaAdicaoDeImagem: "AdicionarImagem",
        rotaEdicaoDeImagem: "EditarImagem",
        rotaDetalhesDeImagem: "DetalhesImagem",

        navegarParaEdicaoDeImagem: function (id) {
            return this.navegarPara(this.rotaEdicaoDeImagem, {
                id: id
            });
        },

        navegarParaDetalhesDeImagem: function (id) {
            return this.navegarPara(this.rotaDetalhesDeImagem, {
                id: id
            });
        },

        navegarParaAdicaoDeImagem: function () {
            const ID_NOVA_IMAGEM = 0;
            return this.navegarPara(this.rotaAdicaoDeImagem, {
                id: ID_NOVA_IMAGEM
            });
        },

        navegarParaListaDeImagens: function () {
            return this.navegarPara(this.rotaListaDeImagens);
        }
    });
});
