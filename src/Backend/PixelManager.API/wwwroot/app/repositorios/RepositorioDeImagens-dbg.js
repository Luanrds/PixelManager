sap.ui.define([
     "pixelmanager/common/client/HttpApiClient"
], function(HttpApiClient) {
    "use strict";

    const API_BASE_URL = "https://localhost:7232/MetadadosDeImagem";

    return {
        obterTodos: function (filtro, callback) {
            debugger
            let url = API_BASE_URL;
            const queryString = this._acrescentarFiltrosNoURLSearchParams(filtro);
            url += queryString;

            return HttpApiClient.get(url, callback);
        },

        _acrescentarFiltrosNoURLSearchParams: function(filtro){
            const nomeDoArquivoParam = "NomeDoArquivo";
            const tipoDoArquivoParam = "TipoDoArquivo";

            let params = new URLSearchParams();

            if (filtro && filtro.nomeDoArquivo && filtro.nomeDoArquivo.trim() !== "") {
                params.append(nomeDoArquivoParam, filtro.nomeDoArquivo.trim());
            }

            if (filtro && (filtro.tipoDoArquivo !== null && filtro.tipoDoArquivo !== undefined && typeof filtro.tipoDoArquivo === 'number')) {
                params.append(tipoDoArquivoParam, filtro.tipoDoArquivo);
            }
            const queryString = params.toString();
            return queryString ? `?${queryString}` : "";
        }
    }
});
