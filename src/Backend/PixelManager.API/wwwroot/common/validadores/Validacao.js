sap.ui.define([
    "sap/ui/base/Object",
    "sap/ui/core/library",

], function (Object, Library) {
    "use strict";
	var ValueState = Library;
    const FUNCAO_SET_VALUE_STATE = "setValueState";
    const FUNCAO_SET_VALUE_STATE_TEXT = "setValueStateText";
    const TIPO_FUNCAO = "function";
    const TEXTO_CAMPO = "campo";
    const TEXTO_DEVE_SER_PREENCHIDO = "deve ser preenchido";
    const TEXTO_DEVE_SER_MAIOR_QUE_ZERO = "deve ser maior que zero";
    const TEXTO_DEVE_TER_NO_MAXIMO = "deve ter no máximo";
    const TEXTO_CARACTERES = "caracteres";
    const NOME_TIPO_INPUT = sap.m.Input.getMetadata().getName();
    const NOME_TIPO_MASK_INPUT = sap.m.MaskInput.getMetadata().getName();
    const ERROR = "Error";
    const NONE = "None";

    return Object.extend("pixelmanager.common.validadores.Validacao", {
        constructor: function (nomeDoCampo) {
            Object.call(this);
            this.nomeDoCampo = nomeDoCampo;
            this.validacoes = [];
        },

        adicionarValidacao: function (regraDeValidacao, mensagem) {
            this.validacoes.push({
                regraDeValidacao: regraDeValidacao,
                mensagem: mensagem
            });
        },

        naoVazio: function (mensagem) {
            mensagem = mensagem || TEXTO_CAMPO + ' ' + this.nomeDoCampo + ' ' + TEXTO_DEVE_SER_PREENCHIDO;

            this.adicionarValidacao(valor => valor !== null && valor !== undefined && valor !== "" && valor.toString().length > 0, mensagem);

            return this;
        },

        maiorQueZero: function (mensagem) {
            mensagem = mensagem || TEXTO_CAMPO + ' ' + this.nomeDoCampo + ' ' + TEXTO_DEVE_SER_MAIOR_QUE_ZERO;

            this.adicionarValidacao(valor => {
                if (!valor && valor !== 0) return true;
                return !isNaN(valor) && Number(valor) > 0;
            }, mensagem);

            return this;
        },

        tamanhoMaximo: function (tamanhoMaximo, mensagem) {
            mensagem = mensagem || TEXTO_CAMPO + ' ' + this.nomeDoCampo + ' ' + TEXTO_DEVE_TER_NO_MAXIMO + ' ' + tamanhoMaximo + ' ' + TEXTO_CARACTERES;

            this.adicionarValidacao(valor => !valor || valor.toString().length <= tamanhoMaximo, mensagem);

            return this;
        },

        validar: function (objeto) {
            const campos = this.nomeDoCampo.split('/');
            const valor = campos.reduce((o, i) => (o ? o[i] : undefined), objeto.getData());
            let mensagens = "";

            let validacoesFalhas = this.validacoes.filter(validacao => !validacao.regraDeValidacao(valor));

            if (validacoesFalhas) {
                validacoesFalhas = this.pararNaPrimeiraFalha ? validacoesFalhas.slice(0, 1) : validacoesFalhas;

                validacoesFalhas.forEach(function (validacao) {
                    mensagens += validacao.mensagem + "\n";
                });
            }

            mensagens ? this.setarStatusErro(mensagens) : this.setarStatusSucesso();

            return this.validadoComSucesso;
        },

        vincularControle: function (controle) {
            this.controle = controle;
        },

        setarStatusErro: function (mensagens) {
            var tipoDoControle = this.controle.getMetadata().getName();

            switch (tipoDoControle) {
                case NOME_TIPO_INPUT:
                case NOME_TIPO_MASK_INPUT:
                    this.controle.setValueState(ERROR);
                    this.controle.setValueStateText(mensagens);
                    break;
                default:
                    if (typeof (this.controle[FUNCAO_SET_VALUE_STATE]) === TIPO_FUNCAO) {
                        this.controle.setValueState(ERROR);
                    }
                    if (typeof (this.controle[FUNCAO_SET_VALUE_STATE_TEXT]) === TIPO_FUNCAO) {
                        this.controle.setValueStateText(mensagens);
                    }
            }

            this.validadoComSucesso = false;
        },

        setarStatusSucesso: function () {
            var tipoDoControle = this.controle.getMetadata().getName();

            switch (tipoDoControle) {
                case NOME_TIPO_INPUT:
                    this.controle.setValueState(NONE);
                    break;
                default:
                    if (typeof (this.controle[FUNCAO_SET_VALUE_STATE]) === TIPO_FUNCAO) {
                        this.controle.setValueState(ValueState.None);
                    }
            }

            this.validadoComSucesso = true;
        }
    });
});