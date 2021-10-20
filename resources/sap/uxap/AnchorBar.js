/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/m/Button","sap/m/MenuButton","sap/m/library","sap/m/Toolbar","sap/ui/core/IconPool","sap/ui/core/Item","sap/ui/core/ResizeHandler","sap/ui/core/delegate/ScrollEnablement","sap/ui/layout/HorizontalLayout","sap/ui/Device","sap/ui/core/CustomData","sap/ui/core/Control","./HierarchicalSelect","./library","sap/uxap/AnchorBarRenderer","sap/base/Log","sap/ui/events/KeyCodes","sap/ui/dom/jquery/scrollLeftRTL"],function(t,e,o,i,r,n,s,a,l,c,h,u,f,p,d,g,_,S){"use strict";var y=i.SelectType;var A=r.extend("sap.uxap.AnchorBar",{metadata:{library:"sap.uxap",properties:{showPopover:{type:"boolean",defaultValue:true},upperCase:{type:"boolean",defaultValue:false},backgroundDesign:{type:"sap.m.BackgroundDesign",group:"Appearance"}},associations:{selectedButton:{type:"sap.m.Button",multiple:false}},aggregations:{_select:{type:"sap.uxap.HierarchicalSelect",multiple:false,visibility:"hidden"},_scrollArrowLeft:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_scrollArrowRight:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}}}});A.ButtonDelegate={onAfterRendering:function(){var t=this.isA("sap.m.MenuButton")?this._getButtonControl():this,e=this.hasStyleClass("sapUxAPAnchorBarButtonSelected");if(this.data("bHasSubMenu")){t.$().attr("aria-haspopup","menu");t.$().find(".sapMBtn").attr("role","none").removeAttr("aria-haspopup")}t.$().attr("aria-controls",this.data("sectionId")).attr("aria-selected",e)}};A.prototype.init=function(){if(r.prototype.init){r.prototype.init.call(this)}this.addStyleClass("sapUxAPAnchorBar");this._oPressHandlers={};this._oSectionInfo={};this._oScroller=null;this._sSelectedKey=null;this._bRtl=sap.ui.getCore().getConfiguration().getRTL();this._bRtlScenario=this._bRtl&&!h.browser.msie;this._bHasButtonsBar=h.system.tablet||h.system.desktop;this.oLibraryResourceBundleOP=sap.ui.getCore().getLibraryResourceBundle("sap.uxap");this._oSelect=this._getHierarchicalSelect();if(this._bHasButtonsBar){this._oScroller=new l(this,this.getId()+"-scroll",{horizontal:true,vertical:false,nonTouchScrolling:true});this._iREMSize=0;this._iTolerance=0;this._iOffset=0;this._sResizeListenerId=undefined}this.setDesign("Transparent")};A.SCROLL_STEP=250;A.SCROLL_DURATION=500;A.DOM_CALC_DELAY=200;A.prototype.setSelectedButton=function(t){var e=this.getSelectedButton(),o,i=this._oSelect.getItems(),r=i.length>0;if(typeof t==="string"){t=sap.ui.getCore().byId(t)}if(t){if(t.getId()===e){return this}var n=t.data("sectionId");this._sSelectedKey=n;if(n&&r){this._oSelect.setSelectedKey(n)}if(this._bHasButtonsBar&&t.data("secondLevel")!==true){o=sap.ui.getCore().byId(e);this._toggleSelectionStyleClass(o,false);this._toggleSelectionStyleClass(t,true);if(n){this.scrollToSection(n,A.SCROLL_DURATION)}this._setAnchorButtonsTabFocusValues(t)}this.setAssociation("selectedButton",t,true)}return this};A.prototype.setShowPopover=function(t,e){if(this.getShowPopover()===t){return this}return this.setProperty("showPopover",t,true)};A.prototype.getSelectedSection=function(){var t=this.getSelectedButton();if(t&&typeof t==="string"){t=sap.ui.getCore().byId(t)}if(t&&t instanceof e&&t.data("sectionId")){return sap.ui.getCore().byId(t.data("sectionId"))}return null};A.prototype.onBeforeRendering=function(){if(this._bHasButtonsBar){this._iREMSize=parseInt(t("body").css("font-size"));this._iTolerance=this._iREMSize*1;this._iOffset=this._iREMSize*3}if(r.prototype.onBeforeRendering){r.prototype.onBeforeRendering.call(this)}var e=this.getContent()||[],o=this.getUpperCase();this._oSelect.setUpperCase(o);this.toggleStyleClass("sapUxAPAnchorBarUpperCase",o);if(e.length>0&&this._sSelectedKey){this._oSelect.setSelectedKey(this._sSelectedKey)}};A.prototype.addContent=function(t,e){var o=t.data("secondLevel")===true||t.data("secondLevel")==="true";t.addStyleClass("sapUxAPAnchorBarButton");t.removeAllAriaDescribedBy();this._createSelectItem(t,o);if(o){t.destroy()}else{t.addEventDelegate(A.ButtonDelegate,t);this.addAggregation("content",t,e)}return this};A.prototype._removeButtonsDelegate=function(){var t=this.getContent();t.forEach(function(t){t.removeEventDelegate(A.ButtonDelegate)})};A.prototype._createSelectItem=function(t,e){var o=t.getBindingInfo("text"),i=t.getText().trim()!=""||o;if(i&&(!e||t.data("bTitleVisible")===true)){var r=new s({key:t.data("sectionId"),text:t.getText(),customData:[new u({key:"secondLevel",value:t.data("secondLevel")})]});if(o){r.bindProperty("text",Object.assign({},o))}this._oSelect.addItem(r)}};A.prototype._decorateSubMenuButtons=function(t){var e=t.getSource().getContent();e.forEach(function(t){t.$().attr("aria-controls",t.data("sectionId"))})};A.prototype._toggleSelectionStyleClass=function(t,e){if(t&&t.toggleStyleClass){t.toggleStyleClass("sapUxAPAnchorBarButtonSelected",e);if(t instanceof o){t._getButtonControl().$().attr("aria-selected",e)}else{t.$().attr("aria-selected",e)}}};A.prototype._handleDirectScroll=function(t){this._requestScrollToSection(t.getSource().data("sectionId"))};A.prototype._requestScrollToSection=function(t){var e=sap.ui.getCore().byId(t),o=e.getParent(),i=this.getParent();if(i instanceof d.ObjectPageLayout){var r=t;if(e instanceof d.ObjectPageSubSection&&o instanceof d.ObjectPageSection){r=o.getId()}i.setDirectScrollingToSection(r);i.setSelectedSection(r);i.scrollToSection(e.getId(),null,0,true)}if(e instanceof d.ObjectPageSubSection&&o instanceof d.ObjectPageSection){o.setAssociation("selectedSubSection",e,true)}};A.prototype._onSelectChange=function(t){var e=t.getParameter("selectedItem"),o;if(!e){_.warning("AnchorBar :: no selected hierarchicalSelect item");return}o=sap.ui.getCore().byId(e.getKey());if(o){this._requestScrollToSection(o.getId())}else{_.error("AnchorBar :: cannot find corresponding section",e.getKey())}};A.prototype._getHierarchicalSelect=function(){if(!this.getAggregation("_select")){this.setAggregation("_select",new p({width:"100%",icon:"sap-icon://slim-arrow-down",tooltip:this.oLibraryResourceBundleOP.getText("ANCHOR_BAR_OVERFLOW"),change:t.proxy(this._onSelectChange,this)}))}return this.getAggregation("_select")};A.prototype._createScrollArrow=function(t){var o,i,r,s,a,l=this,h=this.oLibraryResourceBundleOP.getText("TOOLTIP_OP_SCROLL_LEFT_ARROW"),u=this.oLibraryResourceBundleOP.getText("TOOLTIP_OP_SCROLL_RIGHT_ARROW");if(t){o=this.getId()+"-arrowScrollLeft";i="slim-arrow-left";r="anchorBarArrowLeft";s=this._bRtl?u:h}else{o=this.getId()+"-arrowScrollRight";i="slim-arrow-right";r="anchorBarArrowRight";s=this._bRtl?h:u}a=new e(o,{icon:n.getIconURI(i),type:"Transparent",press:function(e){e.preventDefault();l._handleScrollButtonTap(t)},tooltip:s});a.addEventDelegate({onAfterRendering:function(){if(sap.ui.getCore().getConfiguration().getTheme()!="sap_hcb"){this.$().attr("tabindex",-1)}},onThemeChanged:function(){if(sap.ui.getCore().getConfiguration().getTheme()=="sap_hcb"){this.$().removeAttr("tabindex")}else{this.$().attr("tabindex",-1)}}},a);return new c({content:[a]}).addStyleClass("anchorBarArrow").addStyleClass(r)};A.prototype._getScrollArrowLeft=function(){var t=this.getAggregation("_scrollArrowLeft");if(t){return t}else{t=this._createScrollArrow(true);this.setAggregation("_scrollArrowLeft",t);return t}};A.prototype._getScrollArrowRight=function(){var t=this.getAggregation("_scrollArrowRight");if(t){return t}else{t=this._createScrollArrow(false);this.setAggregation("_scrollArrowRight",t);return t}};A.prototype._applyHierarchicalSelectMode=function(){if(this._sHierarchicalSelectMode===g._AnchorBarHierarchicalSelectMode.Icon){this._bHideScrollContainer=false;this._oSelect.setWidth("auto");this._oSelect.setAutoAdjustWidth(true);this._oSelect.setType(y.IconOnly);this._computeBarSectionsInfo()}else{this._bHideScrollContainer=true;this._oSelect.setWidth("100%");this._oSelect.setAutoAdjustWidth(false);this._oSelect.setType(y.Default)}this.$().toggleClass("sapUxAPAnchorBarOverflow",this._sHierarchicalSelectMode===g._AnchorBarHierarchicalSelectMode.Icon);this.invalidate()};A.prototype._adjustSize=function(t){var e=h.media.getCurrentRange(h.media.RANGESETS.SAP_STANDARD,this._getWidth(this)),o=t&&t.size&&t.size.width!==t.oldSize.width,i=d.Utilities.isPhoneScenario(e)?g._AnchorBarHierarchicalSelectMode.Text:g._AnchorBarHierarchicalSelectMode.Icon;if(i!==this._sHierarchicalSelectMode){this._sHierarchicalSelectMode=i;this._applyHierarchicalSelectMode()}if(this._sHierarchicalSelectMode===g._AnchorBarHierarchicalSelectMode.Icon){if(this._iMaxPosition<0){return}var r=this.$(),n=r.find(".sapUxAPAnchorBarScrollContainer"),s,a,l,c,u=function t(){var e=s;s=a;a=e};if(o){this.scrollToSection(this._sSelectedKey)}l=n.width();c=this._bRtlScenario?n.scrollLeftRTL():n.scrollLeft();s=c>=this._iTolerance;a=c+l<this._iMaxPosition-this._iTolerance;if(this._bRtlScenario){u()}_.debug("AnchorBar :: scrolled at "+c,"scrollBegin ["+(s?"true":"false")+"] scrollEnd ["+(a?"true":"false")+"]");r.toggleClass("sapUxAPAnchorBarScrollLeft",s);r.toggleClass("sapUxAPAnchorBarScrollRight",a)}};A.prototype._handleScrollButtonTap=function(t){var e=!this._bRtlScenario&&t||this._bRtlScenario&&!t?-1:1;this._oScroller.scrollTo(this._iMaxPosition*e,0,A.SCROLL_DURATION*3)};A.prototype.scrollToSection=function(e,o){if(this._bHasButtonsBar){var i=h.media.getCurrentRange(h.media.RANGESETS.SAP_STANDARD,this._getWidth(this)),o=o||A.SCROLL_DURATION,r;if(!d.Utilities.isPhoneScenario(i)&&this._oSectionInfo[e]){if(this._bRtlScenario&&h.browser.firefox){r=this._oSectionInfo[e].scrollLeft+this._iOffset}else{r=this._oSectionInfo[e].scrollLeft-this._iOffset;if(r<0){r=0}}_.debug("AnchorBar :: scrolling to section "+e+" of "+r);if(this._sCurrentScrollId!=e){this._sCurrentScrollId=e;if(this._iCurrentScrollTimeout){clearTimeout(this._iCurrentScrollTimeout);t(document.getElementById(this.getId()+"-scroll")).parent().stop(true,false)}this._iCurrentScrollTimeout=setTimeout(function(){this._sCurrentScrollId=undefined;this._iCurrentScrollTimeout=undefined}.bind(this),o);this._oScroller.scrollTo(r,0,o)}}else{_.debug("AnchorBar :: no need to scroll to "+e)}}};A.prototype.getScrollDelegate=function(){return this._oScroller};A.PAGEUP_AND_PAGEDOWN_JUMP_SIZE=5;A.prototype.onsapright=function(t){t.preventDefault();var e;var o=this.getContent();o.forEach(function(o,i){if(t.target.id.indexOf(o.getId())>-1){e=i+1;return}});if(e&&o[e]){o[e].focus()}else if(o[o.length-1]){o[o.length-1].focus()}};A.prototype.onsapleft=function(t){t.preventDefault();var e;var o=this.getContent();o.forEach(function(o,i){if(t.target.id.indexOf(o.getId())>-1){e=i-1;return}});if(e&&o[e]){o[e].focus()}else if(o[0]){o[0].focus()}};A.prototype.onsapdown=function(t){t.preventDefault()};A.prototype.onsapup=function(t){t.preventDefault()};A.prototype.onsaphome=function(t){t.preventDefault();var e=this.getContent();e[0].focus()};A.prototype.onsapend=function(t){t.preventDefault();var e=this.getContent();e[e.length-1].focus()};A.prototype.onsappageup=function(t){this._handlePageUp(t)};A.prototype.onsappagedown=function(t){this._handlePageDown(t)};A.prototype._handlePageUp=function(t){t.preventDefault();var e;var o=this.getContent();o.forEach(function(o,i){if(t.target.id.indexOf(o.getId())>-1){e=i-(A.PAGEUP_AND_PAGEDOWN_JUMP_SIZE+1);return}});if(e&&o[e]){o[e].focus()}else if(o[0]){o[0].focus()}};A.prototype._handlePageDown=function(t){t.preventDefault();var e;var o=this.getContent();o.forEach(function(o,i){if(t.target.id.indexOf(o.getId())>-1){e=i+A.PAGEUP_AND_PAGEDOWN_JUMP_SIZE+1;return}});if(e&&o[e]){o[e].focus()}else if(o[o.length-1]){o[o.length-1].focus()}};A.prototype._setAnchorButtonsTabFocusValues=function(t){var e=this.getContent()||[],o,i="0",r="-1",n="tabIndex";e.forEach(function(e){o=e.getAggregation("_button")?e.getAggregation("_button").$():e.$();if(e===t){o.attr(n,i)}else{o.attr(n,r)}})};A.prototype.onAfterRendering=function(){var e;if(r.prototype.onAfterRendering){r.prototype.onAfterRendering.call(this)}e=sap.ui.getCore().byId(this.getSelectedButton());this._setAnchorButtonsTabFocusValues(e);this._iMaxPosition=-1;this._sResizeListenerId=a.register(this,t.proxy(this._adjustSize,this));this.$().find(".sapUxAPAnchorBarScrollContainer").on("scroll",t.proxy(this._onScroll,this));if(e){this.setSelectedButton(e)}if(this._bHasButtonsBar){this._iComputeContentSizeTimeout=setTimeout(function(){if(this._sHierarchicalSelectMode===g._AnchorBarHierarchicalSelectMode.Icon){this._computeBarSectionsInfo()}this._adjustSize();this._iComputeContentSizeTimeout=null}.bind(this),A.DOM_CALC_DELAY)}};A.prototype.onThemeChanged=function(){if(this._sHierarchicalSelectMode===g._AnchorBarHierarchicalSelectMode.Icon){this._computeBarSectionsInfo()}};A.prototype._onScroll=function(){if(!this._iCurrentSizeCheckTimeout){this._iCurrentSizeCheckTimeout=setTimeout(function(){this._iCurrentSizeCheckTimeout=undefined;this._adjustSize()}.bind(this),A.SCROLL_DURATION)}};A.prototype._computeBarSectionsInfo=function(){this._iMaxPosition=0;var t=this.getContent()||[];t.forEach(this._computeNextSectionInfo,this);if(this._bRtlScenario&&(h.browser.webkit||h.browser.firefox)){t.forEach(this._adjustNextSectionInfo,this);this._oScroller&&this._oScroller.scrollTo(this._iMaxPosition,0,0)}};A.prototype._computeNextSectionInfo=function(t){var e=t.$().outerWidth(true);this._oSectionInfo[t.data("sectionId")]={scrollLeft:this._iMaxPosition,width:e};this._iMaxPosition+=e};A.prototype._adjustNextSectionInfo=function(t){var e=this._oSectionInfo[t.data("sectionId")];if(h.browser.firefox){e.scrollLeft=-e.scrollLeft}else{e.scrollLeft=this._iMaxPosition-e.scrollLeft-e.width}};A.prototype._resetControl=function(){this._removeButtonsDelegate();this.destroyAggregation("content");this._oSelect.destroyAggregation("items",true);return this};A.prototype._getAccessibilityRole=function(){return"none"};A.prototype.enhanceAccessibilityState=function(t,e){var o=this.getContent(),i=o.indexOf(t);if(i!==-1){e.role="option";e.setsize=o.length;e.posinset=i+1}};A.prototype.exit=function(){if(this._sResizeListenerId){a.deregister(this._sResizeListenerId);this._sResizeListenerId=null}if(this._oScroller){this._oScroller.destroy();this._oScroller=null}if(this.oLibraryResourceBundleOP){this.oLibraryResourceBundleOP=null}if(this._iComputeContentSizeTimeout){clearTimeout(this._iComputeContentSizeTimeout);this._iComputeContentSizeTimeout=null}this._removeButtonsDelegate()};A.prototype._getWidth=function(t){var e=t.getDomRef();return!(t instanceof f)?0:e&&e.offsetWidth||0};A.prototype.setVisible=function(t){this.getParent()&&this.getParent().toggleStyleClass("sapUxAPObjectPageLayoutNoAnchorBar",!t);return this.setProperty("visible",t)};return A});