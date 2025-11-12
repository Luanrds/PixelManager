sap.ui.define([
    "sap/ui/base/Object",
    "./Validacao"
], function (Object, Validacao) {
    "use strict";

    return Object.extend("pixelmanager.common.validadores.ValidadorBase", {
        constructor: function () {
            Object.call(this);
            this.validacoes = [];
        },

        validacaoPara: function (nomeDoCampo) {
            var validacao = new Validacao(nomeDoCampo);

            this.validacoes.push(validacao);

            return validacao;
        },

        vincularControle: function (nomeDoCampo, controle) {
            var validacao = this.validacoes.find(x => x.nomeDoCampo === nomeDoCampo);

            if (validacao)
                validacao.vincularControle(controle);
        },

        validar: function (objeto) {
            var validadoComSucesso = true;

            this.validacoes.forEach(function (validacao) {
                var resultadoDaValidacao = validacao.validar(objeto);
                if (validadoComSucesso) {
                    validadoComSucesso = resultadoDaValidacao;
                }
            });

            return validadoComSucesso;
        },

        validarParaCampo: function (nomeDoCampo, objeto) {
            let validacao = this.validacoes.find(x => x.nomeDoCampo === nomeDoCampo);
            if (!validacao) {
                return null;
            }
            return validacao.validar(objeto);
        }
    });
});