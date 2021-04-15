sap.ui.define([
  "sap/ui/model/json/JSONModel",
  "sap/ui/Device"
], function(JSONModel, Device) {
  "use strict";

  return {
    createDeviceModel: function() {
      var oModel = new JSONModel(Device);
      oModel.setDefaultBindingMode("OneWay");
      return oModel;
    },
    createAppViewModel() {
      const oModel = new JSONModel({
        layout: "OneColumn"
      })
      return oModel
    }
  };
});
