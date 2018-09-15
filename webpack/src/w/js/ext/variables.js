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
var wcENV = wcENV || "prod"
var wcURL = "http://www.melify.com/tk/lib/components/w";

if (wcENV === "dev") {
    $(window).keydown(function(e) {
	if (e.which == 17) { // ctrl
	    ctrlPressed = true;
	    $(".wc").addClass("ctrl-outline");

	    $(".wc").each(function() {
		let id = $(this).attr("id");
		
		$(this).css("position","relative").append("<div class='btn btn-sm btn-danger showoff shadow' style=position:absolute;top:0;left:0;>" + id + "</div>");
	    });
	}
    }).keyup(function(e) {
	if (e.which == 17) { // ctrl
	    ctrlPressed = false;
	    $(".wc").removeClass("ctrl-outline");
	    $(".showoff").remove();
	}
    });

    logger.enableLogger();
} else {
    logger.disableLogger();
}

