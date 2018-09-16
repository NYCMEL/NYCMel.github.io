/**
 * Select Dropdown Component
 * <BR><BR><img src=../img/select.png width=70% style="border:1px lime dashed";>
 * <BR><BR><a href="../html/select.html">DEMO</a>
 */
class Select extends HTMLElement {
    constructor() {
        console.group("Select.constructor")
	
        super();

        console.groupEnd();
    };
    
    /**
     * Set observable values here. When Changed, attributeChangedCallback is invoked
     * @observedAttributes
     */
    static get observedAttributes() {
        console.group("Select.observedAttributes");

	this.observables = ["searchable"];

        console.groupEnd();
        return this.observables;
    };

    /**
     * This function is called when this is attached to DOM
     * @connectedCallback. 
     */
    connectedCallback() {
        console.group("Select.connectedCallback")
	
	let self = this;

	// GET PROPERTIES AND INTERESTING ELEMENTS
	this._initialize();

	let cols = this.properties.columns.split(',');

	let id  = this.id;
	let c1  = "col-md-" + cols[0];
	let c2  = "col-md-" + cols[1];

	let lbl = this.properties.label || "";
	let hlp = this.properties.help  || "";

	// DATA-KEY FOR BINDING
	let dkey = id.replace(/_/g, '').replace(/-/g, '');

	// REPLACE CONTENT IF NECESSARY WITH NEW STUFF
	this.innerHTML = `
		<div class="form-group clearfix">
		    <div class="row">
		        <div class="${c1}">
		            <label id="${this.id}-label" for="${this.id}-label" class="btn-control col-form-label">${lbl}</label>
		        </div>
		        <div class="${c2}">
 		            <select class="form-control ${this.properties.class}" id="${this.id}" data-key="${dkey}">
			    ${this.dom.content}>
			    </select>

			    <span class="glyphicon form-control-feedback" aria-hidden="true"></span>
			    <small id='${this.id}-help' class='help-block with-errors text-muted'>${hlp}</small>
                        </div>
                    </div>
		</div>`

	// TRANSFER ALL ATTRIBUTES NOW (below is an example)
	let widget = this.querySelector("select");
 	for (var key in this.propertiesW) {
	    this.removeAttribute(key);
	    if (key != "class") {
		widget.setAttribute(key, this.properties[key]);
	    }
	}	

	let select = this.querySelector("select");

	if(this.properties.searchable == "true") {
	    var search = 1
	} else {
	    var search = Infinity
	}

	var s2 = $(select).select2({
	    minimumResultsForSearch: search, // HIDE SEARCH
	    placeholder: this.properties.placeholder,
	    theme: "bootstrap"
	});

	// let arrow = this.querySelector(".select2-selection__arrow");

	// // INITIAL ARROW DOWN
	// $(arrow).addClass("arrow-down");

	// $(s2).on('select2:open', function (e) {
	//     $(arrow).removeClass("arrow-down").addClass("arrow-up");
	// });

	// $(s2).on('select2:close', function (e) {
	//     $(arrow).removeClass("arrow-up").addClass("arrow-down");
	// });
	
	// ADD STATS AND OTHER FINAL STUFF
	this._finalize();

	// PUBLISH INTERESTING EVENTS
	this._publish();

	// SHOW IT NOW (NO FLICKERS) 
	this.style.visibility = "visible";

        console.groupEnd();
    };

    /**
     * Publish all events
     * @_publish
     */
    _publish() {
	console.group("Select._publish");

	let widget = this.querySelector("select");
	let id = $(widget).attr("id");

	$("#" + id).on("change", e => {
	    this._change(id)
	});

	// NOT WORKING
	// widget.addEventListener("change", e => {
	//     this._change(id);
	// });

	console.groupEnd();
	return true;
    }

    /**
     * A sample callback usage function - see connectedCallback()
     * @_onChange
     */
    _change(id) {
	console.group("Select._change:", id);

	let val = $("#" + id).val();

	wc.publish(this, "wc-select", {
	    time: new Date().getTime(),
	    action: "change",
	    id: id,
	    val: val,
	    uparam: this.properties.uparam
	});

	console.groupEnd();
    };

    /**
     * Invoked When component is removed. Usually with a .remove() function call
     * @disconnectedCallback
     */
    disconnectedCallback() {
        console.group("Select.disconnectedCallback")

	/* CLEAN UP NOW */

        console.groupEnd();
    };

    /**
     * Called with .setAttribute(...) function call
     * @attributeChangedCallback
     */
    attributeChangedCallback(attr, oldval, newval) {
        console.group("Select.attributeChangedCallback:", attr, oldval, newval);

	this.properties = this.properties || [];

	let obs = Select.observedAttributes;

	for (let i = 0; i < obs.length; i++) {
	    if (newval) {
		this.properties[obs[i]] = newval;
		// YOUR CODE FOR CHANGES GO HERE
	    }
	}
	
	console.log("=====", this.properties);

        console.groupEnd();
    };

    /**
     * Stores DOM elements of interest for future use
     * @_fetchElements
     */
    _fetchElements() {
	console.group("Select._fetchElements");
	
	this.dom = this.dom || [];
	this.dom.content = this.innerHTML;

	console.groupEnd();
    };

    /**
     * Component attributes are _fetched and defaults are set if undefined
     * @_fetchAttributes
     * @param {string} [searchable=false]
     */
    _fetchAttributes() {
	console.group("Select._fetchAttributes");
	
	this.properties = {
	    "cname"	 : "Select",
	    "author"     : "Mel Heravi",
	    "version"    : "1.0",
	    "columns"    : "12,12",
	    "searchable" : "false"
	};
	
	// SAVE WIDGET SPECIFIC PROPERTIES
	this.propertiesW = [];

	// SAVE ALL OTHER PROPERTIES
	let attrs = wc.getAttributes(this)
	
 	for (var key in attrs) {
	    this.properties[key]  = this.getAttribute(key);
	    this.propertiesW[key] = this.getAttribute(key);
	    console.log(key + ": " + attrs[key]);
	}

	this.properties.placeholder = this.properties.placeholder || "";

	console.log("---------", this.properties);

	console.groupEnd();
    };

    /**
     * Destroy the instance object and artifacts
     * @_destroy
     */
    destroy() {
	console.group("Select.destroy:", this.id);

	// FREE POINTER
	delete this;

	// REMOVE ITEM FROM DOM
	this.parentNode.removeChild(this);

	console.groupEnd();
    };

    /**
     * SAVE DATA FOR ANALYTICS
     * @__initialize
     */
    _initialize() {
	console.group("Select._initialize:", this.id);

	// FETCH ALL INTERESTING ELEMENTS
	this._fetchElements();

	// FETCH ALL ATTRIBUTES
	this._fetchAttributes();
	
	console.groupEnd();
    };

    /**
     * SAVE DATA FOR ANALYTICS
     * @__finalize
     */
    _finalize() {
	console.group("Select._finalize:", this.id);

	this.classList.add("wc");

	// ADD ANALYTICS HERE
	wc.setStats(this, this.properties.cname, this.properties.version);
	
	console.groupEnd();
    };

    /**
     * FOR TESTING PURPOSES
     * @test
     */
    static test() {
	console.group("Select.test");

	console.log("testing results will be printed here...");

	console.groupEnd();
	return true;
    }
}

window.customElements.define('wc-select', Select);




