/**
 * Table component<BR>
 * <BR><BR><img src=../img/table.png width=80%>
 * <BR><BR><a href="../html/table.html">DEMO</a>
 */
class Table extends HTMLElement {
    constructor() {
        console.group("Table.constructor")
	
        super();

        console.groupEnd();
    };
    
    /**
     * Set observable values here. When Changed, attributeChangedCallback is invoked
     * @observedAttributes
     */
    static get observedAttributes() {
        console.group("Table.observedAttributes");

	this.observables = ["datatable", "json"];

        console.groupEnd();
        return this.observables;
    };

    /**
     * This function is called when this is attached to DOM
     * @connectedCallback. 
     */
    connectedCallback() {
        console.group("Table.connectedCallback")
	
	let self = this;

	// GET PROPERTIES AND INTERESTING ELEMENTS
	this._initialize();

	this.addEventListener("click", function() {
	    self._onClick();
	});

	let cls = this.getAttribute("class");

	// FOR JSON TABLE ONLY
	if (this.properties.json) {
	    this.innerHTML = `<table class="${cls}" id="my-table-table" style="border:1px #cecece solid">${this.innerHTML}</table>`
	}

	let params = JSON.parse(this.properties.datatable);

	let table  = this.querySelector("table");

	if (!params.sort) {
	    params.sort = {column:1, direction:"desc"}
	}

	if (this.properties.json) {
	    // LOAD FROM JSON FILE
	    $.getJSON(this.properties.json, function(values) {
		console.log("SUCCESS", values);

		$(table).addClass(values.class);

		if (params.height) {
		    $(table).DataTable( {
			"data":			values.data,
			"columns" :		values.columns,
			"bLengthChange":	params.length,
			"bScrollAutoCss":	false,
			"scrollY":		params.height,
			"scrollCollapse":	true,
			"paging":		false,
			"bInfo":		params.info,
			"bFilter":		params.search,
			"paging":		params.pagination,
			"aaSorting":		[[params.sort.column, params.sort.direction]]
		    });
		} else {
		    $(table).DataTable({
			"data":			values.data,
			"columns" :		values.columns,
			"bLengthChange":	params.length,
			"bProcessing":		true,
			"bInfo":		params.info,
			"bFilter":		params.search,
			"paging":		params.pagination,
			"aaSorting":		[[params.sort.column, params.sort.direction]]
		    });
		}
	    });
	} else {
	    // NORMAL DATA TABLE
	    if (params.height) {
		$(table).DataTable({
		    "bScrollAutoCss":		false,
		    "scrollY":			params.height,
		    "scrollCollapse":		true,
		    "paging":			false,
		    "bInfo":			params.info,
		    "paging":			params.pagination,
		    "aaSorting":		[[params.sort.column, params.sort.direction]]
		});
	    } else {
		$(table).DataTable({
		    "bLengthChange":		params.length,
		    "bProcessing":		true,
		    "bInfo":			params.info,
		    "bFilter":			params.search,
		    "paging":			params.pagination,
		    "aaSorting":		[[params.sort.column, params.sort.direction]]
		});
	    }
	} 
	
	if (this.properties.datatable == "{}") {
	    setTimeout(function(){
		var table = $('#my-table-table').DataTable();
		table.destroy();
	    }, 50);
	}

	// ADD STATS AND OTHER FINAL STUFF
	this._finalize();

	// SHOW IT NOW (NO FLICKERS) 
	this.style.visibility = "visible";

        console.groupEnd();
    };

    /**
     * Invoked When component is removed. Usually with a .remove() function call
     * @disconnectedCallback
     */
    disconnectedCallback() {
        console.group("Table.disconnectedCallback")

	/* CLEAN UP NOW */

        console.groupEnd();
    };

    /**
     * Called with .setAttribute(...) function call
     * @attributeChangedCallback
     */
    attributeChangedCallback(attr, oldval, newval) {
        console.group("Table.attributeChangedCallback:", attr, oldval, newval);

	this.properties = this.properties || [];

	let obs = Table.observedAttributes;

	for (let i = 0; i < obs.length; i++) {
	    this.properties[obs[i]] = newval;
	    // YOUR CODE FOR CHANGES GO HERE 
	}
	
        console.groupEnd();
    };

    /**
     * Stores DOM elements of interest for future use
     * @_fetchElements
     */
    _fetchElements() {
	console.group("Table._fetchElements");
	
	this.dom = this.dom || [];
	this.dom.content = this.innerHTML;

	console.groupEnd();
    };

    /**
     * Component attributes are _fetched and defaults are set if undefined
     * @_fetchAttributes
     * @param {string} [datatable="{}"] datatable attributes
     */
    _fetchAttributes() {
	console.group("Table._fetchAttributes");
	
	this.properties = {
	    "cname"	: "Table",
	    "author"    : "Mel Heravi",
	    "version"   : "1.0",
	    "datatable" : "{}",
	    "json"	: null
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

	console.log("attributes: ", this.properties);

	// PROCESS ALL PROPERTIES (example below);
	// this.style.background = this.properties.background;

	console.groupEnd();
    };

    /**
     * A sample callback usage function - see connectedCallback()
     * @_onClick
     */
    _onClick() {
	console.group("Table._onClick:", this.id);

	wc.publish(this, "wc-table", {
	    action: "click",
	    id: this.id,
	    uparam: this.properties.uparam
	});

	console.groupEnd();
    };

    /**
     * Destroy the instance object and artifacts
     * @_destroy
     */
    destroy() {
	console.group("Table.destroy:", this.id);

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
	console.group("Table._initialize:", this.id);

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
	console.group("Table._finalize:", this.id);

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
	console.group("Table.test");

	console.log("testing results will be printed here...");

	console.groupEnd();
	return true;
    }
}

window.customElements.define('wc-table', Table);



