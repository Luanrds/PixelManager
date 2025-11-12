sap.ui.define([
    "pixelmanager/common/validadores/ValidadorBase"
], function (ValidadorBase) {
    "use strict";

    return ValidadorBase.extend("pixelmanager.app.validadores.ValidadorDeImagem", {
        constructor: function (resourceBundle) {
            ValidadorBase.call(this);

            const nomeDoArquivo = 'nomeDoArquivo';
            const mensagemNomeDoArquivo = "Validation.FileNameRequired";
            const mensagemNomeDoArquivoMaxLength = "Validation.FileNameMaxLength";
            const tamanhoMaximoNomeDoArquivo = 100;
            this.validacaoPara(nomeDoArquivo)
                .naoVazio(resourceBundle.getText(mensagemNomeDoArquivo))
                .tamanhoMaximo(tamanhoMaximoNomeDoArquivo, resourceBundle.getText(mensagemNomeDoArquivoMaxLength));

            const altura = 'altura';
            const mensagemAltura = "Validation.HeightRequired";
            const mensagemAlturaMaiorQueZero = "Validation.HeightMustBeGreaterThanZero";
            this.validacaoPara(altura)
                .naoVazio(resourceBundle.getText(mensagemAltura))
                .maiorQueZero(resourceBundle.getText(mensagemAlturaMaiorQueZero));

            const comprimento = 'comprimento';
            const mensagemComprimento = "Validation.WidthRequired";
            const mensagemComprimentoMaiorQueZero = "Validation.WidthMustBeGreaterThanZero";
            this.validacaoPara(comprimento)
                .naoVazio(resourceBundle.getText(mensagemComprimento))
                .maiorQueZero(resourceBundle.getText(mensagemComprimentoMaiorQueZero));
        }
    });
});