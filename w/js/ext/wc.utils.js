/////////////////////////////////////////////////////////////////////////////////
//// Time-stamp: <2018-05-15 11:46:12 (melify)>
/////////////////////////////////////////////////////////////////////////////////
var menus = {};

/////////////////////////////////////////////////////////////////////////
//// 
/////////////////////////////////////////////////////////////////////////////
menus.init = function(m) {
    console.group("menus.init:", JSON.stringify(m));

    $.each(m, function (i, val) {
	var menuLi
	var parent = $(".menu");
	if (val.parent != 0) {
            parent = menuArr[val.parent];
	}
	menuLi = $('<li>' + val.name + '</li>');
	parent.append(menuLi);
	menuArr[val.id] = menuLi;
    });

    console.groupEnd();
};

/////////////////////////////////////////////////////////////////////////////////
//// 
/////////////////////////////////////////////////////////////////////////////////
var util = {};

/////////////////////////////////////////////////////////////////////////
//// 
/////////////////////////////////////////////////////////////////////////////
util.resize = function(size) {
    console.group("util.resize:", size);

    $("wc-form")
	.removeClass("form-control-lg form-control-md form-control-sm")
	.addClass("form-control-" + size);

    console.groupEnd();
};

/////////////////////////////////////////////////////////////////////////
//// 
/////////////////////////////////////////////////////////////////////////////
util.direction = function(d) {
    console.group("util.direction:", d);

    if (d == "h") {
	$(".h3-direction").html("Horizontal");

	$("form .col-md-4x")
	    .removeClass("col-md-4x col-md-12")
	    .addClass("col-md-4");
	$("form .col-md-8x")
	    .removeClass("col-md-8x col-md-12")
	    .addClass("col-md-8");
    } else {
	$(".h3-direction").html("Vertical");

	$("form .col-md-4")
	    .removeClass("col-md-4")
	    .addClass("col-md-4x col-md-12");
	$("form .col-md-8")
	    .removeClass("col-md-8")
	    .addClass("col-md-8x col-md-12");
    }

    console.groupEnd();
};

//////////////////////////////////////////////////////////////////////
//// CHANGE FORM CLASS
//////////////////////////////////////////////////////////////////////
changeFormClass = function(cls,name) {
    console.group("wcChangeFormClass:", cls, name);

    switch(name) 
    {
	// RESET ERROR - TEXT FOR NOW
	case "default":
	$("wc-form .text").removeClass("error");
	changeFormClass(cls,"lg");
	break;

	// CREATE ERROR SKIN - TEXT FOR NOW
	case "error":
	$("wc-form .text").addClass(name);
	break;

	// FORM CLASS SETTINGS
	case "sm":
	case "md":
	case "lg":
	$("wc-form .btn").removeClass("btn-sm").removeClass("btn-md").removeClass("btn-lg").addClass("btn-" + name);
	$("wc-form .text").removeClass("text-sm").removeClass("text-md").removeClass("text-lg").addClass("text-" + name);
	$("wc-form .textarea").removeClass("textarea-sm").removeClass("textarea-md").removeClass("textarea-lg").addClass("textarea-" + name);
	$("wc-form .dropdown").removeClass("dropdown-sm").removeClass("dropdown-md").removeClass("dropdown-lg").addClass("dropdown-" + name);
	$("wc-form .label").removeClass("label-sm").removeClass("label-md").removeClass("label-lg").addClass("label-" + name);
	$("wc-form .calendar").removeClass("calendar-sm").removeClass("calendar-md").removeClass("calendar-lg").addClass("calendar-" + name);
	break;
    }

    console.groupEnd();
};

setTimeout(function(){
    $(".btn-group.size .btn").on("click", function() {
	$(".btn-group.size .btn").removeClass("active")
	$(this).addClass("active");
    });

    $(".btn-group.direction .btn").on("click", function() {
	$(".btn-group.direction .btn").removeClass("active")
	$(this).addClass("active");
    });
}, 1000);

var winSize = '';
//////////////////////////////////////////////////////////////////////////////
//// MEDIA QUERIES
//////////////////////////////////////////////////////////////////////////////
window.onresize = function () {
    if ($(this).width() >= 1200) {
        newWinSize = 'lg';
    } else if ($(this).width() >= 992) {
        newWinSize = 'md';
    } else if ($(this).width() >= 768) {
        newWinSize = 'sm';
    } else {
        newWinSize = 'xs';
    }

    if( newWinSize != winSize ) {
        winSize = newWinSize;
	console.log("MEDIA CHANGED to: " + winSize);

	wc.publish(this, "wc-window", {
	    time: new Date().getTime(),
	    action: "resize",
	    size: winSize
	});
    }
};
