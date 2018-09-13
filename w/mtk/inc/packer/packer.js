/////////////////////////////////////////////////////////////////////////////////
//// Time-stamp: <2018-07-04 09:41:03 (melify)>
/////////////////////////////////////////////////////////////////////////////////
var packer = {};

/////////////////////////////////////////////////////////////////////////////////
//// 
////////////////////////////////////////////////////////////////////////////////
packer.init = function(options) {
    console.group("packer.init");

    $("[aria-pressed]").on("click", function() {
	$("pre").empty();

	let pressed = $(this).attr("aria-pressed");

	if (pressed == "true") {
	    $(this).attr("aria-pressed", "false");
	} else {
	    $(this).attr("aria-pressed", "true");
	}

	$("#container-pack, #container-result, #container-includes, #btn-show, #container-results").hide();

	packer.check();
    });
    
    $("#btn-validate").on("click", function() {
	packer.process();
	
	$("#btn-pack, #container-pack, #container-result, #container-includes").show();
    });   

    $("#btn-pack").on("click", function() {
	let str = "";
	$("[aria-pressed=true]").each(function() {
	    str += $(this).attr("id") + " ";
	});

	$("#container-pack, #container-result, #container-includes").show();

	$("#container-results .col-md-12").load(tk.siteurl + "?ajax=1&callback=packer::process&comps=" + escape(str), function() {
	    $("#container-results").show();
	});
    });

    $("#btn-toggleall").on("click", function() {
	if ($("[aria-pressed=true]").length) {
	    $("[aria-pressed]").attr("aria-pressed", "false");
	} else {
	    $("[aria-pressed]").attr("aria-pressed", "true");
	}

	packer.check();
    });

    console.groupEnd();
};

/////////////////////////////////////////////////////////////////////////////////
//// 
////////////////////////////////////////////////////////////////////////////////
packer.process = function(options) {
    console.group("packer.process");

    let str = "";
    
    $("[aria-pressed=true]").each(function() {
	str += $(this).attr("id") + " ";
    });
    
    $("#container-includes .col-md-12").load(tk.siteurl + "?ajax=1&callback=packer::includes&comps=" + escape(str), function() {
	$('li:contains("./w")').remove();
	$('li:contains("css")').remove();
    });

    console.groupEnd();
}

/////////////////////////////////////////////////////////////////////////////////
//// 
////////////////////////////////////////////////////////////////////////////////
packer.check = function(options) {
    console.group("packer.check");
    
    if ($("[aria-pressed=true]").length) {
	$("#container-validate").show();
    } else {
	$("#container-validate, #btn-show, #container-results, #btn-pack, #container-includes").hide();
	$("pre").empty();
    }
    
    console.groupEnd();
}
