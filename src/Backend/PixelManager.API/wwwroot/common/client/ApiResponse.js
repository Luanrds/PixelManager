sap.ui.define([
    "sap/ui/base/Object",
    "pixelmanager/common/helpers/ArchiveHelper"
], function (sapBaseObject, ArchiveHelper) {
    "use strict";

    const textoErroNaOperacao = "Common.OperationError";
    const textoOServidorRetornou = "Common.ServerReturned";
    const textoOcorreUmErroNaAplicacao = "Common.ApplicationError";

    return sapBaseObject.extend("pixelmanager.common.client.ApiResponse", {
        _resourceBundle: null,

        constructor: function (resourceBundle) {
            this._resourceBundle = resourceBundle;
        },

        _escaparCaracteresDeBindings: function (texto) {
            const tipoString = "string";
            if (texto && typeof (texto) === tipoString) {
                const caractereDeBindInicial = "{";
                const caractereDeBindFinal = "}";

                return texto
                    .replaceAll(caractereDeBindInicial, `\\${caractereDeBindInicial}`)
                    .replaceAll(caractereDeBindFinal, `\\${caractereDeBindFinal}`);
            }

            const nomeDaFuncao = "escaparCaracteresDeBindings";

            throw new Error(`[${nomeDaFuncao}] O texto não é do tipo String!`);
        },

        _erroTemContentTypeProblem: function (resposta) {
            const problemTypes = ["application/problem+json", "application/problem+xml"];
            const nomeDoParametroHeaderMai = "Content-Type";
            const nomeDoParametroHeaderMin = "content-type";
            if (!(resposta instanceof Error)) {
                var contentType = resposta.headers.get(nomeDoParametroHeaderMai) || resposta.headers.get(nomeDoParametroHeaderMin);
                return contentType && problemTypes.some(x => contentType.includes(x));
            }
            return false;
        },

        _obterErroParaProblemDetails: function (resposta) {
            const propriedade = "bodyLido";
            let body = resposta[propriedade] || {};
            return {
                titulo: body.title || body.Title,
                mensagem: body.detail || body.Detail,
                stack: (body.Extensions || {}).stack || (body.extensions || {}).stack,
                textoCabecalho: this._resourceBundle.getText(textoOServidorRetornou)
            };
        },

        _obterErroJavascript: function (resposta) {
            return {
                titulo: this._resourceBundle.getText(textoErroNaOperacao),
                stack: resposta.stack,
                mensagem: resposta.message,
                textoCabecalho: this._resourceBundle.getText(textoOcorreUmErroNaAplicacao)
            };
        },

        _atualizarRespostaComLeituraDeBody: function (resposta) {
            const propriedade = "bodyLido";
            if (resposta.body) {
                return ArchiveHelper
                    .lerCorpo(resposta)
                    .then(bodyLido => resposta[propriedade] = bodyLido);
            }
            if (resposta.detail) {
                resposta[propriedade] = resposta;
            }
            return Promise.resolve();
        },

        obterErro: function (resposta) {
            return this._atualizarRespostaComLeituraDeBody(resposta)
                .then(() => {
                    if (this._erroTemContentTypeProblem(resposta)) {
                        return this._obterErroParaProblemDetails(resposta);
                    }

                    return this._obterErroJavascript(resposta);
                })
                .then(e => {
                    e.mensagem = this._escaparCaracteresDeBindings(e.mensagem);
                    return e;
                });
        }
    });
});