/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(function(){"use strict";var e={apiVersion:2};e.render=function(e,t){var i,a,n=sap.ui.getCore().getConfiguration().getAccessibility(),o=t.getAggregation("ariaLabelledBy");if(!t.getVisible()||!t._getInternalVisible()){return}i=t._getTitle();a=t._isTitleVisible();e.openStart("section",t).class("sapUxAPObjectPageSection");if(!a){e.class("sapUxAPObjectPageSectionNoTitle")}e.attr("role","region");if(n&&o){e.attr("aria-labelledby",o.getId())}e.openEnd();e.openStart("div",t.getId()+"-header").attr("role","heading").attr("aria-level",t._getARIALevel()).class("sapUxAPObjectPageSectionHeader").class(a?"":"sapUxAPObjectPageSectionHeaderHidden").openEnd();e.openStart("div",t.getId()+"-title").class("sapUxAPObjectPageSectionTitle");if(t.getTitleUppercase()){e.class("sapUxAPObjectPageSectionTitleUppercase")}e.openEnd();e.text(i);e.close("div");if(a){e.renderControl(t._getShowHideAllButton());e.renderControl(t._getShowHideButton())}e.close("div");e.openStart("div").class("sapUxAPObjectPageSectionContainer");if(t._isHidden){e.style("display","none")}e.openEnd();t.getSubSections().forEach(e.renderControl,e);e.close("div");e.close("section")};return e},true);