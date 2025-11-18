sap.ui.define([
    "sap/ui/test/opaQunit",
    "pixelmanager/tests/integration/integration/pages/imagens/EditarImagem",
    "pixelmanager/tests/integration/integration/pages/imagens/Lista",
    "pixelmanager/tests/integration/integration/pages/imagens/DetalhesImagem"
], function (opaQunit) {
    "use strict";

    QUnit.module("Lista de Imagens", () => {

        opaQunit("Deve criar uma imagem e removê-la da lista", function (Given, When, Then) {
            Given.iStartMyApp({
                hash: "imagens/0/adicionar"
            });

            When
                .naTelaDeEdicaoDeImagem
                .PreenchoONomeDoArquivo("imagem-remocao-lista.jpg")
                .SelecionoOTipoDoArquivo("1")
                .PreenchoAAltura("1920")
                .PreenchoOComprimento("1080")
                .ClicoEmSalvar()
                .confirmoDialogDeSucesso();

            Then
                .naTelaDeDetalhesDeImagem
                .aTelaDeDetalhesEstaVisivel();

            When
                .naTelaDeDetalhesDeImagem
                .ClicoEmExcluir()
                .confirmoDialogDeExclusao()
                .confirmoDialogDeSucesso();

            Then
                .naTelaDeListaDeImagens
                .aListaDeImagensEstaVisivel()
                .aImagemNaoEstaNaLista("imagem-remocao-lista.jpg");

            Then.iTeardownMyApp();
        });

        opaQunit("Deve criar uma imagem e clicar em editar pela lista", function (Given, When, Then) {
            Given.iStartMyApp({
                hash: "imagens/0/adicionar"
            });

            When
                .naTelaDeEdicaoDeImagem
                .PreenchoONomeDoArquivo("imagem-editar-pela-lista.jpg")
                .SelecionoOTipoDoArquivo("2")
                .PreenchoAAltura("800")
                .PreenchoOComprimento("600")
                .ClicoEmSalvar()
                .confirmoDialogDeSucesso();

            Then
                .naTelaDeDetalhesDeImagem
                .aTelaDeDetalhesEstaVisivel();

            When
                .naTelaDeDetalhesDeImagem
                .ClicoEmVoltar();

            Then
                .naTelaDeListaDeImagens
                .aListaDeImagensEstaVisivel();

            When
                .naTelaDeListaDeImagens
                .ClicoNaImagemComNome("imagem-editar-pela-lista.jpg");

            Then
                .naTelaDeDetalhesDeImagem
                .aTelaDeDetalhesEstaVisivel();

            When
                .naTelaDeDetalhesDeImagem
                .ClicoEmEditar();

            Then
                .naTelaDeEdicaoDeImagem
                .aTelaDeEdicaoEstaVisivel();

            Then.iTeardownMyApp();
        });
    });
});
