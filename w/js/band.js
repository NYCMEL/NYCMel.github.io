/**
 * band Component<BR>
 * <BR><BR><img src=/tk/lib/components/w/img/band.png width=60% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="/tk/lib/components/w/html/band.html">DEMO</a>
 */
class Band extends HTMLElement {
    constructor() {
        console.group("Band.constructor")
	
        super();

        console.groupEnd();
    };
    
    /**
     * Set observable values here. When Changed, attributeChangedCallback is invoked
     * @observedAttributes
     */
    static get observedAttributes() {
        console.group("Band.observedAttributes");

	this.observables = ["header"];

        console.groupEnd();
        return this.observables;
    };

    /**
     * This function is called when this is attached to DOM
     * @connectedCallback. 
     */
    connectedCallback() {
        console.group("Band.connectedCallback")
	
	let self = this;

	// GET PROPERTIES AND INTERESTING ELEMENTS
	this._initialize();

	// REPLACE CONTENT IF NECESSARY WITH NEW STUFF
	this.innerHTML = `
<div class="row">
    <div class="wc-band-lhs">
    </div>
    
    <div class="wc-band-rhs">
    </div>
</div>
`;
	// ADD STATS AND OTHER FINAL STUFF
	this._finalize();

	// PUBLISH INTERESTING EVENTS
	//this._publish();

        console.groupEnd();
    };

    /**
     * Publish all events
     * @_publish
     */
    _publish() {
	console.group("Band.publish");

	this.addEventListener("click", e => {
	    this._click();
	});
	
	console.groupEnd();
    }

    /**
     * A sample callback usage function - see connectedCallback()
     * @_click
     */
    _click() {
	console.group("Band._click:", this.id);

	wc.publish(this, "wc-band", {
	    time: new Date().getTime(),
	    action: "click",
	    id: this.id,
	    uparam: this.properties.uparam
	});

	console.groupEnd();
    };

    /**
     * Invoked When component is removed. Usually with a .remove() function call
     * @disconnectedCallback
     */
    disconnectedCallback() {
        console.group("Band.disconnectedCallback")

	/* CLEAN UP NOW */

        console.groupEnd();
    };

    /**
     * Called with .setAttribute(...) function call
     * @attributeChangedCallback
     */
    attributeChangedCallback(attr, oldval, newval) {
        console.group("Band.attributeChangedCallback:", attr, oldval, newval);

	this.properties = this.properties || [];

	let obs = Band.observedAttributes;

	for (let i = 0; i < obs.length; i++) {
	    if (newval) {
		this.properties[obs[i]] = newval;
	    }
	}
	
	// YOUR CODE FOR CHANGES GO HERE (MAYBE NULL FIRST TIME THROUGH)
	try {
	    switch(attr) 
	    {
		case "background":
		break;
		
		default:
		break;
	    }
	}
	catch(e) {
	    console.warn(e.name + ' > ' + e.message);
	}

        console.groupEnd();
    };

    /**
     * Stores DOM elements of interest for future use
     * @_fetchElements
     */
    _fetchElements() {
	console.group("Band._fetchElements");
	
	this.dom = this.dom || [];
	this.dom.content = this.innerHTML;

	console.groupEnd();
    };

    /**
     * Component attributes are _fetched and defaults are set if undefined
     * @_fetchAttributes
     * @param {string} [modal=true] mode for our band
     */
    _fetchAttributes() {
	console.group("Band._fetchAttributes");
	
	this.properties = {
	    cname      : "band",
	    author     : "Mel Heravi",
	    version    : "1.0",
	    header     : "UNDEFINED HEADER"
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
		break;
		
		case "header":
		let h = document.querySelector("wc-header")
		break;
		
		default:
		break;
	    }
	}

	console.log("ATTRIBUTES: ", this.properties);

	console.groupEnd();
    };

    /**
     * A sample callback usage function - see connectedCallback()
     * @_onClick
     */
    _onClick() {
	console.group("Band._onClick:", this.id);

	wc.publish(this, "wc-band", {
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
	console.group("Band.destroy:", this.id);

	// FREE ALL MEMORY
	// you should delete all created objects here

	// FREE POINTER
	delete this;

	// REMOVE ITEM FROM DOM
	this.parentNode.removeChild(this);

	console.groupEnd();
    };

    /**
     * configure the instance object and artifacts
     * @_configure
     */
    configure(band) {
	console.group("Band.configure");
	
	this._lhs("lhs", band.lhs);
	this._rhs("rhs", band.rhs);

	console.groupEnd();
    };

    /**
     * @__lhs
     */
    _lhs(side, band) {
	console.group("Band._lhs:", side, band);

	// CALL FUNC BASED ON CATEGORY
	eval("this._" + band.category + "(side, band)");

	console.groupEnd();
    };

    /**
     * @__table
     */
    _table(side, band) {
	console.group("Band._table:", side, band);

	let con = "#" + this.id + " .wc-band-" + side;

	$(con).empty();

	$(con).addClass(band.width).append("<wc-table-plain></wc-table-plain>");

	setTimeout(e => {
	    let tbl = this.querySelector("wc-table-plain");
	    tbl.configure(band);
	}, 200);

	console.groupEnd();
    };

    /**
     * 
     * @__lhs
     */
    _rhs(side, band) {
	console.group("Band._rhs", side, band);

	// CALL FUNC BASED ON CATEGORY
	eval("this._" + band.category + "(side, band)");

	console.groupEnd();
    };

    /**
     * 
     * @__lhs
     */
    _chart(side, band) {
	console.group("Band._chart:", side, band);

	let con = "#" + this.id + " .wc-band-" + side;

	$(con).empty();

	$(con)
	    .addClass(band.width)
	    .append(`<wc-chart id="${this.id}-${side}"></wc-chart>`);

	let chart = this.querySelector("wc-chart");

	eval("chart." + band.type + "(band)");

	console.groupEnd();
    };

    /**
     * SAVE DATA FOR ANALYTICS
     * @__initialize
     */
    _initialize() {
	console.group("Band._initialize:", this.id);

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
	console.group("Band._finalize:", this.id);

	this.classList.add("wc");

	// ADD ANALYTICS HERE
	wc.setStats(this, this.properties.cname, this.properties.version);
	
	// SHOW IT NOW (NO FLICKERS) 
	this.style.visibility = "visible";

	console.groupEnd();
    };
}

window.customElements.define('wc-band', Band);

