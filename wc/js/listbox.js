/**
 * A Listbox Component
 * <BR><BR><img src=../img/listbox.png width=30% style="border:1px lime dashed";>
 * <BR><BR><a href="../html/listbox.html">DEMO</a>
 */
class Listbox extends HTMLElement {
    constructor() {
        console.group("Listbox.constructor")
	
        super();

        console.groupEnd();
    };
    
    /**
     * Set observable values here. When Changed, attributeChangedCallback is invoked
     * @observedAttributes
     */
    static get observedAttributes() {
        console.group("Listbox.observedAttributes");

	this.observables = ["width"];
	console.log(this.observables);

        console.groupEnd();
        return this.observables;
    };

    /**
     * This function is called when this is attached to DOM
     * @connectedCallback. 
     */
    connectedCallback() {
        console.group("Listbox.connectedCallback")
	
	let self = this;

	// MAKE SURE OUR COMPONENT HAS GLOBAL CLASS
	this.classList.add("wc");

	// FETCH ALL INTERESTING ELEMENTS
	this._fetchElements();

	// FETCH ALL ATTRIBUTES
	this._fetchAttributes();

	for (let i=0; i<this.dom.items.length; i++) {
            console.log(this.dom.items[i]);
	    
	    let item = this.dom.items[i];

	    item.addEventListener("click", function() {
		self._onClick(item);
	    });
	}

	// WRAP UP AND ADD STATS
	this._finalize();

	// SHOW IT NOW (NO FLICKERS) 
	this.style.visibility = "visible";

        console.groupEnd();
    };

    /**
     * Invoked When component is removed. Usually with a .remove() function call
     * @disconnectedCallback
     */
    disconnectedCallback() {
        console.group("Listbox.disconnectedCallback")

	/* CLEAN UP NOW */

        console.groupEnd();
    };

    /**
     * Called with .setAttribute(...) function call
     * @attributeChangedCallback
     */
    attributeChangedCallback(attr, oldval, newval) {
        console.group("Listbox.attributeChangedCallback:", attr, oldval, newval);

	this.properties = this.properties || [];

	// EXAMPLE ONLY. replace with observables
	switch(attr)
	{
	    case "width":
	    this.properties.width = newval;
	    this.style.width = this.properties.width;
	    break;
	}
	
        console.groupEnd();
    };

    /**
     * Stores DOM elements of interest for future use
     * @_fetchElements
     */
    _fetchElements() {
	console.group("Listbox._fetchElements");
	
	this.dom = this.dom || [];
	this.dom.content = this.innerHTML;
	this.dom.items = this.querySelectorAll(".list-group-item");

	console.groupEnd();
    };

    /**
     * Component attributes are _fetched and defaults are set if undefined
     * @_fetchAttributes
     * @param {string} [width=100%] Listbox width
     */
    _fetchAttributes() {
	console.group("Listbox._fetchAttributes");
	
	this.properties = {
	    "cname"   : "Listbox",
	    "author"  : "Mel Heravi",
	    "version" : "1.0",
	    "width"   : "100%"
	};

	// EXAMPLE ONLY. replace with attributes
	if (this.hasAttribute("width")) {
	    this.properties.width = this.getAttribute("width");
	    this.style.width = this.properties.width;
	    console.log("width: ", this.properties.width);
	}

	console.groupEnd();
    };

    /**
     * A sample callback usage function - see connectedCallback()
     * @_onClick
     * @param {object} item clicked item
     */
    _onClick(item) {
	console.group("Listbox._onClick:", this.id);

	// REMOVE ACTIVE ITEM
	for (let i=0; i<this.dom.items.length; i++) {
	    this.dom.items[i].classList.remove("active");
	}

	// ACTIVATE THIS ITEM
	item.classList.add("active");

	//PUBLISH TO THE EVENT
	wc.publish(this, "wc-listbox", {
	    item: item.id,
	    action: "click"
	});

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
	console.group("Listbox._finalize:", this.id);

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
	console.group("Listbox.test");

	console.log("testing results will be printed here...");

	console.groupEnd();
	return true;
    }
}

window.customElements.define('wc-listbox', Listbox);




