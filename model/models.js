sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,n){"use strict";return{createDeviceModel:function(){var t=new e(n);t.setDefaultBindingMode("OneWay");return t},createAppViewModel(){const n=new e({layout:"OneColumn"});return n}}});