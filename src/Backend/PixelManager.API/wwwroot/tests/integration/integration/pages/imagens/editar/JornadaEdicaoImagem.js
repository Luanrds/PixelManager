sap.ui.define([
    "sap/ui/test/opaQunit",
    "pixelmanager/tests/integration/integration/pages/imagens/editar/EditarImagem"
], function (opaQunit, EditarImagem) {
    "use strict";

    QUnit.module("Criação de Imagens", () => {

        opaQunit("Deve navegar para a tela de criação de imagem", function (Given, When, Then) {
            Given.iStartMyApp({
                hash: "imagens/0/adicionar"
            });

            Then
                .naTelaDeEdicaoDeImagem
                .aTelaDeEdicaoEstaVisivel()
                .osCamposEstaoVazios();

            Then.iTeardownMyApp();
        });

        opaQunit("Deve criar uma nova imagem com sucesso", function (Given, When, Then) {
            Given.iStartMyApp({
                hash: "imagens/0/adicionar"
            });

            When
                .naTelaDeEdicaoDeImagem
                .PreenchoONomeDoArquivo("teste-imagem.jpg")
                .SelecionoOTipoDoArquivo("1")
                .PreenchoAAltura("1920")
                .PreenchoOComprimento("1080")
                .ClicoEmSalvar();

            Then.iTeardownMyApp();
        });

        opaQunit("Deve validar campos obrigatórios ao tentar salvar sem preencher", function (Given, When, Then) {
            Given.iStartMyApp({
                hash: "imagens/0/adicionar"
            });

            When
                .naTelaDeEdicaoDeImagem
                .ClicoEmSalvar();

            Then
                .naTelaDeEdicaoDeImagem
                .oCampoTemErroDeValidacao("inputNomeDoArquivo")
                .oCampoTemErroDeValidacao("inputAltura")
                .oCampoTemErroDeValidacao("inputComprimento");

            Then.iTeardownMyApp();
        });

        opaQunit("Deve preencher campos e validar os valores inseridos", function (Given, When, Then) {
            Given.iStartMyApp({
                hash: "imagens/0/adicionar"
            });

            When
                .naTelaDeEdicaoDeImagem
                .PreenchoONomeDoArquivo("minha-imagem.png")
                .PreenchoAAltura("800")
                .PreenchoOComprimento("600");

            Then
                .naTelaDeEdicaoDeImagem
                .oCampoNomeDoArquivoContem("minha-imagem.png")
                .oCampoAlturaContem("800")
                .oCampoComprimentoContem("600");

            Then.iTeardownMyApp();
        });

        opaQunit("Deve cancelar a criação", function (Given, When, Then) {
            Given.iStartMyApp({
                hash: "imagens/0/adicionar"
            });

            When
                .naTelaDeEdicaoDeImagem
                .PreenchoONomeDoArquivo("imagem-cancelada.jpg")
                .PreenchoAAltura("500")
                .ClicoEmCancelar();

            Then.iTeardownMyApp();
        });
    });
});