/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/ToolbarRenderer","sap/ui/core/Renderer","sap/m/BarInPageEnabler","./library"],function(e,r,t,o){"use strict";var a=r.extend(e);a.apiVersion=2;var n=a._AnchorBarHierarchicalSelectMode={Icon:"icon",Text:"text"};a.renderBarContent=function(e,r){if(r._bHasButtonsBar){e.renderControl(r._getScrollArrowLeft());e.openStart("div",r.getId()+"-scrollContainer");if(r._bHideScrollContainer){e.style("display","none")}e.class("sapUxAPAnchorBarScrollContainer").openEnd();e.openStart("div",r.getId()+"-scroll").attr("role","listbox").attr("aria-describedby",r.getId()+"-desc").attr("aria-label",sap.ui.getCore().getLibraryResourceBundle("sap.uxap").getText("ANCHOR_BAR_ARIA_LABEL")).openEnd();if(!r._bHideScrollContainer){a.renderBarItems(e,r)}e.close("div");e.openStart("span",r.getId()+"-desc").class("sapUiPseudoInvisibleText").openEnd();e.text(sap.ui.getCore().getLibraryResourceBundle("sap.uxap").getText("ANCHOR_BAR_ARIA_LABEL_DESC"));e.close("span");e.close("div");e.renderControl(r._getScrollArrowRight())}t.addChildClassTo(r._oSelect,r);e.renderControl(r._oSelect)};a.renderBarItems=function(e,r){var o=r.getSelectedButton();r.getContent().forEach(function(a){t.addChildClassTo(a,r);if(a.getId()===o){a.addStyleClass("sapUxAPAnchorBarButtonSelected")}e.renderControl(a)})};a.decorateRootElement=function(r,t){e.decorateRootElement.apply(this,arguments);if(t._sHierarchicalSelectMode===n.Icon){r.class("sapUxAPAnchorBarOverflow")}if(t.getBackgroundDesign()){r.class("sapUxAPAnchorBar"+t.getBackgroundDesign())}};return a},true);