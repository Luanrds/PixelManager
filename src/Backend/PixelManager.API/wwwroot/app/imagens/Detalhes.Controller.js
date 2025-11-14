sap.ui.define([
    "pixelmanager/app/imagens/ImagemBaseController",
    "sap/ui/model/json/JSONModel",
    "pixelmanager/app/repositorios/RepositorioDeImagens",
    "sap/ui/core/format/DateFormat",
    "pixelmanager/app/constantes/ConstantesDeImagem"
], function (ImagemBaseController, JSONModel, RepositorioDeImagens, DateFormat, ConstantesDeImagem) {
    "use strict";

    const NAMESPACE = "pixelmanager.app.imagens.Detalhes";
    const NOME_MODELO_IMAGEM = "imagem";
    const VALOR_NAO_INFORMADO = "-";
    const VALOR_VAZIO = "";
    const PROPERTY_ID = "id";

    return ImagemBaseController.extend(NAMESPACE, {
        oDateFormatExibicao: null,

        onInit: function () {
            this.oDateFormatExibicao = DateFormat.getDateTimeInstance({ pattern: "dd/MM/yyyy" });
            this.getView().setModel(new JSONModel({}), NOME_MODELO_IMAGEM);
            this.vincularRota(this.rotaDetalhesDeImagem, this._aoCorresponderRota);
        },

        _aoCorresponderRota: function (oEvent) {
            const id = oEvent.getParameter("arguments").id;
            this._carregarImagem(id);
        },

        _carregarImagem: function (id) {
            return this.exibirEspera(() => {
                return RepositorioDeImagens.obterPorId(id)
                    .then((imagem) => {
                        this._formatarDadosParaExibicao(imagem);
                        this.getView().getModel(NOME_MODELO_IMAGEM).setData(imagem);
                    });
            });
        },

        _formatarDataParaExibicao: function (sDataString) {
            const valorInvalido = "Inválida";
            if (!sDataString) return VALOR_VAZIO;
            const oDate = new Date(sDataString);
            return !isNaN(oDate.getTime()) ? this.oDateFormatExibicao.format(oDate) : valorInvalido;
        },

        _formatarDadosParaExibicao: function (imagem) {
            imagem.tipoDescricao = this._obterDescricaoDoTipo(imagem.tipoDoArquivo);
            imagem.proporcaoDescricao = this._formatarDimensoes(imagem.comprimento, imagem.altura);
            imagem.proporcaoDecimal = this.formatarProporcao(imagem.comprimento, imagem.altura);
            imagem.dataCriacaoFormatada = this._formatarDataParaExibicao(imagem.dataDeCriacao);
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

        _modeloImagem: function (data) {
            return this.modelo(NOME_MODELO_IMAGEM, data);
        },

        _obterIdDaImagem: function () {
            return this._modeloImagem().getProperty("/" + PROPERTY_ID);
        },

        aoClicarEmRetornar: function () {
            this.navegarParaListaDeImagens();
        },

        aoClicarEmEditar: function () {
            this.exibirEspera(() => {
                const id = this._obterIdDaImagem();
                this.navegarParaEdicaoDeImagem(id);
            });
        },

        aoClicarEmExcluir: function () {
            this.exibirEspera(() => {
                const textoSim = "confirmDeleteMessage";
                const mensagem = this.getTextOrName(textoSim);
                const id = this._obterIdDaImagem();

                this.exibirPopupConfirmacao({
                    mensagem: mensagem,
                    eventoDoBotaoSim: () => this.exibirEspera(() => this._deletar(id))
                });
            });
        },

        _deletar: function (id) {
            return RepositorioDeImagens
                .excluir(id)
                .then(() => {
                    const mensagemDeletadoComSucesso = 'deletedSuccessfully';
                    return this.exibirMensagemDeSucesso(mensagemDeletadoComSucesso, () => this.navegarParaListaDeImagens());
                });
        }
    });
});