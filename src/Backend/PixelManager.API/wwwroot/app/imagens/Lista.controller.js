sap.ui.define([
    "pixelmanager/app/BaseController",
    "sap/ui/model/json/JSONModel",
    "pixelmanager/app/repositorios/RepositorioDeImagens",
    "sap/ui/core/format/DateFormat"
], function (BaseController, JSONModel, RepositorioDeImagens, DateFormat) {
    "use strict";

    return BaseController.extend("pixelmanager.app.imagens.Lista", {
        oDateFormatExibicao: null,

        onInit: function () {
            this.oDateFormatExibicao = DateFormat.getDateTimeInstance({ pattern: "dd/MM/yyyy" });
            this._inicializarModelos();
            this._obterImagens();
        },

        _inicializarModelos: function () {
            this.getView().setModel(new JSONModel({ items: [] }), "images");
            this.getView().setModel(new JSONModel({
                nomeDoArquivo: "",
                TiposDoArquivo: [],
                dataDeCriacaoInicial: null,
                dataDeCriacaoFinal: null
            }), "filtro");

            const tipos = [
                { key: 0, text: "PNG" },
                { key: 1, text: "JPG" },
                { key: 2, text: "Bitmap" },
                { key: 3, text: "GIF" }
            ];
            this.getView().setModel(new JSONModel(tipos), "tipos");
        },

        _modeloFiltro: function (data) {
            const nome = 'filtro';
            return this.modelo(nome, data);
        },

        _formatarDataParaExibicao: function (sDataString) {
            if (!sDataString) return "";
            const oDate = new Date(sDataString);
            return !isNaN(oDate.getTime()) ? this.oDateFormatExibicao.format(oDate) : "Inválida";
        },

        _obterImagens: async function () {
            const filtro = this._obterFiltro();
            const response = await RepositorioDeImagens.obterTodos(filtro);

            let itens = response || [];

            itens.forEach(img => {
                img.tipoDescricao = this._obterDescricaoDoTipo(img.tipoDoArquivo);
                img.proporcaoDescricao = this._formatarDimensoes(img.comprimento, img.altura);
                img.proporcaoDecimal = this.formatarProporcao(img.comprimento, img.altura);
                img.dataCriacaoFormatada = this._formatarDataParaExibicao(img.dataDeCriacao);
            });

            this.getView().getModel("images").setData({ items: itens });
        },

        _obterDescricaoDoTipo: function (tipo) {
            const tipos = { 0: "PNG", 1: "JPG", 2: "Bitmap", 3: "GIF" };
            return tipos[tipo] !== undefined ? tipos[tipo] : "Desconhecido";
        },

        _formatarDimensoes: function (comprimento, altura) {
            if (!comprimento || !altura) {
                return "-";
            }
            return `${comprimento} x ${altura}`;
        },

        formatarProporcao: function (comprimento, altura) {
            if (!comprimento || !altura) {
                return "-";
            }
            const proporcao = comprimento / altura;
            return `${proporcao.toFixed(2)}:1`;
        },

        _obterFiltro: function () {
            const filtroOriginal = this._modeloFiltro().getData();
            const filtroParaApi = {};

            const nomeArquivo = filtroOriginal.nomeDoArquivo?.trim();
            if (nomeArquivo) {
                filtroParaApi.nomeDoArquivo = nomeArquivo;
            }

            if (Array.isArray(filtroOriginal.TiposDoArquivo) && filtroOriginal.TiposDoArquivo.length > 0) {
                filtroParaApi.TiposDoArquivo = filtroOriginal.TiposDoArquivo;
            }

            if (filtroOriginal.dataDeCriacaoInicial instanceof Date) {
                filtroParaApi.dataDeCriacaoInicial = filtroOriginal.dataDeCriacaoInicial.toISOString();
            }

            if (filtroOriginal.dataDeCriacaoFinal instanceof Date) {
                filtroParaApi.dataDeCriacaoFinal = filtroOriginal.dataDeCriacaoFinal.toISOString();
            }

            return filtroParaApi;
        },

        aoFiltrar: function () {
            this.exibirEspera(() =>
                this._obterImagens());
        },

        onAddImagePress: function () { },
        aoEditarImagem: function () { },
        aoExcluirImagem: function () { }
    });
});
