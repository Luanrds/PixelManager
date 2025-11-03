sap.ui.define([
    "pixelmanager/app/BaseController",
    "sap/ui/model/json/JSONModel",
    "pixelmanager/app/repositorios/RepositorioDeImagens",
    "sap/ui/core/format/DateFormat",
    "pixelmanager/app/constantes/ConstantesDeImagem"
], function (BaseController, JSONModel, RepositorioDeImagens, DateFormat, ConstantesDeImagem) {
    "use strict";

    const NAMESPACE_LISTA = "pixelmanager.app.imagens.Lista";
    const NOME_MODELO_IMAGENS = "images";
    const NOME_MODELO_FILTRO = "filtro";
    const NOME_MODELO_TIPOS = "tipos";
    const VALOR_NAO_INFORMADO = "-";
    const VALOR_VAZIO = "";

    return BaseController.extend(NAMESPACE_LISTA, {
        oDateFormatExibicao: null,
        rotaListaDeImagens: "imagens",

        onInit: function () {
            this.oDateFormatExibicao = DateFormat.getDateTimeInstance({ pattern: "dd/MM/yyyy" });
            this._inicializarModelos();
            this.vincularRota(this.rotaListaDeImagens, this._aoCorresponderRota);
        },

        _inicializarModelos: function () {
            this.getView().setModel(new JSONModel({ items: [] }), NOME_MODELO_IMAGENS);
            this.getView().setModel(new JSONModel({
                nomeDoArquivo: VALOR_VAZIO,
                TiposDoArquivo: [],
                dataDeCriacaoInicial: null,
                dataDeCriacaoFinal: null
            }), NOME_MODELO_FILTRO);

            this.getView().setModel(new JSONModel(ConstantesDeImagem.TIPOS_DE_ARQUIVO), NOME_MODELO_TIPOS);
        },

        _modeloFiltro: function (data) {
            return this.modelo(NOME_MODELO_FILTRO, data);
        },

        _aoCorresponderRota: function (e) {
            this._restaurarFiltroDaRota(e);
            this._obterImagens();
        },

        _restaurarFiltroDaRota: function (e) {
            const query = "?query";
            const separadorLista = ",";
            const q = (e.getParameter("arguments")?.[query]) || {};

            const tipos = q.TiposDoArquivo == null
                ? []
                : Array.isArray(q.TiposDoArquivo)
                    ? q.TiposDoArquivo
                    : (typeof q.TiposDoArquivo === "string" && q.TiposDoArquivo.includes(separadorLista))
                        ? q.TiposDoArquivo.split(separadorLista)
                        : [q.TiposDoArquivo];

            this._modeloFiltro().setData({
                nomeDoArquivo: (q.NomeDoArquivo || VALOR_VAZIO).trim(),
                TiposDoArquivo: tipos,
                dataDeCriacaoInicial: (q.DataDeCriacaoInicial && new Date(q.DataDeCriacaoInicial)) || null,
                dataDeCriacaoFinal: (q.DataDeCriacaoFinal && new Date(q.DataDeCriacaoFinal)) || null
            });
        },

        _formatarDataParaExibicao: function (sDataString) {
            const valorInvalido = "Inválida";
            if (!sDataString) return VALOR_VAZIO;
            const oDate = new Date(sDataString);
            return !isNaN(oDate.getTime()) ? this.oDateFormatExibicao.format(oDate) : valorInvalido;
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

            this.getView().getModel(NOME_MODELO_IMAGENS).setData({ items: itens });
        },

        _obterDescricaoDoTipo: function (tipo) {
            const DescricaoTipoDesconhecido = "Desconhecido";
            return ConstantesDeImagem.MAPA_DESCRICAO_TIPO[tipo] ?? DescricaoTipoDesconhecido;
        },

        _formatarDimensoes: function (comprimento, altura) {
            if (!comprimento || !altura) {
                return VALOR_NAO_INFORMADO;
            }
            return `${comprimento} x ${altura}`;
        },

        formatarProporcao: function (comprimento, altura) {
            if (!comprimento || !altura) {
                return VALOR_NAO_INFORMADO;
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

        _atualizarUrlComFiltro: function () {
            const filtro = this._obterFiltro();
            const query = {};

            if (filtro.nomeDoArquivo) {
                query.NomeDoArquivo = filtro.nomeDoArquivo;
            }

            if (Array.isArray(filtro.TiposDoArquivo) && filtro.TiposDoArquivo.length) {
                query.TiposDoArquivo = filtro.TiposDoArquivo;
            }

            if (filtro.dataDeCriacaoInicial) {
                query.DataDeCriacaoInicial = filtro.dataDeCriacaoInicial;
            }

            if (filtro.dataDeCriacaoFinal) {
                query.DataDeCriacaoFinal = filtro.dataDeCriacaoFinal;
            }

            this.getRouter().navTo(this.rotaListaDeImagens, { query }, true);
        },

        aoFiltrar: function () {
            return this.exibirEspera(() => {
                this._atualizarUrlComFiltro();
                return this._obterImagens();
            });
        },

        onAddImagePress: function () {
            this.NaoImplementado();
        },

        aoEditarImagem: function () {
            this.NaoImplementado();
        },

        aoExcluirImagem: function () {
            this.NaoImplementado();
        }
    });
});
