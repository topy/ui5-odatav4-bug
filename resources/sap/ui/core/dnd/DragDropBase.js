/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","../Element","../library","./DragAndDrop"],function(e,t){"use strict";var a=t.extend("sap.ui.core.dnd.DragDropBase",{metadata:{abstract:true,library:"sap.ui.core",properties:{groupName:{type:"string",defaultValue:null,invalidate:false},enabled:{type:"boolean",defaultValue:true}}}});a.prototype.bIgnoreMetadataCheck=false;a.prototype.isDraggable=function(e){return false};a.prototype.isDroppable=function(e,t){return false};a.prototype.checkMetadata=function(t,a,r){if(this.bIgnoreMetadataCheck){return true}var o=t.getMetadata().getDragDropInfo(a);if(!o[r]){e.warning((a?a+" aggregation of ":"")+t+" is not configured to be "+r);return false}return true};a.prototype.setEnabled=function(e){return this.setProperty("enabled",e,!this.isA("sap.ui.core.dnd.IDragInfo"))};a.prototype.setProperty=function(e,a,r){r=r||(this.getMetadata().getProperty(e).appData||{}).invalidate===false;return t.prototype.setProperty.call(this,e,a,r)};return a});