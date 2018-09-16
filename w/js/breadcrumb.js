/**
 * A breadcrumb component 
 * <BR><BR><img src=../img/breadcrumb.png width=30% style="border:1px lime dashed";>
 * <BR><BR><a href="../html/breadcrumb.html">DEMO</a>
 */
class Breadcrumb extends HTMLElement {
    constructor() {
        console.group("Breadcrumb.constructor")
	
        super();

        console.groupEnd();
    };
    
    /**
     * Set observable values here. When Changed, attributeChangedCallback is invoked
     * @observedAttributes
     */
    static get observedAttributes() {
        console.group("Breadcrumb.observedAttributes");

	this.observables = [];
	console.log(this.observables);

        console.groupEnd();
        return this.observables;
    };

    /**
     * This function is called when this is attached to DOM
     * @connectedCallback. 
     */
    connectedCallback() {
        console.group("Breadcrumb.connectedCallback")
	
	let self = this;

	// MAKE SURE OUR COMPONENT HAS GLOBAL CLASS
	this.classList.add("wc");

	// FETCH ALL INTERESTING ELEMENTS
	this._fetchElements();

	// FETCH ALL ATTRIBUTES
	this._fetchAttributes();

	this.innerHTML = this.dom.content;

	// WRAP UP AND ADD STATS
	this._finalize();

	//SHOW IT NOW (NO FLICKERS) 
	this.style.visibility = "visible";

        console.groupEnd();
    };

    /**
     * Invoked When component is removed. Usually with a .remove() function call
     * @disconnectedCallback
     */
    disconnectedCallback() {
        console.group("Breadcrumb.disconnectedCallback")

	/* CLEAN UP NOW */

        console.groupEnd();
    };

    /**
     * Called with .setAttribute(...) function call
     * @attributeChangedCallback
     */
    attributeChangedCallback(attr, oldval, newval) {
        console.group("Breadcrumb.attributeChangedCallback:", attr, oldval, newval);

	this.properties = this.properties || [];

	let obs = Maker.observedAttributes;

	for (let i = 0; i < obs.length; i++) {
	    this.properties[obs[i]] = newval;
            console.log(obs[i] + ": " + this.properties.background);
	    // YOUR CODE FOR CHANGES GO HERE 
	}
	
        console.groupEnd();
    };

    /**
     * Stores DOM elements of interest for future use
     * @_fetchElements
     */
    _fetchElements() {
	console.group("Breadcrumb._fetchElements");
	
	this.dom = {};
	this.dom.content = this.innerHTML;

	console.groupEnd();
    };

    /**
     * Component attributes are _fetched and defaults are set if undefined
     * @_fetchAttributes
     * @param {string} [background=indianred] background color
     */
    _fetchAttributes() {
	console.group("Breadcrumb._fetchAttributes");
	
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
     * Destroy the instance object and artifacts
     * @_destroy
     */
    destroy() {
	console.group("Message.destroy:", this.id);

	// FREE POINTER
	delete this;

	// REMOVE ITEM FROM DOM
	this.parentNode.removeChild(this);

	console.groupEnd();
    };

    /**
     * SAVE DATA FOR ANALYTICS
     * @__finalize
     */
    _finalize() {
	console.group("Breadcrumb._finalize:", this.id);

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
	console.group("Breadcrumb.test");

	console.log("testing results will be printed here...");

	console.groupEnd();
	return true;
    }

}

window.customElements.define('wc-breadcrumb', Breadcrumb);




