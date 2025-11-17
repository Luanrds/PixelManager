sap.ui.define([
    'sap/ui/test/Opa5',
    'sap/ui/test/actions/Press',
    'sap/ui/test/matchers/PropertyStrictEquals'
], function (Opa5, Press, PropertyStrictEquals) {
    "use strict";

    var viewName = ".imagens.Detalhes";

    Opa5.createPageObjects({
        naTelaDeDetalhesDeImagem: {
            actions: {
                ClicoEmEditar: function () {
                    return this.clicarNoBotaoComChaveI18n("editButtonText");
                },

                ClicoEmExcluir: function () {
                    return this.clicarNoBotaoComChaveI18n("deleteButtonText");
                },

                ClicoEmVoltar: function () {
                    return this.waitFor({
                        viewName: viewName,
                        controlType: "sap.m.Page",
                        success: function (aPages) {
                            var oPage = aPages[0];
                            oPage.fireNavButtonPress();
                            Opa5.assert.ok(true, "Clicou no botão de navegação voltar");
                        },
                        errorMessage: "Não foi possível clicar no botão voltar"
                    });
                },

                confirmoDialogDeExclusao: function () {
                    return this.waitFor({
                        controlType: 'sap.m.Button',
                        matchers: {
                            i18NText: {
                                propertyName: 'text',
                                key: 'Common.Sim'
                            }
                        },
                        actions: new Press(),
                        success: function () {
                            Opa5.assert.ok(true, 'Confirmação de exclusão realizada');
                        },
                        errorMessage: 'Não foi possível confirmar o diálogo de exclusão'
                    });
                },

                canceloDialogDeExclusao: function () {
                    return this.waitFor({
                        controlType: 'sap.m.Button',
                        matchers: {
                            i18NText: {
                                propertyName: 'text',
                                key: 'Common.Nao'
                            }
                        },
                        actions: new Press(),
                        success: function () {
                            Opa5.assert.ok(true, 'Cancelamento de exclusão realizado');
                        },
                        errorMessage: 'Não foi possível cancelar o diálogo de exclusão'
                    });
                },

                confirmoDialogDeSucesso: function () {
                    return this.waitFor({
                        controlType: 'sap.m.Button',
                        matchers: {
                            i18NText: {
                                propertyName: 'text',
                                key: 'Common.OK'
                            }
                        },
                        actions: new Press(),
                        success: function () {
                            Opa5.assert.ok(true, 'Confirmação de sucesso realizada');
                        },
                        errorMessage: 'Não foi possível confirmar o diálogo de sucesso'
                    });
                },

                clicarNoBotaoComChaveI18n: function (chaveI18n) {
                    return this.waitFor({
                        viewName: viewName,
                        controlType: 'sap.m.Button',
                        matchers: {
                            i18NText: {
                                propertyName: 'text',
                                key: chaveI18n
                            }
                        },
                        actions: new Press(),
                        success: () => Opa5.assert.ok(true, `Foi clicado no botão com chave ${chaveI18n} com sucesso.`),
                        errorMessage: `Não foi possível encontrar o botão com chave ${chaveI18n}.`
                    });
                }
            },
            assertions: {
                aTelaDeDetalhesEstaVisivel: function () {
                    return this.waitFor({
                        viewName: viewName,
                        success: () => Opa5.assert.ok(true, "A tela de detalhes da imagem está visível"),
                        errorMessage: "A tela de detalhes da imagem não está visível"
                    });
                },

                oCampoContemOValor: function (sIdCampo, sValorEsperado) {
                    return this.waitFor({
                        id: sIdCampo,
                        viewName: viewName,
                        success: function (oControl) {
                            var sValor = oControl.getText ? oControl.getText() : oControl.getValue();
                            Opa5.assert.equal(sValor, sValorEsperado, `O campo ${sIdCampo} contém o valor: ${sValorEsperado}`);
                        },
                        errorMessage: `O campo ${sIdCampo} não contém o valor esperado: ${sValorEsperado}`
                    });
                },

                oNomeDoArquivoEh: function (sNomeEsperado) {
                    return this.oCampoContemOValor("textNomeDoArquivo", sNomeEsperado);
                },

                aTipoDoArquivoEh: function (sTipoEsperado) {
                    return this.oCampoContemOValor("textTipoDoArquivo", sTipoEsperado);
                },

                aAlturaEh: function (sAlturaEsperada) {
                    return this.oCampoContemOValor("textAltura", sAlturaEsperada);
                },

                oComprimentoEh: function (sComprimentoEsperado) {
                    return this.oCampoContemOValor("textComprimento", sComprimentoEsperado);
                }
            }
        }
    });
});
