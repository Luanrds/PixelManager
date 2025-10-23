sap.ui.define([
    "pixelmanager/app/BaseController",
    "sap/ui/model/json/JSONModel",
    "pixelmanager/app/repositorios/RepositorioDeImagens",
    "sap/m/MessageToast"
], function (BaseController, JSONModel, RepositorioDeImagens, MessageToast) {
    "use strict";

    return BaseController.extend("pixelmanager.app.imagens.Lista", {
        onInit: function () {
            this._inicializarModelos();
            this._obterImagens();
        },

        _inicializarModelos: function () {
            this.getView().setModel(new JSONModel([]), "images");
            this.getView().setModel(new JSONModel({ nomeDoArquivo: "" }), "filtro");
        },

        _obterImagens: function () {
            return RepositorioDeImagens.obterTodos()
                .then(imagens => {
                    imagens.forEach(img => {
                        img.tipoDescricao = this._obterDescricaoDoTipo(img.tipoDoArquivo);
                        img.proporcaoDescricao = this._calcularProporcao(img.comprimento, img.altura);
                    });

                    this.getView().getModel("images").setData({ items: imagens });
                })
                .catch(() => {
                    MessageToast.show("Falha ao carregar imagens.");
                });
        },

        _obterDescricaoDoTipo: function (tipo) {
            const tipos = { 1: "PNG", 2: "JPG", 3: "GIF" };
            return tipos[tipo] || "Desconhecido";
        },

        _calcularProporcao: function (comprimento, altura) {
            if (!comprimento || !altura) return "-";
            return `${comprimento} x ${altura}`;
        },

        aoFiltrar: function () {
            this.exibirEspera(() => {
                const imagesModel = this.getView().getModel("images");
                imagesModel.setData({ items: [] });

                const filtro = this.getView().getModel("filtro").getProperty("/nomeDoArquivo")?.trim().toLowerCase();

                return RepositorioDeImagens.obterTodos().then(imagens => {
                    const filtradas = filtro
                        ? imagens.filter(img => img.nomeDoArquivo.toLowerCase().includes(filtro))
                        : imagens;

                    imagesModel.setData({ items: filtradas });
                });
            });
        },

        onAddImagePress: function () { },

        aoEditarImagem: function (oEvent) { },

        aoExcluirImagem: function (oEvent) { }
    });
});
