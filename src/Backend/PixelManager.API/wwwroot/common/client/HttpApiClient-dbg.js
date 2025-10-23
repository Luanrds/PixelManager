sap.ui.define([
], function () {
    "use strict";

    const CONTENT_TYPE_JSON = "application/json";

    return {
        converterEmUrl(...values) {
            return values.join('/');
        },

        get(endPoint, callback) {
            const nomeDoMetodo = "GET";
            return this._ajaxRequest(nomeDoMetodo, endPoint, null, callback);
        },

        _ajaxRequest(type, apiUrl, dados, callback) {
            const parametrosFetch = this._obterParametrosDaRequisicao(type, dados);

            return fetch(apiUrl, parametrosFetch)
                .then(response => this._erroOuResponse(response))
                .then(response => {
                    if (callback) {
                        callback(response);
                    }
                    return response.json();
                })
                .catch(error => {
                    console.error('Erro na requisição:', error);
                    throw error;
                });
        },

        _obterParametrosDaRequisicao(metodoHttp, dados) {
            var parametros = {
                method: metodoHttp,
                headers: {
                    "Content-Type": CONTENT_TYPE_JSON
                }
            };

            if (metodoHttp !== "GET" && dados) {
                parametros.body = JSON.stringify(dados);
            }

            return parametros;
        },

        _ehStatusDeErro(status, estaOk) {
            const erroMinimo = 400;
            const erroMaximo = 500;
            return (status >= erroMinimo && status <= erroMaximo) || !estaOk;
        },

        _erroOuResponse(response) {
            return this._ehStatusDeErro(response.status, response.ok)
                ? Promise.reject(response)
                : response;
        }
    };
});