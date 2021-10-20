/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery"],function(i){"use strict";var t=function(i){this._errorPrefix=i.errorPrefix};t.prototype.validate=function(i){this._validate({inputToValidate:i,validationInfo:{validationInfo:{type:"object",mandatory:true},inputToValidate:{type:"object",mandatory:true},allowUnknownProperties:"bool"}});this._validate(i)};t.prototype._validate=function(i){var t=this._getErrors(i);if(t.length===1){throw new Error(this._errorPrefix+" - "+t[0])}if(t.length){throw new Error("Multiple errors where thrown "+this._errorPrefix+"\n"+t.join("\n"))}};t.prototype._getErrors=function(i,r,n){r=r||[];n=n?n+".":"";if(!i.allowUnknownProperties){Object.keys(i.inputToValidate).forEach(function(t){if(!i.validationInfo[t]){r.push("the property '"+n+t+"' is not defined in the API")}})}Object.keys(i.validationInfo).forEach(function(e){var o=n+e;var a=i.inputToValidate[e];var s=this._getParameterValidationInfo(i.validationInfo[e]);if(a===undefined||a===null){if(s.mandatory){r.push("No '"+o+"' given but it is a mandatory parameter")}}else if(s.hasOwnProperty("type")){var u=t.types[s.type];if(!u.isValid(a)){r.push("the '"+o+"' parameter needs to be "+u.description+" but '"+a+"' was passed")}}else{r.concat(this._getErrors({validationInfo:s,inputToValidate:a,allowUnknownProperties:i.allowUnknownProperties},r,o))}}.bind(this));return r};t.prototype._getParameterValidationInfo=function(i){if(typeof i==="string"){return{type:i,mandatory:false}}return i};t.types={func:{isValid:function(t){return i.isFunction(t)},description:"a function"},array:{isValid:function(i){return Array.isArray(i)},description:"an array"},object:{isValid:function(t){return i.isPlainObject(t)},description:"an object"},string:{isValid:function(i){return typeof i==="string"||i instanceof String},description:"a string"},bool:{isValid:function(i){return typeof i==="boolean"},description:"a boolean value"},numeric:{isValid:function(t){return i.isNumeric(t)},description:"numeric"},positivenumeric:{isValid:function(t){return i.isNumeric(t)&&t>0},description:"a positive numeric"},any:{isValid:function(){return true},description:"any value"}};return t},true);