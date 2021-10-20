/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/core/Control","sap/ui/core/CustomData","sap/ui/core/mvc/View","./BlockBaseMetadata","sap/ui/model/Context","sap/ui/Device","sap/ui/layout/form/ColumnLayout","./library","sap/ui/core/Component","sap/ui/layout/library","sap/base/Log"],function(e,t,o,i,a,n,s,r,p,u,l,d){"use strict";var g=l.form.SimpleFormLayout;var c=p.BlockBaseFormAdjustment;var h=t.extend("sap.uxap.BlockBase",{metadata:{designtime:"sap/uxap/designtime/BlockBase.designtime",library:"sap.uxap",properties:{mode:{type:"string",group:"Appearance"},visible:{type:"boolean",group:"Appearance",defaultValue:true},columnLayout:{type:"sap.uxap.BlockBaseColumnLayout",group:"Behavior",defaultValue:"auto"},formAdjustment:{type:"sap.uxap.BlockBaseFormAdjustment",group:"Behavior",defaultValue:c.BlockColumns},showSubSectionMore:{type:"boolean",group:"Behavior",defaultValue:false}},defaultAggregation:"mappings",aggregations:{mappings:{type:"sap.uxap.ModelMapping",multiple:true,singularName:"mapping"},_views:{type:"sap.ui.core.Control",multiple:true,singularName:"view",visibility:"hidden"}},associations:{selectedView:{type:"sap.ui.core.Control",multiple:false}},events:{viewInit:{parameters:{view:{type:"sap.ui.core.mvc.View"}}}},views:{}},renderer:"sap.uxap.BlockBaseRenderer"},a);h.prototype.init=function(){if(!this.getMetadata().hasViews()){this.getMetadata().setView("defaultXML",{viewName:this.getMetadata().getName(),type:"XML"})}this._oMappingApplied={};this._bLazyLoading=false;this._bConnected=false;this._oUpdatedModels={};this._oParentObjectPageSubSection=null;this._oPromisedViews={}};h.prototype.onBeforeRendering=function(){var e;this._applyMapping();if(!this.getMode()||this.getMode()===""){if(this.getMetadata().getView("defaultXML")){this.setMode("defaultXML")}else{d.error("BlockBase ::: there is no mode defined for rendering "+this.getMetadata().getName()+". You can either set a default mode on the block metadata or set the mode property before rendering the block.")}}this._applyFormAdjustment();e=this._getObjectPageLayout();this._bLazyLoading=e&&(e.getEnableLazyLoading()||e.getUseIconTabBar())};h.prototype.onAfterRendering=function(){var e=this._getObjectPageLayout();if(e){e._requestAdjustLayout()}};h.prototype.setParent=function(e,o,i){if(e instanceof p.ObjectPageSubSection){this._bLazyLoading=true;this._oParentObjectPageSubSection=e}else{t.prototype.setParent.call(this,e,o,i)}};h.prototype.setModel=function(e,o){this._applyMapping(o);return t.prototype.setModel.call(this,e,o)};h.prototype._applyMapping=function(){if(this._shouldLazyLoad()){d.debug("BlockBase ::: Ignoring the _applyMapping as the block is not connected")}else{this.getMappings().forEach(function(e,o){var i,a,s=e.getInternalModelName(),r=e.getExternalPath(),p=e.getExternalModelName(),u;if(r){if(s==""||r==""){throw new Error("BlockBase :: incorrect mapping, one of the modelMapping property is empty")}i=this.getModel(p);if(!i){return}u=i.resolve(r,this.getBindingContext(p));a=this.getBindingContext(s);if(!this._isMappingApplied(s)||this.getModel(s)!==this.getModel(p)||a&&a.getPath()!==u){d.info("BlockBase :: mapping external model "+p+" to "+s);this._oMappingApplied[s]=true;t.prototype.setModel.call(this,i,s);this.setBindingContext(new n(i,u),s)}}},this)}};h.prototype._isMappingApplied=function(e){return this.getModel(e)&&this._oMappingApplied[e]};h.prototype.propagateProperties=function(e){if(this._shouldLazyLoad()&&!this._oUpdatedModels.hasOwnProperty(e)){this._oUpdatedModels[e]=true}else{this._applyMapping(e)}return t.prototype.propagateProperties.call(this,e)};h.prototype.getSupportedModes=function(){var t=e.extend({},this.getMetadata().getViews());for(var o in t){t[o]=o}return t};h.prototype.setMode=function(e){e=this._validateMode(e);if(this.getMode()!==e){this.setProperty("mode",e,false);if(!this._shouldLazyLoad()){this._selectView(e)}}return this};h.prototype.setColumnLayout=function(e){if(this._oParentObjectPageSubSection){this._oParentObjectPageSubSection.invalidate()}this.setProperty("columnLayout",e)};h.prototype.clone=function(){var e=-1,o=this.getAssociation("selectedView"),i=this.getAggregation("_views")||[];if(o){i.forEach(function(t,i){if(t.getId()===o){e=i}return e<0})}var a=t.prototype.clone.call(this);if(e>=0){a.setAssociation("selectedView",a.getAggregation("_views")[e])}return a};h.prototype._validateMode=function(e){this.validateProperty("mode",e);if(!this.getMetadata().getView(e)){var t=this.getMetadata()._sClassName||this.getId();if(this.getMetadata().getView("defaultXML")){d.warning("BlockBase :: no view defined for block "+t+" for mode "+e+", loading defaultXML instead");e="defaultXML"}else{throw new Error("BlockBase :: no view defined for block "+t+" for mode "+e)}}return e};h.prototype._getSelectedViewContent=function(){var e=null,t,o;t=this.getAssociation("selectedView");o=this.getAggregation("_views");if(o){for(var i=0;!e&&i<o.length;i++){if(o[i].getId()===t){e=o[i]}}}return e};h.prototype.createView=function(e,t){if(!this._oPromisedViews[e.id]){this._oPromisedViews[e.id]=new Promise(function(o,a){var n=u.getOwnerComponentFor(this),s=function(){var t=function(){return i.create(e)};if(n){return n.runAsOwner(t)}else{return t()}};s().then(function(e){this._afterViewInstantiated(e,t);o(e)}.bind(this))}.bind(this))}return this._oPromisedViews[e.id]};h.prototype._afterViewInstantiated=function(e,t){var i=e.getController();if(e){if(i){i.oParentBlock=this}e.addCustomData(new o({key:"layoutMode",value:t}));this.addAggregation("_views",e);this.fireEvent("viewInit",{view:e})}else{throw new Error("BlockBase :: no view defined in metadata.views for mode "+t)}};h.prototype._notifyForLoadingInMode=function(e,t,o){if(e&&typeof e.onParentBlockModeChange==="function"){e.onParentBlockModeChange(o)}else{d.info("BlockBase ::: could not notify "+t.sViewName+" of loading in mode "+o+": missing controller onParentBlockModeChange method")}};h.prototype._selectView=function(e){var t,o=this.getId()+"-"+e,i,a;a=function(t){if(t&&this.getAssociation("selectedView")!==o){this.setAssociation("selectedView",t);this._notifyForLoadingInMode(t.getController(),t,e)}}.bind(this);t=this._findView(e);if(t){a(t);return}i=this.getMetadata().getView(e);i.id=o;this.createView(i,e).then(function(e){a(e)})};h.prototype._findView=function(e){var t=this.getAggregation("_views")||[],o,i;i=t.filter(function(t){return t.data("layoutMode")===e});if(i.length){return i[0]}o=this.getMetadata().getView(e);i=t.filter(function(e){return o.viewName===e.getViewName()});if(i.length){return i[0]}};h.FORM_ADUSTMENT_OFFSET=16;h._FORM_ADJUSTMENT_CONST={labelSpan:{L:12},emptySpan:{L:0},columns:{XL:1,L:1,M:1}};h._PARENT_GRID_SIZE=12;h.prototype._computeFormAdjustmentFields=function(t,o){if(t&&o){return t===c.BlockColumns?e.extend({},h._FORM_ADJUSTMENT_CONST,{columns:o}):h._FORM_ADJUSTMENT_CONST}};h.prototype._applyFormAdjustment=function(){var e=this.getFormAdjustment(),t=this._getSelectedViewContent(),o=this._oParentObjectPageSubSection,i;if(e!==c.None&&t&&o){i=this._computeFormAdjustmentFields(e,o._oLayoutConfig);t.getContent().forEach(function(e){this._adjustForm(e,i)}.bind(this))}};h.prototype._adjustForm=function(e,t){var o,i;if(e.getMetadata().getName()==="sap.ui.layout.form.SimpleForm"){e.setLayout(g.ColumnLayout);i=e.getAggregation("form").getLayout();i._iBreakPointTablet-=h.FORM_ADUSTMENT_OFFSET;i._iBreakPointDesktop-=h.FORM_ADUSTMENT_OFFSET;i._iBreakPointLargeDesktop-=h.FORM_ADUSTMENT_OFFSET;e.setLabelSpanL(t.labelSpan.L);e.setEmptySpanL(t.emptySpan.L);this._applyFormAdjustmentFields(t,e);e.setWidth("100%")}else if(e.getMetadata().getName()==="sap.ui.layout.form.Form"){i=e.getLayout();if(i&&i.getMetadata().getName()==="sap.ui.layout.form.ColumnLayout"){o=i}else{o=new r;e.setLayout(o)}o._iBreakPointTablet-=h.FORM_ADUSTMENT_OFFSET;o._iBreakPointDesktop-=h.FORM_ADUSTMENT_OFFSET;o._iBreakPointLargeDesktop-=h.FORM_ADUSTMENT_OFFSET;o.setLabelCellsLarge(t.labelSpan.L);o.setEmptyCellsLarge(t.emptySpan.L);this._applyFormAdjustmentFields(t,o);e.setWidth("100%")}};h.prototype._applyFormAdjustmentFields=function(e,t){t.setColumnsXL(e.columns.XL);t.setColumnsL(e.columns.L);t.setColumnsM(e.columns.M)};h.prototype._getObjectPageLayout=function(){return p.Utilities.getClosestOPL(this)};h.prototype.setVisible=function(e,t){var o=this._getObjectPageLayout();if(e===this.getVisible()){return this}this.setProperty("visible",e,t);o&&o._requestAdjustLayoutAndUxRules();return this};h.prototype.setShowSubSectionMore=function(e,t){if(e!=this.getShowSubSectionMore()){this.setProperty("showSubSectionMore",e,true);if(this._oParentObjectPageSubSection){this._oParentObjectPageSubSection.refreshSeeMoreVisibility()}}return this};h.prototype.connectToModels=function(){if(!this._bConnected){d.debug("BlockBase :: Connecting block to the UI5 model tree");this._bConnected=true;if(this._bLazyLoading){var e=this.getMode();e&&this._selectView(e);this.updateBindings(true,null)}this.invalidate()}};h.prototype._allowPropagationToLoadedViews=function(e){if(!this._bConnected){return}this.mSkipPropagation._views=!e};h.prototype.updateBindingContext=function(e,o,i,a){if(!this._shouldLazyLoad()){return t.prototype.updateBindingContext.call(this,e,o,i,a)}else{d.debug("BlockBase ::: Ignoring the updateBindingContext as the block is not visible for now in the ObjectPageLayout")}};h.prototype.updateBindings=function(e,o){if(!this._shouldLazyLoad()){return t.prototype.updateBindings.call(this,e,o)}else{d.debug("BlockBase ::: Ignoring the updateBindingContext as the block is not visible for now in the ObjectPageLayout")}};h.prototype._shouldLazyLoad=function(){return!!this._oParentObjectPageSubSection&&this._bLazyLoading&&!this._bConnected};return h});