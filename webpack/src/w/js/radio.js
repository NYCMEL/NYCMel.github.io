/**
 * Radio Component<BR>
 * <BR><BR><img src=../img/radio.png width=40% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/radio.html">DEMO</a>
 */
class Radio extends HTMLElement {
    constructor() {
        console.group("Radio.constructor")
	
        super();

        console.groupEnd();
    };
    
    /**
     * Set observable values here. When Changed, attributeChangedCallback is invoked
     * @observedAttributes
     */
    static get observedAttributes() {
        console.group("Radio.observedAttributes");

	this.observables = ["columns"];

        console.groupEnd();
        return this.observables;
    };

    /**
     * This function is called when this is attached to DOM
     * @connectedCallback. 
     */
    connectedCallback() {
        console.group("Radio.connectedCallback")
	
	let self = this;

	// GET PROPERTIES AND INTERESTING ELEMENTS
	this._initialize();

	let cols = this.properties.columns.split(',');

	let id  = this.id;
	let c1  = "col-md-" + cols[0];
	let c2  = "col-md-" + cols[1];

	let lbl = this.properties.label || "";
	let val = this.properties.value || "";
	let cls = this.properties.class || "";
	let hlp = this.properties.help  || "";

	// DATA-KEY FOR BINDING
	let dkey = id.replace(/_/g, '').replace(/-/g, '');

	// REPLACE CONTENT IF NECESSARY WITH NEW STUFF
	this.innerHTML = `
		<div class="form-group has-feedback form-check-inline">
		    <input class="form-check-input" type="radio" value="${val}" data-key="${dkey}" />
		    <label for="${this.id}" id="${this.id}-label" class="form-check-label col-form-label">${lbl}</label>
		</div>`
	
	// TRANSFER ALL ATTRIBUTES NOW (below is an example)
	// -------------------------------------------------
	let widget = this.querySelector("input[type=radio]");

 	for (var key in this.propertiesW) {
	    this.removeAttribute(key);
	    if (key != "class") {
		widget.setAttribute(key, this.properties[key]);
	    }
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
	console.group("Radio.publish");

	let widget = this.querySelector("[type=radio]");

	widget.addEventListener("click", e => {
	    this._click($(widget).attr("id"));
	});
	
	console.groupEnd();
	return true;
    }

    /**
     * A sample callback usage function - see connectedCallback()
     * @_onClick
     */
    _click(id) {
	console.group("Radio._click:", id);

	let val = $("#radio-1").val();

	wc.publish(this, "wc-radio", {
	    time: new Date().getTime(),
	    action: "click",
	    id: id,
	    checked: val,
	    uparam: this.properties.uparam
	});

	console.groupEnd();
    };

    /**
     * Invoked When component is removed. Usually with a .remove() function call
     * @disconnectedCallback
     */
    disconnectedCallback() {
        console.group("Radio.disconnectedCallback")

	/* CLEAN UP NOW */

        console.groupEnd();
    };

    /**
     * Called with .setAttribute(...) function call
     * @attributeChangedCallback
     */
    attributeChangedCallback(attr, oldval, newval) {
        console.group("Radio.attributeChangedCallback:", attr, oldval, newval);

	this.properties = this.properties || [];

	let obs = Radio.observedAttributes;

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
	console.group("Radio._fetchElements");
	
	this.dom = this.dom || [];
	this.dom.content = this.innerHTML;

	console.groupEnd();
    };

    /**
     * Component attributes are _fetched and defaults are set if undefined
     * @_fetchAttributes
     * @param {string} [modal=true] mode for our radio
     */
    _fetchAttributes() {
	console.group("Radio._fetchAttributes");
	
	this.properties = {
	    cname      : "Radio",
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
	console.group("Radio._onClick:", this.id);

	wc.publish(this, "wc-radio", {
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
	console.group("Radio.destroy:", this.id);

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
	console.group("Radio.configure:", JSON.stringify(options));

	// PROCESS ALL OPTIONS HERE

	console.groupEnd();
    };

    /**
     * SAVE DATA FOR ANALYTICS
     * @__initialize
     */
    _initialize() {
	console.group("Radio._initialize:", this.id);

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
	console.group("Radio._finalize:", this.id);

	this.classList.add("wc");

	// ADD ANALYTICS HERE
	wc.setStats(this, this.properties.cname, this.properties.version);
	
	// SHOW IT NOW (NO FLICKERS) 
	this.style.visibility = "visible";

	console.groupEnd();
    };
}

window.customElements.define('wc-radio', Radio);





