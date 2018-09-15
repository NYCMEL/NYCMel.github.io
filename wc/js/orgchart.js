/**
 * Orgchart Component<BR>
 * <BR><BR><img src=../img/orgchart.png width=100% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/orgchart.html">DEMO</a>
 */
class Orgchart extends HTMLElement {
    constructor() {
        console.group("Orgchart.constructor")
	
        super();

        console.groupEnd();
    };
    
    /**
     * Set observable values here. When Changed, attributeChangedCallback is invoked
     * @observedAttributes
     */
    static get observedAttributes() {
        console.group("Orgchart.observedAttributes");

	this.observables = [];

        console.groupEnd();
        return this.observables;
    };

    /**
     * This function is called when this is attached to DOM
     * @connectedCallback. 
     */
    connectedCallback() {
        console.group("Orgchart.connectedCallback")
	
	let self = this;

	// GET PROPERTIES AND INTERESTING ELEMENTS
	this._initialize();

	this.properties.direction = this.properties.direction || "t2b";
	this.properties.toggle    = this.properties.toggle    || true;
	this.properties.icon      = this.properties.icon      || "fa-bars";

	// REPLACE CONTENT IF NECESSARY WITH NEW STUFF
	//this.innerHTML = `<wc-header>${this.properties.header}</wc-header>` + this.dom.content;

	// ADD STATS AND OTHER FINAL STUFF
	this._finalize();

        console.groupEnd();
    };

    /**
     * Invoked When component is removed. Usually with a .remove() function call
     * @disconnectedCallback
     */
    disconnectedCallback() {
        console.group("Orgchart.disconnectedCallback")

	/* CLEAN UP NOW */

        console.groupEnd();
    };

    /**
     * Called with .setAttribute(...) function call
     * @attributeChangedCallback
     */
    attributeChangedCallback(attr, oldval, newval) {
        console.group("Orgchart.attributeChangedCallback:", attr, oldval, newval);

	this.properties = this.properties || [];

	let obs = Orgchart.observedAttributes;

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
	console.group("Orgchart._fetchElements");
	
	this.dom = this.dom || [];
	this.dom.content = this.innerHTML;

	console.groupEnd();
    };

    /**
     * Component attributes are _fetched and defaults are set if undefined
     * @_fetchAttributes
     * @param {string} [modal=true] mode for our orgchart
     */
    _fetchAttributes() {
	console.group("Orgchart._fetchAttributes");
	
	this.properties = {
	    cname      : "Orgchart",
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
		case "background":
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
	console.group("Orgchart._onClick:", this.id);

	wc.publish(this, "wc-orgchart", {
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
	console.group("Orgchart.destroy:", this.id);

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
	console.group("Orgchart.configure:", this.id);
	
	options.direction = options.direction || this.properties.direction;
	options.toggle    = options.toggle    || this.properties.toggle;
	options.icon      = options.icon      || this.properties.icon;

	$(this).orgchart({
	    'nodeContent':	'title',
	    'data' :		  options.source,
	    'direction':	  options.direction,
	    "toggleSiblingsResp": JSON.parse(options.toggle),
	    'parentNodeSymbol':	  options.icon,
	});

	if (JSON.parse(options.toggle) == false) {
	    $(this).find(".leftEdge, .rightEdge, .bottomEdge, .topEdge").css("display","none");
	}

	self = this;

	$(".node").on("click", function() {
	    wc.publish(self, "wc-orgchart", {
		time:	new Date().getTime(),
		action: "click",
		id:	self.id,
		node:	$(this).closest(".node").attr("id")
	    });
	});

	console.groupEnd();
    };

    /**
     * SAVE DATA FOR ANALYTICS
     * @__initialize
     */
    _initialize() {
	console.group("Orgchart._initialize:", this.id);

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
	console.group("Orgchart._finalize:", this.id);

	this.classList.add("wc");

	// ADD ANALYTICS HERE
	wc.setStats(this, this.properties.cname, this.properties.version);
	
	// SHOW IT NOW (NO FLICKERS) 
	this.style.visibility = "visible";

	console.groupEnd();
    };
}

window.customElements.define('wc-orgchart', Orgchart);





