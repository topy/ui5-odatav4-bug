sap.ui.define(["dummy/UI5DummyApp/controller/BaseController"], function (Controller) {
    "use strict"

    return Controller.extend("dummy.UI5DummyApp.controller.DetailView", {
        navToHome() {
          this.getRouter().navTo("RouteHomeView", {}, true);
        },
        navToTable() {
          this.getRouter().navTo("RouteTableView",{}, true);
        }
    })
})
