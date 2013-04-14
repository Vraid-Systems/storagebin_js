/**
 * JavaScript Object library for asynchronously interacting with a storagebin
 * service using Cross-Origin Resource Sharing. NO jQuery needed.
 *
 * CORS browser support minimums: Gecko 1.9.1 (Firefox 3.5, SeaMonkey 2.0),
 * Safari 4, Google Chrome 3, MSHTML/Trident 4.0 (Internet Explorer 8) via
 * XDomainRequest, Opera 12.00, Opera Mobile 12
 * http://en.wikipedia.org/wiki/Cross-origin_resource_sharing#Browser_support
 *
 * `getDefault` method body taken from http://stackoverflow.com/a/894877
 */
function SBObj(theOwnerKey, theDataId) {
    var private_OwnerKey =  this.getDefault(theOwnerKey, false);
    var private_DataId = this.getDefault(theDataId, false);
    var private_OnLoad = function () {};
    var private_OnError = function () {};

    this.setOnLoad = function (theOnLoadFunc) {
        private_OnLoad = theOnLoadFunc;
    };

    this.setOnError = function (theOnErrorFunc) {
        private_OnError = theOnErrorFunc;
    };

    /**
     * create a CORS request object
     *
     * @param method String - GET or POST
     * @param url String
     * @returns {XMLHttpRequest}
     */
    function private_CreateRequest(method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
            xhr.open(method, url, true);
        } else if (typeof XDomainRequest != "undefined") {
            xhr = new XDomainRequest();
            xhr.open(method, url);
        } else {
            xhr = null;
        }
        return xhr;
    }

    function private_CreateRequestUrl() {
        var aRetEventUrl = SBObj.API_BASE_URL + SBObj.DATA_BASE_URL;

        if (private_OwnerKey) {
            aRetEventUrl += "/" + private_OwnerKey;
        }

        if (private_DataId) {
            aRetEventUrl += "/" + private_DataId;
        }

        if (aRetEventUrl.indexOf("?") == -1) {
            // no "?" in URL yet
            aRetEventUrl += "?user_agent" + SBObj.USER_AGENT;
        } else {
            aRetEventUrl += "&user_agent=" + SBObj.USER_AGENT;
        }

        return aRetEventUrl;
    }

    function private_SendDataObj(theMethod, theDataObj) {
        if (theMethod && theDataObj && theDataObj.type && theDataObj.content) {
            var aRequest = private_CreateRequest(theMethod, private_CreateRequestUrl());

            if (aRequest) {
                aRequest.setRequestHeader("Content-Type", theDataObj.type);

                aRequest.onload = private_OnLoad;
                aRequest.onerror = private_OnError;

                aRequest.send(theDataObj.content);
            }
        }
    }

    this.DELETE = function () {
        var aDataObj = {"type": "application/json", "content": "{}"};
        //no content needed
        private_SendDataObj("DELETE", aDataObj);
    };

    this.GET = function () {
        var aDataObj = {"type": "application/json", "content": "{}"};
        //no content needed
        private_SendDataObj("GET", aDataObj);
    };

    this.PUT = function (theBlob) {
        var aFormData = new FormData();
        aFormData.append("file", theBlob);
        var aDataObj = {"type": "multipart/form-data", "content": aFormData};

        private_SendDataObj("POST", aDataObj);
    };
}

SBObj.getDefault = function (arg, val) {
    return typeof arg !== 'undefined' ? arg : val;
};

SBObj.API_BASE_URL = "https://storagebin.appspot.com";
SBObj.DATA_BASE_URL = "/data";
SBObj.USER_AGENT = "SB/js_1.0";
