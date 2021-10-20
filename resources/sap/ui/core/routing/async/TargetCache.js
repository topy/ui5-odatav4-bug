/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/mvc/View","sap/ui/core/Component","sap/ui/core/routing/HashChanger","sap/ui/core/library"],function(e,t,n,i){"use strict";var a=i.mvc.ViewType;return{_getObjectWithGlobalId:function(n,i,r){var o=this,s,u,c,h=this._oComponent,f=[];r=r||{};function g(){switch(i){case"View":n.viewName=n.name;delete n.name;if(n.type===a.XML&&!n.processingMode){n.processingMode="sequential"}return e._legacyCreate(n);case"Component":n.settings=n.settings||{};n.settings._propagateTitle=r.propagateTitle;var s=o._createRouterHashChanger(r.prefix);if(s){n.settings._routerHashChanger=s}if(n.usage){return h.createComponent(n)}else{return t.create(n)}break;default:}}function p(e){if(o._oCache){f.forEach(function(t){c[t]=e});if(r.afterCreate){r.afterCreate(e)}o.fireCreated({object:e,type:i,options:n})}return e}if(n.async===undefined){n.async=true}u=n.usage||n.name;this._checkName(u,i);c=this._oCache[i.toLowerCase()][u];s=c&&c[n.id];if(s){return s}if(h){s=h.runAsOwner(g)}else{s=g()}if(s instanceof Promise){s=s.then(p)}else{s.loaded().then(p)}if(!c){c=this._oCache[i.toLowerCase()][u]={};c[undefined]=s;f.push(undefined)}if(n.id!==undefined){c[n.id]=s;f.push(n.id)}return s},_getViewWithGlobalId:function(e){if(e&&!e.name){e.name=e.viewName}return this._getObjectWithGlobalId(e,"View")},_getComponentWithGlobalId:function(e,t){return this._getObjectWithGlobalId(e,"Component",t)},_createRouterHashChanger:function(e){var t;var i=this._oComponent&&this._oComponent.getRouter();if(i){t=i.getHashChanger();if(t&&e){t=t.createSubHashChanger(e)}}return t||n.getInstance().createRouterHashChanger()}}});