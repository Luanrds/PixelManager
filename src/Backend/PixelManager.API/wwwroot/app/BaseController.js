sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "pixelmanager/common/control/DialogoDeConfirmacao",
    "sap/m/MessageToast",
    "pixelmanager/common/client/ApiResponse",
    "pixelmanager/common/control/DialogoDeErro"
], function (Controller, DialogoDeConfirmacao, MessageToast, ApiResponse, DialogoDeErro) {
    "use strict";

    const ROTA_LISTA_IMAGENS = "imagens";
    const NAMESPACE_DA_CONTROLLER = "pixelmanager.app.BaseController";
    const ID_TOOL_PAGE = "toolPage";

    return Controller.extend(NAMESPACE_DA_CONTROLLER, {
        rotaListaDeImagens: ROTA_LISTA_IMAGENS,

        apiResponse: function () {
            if (this._apiResponse === null || this._apiResponse === undefined) {
                this._apiResponse = new ApiResponse(this.resourceBundle());
            }
            return this._apiResponse;
        },

        modelo: function (nome, modelo) {
            const view = this.getView();
            if (modelo) view.setModel(modelo, nome);
            return view.getModel(nome);
        },

        getRouter: function () {
            return this.getOwnerComponent().getRouter();
        },

        vincularRota: function (routeName, func) {
            const router = this.getRouter();
            return routeName
                ? router.getRoute(routeName).attachPatternMatched(func, this)
                : router.attachRouteMatched(func, this);
        },

        _setarCarregamento: function (estado, controle) {
            if (controle?.setBusy) {
                controle.setBusyIndicatorDelay(0);
                controle.setBusy(estado);
            }
        },

        _carregamentoDaToolPageOuControle: function (estado, busyControl) {
            const root = this.getOwnerComponent().getRootControl();
            const controle = busyControl || root.byId(ID_TOOL_PAGE) || this.getView();
            this._setarCarregamento(estado, controle);
        },

        _executarEObterPromiseDaAction: function (action, busyControl) {
            let promise;
            try {
                this._carregamentoDaToolPageOuControle(true, busyControl);
                let resultado = action();
                const nomeDoMetodoThen = "then";
                const nomeDoTipo = "function";

                if (resultado === null || resultado === undefined) {
                    promise = Promise.resolve();
                } else if (typeof (resultado[nomeDoMetodoThen]) !== nomeDoTipo) {
                    promise = Promise.resolve(resultado);
                } else {
                    promise = resultado;
                }
            } catch (e) {
                promise = Promise.reject(e);
            }

            return promise;
        },

        exibirEspera: function (action, busyControl) {
            const promise = this._executarEObterPromiseDaAction(action, busyControl);

            promise
                .catch(x => {
                    const inicioDoTexto = "Catch: ";
                    console.log(inicioDoTexto, x.status);
                    return this.apiResponse()
                        .obterErro(x)
                        .then(erro => this._criarDialogoDeErro(erro));
                })
                .finally(() => this._carregamentoDaToolPageOuControle(false, busyControl));
        },

        _criarDialogoDeErro: function (erro) {
            const falhaDeComunicacao = "failed to fetch";
            const traducaoDeFalhaDeComunicacao = "Common.FailedToRequestServer";
            let mensagemMinusculo = erro.mensagem.toLowerCase();
            const idDialogoDeErro = "apiErrorDialog";
            var dialogo = new DialogoDeErro(idDialogoDeErro, {
                title: erro.titulo,
                cabecalho: erro.textoCabecalho,
                mensagem: mensagemMinusculo === falhaDeComunicacao ? this.getTextOrName(traducaoDeFalhaDeComunicacao) : erro.mensagem,
                stack: erro.stack
            });
            this._setarI18nNoControle(dialogo);
            return dialogo.open();
        },


        navegarPara: function (routeName, params) {
            return this.getRouter().navTo(routeName, params);
        },

        resourceBundle: function () {
            if (this._resourceBundle === null || this._resourceBundle === undefined) {
                this._resourceBundle = this.getResourceBundle();
            }

            return this._resourceBundle;
        },

        getTextOrName: function (i18nNameOrMessage, arrayDeParametros = undefined) {
            return this.resourceBundle().hasText(i18nNameOrMessage) ?
                this.resourceBundle().getText(i18nNameOrMessage, arrayDeParametros) :
                i18nNameOrMessage;
        },

        exibirMensagemDeSucesso: function (traducao_mensagem, evento) {
            const TEXTO_SUCESSO = "Success";
            const TEXTO_OK = "Common.OK";
            const noop = () => { };

            var dialogo = new DialogoDeConfirmacao({
                textoConteudo: this.getTextOrName(traducao_mensagem),
                title: this.getTextOrName(TEXTO_SUCESSO),
                contentWidth: "40px",
                textoBotaoDireito: this.getTextOrName(TEXTO_OK),
                botaoDireito: evento || noop
            });
            this._setarI18nNoControle(dialogo);
            return dialogo.open();
        },

        getResourceBundle: function () {
            const nome = "i18n";
            return this
                .getOwnerComponent()
                .getModel(nome)
                .getResourceBundle();
        },

        _setarI18nNoControle: function (dialogo) {
            const nomeModeloI18n = "i18n";
            var modelo = this
                .getOwnerComponent()
                .getModel(nomeModeloI18n);
            dialogo.setModel(modelo, nomeModeloI18n);
        },

        naoImplementado: function () {
            const texto = this.getOwnerComponent()
                .getModel("i18n")
                .getResourceBundle()
                .getText("NotImplemented");

            MessageToast.show(texto);
        }
    });
});
