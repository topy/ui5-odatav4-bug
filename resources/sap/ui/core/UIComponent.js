/*
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["../base/ManagedObject","./Component","./library","./UIComponentMetadata","./mvc/Controller","./mvc/View","sap/base/util/ObjectPath","sap/base/Log"],function(t,e,r,o,i,n,s,a){"use strict";var u=r.mvc.ViewType;var g=e.extend("sap.ui.core.UIComponent",{constructor:function(t,r){var o=false;try{if(typeof t!=="string"){r=t;t=undefined}if(r&&r.hasOwnProperty("_routerHashChanger")){this._oRouterHashChanger=r._routerHashChanger;delete r._routerHashChanger}if(r&&r.hasOwnProperty("_propagateTitle")){this._bRoutingPropagateTitle=r._propagateTitle;delete r._propagateTitle}e.apply(this,arguments);o=true}finally{if(!o){this._destroyCreatedInstances()}}},metadata:{abstract:true,rootView:null,publicMethods:["render"],aggregations:{rootControl:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},designtime:"sap/ui/core/designtime/UIComponent.designtime",routing:{}}},o);g._fnOnInstanceInitialized=null;g._fnOnInstanceDestroy=null;g.prototype.init=function(){var e=this;var r={};if(this.getAutoPrefixId()){r.id=function(t){return e.createId(t)}}var o=this._getManifestEntry("/sap.ui5/routing",true)||{},i=o.config||{},s=o.routes;if(s){var a=sap.ui.requireSync("sap/ui/core/routing/Router");var u=f(this._getRouterClassName()||a);this._oRouter=new u(s,i,this,o.targets,this._oRouterHashChanger);this._oTargets=this._oRouter.getTargets();this._oViews=this._oRouter.getViews()}else if(o.targets){var p=sap.ui.requireSync("sap/ui/core/routing/Targets");var c=sap.ui.requireSync("sap/ui/core/routing/Views");this._oViews=new c({component:this});var h=f(i.targetsClass||p);this._oTargets=new h({targets:o.targets,config:i,views:this._oViews})}this.runAsOwner(function(){t.runWithPreprocessors(function(){e.setAggregation("rootControl",e.createContent())},r)});var d=this.getRootControl();if(d instanceof n){if(i.targetParent===undefined){i.targetParent=d.getId()}if(this._oTargets){this._oTargets._setRootViewId(d.getId())}}if(typeof g._fnOnInstanceInitialized==="function"){g._fnOnInstanceInitialized(this)}};function f(t){var e;if(typeof t==="string"){e=s.get(t);if(!e){a.error("The specified class for router or targets '"+t+"' is undefined.",this)}}else{e=t}return e}g.prototype.destroy=function(){if(typeof g._fnOnInstanceDestroy==="function"){g._fnOnInstanceDestroy(this)}this._destroyCreatedInstances();e.prototype.destroy.apply(this,arguments)};g.prototype._destroyCreatedInstances=function(){if(this._oRouter){this._oRouter.destroy();delete this._oRouter}else{if(this._oTargets){this._oTargets.destroy();this._oTargets=null}if(this._oViews){this._oViews.destroy();this._oViews=null}}};g.getRouterFor=function(t){var r=t;if(r instanceof i){r=r.getView()}if(r instanceof n){var o=e.getOwnerComponentFor(r);if(o){return o.getRouter()}else{return undefined}}};g.prototype.getRouter=function(){return this._oRouter};g.prototype.hasNativeRouter=function(){return this._oRouter===this.getRouter()};g.prototype.getTargets=function(){return this._oTargets};g.prototype.getAutoPrefixId=function(){return!!this.getManifestObject().getEntry("/sap.ui5/autoPrefixId")};g.prototype.byId=function(t){return sap.ui.getCore().byId(this.createId(t))};g.prototype.createId=function(t){if(!this.isPrefixedId(t)){t=this.getId()+"---"+t}return t};g.prototype.getLocalId=function(t){var e=this.getId()+"---";return t&&t.indexOf(e)===0?t.slice(e.length):null};g.prototype.isPrefixedId=function(t){return!!(t&&t.indexOf(this.getId()+"---")===0)};g.prototype.createContent=function(){var t=this._getManifestEntry("/sap.ui5/rootView",true);if(t&&typeof t==="string"){return n._legacyCreate({viewName:t,type:u.XML})}else if(t&&typeof t==="object"){if(t.id){t.id=this.createId(t.id)}if(t.async&&t.type===u.XML){t.processingMode="sequential"}return n._legacyCreate(t)}else if(t){throw new Error("Configuration option 'rootView' of component '"+this.getMetadata().getName()+"' is invalid! 'rootView' must be type of string or object!")}return null};g.prototype.getRootControl=function(){return this.getAggregation("rootControl")};g.prototype.render=function(t){var e=this.getRootControl();if(e&&t){t.renderControl(e)}};g.prototype.getUIArea=function(){return this.oContainer?this.oContainer.getUIArea():null};g.prototype.getEventingParent=function(){return this.getUIArea()};g.prototype.setContainer=function(e){this.oContainer=e;if(e){this._applyContextualSettings(e._getContextualSettings())}else{this._oContextualSettings=t._defaultContextualSettings;if(!this._bIsBeingDestroyed){setTimeout(function(){if(!this.oContainer){this._propagateContextualSettings()}}.bind(this),0)}}return this};g.prototype.onBeforeRendering=function(){};g.prototype.onAfterRendering=function(){};g.prototype._getRouterClassName=function(){var t=this._getManifestEntry("/sap.ui5/routing",true)||{},e=t.config||{};return e.routerClass};return g});