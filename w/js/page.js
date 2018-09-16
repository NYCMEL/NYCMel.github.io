/**
 * Page Component<BR>
 * <BR><BR><img src=../img/page.png width=70% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/page.html">DEMO</a>
 */
class Page extends HTMLElement {
    constructor() {
        console.group("Page.constructor")
	
        super();

        console.groupEnd();
    };
    
    /**
     * Set observable values here. When Changed, attributeChangedCallback is invoked
     * @observedAttributes
     */
    static get observedAttributes() {
        console.group("Page.observedAttributes");

	this.observables = [];

        console.groupEnd();
        return this.observables;
    };

    /**
     * This function is called when this is attached to DOM
     * @connectedCallback. 
     */
    connectedCallback() {
        console.group("Page.connectedCallback")
	
	let self = this;

	// GET PROPERTIES AND INTERESTING ELEMENTS
	this._initialize();

	// REPLACE CONTENT IF NECESSARY WITH NEW STUFF
	this.innerHTML = this.dom.content;
	
	let tmp = "wc-page-header, wc-page-body, wc-page-footer".split(',')

	for(var i = 0; i < tmp.length; i++) {
	    let c = $(tmp[i]).html();
	    
	    $(tmp[i]).html(`<div class="container"><div class="row"><div class="col-md-12">${c}</div></div></div>`);
	}

	if (this.properties.fluid == "true") {
	    this.fluid(this.properties.fluid);
	}


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
	console.group("Page.publish");

	this.addEventListener("click", e => {
	    wc.publish(this, "wc-page", {
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
        console.group("Page.attributeChangedCallback:", attr, oldval, newval);

	this.properties = this.properties || [];

	let obs = Page.observedAttributes;

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
	console.group("Page._fetchElements");
	
	this.dom = this.dom || [];
	this.dom.content = this.innerHTML;

	console.groupEnd();
    };

    /**
     * Component attributes are _fetched and defaults are set if undefined
     * @_fetchAttributes
     * @param {string} [modal=true] mode for our page
     */
    _fetchAttributes() {
	console.group("Page._fetchAttributes");
	
	this.properties = {
	    cname       : "Page",
	    author      : "Mel Heravi",
	    version     : "1.0",
	    fluid	: false
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
	console.group("Page.destroy:", this.id);

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
	console.group("Page.configure:", JSON.stringify(options));

	// PROCESS ALL OPTIONS HERE

	console.groupEnd();
    };

    /**
     * SAVE DATA FOR ANALYTICS
     * @_initialize
     */
    _initialize() {
	console.group("Page._initialize:", this.id);

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
	console.group("Page._finalize:", this.id);

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
        console.group("Page.disconnectedCallback")

	/* CLEAN UP NOW */

        console.groupEnd();
    };

    /**
     * toggle fluid class on top containers
     * @fluid
     */
    fluid(flag) {
        console.group("Page.fluid")

	$(this).attr("fluid", flag);

	if (flag) {
	    $("wc-page-footer > div, wc-page-body > div, wc-page-header > div").removeClass("container").addClass("container-fluid")
	} else {
	    $("wc-page-footer > div, wc-page-body > div, wc-page-header > div").removeClass("container-fluid").addClass("container")
	}

        console.groupEnd();
    };
}

window.customElements.define('wc-page', Page);





