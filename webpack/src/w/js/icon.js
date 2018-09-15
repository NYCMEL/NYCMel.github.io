/**
 * Icon Component<BR>
 * <BR><BR><img src=../img/icon.png width=30% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/icon.html">DEMO</a>
 */
class Icon extends HTMLElement {
    constructor() {
        console.group("Icon.constructor")
	
        super();

        console.groupEnd();
    };
    
    /**
     * Set observable values here. When Changed, attributeChangedCallback is invoked
     * @observedAttributes
     */
    static get observedAttributes() {
        console.group("Icon.observedAttributes");

	this.observables = [];

        console.groupEnd();
        return this.observables;
    };

    /**
     * This function is called get component template
     * @template
     */
    template() {
        console.group("Icon.template");
	
	if (this.properties.border == "true") {
	    var tmp = `
		<span class="fa-stack fa-lg" style="color:${this.properties.color};font-size:${this.properties.size};">
		<i class="fa fa-circle-thin fa-stack-2x"></i>
		<i class="fa fa-${this.properties.name} fa-stack-1x"></i>
		</span>`
	} else {
	    var tmp = `
		<span class="fa-stack fa-lg" style="color:${this.properties.color};font-size:${this.properties.size};">
		<i class="fa fa-circle fa-stack-2x"></i>
		<i class="fa fa-${this.properties.name} fa-stack-1x fa-inverse"></i>
		</span>`
	}

	this.innerHTML = tmp;

        console.groupEnd();
        return tmp;
    };

    /**
     * This function is called when this is attached to DOM
     * @connectedCallback. 
     */
    connectedCallback() {
        console.group("Icon.connectedCallback")
	
	let self = this;

	// GET PROPERTIES AND INTERESTING ELEMENTS
	this._initialize();

	// REPLACE CONTENT FROM TEMPLATE
	this.innerHTML = this.template();
	
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
	console.group("Icon.publish");

	this.addEventListener("click", e => {
	    wc.publish(this, "wc-icon", {
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
        console.group("Icon.attributeChangedCallback:", attr, oldval, newval);

	this.properties = this.properties || [];

	let obs = Icon.observedAttributes;

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
	console.group("Icon._fetchElements");
	
	this.dom = this.dom || [];
	this.dom.content = this.innerHTML;

	console.groupEnd();
    };

    /**
     * Component attributes are _fetched and defaults are set if undefined
     * @_fetchAttributes
     * @param {string} [modal=true] mode for our icon
     */
    _fetchAttributes() {
	console.group("Icon._fetchAttributes");
	
	this.properties = {
	    cname	: "icon",
	    author	: "Mel Heravi",
	    version	: "1.0",
	    size	: "36px",
	    name	: "home",
	    color	: "lime",
	    border	: "false"
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
	console.group("Icon.destroy:", this.id);

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
	console.group("Icon.configure:", JSON.stringify(options));

	// PROCESS ALL OPTIONS HERE

	console.groupEnd();
    };

    /**
     * SAVE DATA FOR ANALYTICS
     * @_initialize
     */
    _initialize() {
	console.group("Icon._initialize:", this.id);

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
	console.group("Icon._finalize:", this.id);

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
        console.group("Icon.disconnectedCallback")

	/* CLEAN UP NOW */

        console.groupEnd();
    };
}

window.customElements.define('wc-icon', Icon);
