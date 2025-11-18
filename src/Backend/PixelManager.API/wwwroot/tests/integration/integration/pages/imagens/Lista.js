sap.ui.define([
    'sap/ui/test/Opa5',
    'sap/ui/test/matchers/PropertyStrictEquals',
    'sap/ui/test/actions/Press'
], function (Opa5, PropertyStrictEquals, Press) {
    'use strict';

    var viewName = '.imagens.Lista';

    Opa5.createPageObjects({
        naTelaDeListaDeImagens: {
            actions: {
                ClicoNaImagemComNome: function (sNomeDoArquivo) {
                    return this.waitFor({
                        viewName: viewName,
                        controlType: 'sap.m.ColumnListItem',
                        matchers: function (oItem) {
                            var aCells = oItem.getCells();
                            if (aCells && aCells.length > 0) {
                                var oFirstCell = aCells[0];
                                return oFirstCell.getText && oFirstCell.getText() === sNomeDoArquivo;
                            }
                            return false;
                        },
                        actions: new Press(),
                        success: function () {
                            Opa5.assert.ok(true, `Clicou na imagem com nome: ${sNomeDoArquivo}`);
                        },
                        errorMessage: `Não foi possível clicar na imagem com nome: ${sNomeDoArquivo}`
                    });
                }
            },
            assertions: {
                aListaDeImagensEstaVisivel: function () {
                    return this.waitFor({
                        viewName: viewName,
                        success: function () {
                            Opa5.assert.ok(true, 'Lista de imagens visível');
                        },
                        errorMessage: 'Lista de imagens não está visível'
                    });
                },

                aImagemNaoEstaNaLista: function (sNomeDoArquivo) {
                    return this.waitFor({
                        viewName: viewName,
                        controlType: 'sap.m.Text',
                        check: function (aTexts) {
                            return aTexts.every(function (oText) {
                                return oText.getText() !== sNomeDoArquivo;
                            });
                        },
                        success: function () {
                            Opa5.assert.ok(true, `A imagem com nome ${sNomeDoArquivo} não está na lista.`);
                        },
                        errorMessage: `A imagem com nome ${sNomeDoArquivo} ainda está presente na lista.`
                    });
                }   
            }
        }
    });
});