sap.ui.define([
    "pixelmanager/common/client/HttpApiClient"
], function (HttpApiClient) {
    "use strict";

    const API_BASE_URL = "/MetadadosDeImagem";

    return {
        criar(payload) {
            return HttpApiClient.post(API_BASE_URL, payload);
        },

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
            const nomeDoArquivo = "NomeDoArquivo";
            const tipoDoArquivo = "TiposDoArquivo"
            const dataDeCriacaoInicial = "DataDeCriacaoInicial";
            const dataDeCriacaoFinal = "DataDeCriacaoFinal";

            if (filtro?.nomeDoArquivo) {
                params.append(nomeDoArquivo, filtro.nomeDoArquivo);
            }

            if (Array.isArray(filtro?.TiposDoArquivo) && filtro.TiposDoArquivo.length > 0) {
                filtro.TiposDoArquivo.forEach(tipo => {
                    params.append(tipoDoArquivo, tipo);
                });
            }

            if (filtro?.dataDeCriacaoInicial) {
                params.append(dataDeCriacaoInicial, filtro.dataDeCriacaoInicial);
            }

            if (filtro?.dataDeCriacaoFinal) {
                params.append(dataDeCriacaoFinal, filtro.dataDeCriacaoFinal);
            }

            const queryString = params.toString();
            return queryString;
        }
    };
});
