sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
	function (Controller) {
		"use strict";
		const NAMESPACE_DA_CONTROLLER = "pixelmanager.app.BaseController";

		const ID_TOOL_PAGE = "toolPage";

		return Controller.extend(NAMESPACE_DA_CONTROLLER, {
			rotaListaDeImagens: 'imagens',

			modelo: function (nome, modelo) {
				let view = this.getView();
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

			_setarCarregamentoDaToolPage: function (estado) {
				try {
					const root = this.getOwnerComponent().getRootControl();
					const toolPage = root.byId && root.byId(ID_TOOL_PAGE) ? root.byId(ID_TOOL_PAGE) : root;
					this._setarCarregamento(estado, toolPage);
				} catch (e) {
					this._setarCarregamento(estado, this.getView());
				}
			},


			_setarCarregamento: function (estado, busyControl) {
				if (busyControl && busyControl.setBusy) {
					busyControl.setBusyIndicatorDelay(0);
					busyControl.setBusy(estado);
				}
			},

			_carregamentoDaToolPageOuControle: function (estado, busyControl) {
				busyControl ? this._setarCarregamento(estado, busyControl)
					: this._setarCarregamentoDaToolPage(estado);
			},

			_executarEObterPromiseDaAction: function (action, busyControl) {
				this._carregamentoDaToolPageOuControle(true, busyControl);
				let p;
				try {
					const r = action();
					p = (r && typeof r.then === "function") ? r : Promise.resolve(r);
				} catch (e) {
					p = Promise.reject(e);
				}
				return p.finally(() => this._carregamentoDaToolPageOuControle(false, busyControl));
			},

			carregarMais: function (requestCallback) {
				let dadosRetorno = {};
				let callback = (response) => {
					dadosRetorno.totalConsulta = response.headers.get("X-Total-Count");
					dadosRetorno.total = response.headers.get("X-Total-Pages");
				};

				return requestCallback(callback)
					.then(content => {
						dadosRetorno.lista = content || [];
						return dadosRetorno;
					});
			},

			exibirEspera: function (action, busyControl) {
				return this._executarEObterPromiseDaAction(action, busyControl);
			},

			_executarEObterPromiseDaAction: function (action, busyControl) {
				try {
					const resultado = action();
					return resultado instanceof Promise ? resultado : Promise.resolve(resultado);
				} catch (erro) {
					return Promise.reject(erro);
				}
			},

			_carregamentoDaToolPageOuControle: function (ativo, busyControl) {
				const controle = busyControl || this.getView();
				if (controle.setBusy) {
					controle.setBusy(ativo);
				}
			}
		});
	});
