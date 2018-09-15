/**
 * Tile Component<BR>
 * <BR><BR><img src=../img/tile.png width=30% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/tile.html">DEMO</a>
 */
class Tile extends HTMLElement {
    constructor() {
        console.group("Tile.constructor")
	
        super();

        console.groupEnd();
    };
    
    /**
     * Set observable values here. When Changed, attributeChangedCallback is invoked
     * @observedAttributes
     */
    static get observedAttributes() {
        console.group("Tile.observedAttributes");

	this.observables = [];

        console.groupEnd();
        return this.observables;
    };

    /**
     * This function is called when this is attached to DOM
     * @connectedCallback. 
     */
    connectedCallback() {
        console.group("Tile.connectedCallback")
	
	let self = this;

	// GET PROPERTIES AND INTERESTING ELEMENTS
	this._initialize();

	// REPLACE CONTENT IF NECESSARY WITH NEW STUFF
	this.innerHTML = `
	    <div class="row h-100 justify-content-center align-items-center">
		<div>
		${this.dom.content}
		</div>
	    </div>`
	
	if (this.properties.clickable == "true") {
	    $(this).addClass("clikable");

	    this.addEventListener("click", e => {
		wc.publish(this, "wc-tile", {
		    time: new Date().getTime(),
		    action: "click",
		    id: self.id,
		    uparam: self.properties.uparam
		});
	    });
	}

	// ADD STATS AND OTHER FINAL STUFF
	this._finalize();

        console.groupEnd();
    };

    /**
     * Called with .setAttribute(...) function call
     * @attributeChangedCallback
     */
    attributeChangedCallback(attr, oldval, newval) {
        console.group("Tile.attributeChangedCallback:", attr, oldval, newval);

	this.properties = this.properties || [];

	let obs = Tile.observedAttributes;

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
	console.group("Tile._fetchElements");
	
	this.dom = this.dom || [];
	this.dom.content = this.innerHTML;

	console.groupEnd();
    };

    /**
     * Component attributes are _fetched and defaults are set if undefined
     * @_fetchAttributes
     * @param {string} [modal=true] mode for our tile
     */
    _fetchAttributes() {
	console.group("Tile._fetchAttributes");
	
	this.properties = {
	    cname      : "Tile",
	    author     : "Mel Heravi",
	    version    : "1.0",
	    clickable  : "false",
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
	console.group("Tile.destroy:", this.id);

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
	console.group("Tile.configure:", JSON.stringify(options));

	// PROCESS ALL OPTIONS HERE

	console.groupEnd();
    };

    /**
     * SAVE DATA FOR ANALYTICS
     * @_initialize
     */
    _initialize() {
	console.group("Tile._initialize:", this.id);

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
	console.group("Tile._finalize:", this.id);

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
        console.group("Tile.disconnectedCallback")

	/* CLEAN UP NOW */

        console.groupEnd();
    };
}

window.customElements.define('wc-tile', Tile);





