sap.ui.define(["dummy/UI5DummyApp/controller/BaseController"], function (Controller) {
    "use strict"

    return Controller.extend("dummy.UI5DummyApp.controller.DetailView", {
        onInit() {
            this.getRouter().getRoute("RouteDetailView").attachPatternMatched(this.onRouteMatched, this)
        },

        onRouteMatched(oEvent) {
            this.getModel("appView").setProperty("/layout", "TwoColumnsMidExpanded")

            this.getView().bindElement({
                path: `/${oEvent.getParameter("arguments").UserName}`
            })
        },
        onNavBack() {
           this.getRouter().navTo("RouteMainView", {}, true)
        }
    })
})
