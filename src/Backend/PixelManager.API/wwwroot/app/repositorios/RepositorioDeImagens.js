sap.ui.define([
    "pixelmanager/common/client/HttpApiClient"
], function (HttpApiClient) {
    "use strict";

    const API_BASE_URL = "/MetadadosDeImagem";

    return {
        obterTodos(filtro) {
            let url = API_BASE_URL;

            const queryString = this._acrescentarFiltrosNoURLSearchParams(filtro);
            if (queryString) {
                url += `?${queryString}`;
            }

            return HttpApiClient.get(url);
        },

        _acrescentarFiltrosNoURLSearchParams(filtro) {
            const params = new URLSearchParams();

            if (filtro?.nomeDoArquivo) {
                params.append("NomeDoArquivo", filtro.nomeDoArquivo);
            }

            if (Array.isArray(filtro?.TiposDoArquivo) && filtro.TiposDoArquivo.length > 0) {
                filtro.TiposDoArquivo.forEach(tipo => {
                    params.append("TiposDoArquivo", tipo);
                });
            }

            if (filtro?.dataDeCriacaoInicial) {
                params.append("DataDeCriacaoInicial", filtro.dataDeCriacaoInicial);
            }

            if (filtro?.dataDeCriacaoFinal) {
                params.append("DataDeCriacaoFinal", filtro.dataDeCriacaoFinal);
            }

            const queryString = params.toString();
            return queryString || null;
        }
    };
});
