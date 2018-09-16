/**
 * Dad Component<BR>
 * <BR><BR><img src=../img/dad.png width=80% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/dad.html">DEMO</a>
 */
class Dad extends HTMLElement {
    constructor() {
        console.group("Dad.constructor")
	
        super();

        console.groupEnd();
    };
    
    /**
     * Set observable values here. When Changed, attributeChangedCallback is invoked
     * @observedAttributes
     */
    static get observedAttributes() {
        console.group("Dad.observedAttributes");

	this.observables = [];

        console.groupEnd();
        return this.observables;
    };

    /**
     * This function is called when this is attached to DOM
     * @connectedCallback. 
     */
    connectedCallback() {
        console.group("Dad.connectedCallback")
	
	let self = this;

	// GET PROPERTIES AND INTERESTING ELEMENTS
	this._initialize();

	// REPLACE CONTENT IF NECESSARY WITH NEW STUFF
	//this.innerHTML = `<wc-header>${this.properties.header}</wc-header>` + this.dom.content;

	// ADD STATS AND OTHER FINAL STUFF
	this._finalize();

	this.lhs = document.querySelector('#' + this.properties.src);
	this.rhs = document.querySelector('#' + this.properties.dst);

	this.dad = dragula([this.lhs,this.rhs], {
	    direction	   : this.properties.direction,
	    copy	   : eval(this.properties.copy),
	    copySortSource : true,
	    revertOnSpill  : true,
	    copy: function (el, source) {
		// ONLY COPY ALLOWED
		console.groupEnd();
		return source.getAttribute("id") === self.properties.src
	    },
	    accepts : function (el, target, source, sibling) {
		// REJECT A DROP
		if (!target) {
		    console.groupEnd();
		    return false;
		}
		
		if (target.getAttribute("id") == self.properties.dst) {
		    console.groupEnd();
		    return true;
		} else {
		    console.log("drop rejected...");
		    console.groupEnd();
		    return false;
		}
	    },
	}).on('drag', function (el) {
	    console.log("drag...");
	    el.className = el.className.replace('ex-moved', '');
	}).on('drop', function (el) {
	    console.log("drop...");
	    el.className += ' ex-moved';
	}).on('over', function (el, container) {
	    console.log("over...");
	    container.className += ' ex-over';
	}).on('out', function (el, container) {
	    console.log("out...");
	    container.className = container.className.replace('ex-over', '');
	});

	this.dad.on("drop", function(el, target, source, sibling) {
	    // DROPPED OUTSIDE OF DST. DO NOTHING
	    if (!target) {
		console.groupEnd();
		return false;
	    }

	    if (target.getAttribute("id") == self.properties.dst) {
		self._onDrop(el, target != source, sibling);
	    }
	});

        console.groupEnd();
    };

    /**
     * Invoked When component is removed. Usually with a .remove() function call
     * @disconnectedCallback
     */
    disconnectedCallback() {
        console.group("Dad.disconnectedCallback")

	/* CLEAN UP NOW */

        console.groupEnd();
    };

    /**
     * Called with .setAttribute(...) function call
     * @attributeChangedCallback
     */
    attributeChangedCallback(attr, oldval, newval) {
        console.group("Dad.attributeChangedCallback:", attr, oldval, newval);

	this.properties = this.properties || [];

	let obs = Dad.observedAttributes;

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
	console.group("Dad._fetchElements");
	
	this.dom = this.dom || [];
	this.dom.content = this.innerHTML;

	console.groupEnd();
    };

    /**
     * Component attributes are _fetched and defaults are set if undefined
     * @_fetchAttributes
     * @param {string} [modal=true] mode for our dad
     */
    _fetchAttributes() {
	console.group("Dad._fetchAttributes");
	
	this.properties = {
	    cname      : "Dad",
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
		this.style.background = this.properties.background;
		break;
		
		case "header":
		break;
	    }
	}

	console.log("ATTRIBUTES: ", this.properties);

	console.groupEnd();
    };

    /**
     * A sample callback usage function - see connectedCallback()
     * @_onDrop
     */
    _onDrop(el, update, sibling) {
	console.group("Dad._onDrop:", el, update, sibling);

	wc.publish(this, "wc-dad", {
	    action:	"dropped",
	    id:		this.id,
	    did:	el.getAttribute("id"),
	    sibling:	sibling,
	    new:	update
	});

	if (update) {
	    // ALREADY PUBLISHED THE EVENT. REVERT NOW
	    this.dad.cancel("revert");
	}

	console.groupEnd();
    };

    /**
     * Destroy the instance object and artifacts
     * @_destroy
     */
    destroy() {
	console.group("Dad.destroy:", this.id);

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
	console.group("Dad.configure:", JSON.stringify(options));

	// PROCESS ALL OPTIONS HERE

	console.groupEnd();
    };

    /**
     * SAVE DATA FOR ANALYTICS
     * @__initialize
     */
    _initialize() {
	console.group("Dad._initialize:", this.id);

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
	console.group("Dad._finalize:", this.id);

	this.classList.add("wc");

	// ADD ANALYTICS HERE
	wc.setStats(this, this.properties.cname, this.properties.version);
	
	// SHOW IT NOW (NO FLICKERS) 
	this.style.visibility = "visible";

	console.groupEnd();
    };
}

window.customElements.define('wc-dad', Dad);





