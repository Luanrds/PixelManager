sap.ui.define([], function () {
    "use strict";

    const CONTENT_TYPE_JSON = "application/json";

    return {
        converterEmUrl(...values) {
            return values.join('/');
        },

        get(endPoint) {
            return this._ajaxRequest("GET", endPoint);
        },

        _ajaxRequest(type, apiUrl, dados) {
            const parametrosFetch = this._obterParametrosDaRequisicao(type, dados);

            return fetch(apiUrl, parametrosFetch)
                .then(response => this._erroOuResponse(response))
                .then(response => response.json())
                .catch(error => {
                    console.warn('Erro na requisição:', error);
                    throw error;
                });
        },

        _obterParametrosDaRequisicao(metodoHttp, dados) {
            const parametros = {
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
            return (status >= 400 && status <= 500) || !estaOk;
        },

        _erroOuResponse(response) {
            return this._ehStatusDeErro(response.status, response.ok)
                ? Promise.reject(response)
                : response;
        }
    };
});
