/**
 * Ticker Component<BR>
 * <BR><BR><img src=../img/ticker.png width=30% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/ticker.html">DEMO</a>
 */
class Ticker extends HTMLElement {
    constructor() {
        console.group("Ticker.constructor")
	
        super();

        console.groupEnd();
    };
    
    /**
     * Set observable values here. When Changed, attributeChangedCallback is invoked
     * @observedAttributes
     */
    static get observedAttributes() {
        console.group("Ticker.observedAttributes");

	this.observables = [];

        console.groupEnd();
        return this.observables;
    };

    /**
     * This function is called when this is attached to DOM
     * @connectedCallback. 
     */
    connectedCallback() {
        console.group("Ticker.connectedCallback")
	
	let self = this;

	// GET PROPERTIES AND INTERESTING ELEMENTS
	this._initialize();

	// REPLACE CONTENT FROM TEMPLATE
	this.innerHTML = "<wc-ticker-container>AAAAAAAAA</wc-ticker-container>"
	
	// SAVE THESE FOR setInterval
	this.symbols  = this.properties.symbols;
	this.interval = this.properties.interval;

	this._update();

	//setInterval(this._update, this.interval * 1000);

	// ADD STATS AND OTHER FINAL STUFF
	this._finalize();
	
        console.groupEnd();
    };

    /**
     * Publish all events
     * @_publish
     */
    _publish() {
	console.group("Ticker.publish");

	this.addEventListener("click", e => {
	    wc.publish(this, "wc-ticker", {
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
        console.group("Ticker.attributeChangedCallback:", attr, oldval, newval);

	this.properties = this.properties || [];

	let obs = Ticker.observedAttributes;

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
	console.group("Ticker._fetchElements");
	
	this.dom = this.dom || [];
	this.dom.content = this.innerHTML;

	console.groupEnd();
    };

    /**
     * Component attributes are _fetched and defaults are set if undefined
     * @_fetchAttributes
     * @param {string} [modal=true] mode for our ticker
     */
    _fetchAttributes() {
	console.group("Ticker._fetchAttributes");
	
	this.properties = {
	    cname	: "ticker",
	    author	: "Mel Heravi",
	    version	: "1.0",
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
	console.group("Ticker.destroy:", this.id);

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
	console.group("Ticker.configure:", JSON.stringify(options));

	// PROCESS ALL OPTIONS HERE

	console.groupEnd();
    };

    /**
     * SAVE DATA FOR ANALYTICS
     * @_initialize
     */
    _initialize() {
	console.group("Ticker._initialize:", this.id);

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
	console.group("Ticker._finalize:", this.id);

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
        console.group("Ticker.disconnectedCallback")

	/* CLEAN UP NOW */

        console.groupEnd();
    };
    
    /**
     * Invoked When component is removed. Usually with a .remove() function call
     * @disconnectedCallback
     */
    _update() {
        console.group("Ticker.update")

	$("wc-ticker-container").empty();

	var sym = this.symbols;
	var fil = "latestPrice,change"
	var url = `https://api.iextrading.com/1.0/stock/market/batch?types=quote&symbols=${sym}&filter=${fil}`;

	$.getJSON(url, function(json) {
	    sym.split(",").forEach(tmp => {
		let data = json[tmp];
		if (typeof(data) === 'undefined') return;
		
		var change = data.quote.change;

		if (change > 0) {
		    $("wc-ticker-container").append(`<span style="margin-right:10px;color:green"><b>${tmp}</b> $${data.quote.latestPrice} <i class='fa fa-caret-up fa-lg'></i></span>`);
		} else if (change < 0) {
		    $("wc-ticker-container").append(`<span style="margin-right:10px;color:brown"><b>${tmp}</b> $${data.quote.latestPrice} <i class='fa fa-caret-down fa-lg'></i></span>`);
		} else {
		    $("wc-ticker-container").append(`<span style="margin-right:10px"><b>${tmp}</b> $${data.quote.latestPrice}</span>`);
		}
	    });
	});

	setTimeout(() => {
	    this._update();
	}, this.interval*1000);

        console.groupEnd();
    };
}

window.customElements.define('wc-ticker', Ticker);
