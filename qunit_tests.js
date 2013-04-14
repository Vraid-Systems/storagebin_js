var aOnLoadFunc = function(e){
    if (e.target && e.target.response) {
        var aResp = e.target.response;
        ok(aResp, aResp);
    } else {
        ok(false, "malformed response");
    }
    start();
};
var aOnErrorFunc = function(e){
    var errorMsg = "data may have failed to reach server or failed validation";
    if (e.target && e.target.response) {
        errorMsg = e.target.response;
    }
    ok(false, errorMsg);
    start();
};

asyncTest("PUT", 1, function() {
    var aSBObj = new SBObj(0, 0);
    aSBObj.setOnLoad(aOnLoadFunc);
    aSBObj.setOnError(aOnErrorFunc);

    aSBObj.PUT(); //TODO read Blob from FS <---
});

String.prototype.contains = function (theOtherString) {
    return (this.indexOf(theOtherString) !== -1);
};
