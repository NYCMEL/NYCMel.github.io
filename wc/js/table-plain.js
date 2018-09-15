/**
 * Table-plain Component<BR>
 * <BR><BR><img src=/tk/lib/components/w/img/table-plain.png width=70% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="/tk/lib/components/w/html/table-plain.html">DEMO</a>
 */
class TablePlain extends HTMLElement {
    constructor() {
        console.group("TablePlain.constructor")
	
        super();

        console.groupEnd();
    };
    
    /**
     * Set observable values here. When Changed, attributeChangedCallback is invoked
     * @observedAttributes
     */
    static get observedAttributes() {
        console.group("TablePlain.observedAttributes");

	this.observables = [];

        console.groupEnd();
        return this.observables;
    };

    /**
     * This function is called when this is attached to DOM
     * @connectedCallback. 
     */
    connectedCallback() {
        console.group("TablePlain.connectedCallback")
	
	// GET PROPERTIES AND INTERESTING ELEMENTS
	this._initialize();

	// REPLACE CONTENT IF NECESSARY WITH NEW STUFF
	this.innerHTML = `
	    <div class="table-responsive">
	    <table class="table" width="100%">
	    <span id="${this.id}-loading" class="wc-loading-img"></span>
	    </table>
            </div>
	`
	
	// ADD STATS AND OTHER FINAL STUFF
	this._finalize();

	// PUBLISH INTERESTING EVENTS
	//this._publish();
	
        console.groupEnd();
    };

    /**
     * @_trasferAttr
     * @param {string} elem1
     * @param {string} elem2
     */
    _trasferAttr(elem1,elem2) {
	console.group("TablePlain._trasferAttr:", elem1, elem2);
	
	// TRANSFER
	$.each($(elem1).prop("attributes"), function() {
	    if (this.name != "id") { // DO NOT COPY ID
		console.log("copied:", this.name, this.value);
		
		$(elem2).attr(this.name, this.value);
	    }
	});
	
	console.groupEnd();
    };

    /**
     * Publish all events
     * @_publish
     */
    _publish() {
	console.group("TablePlain.publish");

	this.addEventListener("click", e => {
	    this._click(this);
	});
	
	console.groupEnd();
	return true;
    }

    /**
     * @_click
     */
    _click() {
	console.group("TablePlain._click:", this.id);

	wc.publish(this, "wc-table-plain", {
	    time: new Date().getTime(),
	    action: "click",
	    id: this.id,
	    uparam: this.properties.uparam
	});

	console.groupEnd();
	return true;
    };

    /**
     * Invoked When component is removed. Usually with a .remove() function call
     * @disconnectedCallback
     */
    disconnectedCallback() {
        console.group("TablePlain.disconnectedCallback")

	/* CLEAN UP NOW */

        console.groupEnd();
	return true;
    };

    /**
     * Called with .setAttribute(...) function call
     * @attributeChangedCallback
     */
    attributeChangedCallback(attr, oldval, newval) {
        console.group("TablePlain.attributeChangedCallback:", attr, oldval, newval);

	this.properties = this.properties || [];

	let obs = TablePlain.observedAttributes;

	for (let i = 0; i < obs.length; i++) {
	    this.properties[obs[i]] = newval;
	}
	
	// YOUR CODE FOR CHANGES GO HERE (MAYBE NULL FIRST TIME THROUGH)
	try {
	    switch(attr) 
	    {
		case "background":
		this.style.background = newval;
		break;
		
		default:
		break;
	    }
	}
	catch(e) {
	    console.warn(e.name + ' > ' + e.message);
	}

        console.groupEnd();
	return true;
    };

    /**
     * Stores DOM elements of interest for future use
     * @_fetchElements
     */
    _fetchElements() {
	console.group("TablePlain._fetchElements");
	
	this.dom = this.dom || [];
	this.dom.content = this.innerHTML;

	console.groupEnd();
	return true;
    };

    /**
     * Component attributes are _fetched and defaults are set if undefined
     * @_fetchAttributes
     * @param {string} [modal=true] mode for our table-plain
     */
    _fetchAttributes() {
	console.group("TablePlain._fetchAttributes");
	
	this.properties = {
	    cname      : "Table-plain",
	    author     : "Mel Heravi",
	    version    : "1.0",
	};
	
	// SAVE WIDGET SPECIFIC PROPERTIES
	this.propertiesW = [];

	// SAVE ALL OTHER PROPERTIES
	let attrs = wc.getAttributes(this)
	
 	for (var key in attrs) {
	    let attr = this.getAttribute(key) || this.properties.key;
	    this.properties[key]  = this.getAttribute(key);
	    this.propertiesW[key] = this.getAttribute(key);
	    console.log(key + ": " + attrs[key]);
	}

	// SET ALL INITIAL ATTRIBUTES
 	for (var key in this.properties) {
	    switch(key) 
	    {
		case "background":
		this.style.background = this.properties.background;
		break;
		
		default:
		break;
	    }
	}

	console.log("ATTRIBUTES: ", this.properties);

	console.groupEnd();
	return true;
    };

    /**
     * Destroy the instance object and artifacts
     * @_destroy
     */
    destroy() {
	console.group("TablePlain.destroy:", this.id);

	// FREE ALL MEMORY
	// you should delete all created objects here

	// FREE POINTER
	delete this;

	// REMOVE ITEM FROM DOM
	this.parentNode.removeChild(this);

	console.groupEnd();
	return true;
    };

    /**
     * configure the instance object and artifacts
     * @_configure
     */
    configure(tdata) {
	console.group("TablePlain.configure");
	
	let table = this.querySelector("table");
	$(table).addClass(tdata.class);

	// ADD TABLE HEADER
	let tstr = "<thead><tr>"
	for (var key in tdata.columns) {
	    let h = tdata.columns[key];

	    tstr += `<th id="${h.id}">${h.title}</th>`
	}
	tstr += "</tr></thead>"

	// ADD BODY HEADER
	tstr += "<tbody>"
	for (var key in tdata.data) {
	    tstr += "<tr>";

	    let r = tdata.data[key];

	    $.each(r, function(i, item) {
		tstr += "<td>" + item + "</td>";
	    });

	    tstr += "</tr>";
	}
	tstr += "</tbody>"

	$(table).append(tstr);
	
	// ASSIGN A CLASS TO EACH COLUMN
	for (let i=1; i < tdata.columns.length + 1; i++) {
	    $(table).find("td:nth-child(" + i + "), th:nth-child(" + i + ")").addClass("wc-table-col-" + i);
	}

	// REMOVE LOADING
	$("#" + this.id + "-loading").remove();

	console.groupEnd();
	return true;
    };

    /**
     * SAVE DATA FOR ANALYTICS
     * @__initialize
     */
    _initialize() {
	console.group("TablePlain._initialize:", this.id);

	// FETCH ALL INTERESTING ELEMENTS
	this._fetchElements(this);

	// FETCH ALL ATTRIBUTES
	this._fetchAttributes(this);
	
	console.groupEnd();
	return true;
    };

    /**
     * SAVE DATA FOR ANALYTICS
     * @__finalize
     */
    _finalize() {
	console.group("TablePlain._finalize:", this.id);

	this.classList.add("wc");

	// ADD ANALYTICS HERE
	wc.setStats(this, this.properties.cname, this.properties.version);
	
	// SHOW IT NOW (NO FLICKERS) 
	this.style.visibility = "visible";

	console.groupEnd();
	return true;
    };
}

window.customElements.define('wc-table-plain', TablePlain);

