sap.ui.define([
    "pixelmanager/app/imagens/ImagemBaseController",
    "sap/ui/model/json/JSONModel",
    "pixelmanager/app/repositorios/RepositorioDeImagens",
    "pixelmanager/app/validadores/ValidadorDeImagem"
], function (
    ImagemBaseController,
    JSONModel,
    RepositorioDeImagens,
    ValidadorDeImagem
) {
    "use strict";

    const NAMESPACE = "pixelmanager.app.imagens.Edicao";
    const NOME_MODELO_IMAGEM = "imagens";
    const NOME_MODELO_TELA = "tela";
    const ARGUMENTOS_DA_ROTA = "arguments";
    const ROTA_ADICIONAR_IMAGEM = "AdicionarImagem";
    const ROTA_EDITAR_IMAGEM = "EditarImagem";

    const MODELO_IMAGEM_INICIAL = {
        nomeDoArquivo: "",
        tipo: 1,
        altura: null,
        comprimento: null
    };

    return ImagemBaseController.extend(NAMESPACE, {
        _validador: null,

        onInit: function () {
            this._imagemId = null;
            this._modeloImagem(new JSONModel({ ...MODELO_IMAGEM_INICIAL }));
            this._definirModeloDeControleDeTela();
            this._prepararValidacao();
            this.vincularRota(ROTA_ADICIONAR_IMAGEM, this._aoCoincidirRotaDeCriacao);
            this.vincularRota(ROTA_EDITAR_IMAGEM, this._aoCoincidirRotaDeEdicao);
        },

        _modeloImagem: function (modelo) {
            return this.modelo(NOME_MODELO_IMAGEM, modelo);
        },

        _modeloTela: function (modelo) {
            return this.modelo(NOME_MODELO_TELA, modelo);
        },

        _definirModeloDeControleDeTela: function () {
            const estaEditando = !!this._imagemId;
            const chaveTitulo = estaEditando ? "imageEditTitle" : "imageCreateTitle";
            const titulo = this.getTextOrName(chaveTitulo);

            const dadosTela = { titulo: titulo, estaEditando: estaEditando, habilitarCampos: !estaEditando };
            const modeloTela = this._modeloTela();
            if (modeloTela) {
                modeloTela.setData(dadosTela);
            } else {
                this._modeloTela(new JSONModel(dadosTela));
            }
        },

        _aoCoincidirRotaDeCriacao: function () {
            this.exibirEspera(() => {
                this._imagemId = null;
                this._modeloImagem().setData({ ...MODELO_IMAGEM_INICIAL });
                this._definirModeloDeControleDeTela();
            });
        },

        _aoCoincidirRotaDeEdicao: function (evento) {
            this.exibirEspera(async () => {
                const args = evento.getParameter(ARGUMENTOS_DA_ROTA) || {};
                const id = args?.id || null;
                this._imagemId = id;
                this._definirModeloDeControleDeTela();
                if (this._imagemId) {
                    const resposta = await RepositorioDeImagens.obterPorId(this._imagemId);
                    const dados = {
                        nomeDoArquivo: resposta.nomeDoArquivo || "",
                        tipo: (resposta.tipoDoArquivo != null ? resposta.tipoDoArquivo : 1),
                        altura: resposta.altura || null,
                        comprimento: resposta.comprimento || null
                    };
                    this._modeloImagem().setData(dados);
                }
            });
        },

        _aoSalvarJson: function () {
            const modeloImagem = this._modeloImagem().getData();
            const sucesso = "savedSuccessfully";
            const payload = {
                NomeDoArquivo: modeloImagem.nomeDoArquivo || "",
                TipoDoArquivo: Number(modeloImagem.tipo),
                Altura: modeloImagem.altura != null ? Number(modeloImagem.altura) : null,
                Comprimento: modeloImagem.comprimento != null ? Number(modeloImagem.comprimento) : null
            };

            const estaEditando = !!this._imagemId;
            const promise = estaEditando
                ? RepositorioDeImagens.atualizar(this._imagemId, payload).then(() => ({ id: this._imagemId }))
                : RepositorioDeImagens.criar(payload);

            return promise
                .then((resposta) => this.exibirMensagemDeSucesso(sucesso, () => this._aoClicarNoOkDaMensagemDeSucesso(resposta)));
        },

        _aoClicarNoOkDaMensagemDeSucesso: function (resposta) {
            this.exibirEspera(() => {
                return this.navegarParaDetalhesDeImagem(resposta.id);
            });
        },

        _prepararValidacao: function () {
            this._validador = new ValidadorDeImagem(this.resourceBundle());
            const propriedadeNomeDoArquivo = "nomeDoArquivo";
            const propriedadeAltura = "altura";
            const propriedadeComprimento = "comprimento";

            const nomeDoArquivoId = "inputNomeDoArquivo";
            const alturaId = "inputAltura";
            const comprimentoId = "inputComprimento";

            this._validador.vincularControle(propriedadeNomeDoArquivo, this.byId(nomeDoArquivoId));
            this._validador.vincularControle(propriedadeAltura, this.byId(alturaId));
            this._validador.vincularControle(propriedadeComprimento, this.byId(comprimentoId));
        },

        _validarCampos: function () {
            const nomeDoArquivo = "nomeDoArquivo";
            const altura = "altura";
            const comprimento = "comprimento";

            var validadorNomeDoArquivo = this._validador.validarParaCampo(nomeDoArquivo, this._modeloImagem());
            var validadorAltura = this._validador.validarParaCampo(altura, this._modeloImagem());
            var validadorComprimento = this._validador.validarParaCampo(comprimento, this._modeloImagem());

            if (!validadorNomeDoArquivo || !validadorAltura || !validadorComprimento) {
                const mensagem = "Validation.FillRequiredFields";
                throw new Error(this.getTextOrName(mensagem));
            }
        },

        aoClicarEmSalvar: function () {
            this.exibirEspera(() => {
                this._validarCampos();
                return this._aoSalvarJson();
            });
        },

        aoClicarEmCancelar: function () {
            this.exibirEspera(() => {
                const cfg = this._obterConfiguracoesDeRotaDeRetorno();
                return this.navegarPara(cfg.nomeDaRota, cfg.parametrosDaRota);
            });
        },

        aoClicarEmRetornar: function () {
            this.exibirEspera(() => {
                const cfg = this._obterConfiguracoesDeRotaDeRetorno();
                return this.navegarPara(cfg.nomeDaRota, cfg.parametrosDaRota);
            });
        },

        _obterConfiguracoesDeRotaDeRetorno: function () {
            const nomeRotaLista = this.rotaListaDeImagens || NOME_MODELO_IMAGEM;
            return {
                nomeDaRota: nomeRotaLista,
                parametrosDaRota: null
            };
        }
    });
});
