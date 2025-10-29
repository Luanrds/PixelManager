sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function (Controller, MessageToast) {
	"use strict";

	const NAMESPACE_DA_CONTROLLER = "pixelmanager.app.BaseController";
	const ID_TOOL_PAGE = "toolPage";

	return Controller.extend(NAMESPACE_DA_CONTROLLER, {
		rotaListaDeImagens: "imagens",

		modelo: function (nome, modelo) {
			const view = this.getView();
			if (modelo) view.setModel(modelo, nome);
			return view.getModel(nome);
		},

		getRouter: function () {
			return this.getOwnerComponent().getRouter();
		},

		vincularRota: function (routeName, func) {
			const router = this.getRouter();
			return routeName
				? router.getRoute(routeName).attachPatternMatched(func, this)
				: router.attachRouteMatched(func, this);
		},

		_setarCarregamento: function (estado, controle) {
			if (controle?.setBusy) {
				controle.setBusyIndicatorDelay(0);
				controle.setBusy(estado);
			}
		},

		_carregamentoDaToolPageOuControle: function (estado, busyControl) {
			const root = this.getOwnerComponent().getRootControl();
			const controle = busyControl || root.byId(ID_TOOL_PAGE) || this.getView();
			this._setarCarregamento(estado, controle);
		},

		_executarEObterPromiseDaAction: function (action, busyControl) {
			this._carregamentoDaToolPageOuControle(true, busyControl);

			let promise;
			try {
				const resultado = action();
				promise = resultado instanceof Promise ? resultado : Promise.resolve(resultado);
			} catch (e) {
				promise = Promise.reject(e);
			}

			return promise.finally(() =>
				this._carregamentoDaToolPageOuControle(false, busyControl)
			);
		},

		exibirEspera: function (action, busyControl) {
			const promise = this._executarEObterPromiseDaAction(action, busyControl);

			promise.catch(() => {
				MessageToast.show("Ocorreu um erro ao processar sua solicitação.");
			});

			return promise;
		}
	});
});
