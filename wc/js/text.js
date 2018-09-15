/**
 * Text Component<BR>
 * <BR><BR><img src=../img/text.png width=40% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/text.html">DEMO</a>
 */
class Text extends HTMLElement {
    constructor() {
        console.group("Text.constructor")
	
        super();

        console.groupEnd();
    };
    
    /**
     * Set observable values here. When Changed, attributeChangedCallback is invoked
     * @observedAttributes
     */
    static get observedAttributes() {
        console.group("Text.observedAttributes");

	this.observables = ["columns"];

        console.groupEnd();
        return this.observables;
    };

    /**
     * This function is called when this is attached to DOM
     * @connectedCallback. 
     */
    connectedCallback() {
        console.group("Text.connectedCallback")
	
	let self = this;

	// GET PROPERTIES AND INTERESTING ELEMENTS
	this._initialize();

	let cols = this.properties.columns.split(',');

	let id  = this.id;
	let c1  = "col-md-" + cols[0];
	let c2  = "col-md-" + cols[1];

	let lbl = this.properties.label || "";
	let val = this.properties.value || "";
	let hlp = this.properties.help  || "";
	let cls = this.properties.class || "";

	// DATA-KEY FOR BINDING
	let dkey = id.replace(/_/g, '').replace(/-/g, '');

	// REPLACE CONTENT IF NECESSARY WITH NEW STUFF
	this.innerHTML = `
	    <div class="form-group has-feedback clearfix">
		<div class="row">
		    <div class="${c1}">
		      <label id="${this.id}-label" for="${this.id}-label" class="btn-control col-form-label">${lbl}</label>
		    </div>

		    <div class="${c2}">
	                <input type="text" class="form-control ${cls}" id="${this.id}" value="${val}" data-key=${dkey} autocomplete='off' />
		        <span class="glyphicon form-control-feedback" aria-hidden="true"></span>
		        <small id='${this.id}-help' class='form-text help-block with-errors text-muted'>${hlp}</small>
		    </div>
		</div>
	    </div>`
	
	// TRANSFER ALL ATTRIBUTES NOW (below is an example)
	// -------------------------------------------------
	let widget = this.querySelector("input[type=text]");

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
	console.group("Text.publish");

	let widget = this.querySelector("input[type=text]");

	if (0) {
	    try {
		widget.addEventListener("change", e => {
		    let id = $(widget).attr("id");

		    this._change(id);
		});
	    }
	    catch(e) {
		console.error(e.name + ' > ' + e.message);
	    }
	}
	
	console.groupEnd();
	return true;
    }

    /**
     * A sample callback usage function - see connectedCallback()
     * @_onClick
     */
    _change(id) {
	console.group("Text._change:", id);

	let val = $("#" + id).val();

	wc.publish(this, "wc-text", {
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
        console.group("Text.disconnectedCallback")

	/* CLEAN UP NOW */

        console.groupEnd();
    };

    /**
     * Called with .setAttribute(...) function call
     * @attributeChangedCallback
     */
    attributeChangedCallback(attr, oldval, newval) {
        console.group("Text.attributeChangedCallback:", attr, oldval, newval);

	this.properties = this.properties || [];

	let obs = Text.observedAttributes;

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
	console.group("Text._fetchElements");
	
	this.dom = this.dom || [];
	this.dom.content = this.innerHTML;

	console.groupEnd();
    };

    /**
     * Component attributes are _fetched and defaults are set if undefined
     * @_fetchAttributes
     * @param {string} [modal=true] mode for our text
     */
    _fetchAttributes() {
	console.group("Text._fetchAttributes");
	
	this.properties = {
	    cname      : "Text",
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
	console.group("Text._onClick:", this.id);

	wc.publish(this, "wc-text", {
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
	console.group("Text.destroy:", this.id);

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
	console.group("Text.configure:", JSON.stringify(options));

	// PROCESS ALL OPTIONS HERE

	console.groupEnd();
    };

    /**
     * SAVE DATA FOR ANALYTICS
     * @__initialize
     */
    _initialize() {
	console.group("Text._initialize:", this.id);

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
	console.group("Text._finalize:", this.id);

	this.classList.add("wc");

	// ADD ANALYTICS HERE
	wc.setStats(this, this.properties.cname, this.properties.version);
	
	// SHOW IT NOW (NO FLICKERS) 
	this.style.visibility = "visible";

	console.groupEnd();
    };
}

window.customElements.define('wc-text', Text);





