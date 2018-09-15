/**
 * Maker Component<BR>
 * <BR><BR><img src=../img/maker.png width=30% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/maker.html">DEMO</a>
 */
class Maker extends HTMLElement {
    constructor() {
        console.group("Maker.constructor")
	
        super();

        console.groupEnd();
    };
    
    /**
     * Set observable values here. When Changed, attributeChangedCallback is invoked
     * @observedAttributes
     */
    static get observedAttributes() {
        console.group("Maker.observedAttributes");

	this.observables = ["header"];

        console.groupEnd();
        return this.observables;
    };

    /**
     * This function is called when this is attached to DOM
     * @connectedCallback. 
     */
    connectedCallback() {
        console.group("Maker.connectedCallback")
	
	let self = this;

	// GET PROPERTIES AND INTERESTING ELEMENTS
	this._initialize();

	// REPLACE CONTENT IF NECESSARY WITH NEW STUFF
	this.innerHTML = `<div class="wc-header">${this.properties.header}</div>` + this.dom.content;
	
	// TRANSFER ALL ATTRIBUTES NOW (below is an example)
	// -------------------------------------------------
	// let child = this.querySelector(".wc-header");
	//
 	// for (var key in this.propertiesW) {
	//     this.removeAttribute(key);
	//
	//     if (key != "class") {
	// 	child.setAttribute(key, this.properties[key]);
	//     }
	// }	

	// PUBLISH INTERESTING EVENTS
	this._publish();
	
	// ADD STATS AND OTHER FINAL STUFF
	this._finalize();

        console.groupEnd();
    };

    /**
     * Publish all events
     * @_publish
     */
    _publish() {
	console.group("Maker.publish");

	this.addEventListener("click", e => {
	    wc.publish(this, "wc-maker", {
		time: new Date().getTime(),
		action: "click",
		id: this.id,
		uparam: this.properties.uparam
	    });
	});
	
	console.groupEnd();
    }

    /**
     * Called with .setAttribute(...) function call
     * @attributeChangedCallback
     */
    attributeChangedCallback(attr, oldval, newval) {
        console.group("Maker.attributeChangedCallback:", attr, oldval, newval);

	this.properties = this.properties || [];

	let obs = Maker.observedAttributes;

	for (let i = 0; i < obs.length; i++) {
	    if (newval) {
		this.properties[obs[i]] = newval;
	    }
	}
	
	// YOUR CODE FOR CHANGES GO HERE (MAYBE NULL FIRST TIME THROUGH)
	try {
	    switch(attr) 
	    {
		case "header":
		let h = this.querySelector(".wc-header")
		h.innerHTML = newval;
		break;
		
		default:
		break;
	    }
	} catch(e) {
	    console.warn(e.name + ' > ' + e.message);
	}

        console.groupEnd();
    };

    /**
     * Stores DOM elements of interest for future use
     * @_fetchElements
     */
    _fetchElements() {
	console.group("Maker._fetchElements");
	
	this.dom = this.dom || [];
	this.dom.content = this.innerHTML;

	console.groupEnd();
    };

    /**
     * Component attributes are _fetched and defaults are set if undefined
     * @_fetchAttributes
     * @param {string} [modal=true] mode for our maker
     */
    _fetchAttributes() {
	console.group("Maker._fetchAttributes");
	
	this.properties = {
	    cname      : "Maker",
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
     * Destroy the instance object and artifacts
     * @destroy
     */
    destroy() {
	console.group("Maker.destroy:", this.id);

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
     * @configure
     */
    configure(options) {
	console.group("Maker.configure:", JSON.stringify(options));

	// PROCESS ALL OPTIONS HERE

	console.groupEnd();
    };

    /**
     * SAVE DATA FOR ANALYTICS
     * @_initialize
     */
    _initialize() {
	console.group("Maker._initialize:", this.id);

	// FETCH ALL INTERESTING ELEMENTS
	this._fetchElements();

	// FETCH ALL ATTRIBUTES
	this._fetchAttributes();
	
	console.groupEnd();
    };

    /**
     * SAVE DATA FOR ANALYTICS
     * @_finalize
     */
    _finalize() {
	console.group("Maker._finalize:", this.id);

	this.classList.add("wc");

	// ADD ANALYTICS HERE
	wc.setStats(this, this.properties.cname, this.properties.version);
	
	// SHOW IT NOW (NO FLICKERS) 
	this.style.visibility = "visible";

	console.groupEnd();
    };

    /**
     * Invoked When component is removed. Usually with a .remove() function call
     * @disconnectedCallback
     */
    disconnectedCallback() {
        console.group("Maker.disconnectedCallback")

	/* CLEAN UP NOW */

        console.groupEnd();
    };
}

window.customElements.define('wc-maker', Maker);




