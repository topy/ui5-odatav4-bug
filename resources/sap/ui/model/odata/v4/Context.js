/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./lib/_Helper","sap/base/Log","sap/ui/base/SyncPromise","sap/ui/model/Context"],function(e,t,n,i){"use strict";var o="sap.ui.model.odata.v4.Context",r,s=0,h=-9007199254740991;function a(e,t,i,o){var r,s=[e.fetchValue(t,null,o)],h=e.oModel.resolve(t,e);if(i){s.push(e.oModel.getMetaModel().fetchUI5Type(h))}return n.all(s).then(function(e){var t=e[1],n=e[0];if(n&&typeof n==="object"){r=new Error("Accessed value is not primitive: "+h);r.isNotPrimitive=true;throw r}return i?t.formatValue(n,"string"):n})}var u=i.extend("sap.ui.model.odata.v4.Context",{constructor:function(e,t,o,r,s,h){if(o[0]!=="/"){throw new Error("Not an absolute path: "+o)}if(o.endsWith("/")){throw new Error("Unsupported trailing slash: "+o)}i.call(this,e,o);this.oBinding=t;this.oCreatePromise=s&&Promise.resolve(s).then(function(){});this.oSyncCreatePromise=s&&n.resolve(s);this.iIndex=r;this.bKeepAlive=false;this.fnOnBeforeDestroy=undefined;this.iReturnValueContextId=h}});u.prototype._delete=function(e,t){var n=this;if(this.isTransient()){return this.oBinding._delete(e,"n/a",this)}return this.fetchCanonicalPath().then(function(i){return n.oBinding._delete(e,i.slice(1),n,t)})};u.prototype.adjustPredicate=function(e,t,n){var i=this.sPath;if(i.includes(e)){this.sPath=i.split("/").map(function(n){if(n.endsWith(e)){n=n.slice(0,-e.length)+t}return n}).join("/");if(n){n(i,this.sPath)}this.oModel.getDependentBindings(this).forEach(function(n){n.adjustPredicate(e,t)})}};u.prototype.checkUpdate=function(){return n.all(this.oModel.getDependentBindings(this).map(function(e){return e.checkUpdate()}))};u.prototype.collapse=function(){switch(this.getProperty("@$ui5.node.level")===0?undefined:this.isExpanded()){case true:this.oBinding.collapse(this);break;case false:throw new Error("Already collapsed: "+this);default:throw new Error("Not expandable: "+this)}};u.prototype.created=function(){return this.oCreatePromise};u.prototype.delete=function(e){var t,n=this.oModel,i=this;n.checkGroupId(e);this.oBinding.checkSuspended();if(this.isTransient()){e=e||"$direct"}else if(this.hasPendingChanges()){throw new Error("Cannot delete due to pending changes")}t=this.oBinding.lockGroup(e,true,true);return this._delete(t).then(function(){var e=i.sPath.slice(1);n.getAllBindings().forEach(function(t){t.removeCachesAndMessages(e,true)})}).catch(function(e){t.unlock(true);n.reportError("Failed to delete "+i,o,e);throw e})};u.prototype.destroy=function(){var e=this.fnOnBeforeDestroy;if(e){this.fnOnBeforeDestroy=undefined;e()}this.oModel.getDependentBindings(this).forEach(function(e){e.setContext(undefined)});this.oBinding=undefined;this.oModel=undefined;i.prototype.destroy.call(this)};u.prototype.doSetProperty=function(t,n,i,r){var s=this.oModel.getMetaModel(),h=this;if(this.oModel.bAutoExpandSelect){t=s.getReducedPath(e.buildPath(this.sPath,t),this.oBinding.getBaseForPathReduction())}return this.withCache(function(a,u,d){return d.doSetProperty(u,n,i)||s.fetchUpdateData(t,h,!i).then(function(u){var c=e.getRelativePath(u.entityPath,d.oReturnValueContext?d.oReturnValueContext.getPath():h.oModel.resolve(d.sPath,d.oContext)),f=false;function l(e){h.oModel.reportError("Failed to update path "+h.oModel.resolve(t,h),o,e);p(false)}function p(e){if(f){d.firePatchCompleted(e);f=false}}function g(){f=true;d.firePatchSent()}if(!i){return a.setProperty(u.propertyPath,n,c)}return a.update(i,u.propertyPath,n,r?undefined:l,u.editUrl,c,s.getUnitOrCurrencyPath(h.oModel.resolve(t,h)),d.isPatchWithoutSideEffects(),g).then(function(){p(true)},function(e){p(false);throw e})})},t,false,true)};u.prototype.expand=function(){var e=this;switch(this.isExpanded()){case false:this.oBinding.expand(this).catch(function(t){e.oModel.reportError("Failed to expand "+e,o,t)});break;case true:throw new Error("Already expanded: "+this);default:throw new Error("Not expandable: "+this)}};u.prototype.fetchCanonicalPath=function(){return this.oModel.getMetaModel().fetchCanonicalPath(this)};u.prototype.fetchValue=function(t,i,o){if(this.iIndex===h){return n.resolve()}if(!t||t[0]!=="/"){t=e.buildPath(this.sPath,t);if(this.oModel.bAutoExpandSelect){t=this.oModel.getMetaModel().getReducedPath(t,this.oBinding.getBaseForPathReduction())}}return this.oBinding.fetchValue(t,i,o)};u.prototype.getBinding=function(){return this.oBinding};u.prototype.getCanonicalPath=e.createGetMethod("fetchCanonicalPath",true);u.prototype.getGroupId=function(){return this.oBinding.getGroupId()};u.prototype.getIndex=function(){if(this.oBinding.bCreatedAtEnd){if(this.iIndex<0){return this.oBinding.bLengthFinal?this.oBinding.iMaxLength-this.iIndex-1:-this.iIndex-1}return this.iIndex}return this.getModelIndex()};u.prototype.getModelIndex=function(){if(this.iIndex!==undefined&&this.oBinding.iCreatedContexts){return this.iIndex+this.oBinding.iCreatedContexts}return this.iIndex};u.prototype.getObject=function(t){return e.publicClone(this.getValue(t))};u.prototype.getProperty=function(e,n){var i,r;this.oBinding.checkSuspended();r=a(this,e,n,true);if(r.isRejected()){r.caught();i=r.getResult();if(i.isNotPrimitive){throw i}else if(!i.$cached){t.warning(i.message,e,o)}}return r.isFulfilled()?r.getResult():undefined};u.prototype.getReturnValueContextId=function(){if(this.iReturnValueContextId){return this.iReturnValueContextId}if(this.oBinding.bRelative&&this.oBinding.oContext&&this.oBinding.oContext.getReturnValueContextId){return this.oBinding.oContext.getReturnValueContextId()}};u.prototype.getQueryOptionsForPath=function(e){return this.oBinding.getQueryOptionsForPath(e)};u.prototype.getUpdateGroupId=function(){return this.oBinding.getUpdateGroupId()};u.prototype.getValue=function(e){var t,n=this;this.oBinding.checkSuspended();t=this.fetchValue(e,null,true).catch(function(e){if(!e.$cached){n.oModel.reportError("Unexpected error",o,e)}});if(t.isFulfilled()){return t.getResult()}};u.prototype.hasPendingChanges=function(){return this.isTransient()||this.oModel.getDependentBindings(this).some(function(e){return e.hasPendingChanges()})||this.oModel.withUnresolvedBindings("hasPendingChangesInCaches",this.sPath.slice(1))};u.prototype.isExpanded=function(){return this.getProperty("@$ui5.node.isExpanded")};u.prototype.isKeepAlive=function(){return this.bKeepAlive};u.prototype.isTransient=function(){return this.oSyncCreatePromise&&this.oSyncCreatePromise.isPending()};u.prototype.patch=function(e){return this.withCache(function(t,n){t.patch(n,e)},"")};u.prototype.refresh=function(e,t){this.requestRefresh.apply(this,arguments).catch(function(){})};u.prototype.requestCanonicalPath=e.createRequestMethod("fetchCanonicalPath");u.prototype.requestObject=function(t){this.oBinding.checkSuspended();return Promise.resolve(this.fetchValue(t)).then(e.publicClone)};u.prototype.requestProperty=function(e,i){var r=Array.isArray(e)?e:[e],s=this;this.oBinding.checkSuspended();return Promise.all(r.map(function(e){return s.oBinding.fetchIfChildCanUseCache(s,e,n.resolve({})).then(function(n){if(n){return a(s,n,i)}t.error("Not a valid property path: "+e,undefined,o)})})).then(function(t){return Array.isArray(e)?t:t[0]})};u.prototype.requestRefresh=function(e,t){var n;this.oModel.checkGroupId(e);this.oBinding.checkSuspended();if(this.hasPendingChanges()){throw new Error("Cannot refresh entity due to pending changes: "+this)}if(this.oBinding.refreshSingle){n=this.oBinding.refreshSingle(this,this.oBinding.lockGroup(e,true),t)}else{if(arguments.length>1){throw new Error("Unsupported parameter bAllowRemoval: "+t)}n=this.oBinding.refreshReturnValueContext(this,e)||this.oBinding.requestRefresh(e)}this.oModel.withUnresolvedBindings("removeCachesAndMessages",this.sPath.slice(1));return Promise.resolve(n).then(function(){})};u.prototype.requestSideEffects=function(t,i){var o=this.oModel.getMetaModel(),r=[],s=[],h,a,u=this;function d(e){if(!e){return false}if(e==="*"){return true}if(e.endsWith("/*")){e=e.slice(0,-2)}return!e.includes("*")}this.oBinding.checkSuspended();this.oModel.checkGroupId(i);if(this.isTransient()){throw new Error("Unsupported context: "+this)}if(!t||!t.length){throw new Error("Missing edm:(Navigation)PropertyPath expressions")}if(!this.oBinding.isResolved()){throw new Error("Cannot request side effects of unresolved binding's context: "+this)}t.map(function(e){if(e&&typeof e==="object"){if(d(e.$PropertyPath)){return e.$PropertyPath}if(typeof e.$NavigationPropertyPath==="string"&&!e.$NavigationPropertyPath.includes("*")){return e.$NavigationPropertyPath}}else if(typeof e==="string"&&(!e||d(e))){return e}throw new Error("Not an edm:(Navigation)PropertyPath expression: "+JSON.stringify(e))}).forEach(function(e){if(e[0]==="/"){s.push(e)}else{r.push(e)}});h=this.oBinding.getRootBinding();a=this.oModel.resolve(h.getPath(),h.getContext());r=r.reduce(function(t,n){return t.concat(o.getAllPathReductions(e.buildPath(u.getPath(),n),a))},[]);i=i||this.getUpdateGroupId();return Promise.resolve(n.resolve(this.oModel.isAutoGroup(i)&&this.oModel.oRequestor.waitForRunningChangeRequests(i).then(function(){u.oModel.oRequestor.relocateAll("$parked."+i,i)})).then(function(){return n.all([u.oModel.requestSideEffects(i,s),u.requestSideEffectsInternal(r,i)])})).then(function(){})};u.prototype.requestSideEffectsInternal=function(t,i){var o=this,r,s=o,h,a=[],u,d=[],c,f=[];for(;;){r=s.getBinding();c=r.getPath();u=r.getContext();if(r.oCache&&(!h||r.oCache.hasChangeListeners())){h=s}if(h&&c){break}if(!r.getBoundContext){throw new Error("Not a context binding: "+r)}s=u}r=h.getBinding();t.forEach(function(t){var n=e.getRelativePath(t,h.getPath());if(n===undefined){d.push(t)}else{a.push(n)}});if(d.length){f.push(r.getContext().requestSideEffectsInternal(d,i))}if(a.length&&r.oCache!==undefined){f.push(r.requestSideEffects(i,a,h))}return n.all(f)};u.prototype.resetKeepAlive=function(){this.bKeepAlive=false};u.prototype.setKeepAlive=function(t,n){if(this.isTransient()){throw new Error("Unsupported transient context "+this)}if(!e.getPrivateAnnotation(this.getValue(),"predicate")){throw new Error("No key predicate known at "+this)}this.oBinding.checkKeepAlive(this);this.bKeepAlive=t;this.fnOnBeforeDestroy=t?n:undefined};u.prototype.setProperty=function(e,t,n,i){var o=null;this.oBinding.checkSuspended();if(typeof t==="function"||t&&typeof t==="object"){throw new Error("Not a primitive value")}if(n!==null){this.oModel.checkGroupId(n);o=this.oBinding.lockGroup(n,true,true)}return Promise.resolve(this.doSetProperty(e,t,o,!i)).catch(function(e){if(o){o.unlock(true)}throw e})};u.prototype.toString=function(){var e="";if(this.iIndex!==undefined){e="["+this.iIndex+(this.isTransient()?"|transient":"")+"]"}return this.sPath+e};u.prototype.withCache=function(t,i,o,r){if(this.iIndex===h){return n.resolve()}return this.oBinding.withCache(t,i[0]==="/"?i:e.buildPath(this.sPath,i),o,r)};r={create:function(e,t,n,i,o){return new u(e,t,n,i,o)},createReturnValueContext:function(e,t,n){s+=1;return new u(e,t,n,undefined,undefined,s)}};Object.defineProperty(r,"VIRTUAL",{value:h});return r},false);