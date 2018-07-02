
import $ from 'jquery';
import aih from './aes';
aih.SessionID = null;
aih.Key = null;

var xhrPool = [];
var AjaxWaitMessage = false;
aih.onAjaxReady = function () {
    debugger
    //aih.SessionID = aih.cookie.get(aih.KEY_SESSION);
    //aih.Key = aih.cookie.get('eKey');

    //********** Working Ajax Beforesend ********//
    $.ajaxSetup({
        processData: false,
        beforeSend: function (xhr, settings) {
            debugger
           // jQuery.support.cors = true;
            //xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            if ((settings.toNotEncrypt == null) || (settings.toNotEncrypt == false)) {
                //settings.type = "POST";
                if (settings.data != null) {

                    if (settings.isApiCall == null || settings.isApiCall == undefined || settings.isApicall == false) {
                        //settings.type = "GET";
                        if (typeof (settings.data) != "string") {
                            var str = "";
                            for (var val in settings.data) {
                                //                            settings.data[val] = $.base64.encode(settings.data[val]);
                                //str += val + "=" + $.base64.encode(settings.data[val]) + "&";
                                str += val + "=" + aih.Enc.Encrypt(settings.data[val]) + "&";
                            }

                            //  if (settings.url.indexOf("?") > 0)
                            //  {
                            //      settings.url = settings.url + "&" + str;
                            //   }
                            //   else
                            //   {
                            //       settings.url = settings.url + "?" + str;
                            //   }

                            settings.data = str;
                        }
                    }
                    else {
                        //settings.data = $.base64.encode(settings.data);
                        settings.data = aih.Enc.Encrypt(settings.data);
                    }
                }
                settings.processData = true;
            }
            settings.processData = true;
        }

    });
    $(document).ajaxSend(function (e, xhr, settings) {

        xhrPool.push(xhr);

        //var height = 1000;
        //        //var width = 1420;

        if ((settings.ajaxWaitMsg == true) || (AjaxWaitMessage == true)) {
            //$('#ajax-spinner').css('height', height);
            // $('#ajax-spinner').css('width', width);
            $('#ajax-spinner').fadeIn('slow');

            if (settings.disableBtn != 'undefined') {
                var btn = settings.disableBtn;
                $(btn).attr('disabled', 'disabled');
            }
        }
    });

    $(document).ajaxComplete(function (e, xhr, settings) {
        xhrPool = $.grep(xhrPool, function (x) { return x != xhr });

        if (xhrPool.length <= 0) {

        }

        if (settings.disableBtn != 'undefined') {
            var btn = settings.disableBtn;
            $(btn).removeAttr("disabled");
        }

    });

    $(document).ajaxStop(function () {
        $('#ajax-spinner').fadeOut('slow');
        AjaxWaitMessage = false;
    });

    aih.ajax = function (request, options, callback, failure) {

        var defaults = {              //set the defaults
            success: function (data) {  //hijack the success handler
                callback(data);   //if pass, call the callback
            },
            failure: function (data) {  //hijack the success handler
                callback(data);   //if pass, call the callback
            },
            beforeSend: function (xhr) {
                // xhr.setRequestHeader("EncKey", $('.labelEnKey').val());
                // xhr.setRequestHeader("SessionID", $('.labelEnKey').val());
                //xhr.setRequestHeader("RequestType", $.base64.encode(request));
                xhr.setRequestHeader("RequestType", aih.Enc.Encrypt(request));
            }
        };
        $.extend(options, defaults);  //merge passed options to defaults
        return $.ajax(options);             //send request
    }



}



aih.ajax = function (request, options) {

    var defaults = {              //set the defaults
        beforeSend: function (xhr) {

            // xhr.setRequestHeader("EncKey", $('.labelEnKey').val());
            // xhr.setRequestHeader("SessionID", $('.labelEnKey').val());
            xhr.setRequestHeader("RequestType", request);

        }
    };
    $.extend(options, defaults);  //merge passed options to defaults
    return $.ajax(options);             //send request
}