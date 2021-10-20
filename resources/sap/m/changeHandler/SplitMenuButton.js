/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/util/reflection/JsControlTreeModifier","sap/ui/core/Component","sap/ui/fl/util/ManagedObjectModel"],function(e,t){"use strict";var n={};var r="sourceControl";n.applyChange=function(e,t,n){if(n.modifier.targets!=="jsControlTree"){throw new Error("Split change can't be applied on XML tree")}var o=e.getDefinition();var a=n.modifier;var i=n.view;var g=n.appComponent;var s=e.getDependentControl(r,n);var p=a.getAggregation(s,"menu");var d=a.getAggregation(p,"items");var l=a.getParent(s);var c=a.getParentAggregationName(s,l);var u=a.findIndexInParentAggregation(s);var v=o.content.newElementIds;var f={parentAggregation:c,insertIndex:u,insertedButtons:[]};d.forEach(function(e,t){var n=v[t];var r=a.createControl("sap.m.Button",g,i,n);f.insertedButtons.push(n);var o="$sap.m.flexibility.SplitButtonsModel";var s=a.createControl("sap.ui.fl.util.ManagedObjectModel",g,i,Object.assign({},n,{id:n.id+"-managedObjectModel"}),{object:e,name:o});a.insertAggregation(r,"dependents",s,0,i);a.bindProperty(r,"text",o+">/text");a.bindProperty(r,"icon",o+">/icon");a.bindProperty(r,"enabled",o+">/enabled");a.bindProperty(r,"visible",o+">/visible");a.bindAggregation(r,"customData",{path:o+">/customData",template:a.createControl("sap.ui.core.CustomData",g,i,Object.assign({},n,{id:n.id+"-customData"}),{key:{path:o+">key"},value:{path:o+">value"}}),templateShareable:false});a.attachEvent(r,"press","sap.m.changeHandler.SplitMenuButton.pressHandler",{selector:a.getSelector(e,g),appComponentId:g.getId()});a.insertAggregation(l,c,r,u+t,i)});a.removeAggregation(l,c,s);a.insertAggregation(l,"dependents",s,0,i);e.setRevertData(f);return true};n.revertChange=function(e,t,n){var o=n.modifier;var a=e.getRevertData();var i=e.getDependentControl(r,n);var g=n.appComponent;var s=n.view;var p=o.getParent(i);var d=a.parentAggregation;var l=a.insertIndex;var c=a.insertedButtons.map(function(e){return o.bySelector(e,g,s)});c.forEach(function(e){o.removeAggregation(p,d,e);o.destroy(e)});o.insertAggregation(p,d,i,l,s);e.resetRevertData();return true};n.completeChangeContent=function(e,t,n){var o=n.modifier;var a=n.appComponent;var i=e.getDefinition();if(!t.newElementIds){throw new Error("Split of MenuButton cannot be applied : oSpecificChangeInfo.newElementIds attribute required")}if(!t.sourceControlId){throw new Error("Split of MenuButton cannot be applied : oSpecificChangeInfo.sourceControlId attribute required")}e.addDependentControl(t.sourceControlId,r,n);i.content.sourceSelector=o.getSelector(t.sourceControlId,a);i.content.newElementIds=t.newElementIds.map(function(e){return o.getSelector(e,a)})};n.pressHandler=function(n,r){var o=e.bySelector(r.selector,t.get(r.appComponentId));o.firePress()};return n},true);