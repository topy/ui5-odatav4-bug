//@ui5-bundle dummy/UI5DummyApp/Component-preload.js
sap.ui.require.preload({
	"dummy/UI5DummyApp/Component.js":function(){sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","dummy/UI5DummyApp/model/models"],function(e,t,i){"use strict";return e.extend("dummy.UI5DummyApp.Component",{metadata:{manifest:"json"},init:function(){e.prototype.init.apply(this,arguments);this.getRouter().initialize();this.setModel(i.createDeviceModel(),"device");this.setModel(i.createAppViewModel(),"appView")}})});
},
	"dummy/UI5DummyApp/controller/BaseController.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/routing/History","sap/ui/core/UIComponent","dummy/UI5DummyApp/model/formatter"],function(e,t,o,n){"use strict";return e.extend("dummy.UI5DummyApp.controller.BaseController",{formatter:n,getModel:function(e){return this.getView().getModel(e)},setModel:function(e,t){return this.getView().setModel(e,t)},getResourceBundle:function(){return this.getOwnerComponent().getModel("i18n").getResourceBundle()},navTo:function(e,t,o){this.getRouter().navTo(e,t,o)},getRouter:function(){return o.getRouterFor(this)},onNavBack:function(){var e=t.getInstance().getPreviousHash();if(e!==undefined){window.history.back()}else{this.getRouter().navTo("appHome",{},true)}}})});
},
	"dummy/UI5DummyApp/controller/DetailView.controller.js":function(){sap.ui.define(["dummy/UI5DummyApp/controller/BaseController"],function(e){"use strict";return e.extend("dummy.UI5DummyApp.controller.DetailView",{navToHome(){this.getRouter().navTo("RouteHomeView",{},true)},navToTable(){this.getRouter().navTo("RouteTableView",{},true)}})});
},
	"dummy/UI5DummyApp/i18n/i18n.properties":'title=dummy.UI5DummyApp\r\nappTitle=dummy.UI5DummyApp\r\nappDescription=App Description\r\n',
	"dummy/UI5DummyApp/i18n/i18n_en.properties":'title=dummy.UI5DummyApp\r\nappTitle=dummy.UI5DummyApp\r\nappDescription=App Description\r\n',
	"dummy/UI5DummyApp/manifest.json":'{"_version":"1.21.0","sap.app":{"id":"dummy.UI5DummyApp","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"1.0.0"},"title":"{{appTitle}}","description":"{{appDescription}}","dataSources":{"main":{"uri":"v1/","type":"OData","settings":{"odataVersion":"4.0","localUri":"localService/metadata.xml"}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":true,"rootView":{"viewName":"dummy.UI5DummyApp.view.App","type":"XML","async":true,"id":"app"},"dependencies":{"minUI5Version":"1.60.0","libs":{"sap.ui.core":{},"sap.m":{},"sap.ui.layout":{},"sap.f":{},"sap.uxap":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"dummy.UI5DummyApp.i18n.i18n"}},"":{"dataSource":"main","settings":{"synchronizationMode":"None","operationMode":"Server","groupId":"$direct"}}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","viewPath":"dummy.UI5DummyApp.view","controlId":"mainPage","controlAggregation":"content","clearControlAggregation":true,"async":true},"routes":[{"name":"RouteHomeView","pattern":"","target":"TargetDetailHome"},{"name":"RouteTableView","pattern":"Table","target":"TargetDetailTable"}],"targets":{"TargetMainView":{"viewType":"XML","viewLevel":1,"viewName":"MainView"},"TargetDetailHome":{"viewType":"XML","viewName":"HomeView"},"TargetDetailTable":{"viewType":"XML","viewName":"TableView"}}}}}',
	"dummy/UI5DummyApp/model/formatter.js":function(){sap.ui.define([],function(){"use strict";return{}});
},
	"dummy/UI5DummyApp/model/models.js":function(){sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,n){"use strict";return{createDeviceModel:function(){var t=new e(n);t.setDefaultBindingMode("OneWay");return t},createAppViewModel(){const n=new e({layout:"OneColumn"});return n}}});
},
	"dummy/UI5DummyApp/view/App.view.xml":'<mvc:View xmlns="sap.m" xmlns:core="sap.ui.core" xmlns:mvc="sap.ui.core.mvc" xmlns:f="sap.f" xmlns:html="http://www.w3.org/1999/xhtml" displayBlock="true"><App><pages><Page id="mainPage"><content></content></Page></pages></App></mvc:View>',
	"dummy/UI5DummyApp/view/HomeView.view.xml":'<mvc:View controllerName="dummy.UI5DummyApp.controller.DetailView"\n    xmlns="sap.m"\n    xmlns:mvc="sap.ui.core.mvc"><Button text="Go to Table-View" press="navToTable" /><Text text="no content" /></mvc:View>',
	"dummy/UI5DummyApp/view/TableView.view.xml":'<mvc:View controllerName="dummy.UI5DummyApp.controller.DetailView"\r\n          xmlns="sap.m"\r\n          xmlns:mvc="sap.ui.core.mvc"><Button text="Go to Home-View" press="navToHome" /><Table\r\n      id="peopleTable"\r\n      inset="false"\r\n      items="{\r\n          path: \'/People\',\r\n          sorter: {\r\n            path: \'LastName\'\r\n          },\r\n          parameters : {\r\n            $count : true,\r\n            $$patchWithoutSideEffects : true\r\n          },\r\n          events : {\r\n            dataReceived: \'.onDataEvents\',\r\n            dataRequested: \'.onDataEvents\'\r\n          },\r\n          templateShareable: true\r\n        }"\r\n      class="sapFDynamicPageAlignContent"\r\n      width="auto"\r\n      growing="true"\r\n      growingScrollToLoad="true"\r\n      growingThreshold="5"><columns><Column><Text text="People"/></Column></columns><items><ColumnListItem><cells><ObjectIdentifier title="{FirstName} {LastName}" text="{UserName}"/></cells></ColumnListItem></items></Table></mvc:View>'
});
