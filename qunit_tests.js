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

var aSBObj = new SBObj("owner-key", 42); //TODO change me: owner key, data id
aSBObj.setOnLoad(aOnLoadFunc);
aSBObj.setOnError(aOnErrorFunc);
aSBObj.setApiBaseUrl("http://localhost:8001"); //TODO change me

asyncTest("PUT", 1, function() {
    aSBObj.PUT("test text data to store");
});

asyncTest("GET", 2, function() {
    aSBObj.GET();
});

asyncTest("DELETE", 3, function() {
    aSBObj.DELETE();
});
