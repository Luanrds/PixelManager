sap.ui.define([
    'sap/ui/test/opaQunit',
    'pixelmanager/tests/integration/integration/pages/imagens/DetalhesImagem',
    'pixelmanager/tests/integration/integration/pages/imagens/EditarImagem',
    'pixelmanager/tests/integration/integration/pages/imagens/Lista'
], function (opaQunit) {
    "use strict";

    QUnit.module("Detalhes da Imagem", () => {
        opaQunit("Deve exibir a tela de detalhes da imagem", function (Given, When, Then) {
            Given.iStartMyApp({
                hash: "imagens/957c357e-a52e-40e1-8c38-3eaa202900a5/detalhes"
            });
            Then
                .naTelaDeDetalhesDeImagem
                .aTelaDeDetalhesEstaVisivel();

            Then.iTeardownMyApp();
        });

        opaQunit("Deve ser possivel clicar no botão Editar e a pagina de edição ser aberta com os dados da imagem do detalhe", function (Given, When, Then) {
            Given.iStartMyApp({
                hash: "imagens/957c357e-a52e-40e1-8c38-3eaa202900a5/detalhes"
            });

            When
                .naTelaDeDetalhesDeImagem
                .ClicoEmEditar();

            Then
                .naTelaDeEdicaoDeImagem
                .aTelaDeEdicaoEstaVisivel()
                .oCampoNomeDoArquivoContem("teste-imagem.jpg")
                .oCampoAlturaContem("1920")
                .oCampoComprimentoContem("1080");

            When
                .naTelaDeEdicaoDeImagem
                .ClicoEmVoltar();

            Then
                .naTelaDeListaDeImagens
                .aListaDeImagensEstaVisivel();

            Then.iTeardownMyApp();
        });

        opaQunit(("Deve ser possivel clicar no botao de excluir e a imagem ser removida da lista"), function (Given, When, Then) {
            Given.iStartMyApp({
                hash: "imagens/0/adicionar"
            });

            When
                .naTelaDeEdicaoDeImagem
                .PreenchoONomeDoArquivo("imagem-para-excluir.jpg")
                .SelecionoOTipoDoArquivo("1")
                .PreenchoAAltura("800")
                .PreenchoOComprimento("600")
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
                .aImagemNaoEstaNaLista("imagem-para-excluir.jpg");

            Then.iTeardownMyApp();
        });

        opaQunit("Deve ser possivel clicar em remover e cancelo e deve permanecer na mesma tela", function (Given, When, Then) {
            Given.iStartMyApp({
                hash: "imagens/0/adicionar"
            });
            When
                .naTelaDeEdicaoDeImagem
                .PreenchoONomeDoArquivo("imagem-para-tentar-excluir.jpg")
                .SelecionoOTipoDoArquivo("1")
                .PreenchoAAltura("800")
                .PreenchoOComprimento("600")
                .ClicoEmSalvar()
                .confirmoDialogDeSucesso();
                
            Then
                .naTelaDeDetalhesDeImagem
                .aTelaDeDetalhesEstaVisivel();

            When
                .naTelaDeDetalhesDeImagem
                .ClicoEmExcluir()
                .canceloDialogDeExclusao();

            Then
                .naTelaDeDetalhesDeImagem
                .aTelaDeDetalhesEstaVisivel();

            Then.iTeardownMyApp();
        });
    });
});
