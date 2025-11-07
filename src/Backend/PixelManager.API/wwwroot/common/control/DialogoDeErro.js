sap.ui.define([
	"sap/m/Dialog",
	"sap/m/Button",
	"sap/m/Text",
	"sap/ui/model/json/JSONModel",
	"sap/m/Panel",
	"sap/ui/layout/VerticalLayout",
	"sap/ui/core/library",
	"sap/m/library"
], function(
	Dialog,
	Button,
	Text,
	JSONModel,
	Panel,
	VerticalLayout,
	libraryCore,
	library
) {
	"use strict";

	const NAMESPACE = "taxone.common.control.DialogoDeErro";
	const BOTAO_ESQUERDA_AGREGACAO = "beginButton";
	const CONTEUDO_AGREGACAO = "content";
	const TEXTO_MENSAGEM_ID = "apiErrorMessageText";
	const BOTAO_ESQUERDA_ID = "apiErrorConfirmationButton";
	const BOTAO_ESQUERDA_EVENTO = "botaoEsquerdo";

	return Dialog.extend(NAMESPACE, {
		metadata: {
			properties: {
				cabecalho: "string",
				mensagem: "string",
				stack: "string"
			},
			events: {
				botaoOk: {}
			}
		},

		onBeforeRendering() {
			Dialog.prototype.onBeforeRendering.apply(this, arguments);
			this.setModel(new JSONModel({
				cabecalho: this.getCabecalho(),
				mensagem: this.getMensagem(),
				stack: this.getStack(),
			}));
		},

		init: function() {
			Dialog.prototype.init.call(this, arguments);
			const comprimento = "50%";
			this.setContentWidth(comprimento);
			this.setState(libraryCore.ValueState.Error);
			this.setType(library.DialogType.Message);
			const classeMinima = "sapUiTinyMargin";
			const classePequena = "sapUiSmallMarginBegin";
			const classeMinimaAcima = "sapUiTinyMarginAbove";

			var cabecalho = new Text( { text: "{/cabecalho}" } );
			cabecalho.addStyleClass(classeMinima);
			var mensagem = new Text( TEXTO_MENSAGEM_ID, { text: "{/mensagem}" } );
			mensagem.addStyleClass(classePequena);

			let conteudo = [];
			conteudo.push( cabecalho );
			conteudo.push( mensagem ); 

			var texto = new Text({
				text: "{/stack}"
			});
			texto.addStyleClass(classeMinima);
			var painel = new Panel({
				backgroundDesign: library.BackgroundDesign.Transparent,
				headerText: "{i18n>Common.StackTrace}",
				expandable: true,
				content: texto
			});
			painel.addStyleClass(classeMinimaAcima);
			conteudo.push(painel);

			var layout = new VerticalLayout({
				width: "100%",
				content: conteudo
			});

			this.addAggregation(CONTEUDO_AGREGACAO, layout);

			this.setAggregation(BOTAO_ESQUERDA_AGREGACAO, new Button(BOTAO_ESQUERDA_ID, {
				text: "{i18n>Common.OK}",
				press: () => {
					this.close();
					this.fireEvent(BOTAO_ESQUERDA_EVENTO);
				}
			}));
		},

		open() {
			var dialogo = Dialog.prototype.open.apply(this, arguments);

			return new Promise((resolve) => {
				this.attachAfterClose(() => {
					dialogo.destroy();
					resolve(dialogo);
				});
			});
		},
		renderer: {}
	});
});