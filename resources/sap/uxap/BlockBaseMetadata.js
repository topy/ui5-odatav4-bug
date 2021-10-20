/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/ElementMetadata","sap/base/Log","sap/base/util/isEmptyObject"],function(e,t,r){"use strict";var n=function(t,r){e.apply(this,arguments);this._mViews=r.metadata.views||{}};n.prototype=Object.create(e.prototype);n.prototype.constructor=n;n.prototype.applySettings=function(t){var r=t.hasOwnProperty("renderer")?t.renderer||"":undefined;e.prototype.applySettings.call(this,t);if(r==null){this._sRendererName=null}};n.prototype.getRendererName=function(){if(!this._sBlockRenderer){this._sBlockRenderer=this._resolveRendererName();t.debug("BlockBaseMetadata :: "+this.getName()+" is renderer with "+this._sBlockRenderer)}return this._sBlockRenderer};n.prototype._resolveRendererName=function(){var t=e.prototype.getRendererName.call(this);if(t==null){var r=this.getParent();if(r){t=n.prototype._resolveRendererName.apply(r)}else{throw new Error("BlockBaseMetadata :: no renderer found for "+this.getName())}}return t};n.prototype.getView=function(e){return this._mViews[e]};n.prototype.getViews=function(){return this._mViews};n.prototype.setView=function(e,t){this._mViews[e]=t;return this};n.prototype.hasViews=function(){return!r(this._mViews)};return n},true);