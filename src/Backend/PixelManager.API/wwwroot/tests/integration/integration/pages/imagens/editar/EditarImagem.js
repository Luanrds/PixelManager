sap.ui.define([
    'sap/ui/test/Opa5',
    'sap/ui/test/actions/Press',
    'sap/ui/test/matchers/PropertyStrictEquals',
    'sap/ui/test/actions/EnterText',
    'sap/ui/test/matchers/BindingPath',
    'sap/ui/test/matchers/Ancestor',
    'sap/ui/test/matchers/Properties',
    'sap/ui/test/matchers/Descendant',
    'sap/ui/test/matchers/AggregationFilled'
], function (Opa5, Press, PropertyStrictEquals, EnterText, BindingPath, Ancestor, Properties, Descendant, AggregationFilled) {
    "use strict";

    var viewName = ".imagens.Edicao";

    Opa5.createPageObjects({
        naTelaDeEdicaoDeImagem: {
            actions: {
                PreenchoONomeDoArquivo: function (sNomeDoArquivo) {
                    return this.preencherInputPorId("inputNomeDoArquivo", sNomeDoArquivo);
                },

                SelecionoOTipoDoArquivo: function (sTipo) {
                    return this.waitFor({
                        id: "selectTipoDoArquivo",
                        viewName: viewName,
                        actions: function (oSelect) {
                            oSelect.setSelectedKey(sTipo);
                        },
                        success: () => Opa5.assert.ok(true, `Tipo do arquivo selecionado: ${sTipo}`),
                        errorMessage: "Não foi possível selecionar o tipo do arquivo"
                    });
                },

                PreenchoAAltura: function (sAltura) {
                    return this.preencherInputPorId("inputAltura", sAltura);
                },

                PreenchoOComprimento: function (sComprimento) {
                    return this.preencherInputPorId("inputComprimento", sComprimento);
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
                },

                ClicoEmSalvar: function () {
                    return this.clicarNoBotaoComChaveI18n("saveButtonText");
                },

                ClicoEmCancelar: function () {
                    return this.clicarNoBotaoComChaveI18n("cancelButtonText");
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

                preencherInputPorId: function (sId, sTexto) {
                    return this.waitFor({
                        id: sId,
                        viewName: viewName,
                        actions: new EnterText({
                            text: sTexto,
                            clearTextFirst: true
                        }),
                        success: () => Opa5.assert.ok(true, `Campo ${sId} preenchido com: ${sTexto}`),
                        errorMessage: `Não foi possível preencher o campo ${sId}`
                    });
                }
            },
            assertions: {
                aTelaDeEdicaoEstaVisivel: function () {
                    return this.waitFor({
                        viewName: viewName,
                        success: () => Opa5.assert.ok(true, "A tela de edição de imagem está visível"),
                        errorMessage: "A tela de edição de imagem não está visível"
                    });
                },

                oCampoDevePossuirOValor: function (sIdCampo, sValorEsperado) {
                    return this.waitFor({
                        id: sIdCampo,
                        viewName: viewName,
                        success: function (oInput) {
                            Opa5.assert.equal(oInput.getValue(), sValorEsperado, `O campo ${sIdCampo} possui o valor: ${sValorEsperado}`);
                        },
                        errorMessage: `O campo ${sIdCampo} não possui o valor esperado: ${sValorEsperado}`
                    });
                },

                oCampoNomeDoArquivoContem: function (sValorEsperado) {
                    return this.oCampoDevePossuirOValor("inputNomeDoArquivo", sValorEsperado);
                },

                oCampoAlturaContem: function (sValorEsperado) {
                    return this.oCampoDevePossuirOValor("inputAltura", sValorEsperado);
                },

                oCampoComprimentoContem: function (sValorEsperado) {
                    return this.oCampoDevePossuirOValor("inputComprimento", sValorEsperado);
                },

                oCampoTemErroDeValidacao: function (sIdCampo) {
                    return this.waitFor({
                        id: sIdCampo,
                        viewName: viewName,
                        matchers: new PropertyStrictEquals({
                            name: "valueState",
                            value: "Error"
                        }),
                        success: () => Opa5.assert.ok(true, `O campo ${sIdCampo} tem erro de validação`),
                        errorMessage: `O campo ${sIdCampo} não tem erro de validação`
                    });
                },

                aMensagemDeSucessoEExibida: function () {
                    return this.waitFor({
                        controlType: "sap.m.MessageBox",
                        success: () => Opa5.assert.ok(true, "A mensagem de sucesso foi exibida"),
                        errorMessage: "A mensagem de sucesso não foi exibida"
                    });
                },

                osCamposEstaoVazios: function () {
                    return this.waitFor({
                        id: "inputNomeDoArquivo",
                        viewName: viewName,
                        success: function (oInput) {
                            Opa5.assert.strictEqual(oInput.getValue(), "", "O campo nome do arquivo está vazio");
                        }
                    }).and.waitFor({
                        id: "inputAltura",
                        viewName: viewName,
                        success: function (oInput) {
                            var sValue = oInput.getValue();
                            Opa5.assert.ok(sValue === "" || sValue === null, "O campo altura está vazio");
                        }
                    }).and.waitFor({
                        id: "inputComprimento",
                        viewName: viewName,
                        success: function (oInput) {
                            var sValue = oInput.getValue();
                            Opa5.assert.ok(sValue === "" || sValue === null, "O campo comprimento está vazio");
                        },
                        errorMessage: "Os campos não estão vazios como esperado"
                    });
                }
            }
        }
    });
});