sap.ui.define([
  "dummy/UI5DummyApp/controller/BaseController"
], function(Controller) {
  "use strict";

  return Controller.extend("dummy.UI5DummyApp.controller.MainView", {

    onInit() {
      this.getRouter().getRoute("RouteMainView").attachPatternMatched(this.onRouteMatched, this)
    },

    onRouteMatched() {
      this.getModel("appView").setProperty("/layout", "OneColumn")
    },

    onListItemPress(oEvent) {
      const sBindingPath = oEvent.getSource().getBindingContext().getPath()
      this.getRouter().navTo("RouteDetailView", {
        UserName: sBindingPath.slice(1)
      })
    }
  });
});
