/////////////////////////////////////////////////////////////////////////////////
//// Time-stamp: <2018-04-14 12:59:10 (melify)>
/////////////////////////////////////////////////////////////////////////////////
function tkInit(options) {
    console.group("tkInit");

    tkModel = {};

    // BIND VARIABLE TO HANDLER
    $("[data-key]").each(function() {
        tkBind($(this).attr("id"), tkBinder);
    });

    console.groupEnd();
};

////////////////////////////////////////////////////////////////////////////////////
//// DATA BINDING FUNCTION
////////////////////////////////////////////////////////////////////////////////////
function tkBind(id, callback) {
    console.group("tkBind", id);
    
    var watchable = DataBind.bind($('#' + id), tkModel);
    
    watchable.watch(callback);
    
    console.groupEnd();
};

////////////////////////////////////////////////////////////////////////////////////
//// DATA BINDING FUNCTION
////////////////////////////////////////////////////////////////////////////////////
function tkBinder(ev) {
    console.group("tkBinder");
    
    console.log(this.id, ev.type, ev.data.newValue);
    
    let type = $("#" + this.id).prop('nodeName');

    // CUSTOM CHANGE HANDLING EXAMPLE
    switch(type)
    {
        case "SELECT":
        console.log(">>>>>>>>", type, "#" + this.id);
        $("#" + this.id).val(ev.data.newValue).change();
        break;
    }
    
    console.groupEnd();
}

////////////////////////////////////////////////////////////////////////////////
////
////////////////////////////////////////////////////////////////////////////////
function tkFormInit(container, template) {
    console.group("tkFormInit");
    
    tkFormOut = `<wc-form name="my-form" role="form" id="my-form" size="form-control-md" style="border:1px #CECECE solid;padding:20px">`;
    tkFormOut += `<div class="container">`;
    tkFormOut += `<div class="row">`;
    
    for (var i = 0; i < template.columns.length; i++) {
        let c = template.columns[i];
        
        tkFormOut += `<div class="${c.class}">`;
	
        // COLUMN ITEMS GO HERE
        for (var j = 0; j < c.items.length; j++) {
            let item = c.items[j];
            
            switch(item.comp)
            {
                case "wc-text":
                tkFormText(item);
                break;
		
                case "wc-textarea":
                tkFormTextarea(item);
                break;
		
                case "wc-select":
                tkFormSelect(item);
                break;
		
                case "wc-calendar":
                tkFormCalendar(item);
                break;
		
                default:
                alert("UNIMPLEMENTED: " + item.comp)
                break;
            }
        }
	
        tkFormOut += "</div>";
    }
    
    tkFormOut += "</div>";
    tkFormOut += "</div>";

    // add controls
    tkFormControls(template.controls);

    tkFormOut += "</wc-form></div>";
    
    $("#" + container).html(tkFormOut);
    
    console.groupEnd();
};

/////////////////////////////////////////////////////////////////////////////////
//// Time-stamp: <2018-04-14 12:54:41 (melify)>
/////////////////////////////////////////////////////////////////////////////////
function tkFormControls(template) {
    console.group("tkFormControls:", JSON.stringify(template));
    
    // ADD CONTROLS
    tkFormOut += "<hr/>";
    tkFormOut += "<div class='col-md-12 form-btns'>";


    for (var i = 0; i < template.length; i++) {
	let tmp = template[i];
        console.log(">>>>>>>>", tmp);

	switch(tmp.type) 
	{
	    case "submit":
	    tkFormOut += `<input type='submit' value='${tmp.label}' class='btn btn-outline-primary'>&nbsp;&nbsp;`
	    break;

	    case "button":
	    tkFormOut += `<input type='button' value='${tmp.label}' class='btn btn-outline-secondary'>`
	    break;
	}
    }

    tkFormOut += "</div>";

    console.groupEnd();
};

////////////////////////////////////////////////////////////////////////////////
////
////////////////////////////////////////////////////////////////////////////////
function tkFormText(item) {
    console.group("tkFormText:", JSON.stringify(item));
    
    var defaults = {
        help         : "",
        error        : "",
        required     : "",
        autocomplete : "off",
        value        : "",
        columns      : "4,8",
        datakey      : "",
    }
    
    let pattern  = typeof item.pattern  === "undefined" ? "" : item.pattern;
    let required = typeof item.required === "undefined" ? "" : item.required;
    let help     = typeof item.help     === "undefined" ? "" : item.help;
    
    item.error        = item.error        || defaults.error;
    item.autocomplete = item.autocomplete || defaults.autocomplete;
    item.value        = item.value        || defaults.value;
    item.columns      = item.columns      || defaults.columns;
    item.datakey      = item.datakey      || defaults.datakey;
    
    tkFormOut += `
    <wc-text
    id="${item.id}"
    name="${item.name}"
    type="${item.type}"
    label="${item.label}"
    columns="${item.columns}"
    placeholder="${item.placeholder}"
    data-error="${item.error}"
    autocomplete="${item.autocomplete}"
    value="${item.value}"
    columns="${item.columns}"
    data-key="${item.datakey}"
    ${required}
    ${pattern}
    ${help}
    ></wc-text>`
    
    console.groupEnd();
};

