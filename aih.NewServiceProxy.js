import $ from 'jquery';
import jQuery from 'jquery';
import aih from './aes';
import Encryption from './aih.Encryption';
aih.service = {};
aih.service.Requested = null;
aih.service.RequestHeader = null;
aih.service.RequestProcessor = null;
aih.service.Requested = null;
aih.service.SuccessStatusCode = "1";
aih.callTracker = 0;
var encryptedData = "";
var decryptedResponse = "";
aih.getAppSiteUrl = function (service, controller, action) {
    return aih.ApiUri.ServiceNS.SER + service + "/api/" + controller + "/" + action;
}
aih.service.Requested = function (jsonData) {
    this.Header = new aih.service.RequestHeader();
    this.JSONData = jsonData;
}
aih.service.RequestHeader = function () {
    this.RequestID = '1231';
    this.DateTime = new Date();
    //this.AuthTicket = '';
    //this.AccessKey = null;
    //this.DataAsString = aihk.D;
    //this.RolesAsString = aihk.R;
    this.PartnerCode = "ALLIZHEALTH";
    //this.ApplicationCode = $("#hid_APP").val();
}
aih.service.RequestProcessor = function (service, controller, action, params, callbackParams, callback, failCallback, popup, disableCtrl) {
   debugger;
    this.requested = new aih.service.Requested(escape(JSON.stringify(params)));
    this.params = params;
    this.callbackParams = callbackParams;
    this.isPopup = popup;
    this.callback = callback;
    this.controller = controller;
    this.wsService = service;
    this.action = action;
    this.failCallback = failCallback;
    this.disableControl = disableCtrl;
}
aih.service.RequestProcessor.prototype = {
    constructor: aih.service.RequestProcessor,
    ProcessRequest: function (showSpinner) {
         debugger;   
        try {
            jQuery.support.cors = true;
            this.requested.JSONData = JSON.stringify(this.params);
            var servUrl = aih.getAppSiteUrl(this.wsService, this.controller, this.action);
            var wasPopup = this.isPopup;
            var callback = this.callback;
            var failCallback = this.failCallback;
            var paramsArr = this.params;
            var callbackParamsA = this.callbackParams;
            var ajaxWaitMsg = true;

            if (showSpinner != null) {
                ajaxWaitMsg = showSpinner;
            }
            if (ajaxWaitMsg == true) {
            }
            debugger;      
            var encData = aih.Enc.Encrypt(JSON.stringify(this.requested));
            debugger;         
            $.ajax({
                url: servUrl,
                method: 'POST',
                data: encData,
                success: function (response) {
                   debugger;
                    decryptedResponse = aih.Enc.Decrypt(response);
                    var responseData = JSON.parse(decryptedResponse);
                    responseData = JSON.parse(responseData.JSONData);
                    console.log(decryptedResponse);
                    if (responseData != null) {
                        debugger;
                        callback(callbackParamsA, paramsArr, responseData);   
                    }
                },
                error: function (error) {
                    failCallback(error);
                    console.log(error);
                }
            });
        }
     
        catch (e) {
        }
    }
}
    