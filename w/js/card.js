/**
 * Card Component<BR>
 * <BR><BR><img src=../img/card.png width=80% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/card.html">DEMO</a>
 */
class Card extends HTMLElement {
    constructor() {
        console.group("Card.constructor")
	
        super();

        console.groupEnd();
    };
    
    /**
     * Set observable values here. When Changed, attributeChangedCallback is invoked
     * @observedAttributes
     */
    static get observedAttributes() {
        console.group("Card.observedAttributes");

	this.observables = [];

        console.groupEnd();
        return this.observables;
    };

    /**
     * This function is called when this is attached to DOM
     * @connectedCallback. 
     */
    connectedCallback() {
        console.group("Card.connectedCallback")
	
	let self = this;

	// GET PROPERTIES AND INTERESTING ELEMENTS
	this._initialize();

	let header = this.querySelector("wc-card-header") || null;
	let footer = this.querySelector("wc-card-footer") || null;
	let body   = this.querySelector("wc-card-body")   || null;
	let img    = this.querySelector("wc-card-img")    || null;

	var h = "";
	var f = "";
	var b = "";
	var i = "";

	if (header) {h = "<div class='card-header'>" + header.innerHTML + "</div>"}
	if (footer) {f = "<div class='card-footer'>" + footer.innerHTML + "</div>"}
	if (img)    {i = "<div class='card-img'>"    + img.innerHTML    + "</div>"}
	if (body)   {b = "<div class='card-body'>"   + body.innerHTML   + "</div>"}

	console.log(">>>>>>>>", body)

	// REPLACE CONTENT IF NECESSARY WITH NEW STUFF
	if (img) {
	    if (img.getAttribute("position") == "top") {
		this.innerHTML = `<div class="card">${h} ${b} ${i} ${f}</div>`;
	    } else {
		this.innerHTML = `<div class="card">${h} ${i} ${b} ${f}</div>`;
	    }
	} else {
	    this.innerHTML = `<div class="card">${h} ${b} ${f}</div>`;
	}

	// ADD STATS AND OTHER FINAL STUFF
	this._finalize();

	// PUBLISH INTERESTING EVENTS
	this._publish();
	
        console.groupEnd();
    };

    /**
     * Publish all events
     * @_publish
     */
    _publish() {
	console.group("Card.publish");

	this.addEventListener("click", e => {
	    this._click();
	});
	
	console.groupEnd();
	return true;
    }

    /**
     * A sample callback usage function - see connectedCallback()
     * @_onClick
     */
    _click() {
	console.group("Card._click:", this.id);

	wc.publish(this, "wc-card", {
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
        console.group("Card.disconnectedCallback")

	/* CLEAN UP NOW */

        console.groupEnd();
    };

    /**
     * Called with .setAttribute(...) function call
     * @attributeChangedCallback
     */
    attributeChangedCallback(attr, oldval, newval) {
        console.group("Card.attributeChangedCallback:", attr, oldval, newval);

	this.properties = this.properties || [];

	let obs = Card.observedAttributes;

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
	console.group("Card._fetchElements");
	
	this.dom = this.dom || [];
	this.dom.content = this.innerHTML;

	console.groupEnd();
    };

    /**
     * Component attributes are _fetched and defaults are set if undefined
     * @_fetchAttributes
     * @param {string} [modal=true] mode for our card
     */
    _fetchAttributes() {
	console.group("Card._fetchAttributes");
	
	this.properties = {
	    cname      : "Card",
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
		case "header":
		let h = document.querySelector("wc-header")
		//h.innerHTML = this.properties.header;
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
	console.group("Card._onClick:", this.id);

	wc.publish(this, "wc-card", {
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
	console.group("Card.destroy:", this.id);

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
    configure(options) {
	console.group("Card.configure:", JSON.stringify(options));

	// PROCESS ALL OPTIONS HERE

	console.groupEnd();
    };

    /**
     * SAVE DATA FOR ANALYTICS
     * @__initialize
     */
    _initialize() {
	console.group("Card._initialize:", this.id);

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
	console.group("Card._finalize:", this.id);

	this.classList.add("wc");

	// ADD ANALYTICS HERE
	wc.setStats(this, this.properties.cname, this.properties.version);
	
	// SHOW IT NOW (NO FLICKERS) 
	this.style.visibility = "visible";

	console.groupEnd();
    };
}

window.customElements.define('wc-card', Card);





