sap.ui.define([], function () {
    "use strict";

    const CONTENT_TYPE_JSON = "application/json";
    const NOME_METODO_HTTP_GET = "GET";

    return {
        converterEmUrl(...values) {
            return values.join('/');
        },

        get(endPoint) {
            return this._ajaxRequest(NOME_METODO_HTTP_GET, endPoint);
        },

        post(endPoint, dados) {
            const nomeDoMetodoHttpPost = "POST";
            return this._ajaxRequest(nomeDoMetodoHttpPost, endPoint, dados);
        },

        put(endPoint, dados) {
            const nomeDoMetodoHttpPut = "PUT";
            return this._ajaxRequest(nomeDoMetodoHttpPut, endPoint, dados);
        },

        _ajaxRequest(type, apiUrl, dados) {
            const parametrosFetch = this._obterParametrosDaRequisicao(type, dados);
            const chaveErroRequisicao = "requestError";

            return fetch(apiUrl, parametrosFetch)
                .then(response => this._erroOuResponse(response))
                .then(response => {
                    if (response.status === 204) {
                        return [];
                    }
                    return response.json();
                })
                .catch(error => {
                    console.warn(chaveErroRequisicao + ':', error);
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

            if (metodoHttp !== NOME_METODO_HTTP_GET && dados != null) {
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
