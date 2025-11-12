sap.ui.define([
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Text",
    "sap/ui/model/json/JSONModel"
], function (
    Dialog,
    Button,
    Text,
    JSONModel
) {
    "use strict";

    const NAMESPACE = "webapp.common.control.DialogoDeConfirmacao";
    const BOTAO_ESQUERDA_AGREGACAO = "beginButton";
    const BOTAO_DIREITA_AGREGACAO = "endButton";
    const CONTEUDO_AGREGACAO = "content";
    const TEXTO_CONTEUDO_ID = "idDoTextoDoDialogoDeConfirmacao";
    const BOTAO_ESQUERDA_ID = "idBotaoDaEsquerdaDoDialogoDeConfirmacao";
    const BOTAO_DIREITA_ID = "idBotaoDaDireitaDoDialogoDeConfirmacao";
    const BOTAO_ESQUERDA_EVENTO = "botaoEsquerdo";
    const BOTAO_DIREITA_EVENTO = "botaoDireito";

    return Dialog.extend(NAMESPACE, {
        metadata: {
            properties: {
                textoConteudo: "string",
                textoBotaoEsquerdo: "string",
                textoBotaoDireito: "string"
            },
            events: {
                botaoEsquerdo: {},
                botaoDireito: {},
            }
        },

        onBeforeRendering() {
            Dialog.prototype.onBeforeRendering.apply(this, arguments);
            this.setModel(new JSONModel({
                textoConteudo: this.getTextoConteudo(),
                textoEsquerda: this.getTextoBotaoEsquerdo() || "",
                textoDireita: this.getTextoBotaoDireito(),
            }));
        },

        _fecharDialogo: function (botao) {
            this.close();
            this.fireEvent(botao);
            this.fireAfterClose();
        },

        _formatarVisibilidade: function(texto) {
            return !!(texto && texto.trim());
        },

        init: function () {
            Dialog.prototype.init.call(this, arguments);
            this.setType("Message");
            this.setDraggable(true);
            this.setTitleAlignment(sap.m.TitleAlignment.Center);

            this.addAggregation(CONTEUDO_AGREGACAO,
                new Text(TEXTO_CONTEUDO_ID, {
                    text: "{/textoConteudo}",
                })
            );

            this.setAggregation(BOTAO_ESQUERDA_AGREGACAO, new Button(BOTAO_ESQUERDA_ID, {
                text: "{/textoEsquerda}",
                visible: {
                    path: "/textoEsquerda",
                    formatter: this._formatarVisibilidade.bind(this)
                },
                type: sap.m.ButtonType.Ghost,
                press: () => {
                    this._fecharDialogo(BOTAO_ESQUERDA_EVENTO);
                }
            }));

            this.setAggregation(BOTAO_DIREITA_AGREGACAO, new Button(BOTAO_DIREITA_ID, {
                text: "{/textoDireita}",
                visible: {
                    path: "/textoDireita",
                    formatter: this._formatarVisibilidade.bind(this)
                },
                type: sap.m.ButtonType.Emphasized,
                press: () => {
                    this._fecharDialogo(BOTAO_DIREITA_EVENTO);
                }
            }));
        },

        open() {
            Dialog.prototype.open.apply(this, arguments);
            return new Promise((resolve) => {
                this.attachAfterClose(() => {
                    this.destroy();
                    resolve();
                });
            });
        },
        renderer: {}
    });
});