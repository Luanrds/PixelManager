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
            this.vincularRota("AdicionarImagem", this._aoCoincidirRotaDeCriacao);
            this.vincularRota("EditarImagem", this._aoCoincidirRotaDeEdicao);
        },

        _modeloImagem: function (modelo) {
            return this.modelo(NOME_MODELO_IMAGEM, modelo);
        },

        _modeloTela: function (modelo) {
            return this.modelo(NOME_MODELO_TELA, modelo);
        },

        _definirModeloDeControleDeTela: function () {
            const titulo = this._imagemId ? "Editar Imagem" : "Nova Imagem";
            this._modeloTela(new JSONModel({ titulo }));
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
                const id = evento.getParameter(ARGUMENTOS_DA_ROTA)?.id || null;
                this._imagemId = id;
                this._definirModeloDeControleDeTela();
                if (this._imagemId) {
                    const e = await RepositorioDeImagens.obterPorId(this._imagemId);
                    const dados = {
                        NomeDoArquivo: e?.NomeDoArquivo ?? e?.nomeDoArquivo ?? "",
                        TipoDoArquivo: e?.TipoDoArquivo ?? e?.tipoDoArquivo ?? 1,
                        Altura: e?.Altura ?? e?.altura ?? null,
                        Comprimento: e?.Comprimento ?? e?.comprimento ?? null
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
            return RepositorioDeImagens
                .criar(payload)
                .then(() => this.exibirMensagemDeSucesso(sucesso, () => this._aoClicarNoOkDaMensagemDeSucesso()));
        },

        _aoClicarNoOkDaMensagemDeSucesso: function () {
            this.exibirEspera(() => {
                const cfg = this._obterConfiguracoesDeRotaDeRetorno();
                return this.navegarPara(cfg.nomeDaRota, cfg.parametrosDaRota);
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

            if (validadorNomeDoArquivo === false || validadorAltura === false || validadorComprimento === false) {
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
            const nomeRotaLista = this.rotaListaDeImagens || "imagens";
            return {
                nomeDaRota: nomeRotaLista,
                parametrosDaRota: null
            };
        }
    });
});
