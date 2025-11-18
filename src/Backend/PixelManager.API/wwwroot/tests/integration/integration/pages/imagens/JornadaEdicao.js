sap.ui.define([
    "sap/ui/test/opaQunit",
    "pixelmanager/tests/integration/integration/pages/imagens/EditarImagem",
    "pixelmanager/tests/integration/integration/pages/imagens/Lista",
    "pixelmanager/tests/integration/integration/pages/imagens/DetalhesImagem"
], function (opaQunit) {
    "use strict";

    QUnit.module("Edição de Imagens", () => {

        opaQunit("Deve criar uma imagem e abrir a tela de edição", function (Given, When, Then) {
            Given.iStartMyApp({
                hash: "imagens/0/adicionar"
            });

            When
                .naTelaDeEdicaoDeImagem
                .PreenchoONomeDoArquivo("imagem-edicao-teste.jpg")
                .SelecionoOTipoDoArquivo("1")
                .PreenchoAAltura("1920")
                .PreenchoOComprimento("1080")
                .ClicoEmSalvar()
                .confirmoDialogDeSucesso();

            Then
                .naTelaDeDetalhesDeImagem
                .aTelaDeDetalhesEstaVisivel();

            Then.iTeardownMyApp();
        });
        
        opaQunit("Deve ser possivel alterar o campo Nome do Arquivo", function (Given, When, Then) {
            Given.iStartMyApp({
                hash: "imagens/0/adicionar"
            });

            When
                .naTelaDeEdicaoDeImagem
                .PreenchoONomeDoArquivo("imagem-alterar-nome.jpg")
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
                .ClicoEmEditar();

            Then
                .naTelaDeEdicaoDeImagem
                .aTelaDeEdicaoEstaVisivel();

            When
                .naTelaDeEdicaoDeImagem
                .PreenchoONomeDoArquivo("imagem-nome-alterado.jpg")
                .ClicoEmSalvar()
                .confirmoDialogDeSucesso();

            Then
                .naTelaDeDetalhesDeImagem
                .aTelaDeDetalhesEstaVisivel();

            Then.iTeardownMyApp();
        });

        opaQunit("Deve validar campos obrigatórios ao tentar salvar sem preencher", function (Given, When, Then) {
            Given.iStartMyApp({
                hash: "imagens/0/adicionar"
            });

            When
                .naTelaDeEdicaoDeImagem
                .PreenchoONomeDoArquivo("imagem-validacao.jpg")
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
                .ClicoEmEditar();

            Then
                .naTelaDeEdicaoDeImagem
                .aTelaDeEdicaoEstaVisivel();

            When
                .naTelaDeEdicaoDeImagem
                .PreenchoONomeDoArquivo("")
                .ClicoEmSalvar();

            Then
                .naTelaDeEdicaoDeImagem
                .oCampoTemErroDeValidacao("inputNomeDoArquivo")

            Then.iTeardownMyApp();
        });

        opaQunit("Quando clico no botão cancelar deve navegar de volta para a lista de imagens", function (Given, When, Then) {
            Given.iStartMyApp({
                hash: "imagens/0/adicionar"
            });

            When
                .naTelaDeEdicaoDeImagem
                .PreenchoONomeDoArquivo("imagem-cancelar-teste.jpg")
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
                .ClicoEmEditar();

            Then
                .naTelaDeEdicaoDeImagem
                .aTelaDeEdicaoEstaVisivel();

            When
                .naTelaDeEdicaoDeImagem
                .ClicoEmCancelar()
                
            Then
                .naTelaDeListaDeImagens
                .aListaDeImagensEstaVisivel();

            Then.iTeardownMyApp();
        });

        opaQunit("Quando clico em retornar deve navegar de volta para a lista de imagens", function (Given, When, Then) {
            Given.iStartMyApp({
                hash: "imagens/0/adicionar"
            });

            When
                .naTelaDeEdicaoDeImagem
                .PreenchoONomeDoArquivo("imagem-voltar-teste.jpg")
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
                .ClicoEmEditar();

            Then
                .naTelaDeEdicaoDeImagem
                .aTelaDeEdicaoEstaVisivel();

            When
                .naTelaDeEdicaoDeImagem
                .ClicoEmVoltar()
                
            Then
                .naTelaDeListaDeImagens
                .aListaDeImagensEstaVisivel();

            Then.iTeardownMyApp();
        });

        opaQunit("Quando edito e salvo as alterações deve navegar para os detalhes com as mudanças", function (Given, When, Then) {
            Given.iStartMyApp({
                hash: "imagens/0/adicionar"
            });

            When
                .naTelaDeEdicaoDeImagem
                .PreenchoONomeDoArquivo("imagem-editar-salvar.jpg")
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
                .ClicoEmEditar();

            Then
                .naTelaDeEdicaoDeImagem
                .aTelaDeEdicaoEstaVisivel();

            When
                .naTelaDeEdicaoDeImagem
                .PreenchoONomeDoArquivo("imagem-editada-nova.png")
                .ClicoEmSalvar()
                .confirmoDialogDeSucesso();

            Then
                .naTelaDeDetalhesDeImagem
                .aTelaDeDetalhesEstaVisivel();

            Then.iTeardownMyApp();
        });
    });
});