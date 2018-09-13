//////////////////////////////////////////////////////////////////////
//// ENABLE/DISABLE LOGGING
//////////////////////////////////////////////////////////////////////
var logger = function () {
    var oldConsoleLog = null;
    var oldConsoleGroup = null;
    var pub = {};

    pub.enableLogger = function enableLogger() {
        //console.info("LOGGING IS ENABLED IN DEVEOPEMENT...")

        if (oldConsoleLog == null) return;

        window['console']['log'] = oldConsoleLog;
        window['console']['group'] = oldConsoleGroup;
    };

    pub.disableLogger = function disableLogger() {
        //console.info("LOGGING IS DISABLED IN PRODUCTION...")

        oldConsoleLog = console.log;
        oldConsoleGroup = console.group;
        window['console']['log'] = function () {};
        window['console']['group'] = function () {};
    };

    return pub;
}();

logger.enableLogger();

// USER OF COMPONENTS
var wcAPP = wcAPP || "NOAPP";

// INITIALIZE ENVIRONMENT
var wcENV = wcENV || "prod"

var wcURL = "http://www.melify.com/tk/lib/components/w";

