/**
 * Groupbox Component<BR>
 * <BR><BR><img src=../img/groupbox.png width=40% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/groupbox.html">DEMO</a>
 */
class Groupbox extends HTMLElement {
    constructor() {
        console.group("Groupbox.constructor")
	
        super();

        console.groupEnd();
    };
    
    /**
     * Set observable values here. When Changed, attributeChangedCallback is invoked
     * @observedAttributes
     */
    static get observedAttributes() {
        console.group("Groupbox.observedAttributes");

	this.observables = ["columns"];

        console.groupEnd();
        return this.observables;
    };

    /**
     * This function is called when this is attached to DOM
     * @connectedCallback. 
     */
    connectedCallback() {
        console.group("Groupbox.connectedCallback")
	
	let self = this;

	// GET PROPERTIES AND INTERESTING ELEMENTS
	this._initialize();

	let cols = this.properties.columns.split(',');

	let c1  = "col-md-" + cols[0];
	let c2  = "col-md-" + cols[1];

	let lbl = this.properties.label || "";
	let hlp = this.properties.help  || "";

	// REPLACE CONTENT IF NECESSARY WITH NEW STUFF
	this.innerHTML = `
		<div class="form-group clearfix" style="margin-bottom:0!important;">
		    <div class="row">
		        <div class="${c1}">
		            <label id="${this.id}-label" for="${this.id}-label" class="wc-groupbox-label btn-control col-form-label">${lbl}</label>
		        </div>

		        <div class="${c2}">
			    <div class="clearfix">
			    ${this.dom.content}
			    </div>
		        </div>
		    </div>
		</div>`;
	
	// TRANSFER ALL ATTRIBUTES NOW (below is an example)
	// -------------------------------------------------
	// let widget = this.querySelector("input[type=groupbox]");

 	// for (var key in this.propertiesW) {
	//     this.removeAttribute(key);
	//     if (key != "class") {
	// 	widget.setAttribute(key, this.properties[key]);
	//     }
	// }	

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
	console.group("Groupbox.publish");

	console.groupEnd();
	return true;
    }

    /**
     * A sample callback usage function - see connectedCallback()
     * @_onClick
     */
    _click(id) {
	console.group("Groupbox._click:", id);

	console.groupEnd();
    };

    /**
     * Invoked When component is removed. Usually with a .remove() function call
     * @disconnectedCallback
     */
    disconnectedCallback() {
        console.group("Groupbox.disconnectedCallback")

	/* CLEAN UP NOW */

        console.groupEnd();
    };

    /**
     * Called with .setAttribute(...) function call
     * @attributeChangedCallback
     */
    attributeChangedCallback(attr, oldval, newval) {
        console.group("Groupbox.attributeChangedCallback:", attr, oldval, newval);

	this.properties = this.properties || [];

	let obs = Groupbox.observedAttributes;

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
	console.group("Groupbox._fetchElements");
	
	this.dom = this.dom || [];
	this.dom.content = this.innerHTML;

	console.groupEnd();
    };

    /**
     * Component attributes are _fetched and defaults are set if undefined
     * @_fetchAttributes
     * @param {string} [modal=true] mode for our groupbox
     */
    _fetchAttributes() {
	console.group("Groupbox._fetchAttributes");
	
	this.properties = {
	    cname      : "Groupbox",
	    author     : "Mel Heravi",
	    version    : "1.0",
	    columns    : "12,12"
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

	console.groupEnd();
    };

    /**
     * A sample callback usage function - see connectedCallback()
     * @_onClick
     */
    _onClick() {
	console.group("Groupbox._onClick:", this.id);

	wc.publish(this, "wc-groupbox", {
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
	console.group("Groupbox.destroy:", this.id);

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
	console.group("Groupbox.configure:", JSON.stringify(options));

	// PROCESS ALL OPTIONS HERE

	console.groupEnd();
    };

    /**
     * SAVE DATA FOR ANALYTICS
     * @__initialize
     */
    _initialize() {
	console.group("Groupbox._initialize:", this.id);

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
	console.group("Groupbox._finalize:", this.id);

	this.classList.add("wc");

	// ADD ANALYTICS HERE
	wc.setStats(this, this.properties.cname, this.properties.version);
	
	// SHOW IT NOW (NO FLICKERS) 
	this.style.visibility = "visible";

	console.groupEnd();
    };
}

window.customElements.define('wc-groupbox', Groupbox);