////////////////////////////////////////////////////////////////////////////////
////
////////////////////////////////////////////////////////////////////////////////
function tkFormTextarea(item) {
    console.group("tkFormTextarea:", JSON.stringify(item));
    
    var defaults = {
        help         : "",
        error        : "",
        required     : "",
        autocomplete : "off",
        value        : "",
        rows         : "3",
        datakey      : "",
        columns      : "4,8",
    }
    
    let pattern  = typeof item.pattern  === "undefined" ? "" : item.pattern;
    let required = typeof item.required === "undefined" ? "" : item.required;
    let help     = typeof item.help     === "undefined" ? "" : item.help;
    
    item.error        = item.error        || defaults.error;
    item.required     = item.required     || defaults.required;
    item.autocomplete = item.autocomplete || defaults.autocomplete;
    item.pattern      = item.pattern      || defaults.pattern;
    item.value        = item.value        || defaults.value;
    item.rows         = item.rows         || defaults.rows;
    item.datakey      = item.datakey      || defaults.datakey;
    item.columns      = item.columns      || defaults.columns;
    
    tkFormOut += `
	<wc-textarea
        id="${item.id}"
        name="${item.name}"
        type="${item.type}"
        label="${item.label}"
        placeholder="${item.placeholder}"
        data-error="${item.error}"
        autocomplete="${item.autocomplete}"
        value="${item.value}"
        rows="${item.rows}"
        data-key="${item.datakey}"
        ${required}
        ${pattern}
        columns="${item.columns}"
        ${help}></wc-textarea>`
    
    console.groupEnd();
};

////////////////////////////////////////////////////////////////////////////////
////
////////////////////////////////////////////////////////////////////////////////
function tkFormSelect(item) {
    console.group("tkFormSelect:", JSON.stringify(item));
    
    var defaults = {
        help         : "",
        error        : "",
        required     : "",
        value        : "",
        searchable   : false,
        datakey      : "",
        columns      : "4,8",
    }
    
    let pattern  = typeof item.pattern  === "undefined" ? "" : item.pattern;
    let required = typeof item.required === "undefined" ? "" : item.required;
    let help     = typeof item.help     === "undefined" ? "" : item.help;
    
    item.error        = item.error        || defaults.error;
    item.required     = item.required     || defaults.required;
    item.value        = item.value        || defaults.value;
    item.searchable   = item.searchable   || defaults.searchable;
    item.datakey      = item.datakey      || defaults.datakey;
    item.columns      = item.columns      || defaults.columns;
    
    let tstr = "";
    for (var i = 0; i < item.options.length; i++) {
        let option = item.options[i];
	
        tstr += `<option value="${option.value}">${option.name}</option>`
    }
    
    tkFormOut += `
    <wc-select
    id="${item.id}"
    name="${item.name}"
    label="${item.label}"
    columns="${item.columns}"
    data-error="${item.error}"
    value="${item.value}"
    searchable="${item.searchable}"
    data-key="${item.datakey}"
    ${required}
    ${help}>${tstr}</wc-select>`
    
    console.groupEnd();
};

////////////////////////////////////////////////////////////////////////////////
////
////////////////////////////////////////////////////////////////////////////////
function tkFormCalendar(item) {
    console.group("tkFormCalendar:", JSON.stringify(item));
    
    var defaults = {
        help         : "",
        error        : "",
        required     : "",
        value        : "",
        searchable   : false,
        datakey      : "",
        columns      : "4,8",
    }
    
    let pattern  = typeof item.pattern  === "undefined" ? "" : item.pattern;
    let required = typeof item.required === "undefined" ? "" : item.required;
    let help     = typeof item.help     === "undefined" ? "" : item.help;
    
    item.error        = item.error        || defaults.error;
    item.required     = item.required     || defaults.required;
    item.value        = item.value        || defaults.value;
    item.searchable   = item.searchable   || defaults.searchable;
    item.datakey      = item.datakey      || defaults.datakey;
    item.columns      = item.columns      || defaults.columns;
    
    tkFormOut += `
    <wc-calendar
    id="${item.id}"
    name="${item.name}"
    label="${item.label}"
    columns="${item.columns}"
    data-error="${item.error}"
    value="${item.value}"
    data-key="${item.datakey}"
    ${required}
    ${help}></wc-calendar>`
    
    console.groupEnd();
};

