/**
 * Dropdown Component<BR>
 * <BR><BR><img src=../img/dropdown.png width=30% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/dropdown.html">DEMO</a>
 */
class Dropdown extends HTMLElement {
    constructor() {
        console.group("Dropdown.constructor")
	
        super();

        console.groupEnd();
    };
    
    /**
     * Set observable values here. When Changed, attributeChangedCallback is invoked
     * @observedAttributes
     */
    static get observedAttributes() {
        console.group("Dropdown.observedAttributes");

	this.observables = []

        console.groupEnd();
        return this.observables;
    };

    /**
     * This function is called when this is attached to DOM
     * @connectedCallback. 
     */
    connectedCallback() {
        console.group("Dropdown.connectedCallback")
	
	let self = this;

	// GET PROPERTIES AND INTERESTING ELEMENTS
	this._initialize();

	this.properties.btn      = this.properties.btn      || "btn-outline-secondary"
	this.properties.selected = this.properties.selected || null

	// REPLACE CONTENT IF NECESSARY WITH NEW STUFF
	this.innerHTML = `
<div class="dropdown">
    <a class="btn ${this.properties.btn} dropdown-toggle" href="#" role="button" id="${this.id}-menus" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
	Dropdown link
    </a>

    <div class="dropdown-menu" aria-labelledby="${this.id}-menus">
	${this.dom.content}
    </div>
</div>`
	
	// MAKE DROPDOWN SAME WIDTH AS THE BUTTON
	let tmp = this.querySelectorAll(".dropdown-menu");
	$(tmp).width($(this).width());
	
	// ADD CLASS
	this.links = this.querySelectorAll(".dropdown-menu a");
	$(this.links).addClass("dropdown-item " + this.properties.btn)
	    
	// ACTIVATE SELECTED
	if (this.properties.selected) {
	    let item = $(this).find("#" + this.properties.selected)
	    $(item).addClass("active");
	    
	    let lbl = self.querySelector(".dropdown > a");
	    $(lbl).text($(item).text());
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
	console.group("Dropdown.publish");

	var self = this;

	$(this.links).on("click", function() {
	    let lbl = self.querySelector(".dropdown > a");
	    $(lbl).text($(this).text());

	    $(self.links).removeClass("active")
	    $(this).addClass("active");

	    wc.publish(this, "wc-dropdown", {
		time: new Date().getTime(),
		action: "click",
		id: self.id,
		menuid: $(this).attr("id"),
		menutext: $(this).text()
	    });
	});

	console.groupEnd();
	return true;
    }

    /**
     * A sample callback usage function - see connectedCallback()
     * @_click
     */
    _click() {
	console.group("Dropdown._click:", this.id);

	wc.publish(this, "wc-dropdown", {
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
        console.group("Dropdown.disconnectedCallback")

	/* CLEAN UP NOW */

        console.groupEnd();
    };

    /**
     * Called with .setAttribute(...) function call
     * @attributeChangedCallback
     */
    attributeChangedCallback(attr, oldval, newval) {
        console.group("Dropdown.attributeChangedCallback:", attr, oldval, newval);

	this.properties = this.properties || [];

	let obs = Dropdown.observedAttributes;

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
	console.group("Dropdown._fetchElements");
	
	this.dom = this.dom || [];
	this.dom.content = this.innerHTML;

	console.groupEnd();
    };

    /**
     * Component attributes are _fetched and defaults are set if undefined
     * @_fetchAttributes
     * @param {string} [modal=true] mode for our dropdown
     */
    _fetchAttributes() {
	console.group("Dropdown._fetchAttributes");
	
	this.properties = {
	    cname      : "Dropdown",
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
	console.group("Dropdown._onClick:", this.id);

	wc.publish(this, "wc-dropdown", {
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
	console.group("Dropdown.destroy:", this.id);

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
	console.group("Dropdown.configure:", JSON.stringify(options));

	// PROCESS ALL OPTIONS HERE

	console.groupEnd();
    };

    /**
     * SAVE DATA FOR ANALYTICS
     * @__initialize
     */
    _initialize() {
	console.group("Dropdown._initialize:", this.id);

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
	console.group("Dropdown._finalize:", this.id);

	this.classList.add("wc");

	// ADD ANALYTICS HERE
	wc.setStats(this, this.properties.cname, this.properties.version);
	
	// SHOW IT NOW (NO FLICKERS) 
	this.style.visibility = "visible";

	console.groupEnd();
    };
}

window.customElements.define('wc-dropdown', Dropdown);





