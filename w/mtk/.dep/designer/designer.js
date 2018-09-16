/////////////////////////////////////////////////////////////////////////////////////////
//// Time-stamp: <2018-04-08 19:39:11 (melify)>
/////////////////////////////////////////////////////////////////////////////////////////
var designer = {};

/////////////////////////////////////////////////////////////////////////////////
//// 
/////////////////////////////////////////////////////////////////////////////////
designer.init = function(options) {
    console.group("designer.init");

    $(".designer .container, .designer .container-fluid").each(function() {
	let inner ="<div class='designer-toolbar-inner'>" +
	    "<i class='fa fa-trash'></i>" +
	    "<i class='fa fa-cog'></i>" +
	    "<span class=pull-right>CONTAINER</span></div>"

	$(this).prepend("<div class='designer-toolbar designer-container'>" + inner + "</div>");
    });

    $(".designer .row").each(function() {
	let inner ="<div class='designer-toolbar-inner'>" +
	    "<i class='fa fa-trash'></i>" +
	    "<i class='fa fa-cog'></i>" +
	    "<img src='/Melify/mtk/dev/tk/lib/components/w/mtk/img/designer/icons8-insert-row-50.png' />" +
	    "<img src='/Melify/mtk/dev/tk/lib/components/w/mtk/img/designer/icons8-insert-row-above-50.png' />" +
	    "<span class=pull-right>ROW</span></div>"

	$(this).prepend("<div class='designer-toolbar designer-row'>" + inner + "</div>");
    });

    $(".designer [class*='col-']").each(function() {
	let inner ="<div class='designer-toolbar-inner'>" +
	    "<i class='fa fa-trash'></i>" +
	    "<i class='fa fa-cog'></i>" +
	    "<i class='fa fa-plus-circle'></i>" +
	    "<img src='/Melify/mtk/dev/tk/lib/components/w/mtk/img/designer/icons8-insert-column-left-50.png' />" +
	    "<img src='/Melify/mtk/dev/tk/lib/components/w/mtk/img/designer/icons8-insert-column-right-50.png' />" +
	    "<span class=pull-right>COLUMN</span></div>"
	
	$(this).prepend("<div class='designer-toolbar designer-col'>" + inner + "</div>");

	// COVER THIS DIV
	$("<div class='designer-cover'/>").css({
	    position: "absolute",
	    width: "100%",
	    height: "100%",
	    left: 0,
	    top: 0,
	    background:"steel blue",
	    opacity:0.1,
	    zIndex: 1000000,  // to be on the safe side
	    border: "1px orange solid",
	}).appendTo($(this).css("position", "relative"));
    });

    $(".designer [class*='col-'] .designer-toolbar, .designer .row .designer-toolbar, .designer .container .designer-toolbar, .designer .container-fluid .designer-toolbar")
	.mouseenter(function(event) {
	    $(this).find(".designer-toolbar-inner").show();
	})
	.mouseleave(function() {
	    $(".designer-toolbar-inner").hide();
	});

    $(".designer [class*='col-']")
	.mouseenter(function(event) {
	    $(this).find(".designer-toolbar-inner").show();
	})
	.mouseleave(function() {
	    $(".designer-toolbar-inner").hide();
	});

    //designer.shuffle(".row");

    console.groupEnd();
};

/////////////////////////////////////////////////////////////////////////////////
//// 
/////////////////////////////////////////////////////////////////////////////////
designer.toggle = function() {
    console.group("designer.toggle");

    if ($("body").hasClass("designer")) {
	$("body").removeClass("designer");
	$(".designer-toolbar, .designer-cover").remove();

	$(".gridstrap").unbind(".gridstrap");
    } else {
	$("body").addClass("designer");
	designer.init();
    }

    console.groupEnd();
};

/////////////////////////////////////////////////////////////////////////////////
//// 
/////////////////////////////////////////////////////////////////////////////////
designer.shuffle = function(what) {
    console.group("designer.shuffle:", what);
    
    $(what).addClass("gridstrap");

    $(".gridstrap").gridstrap();

    console.groupEnd();
};

if (0) {
    jQuery(document).ready(function() {
	designer.toggle();
    });
}
