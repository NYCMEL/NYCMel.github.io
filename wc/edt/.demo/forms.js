/////////////////////////////////////////////////////////////////////////////////
//// Time-stamp: <2018-04-12 14:46:50 (melify)>
/////////////////////////////////////////////////////////////////////////////////
var form = {};
var test = {};
var update = {};

/////////////////////////////////////////////////////////////////////////
//// 
/////////////////////////////////////////////////////////////////////////////
form.init = function(type, cid, parent=null) {
    console.group("form.init:", cid, parent);

    form.card = `
	<wc-form name="my-form" role="form" id="my-form">
	    <wc-text name="cheader" id="cheader" label="Card Header" placeholder="header..." columns="12,12" value="Card Header"></wc-text>
	    <wc-text name="cfooter" id="cfooter" label="Card Footer" placeholder="footer..." columns="12,12" value="Card Footer"></wc-text>
	    <wc-text name="cimage" id="cimage" label="Card Footer" placeholder="image..."  columns="12,12" value="http://localhost/tk/lib/cids/w/img/tmp/12s.jpg"></wc-text>
	    <wc-textarea name="cbody "id="cbody" label="Card Body" columns="12,12" placeholder="body..." value="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"></wc-textarea>

	    <hr />
	    <div class="form-group">
		<input type="submit" name="action" value="Apply Changes" class="btn btn-outline-primary" id="btn-apply" />
	    </div>
	</wc-form>`;
    
    // USE A COPY OF OUR FORM
    var tmp = form.card;

    $(parent).html(tmp);

    comp = $("#" + cid);

    $("wc-form #cheader").val(comp.find(".card-header").html().trim());
    $("wc-form #cfooter").val(comp.find(".card-footer").html().trim());
    $("wc-form #cbody").val(comp.find(".card-body").html().trim());

    let img = comp.find("img");
    $("wc-form #cimage").val($(img).attr("src"));

    console.groupEnd();
};

/////////////////////////////////////////////////////////////////////////
//// 
/////////////////////////////////////////////////////////////////////////////
test.card = function() {
    form.init("card", "my-card-1", $("#main-container"));
}

/////////////////////////////////////////////////////////////////////////
//// 
/////////////////////////////////////////////////////////////////////////////
update.card = function(cid, values) {
    console.group("update.card", cid);

    for (var i = 0; i < values.length; i++) {
	let name  = values[i].name.trim();
	let value = values[i].value.trim();

	switch(name) 
	{
	    case "cheader":
	    if (value == "") {
		$("#" + cid + " .card-header").hide();
	    } else {
		$("#" + cid + " .card-header").show().html(value);
	    }
	    break;

	    case "cfooter":
	    if (value == "") {
		$("#" + cid + " .card-footer").hide();
	    } else {
		$("#" + cid + " .card-footer").show().html(value);
	    }
	    break;

	    case "cbody":
	    if (value == "") {
		$("#" + cid + " .card-body").hide();
	    } else {
		$("#" + cid + " .card-body").show().html(value);
	    }
	    break;
	    
	    case "cimage":
	    if (value == "") {
		$("#" + cid + " .card-img img").hide();
	    } else {
		$("#" + cid + " .card-img img").show().attr("src", value);
	    }
	    break;
	}
    }	     

    console.groupEnd();
}
