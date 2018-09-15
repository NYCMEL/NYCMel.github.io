/////////////////////////////////////////////////////////////////////////////////
//// Time-stamp: <2018-04-07 19:01:54 (melify)>
/////////////////////////////////////////////////////////////////////////////////
var builder = {};
var gridster;

/////////////////////////////////////////////////////////////////////////
//// 
/////////////////////////////////////////////////////////////////////////////
builder.init = function(options) {
    console.group("builder.init");

    // INITIALIZE OUR GRID
    gridster = $(".gridster ul").gridster({
	widget_base_dimensions: [100, 100],
	widget_margins: [12, 12],
	helper: 'clone',
	shift_widgets_up: false,
	shift_larger_widgets_down: false,
	animate: true,
	collision: {
            wait_for_mouseup: true
	},
	resize: {
            enabled: true
	}
    }).data('gridster');

    // ADD A NEW WIDGET
    $("#add-one").on("click", function() {
	builder.add();
    });

    // ADD A NEW WIDGET
    $("#save-one").on("click", function() {
	builder.save();
    });

    // CREATE THE FIRST CONTAINER
    builder.add();

    $("#panel-left .list-group-item").on("click", function() {
	let active = $(".gs-w.active").attr("id");
	let comp = $(this).attr("comp");
	
	$("#" + active + " .content").load(tk.siteurl + "?ajax=1&callback=builder::dummy&comp=" + comp, function() {
	    //$("#" + active).css("height","auto").css("width","auto")
	});
    });

    console.groupEnd();
};

/////////////////////////////////////////////////////////////////////////
//// 
/////////////////////////////////////////////////////////////////////////////
builder.add = function() {
    console.group("builder.add");

    let id = $.now();

    gridster.add_widget('<li class="just-added" id="gs-' + id + '">' + "<div class=content><div style=text-align:center>gs-" + id + '</div></div></li>', 3, 1);
    
    builder.toolbar();

    setTimeout(function(){
	$("#gs-" + id).removeClass("just-added");
    }, 1000);

    $("#gs-" + id).on("click", function(e) {
	$(".gs-w").removeClass("active");
	$(this).addClass("active");

	// SHOW TOOLBAR ON CLICK
	$(this).find(".toolbar").show();

	// ADD HOVER TO ON/OFF TOOLBAR
	$(".gs-w.active").mouseover(function(e) {
	    $(this).find(".toolbar").show();
	}).mouseout(function(e) {
	    $(this).find(".toolbar").hide();
	});
    });

    $("#gs-" + id + " span.btn-add").on("click", function(e) {
	$(this).css("color","yellow");
	$("#panel-left").toggle();
	console.log("add...add...add...");
    });
    
    $("#gs-" + id + " span.btn-cog").on("click", function(e) {
	$(this).css("color","yellow");
	$("#panel-right").toggle();
	console.log("add...add...add...");
    });
    
    $("#gs-" + id + " span.btn-del").on("click", function(e) {
	let id = $(this).closest(".gs-w").attr("id")
	gridster.remove_widget($("#" + id));
	console.log("del...del...del...");
    });
    
    $("#panel-left, #panel-right").on("click", function(e) {
	$(this).hide();
    });

    console.groupEnd();
};

/////////////////////////////////////////////////////////////////////////
//// 
/////////////////////////////////////////////////////////////////////////////
builder.toolbar = function() {
    console.group("builder.toolbar");
    
    $(".gs-w").each(function() {
	let div = "<div class='toolbar'><span class='btn-add'></span><span class='btn-del'></span><span class='btn-cog'></div>";
	
	if ($(this).find(".toolbar").length == 0) {
	    $(this).append(div);
	}
    });

    console.groupEnd();
};

/////////////////////////////////////////////////////////////////////////
//// /GitHub/gridster-bootstrap/demo/index.html
/////////////////////////////////////////////////////////////////////////////
builder.save = function() {
    console.group("builder.save");
    
    var s = gridster.serialize();
    $('#builder-log').val(JSON.stringify(s));

    var b = new bsgridster(s, 50, 'graybox');
    var v = b.getHtml();

    $('#builder-grids').html(v);
    $('#builder-bs-log').val(v.innerHTML);
    $("#builder-saved").show(0)

    $('html, body').animate({
        scrollTop: parseInt($('#builder-saved').offset().top)
    }, 500);
}
