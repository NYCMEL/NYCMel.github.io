/**
 * Swipe Component<BR>
 * <BR><BR><img src=../img/swipe.png width=70% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/swipe.html">DEMO</a>
 */
class Swipe extends HTMLElement {
    constructor() {
        console.group("Swipe.constructor")
	
        super();

        console.groupEnd();
    };
    
    /**
     * Set observable values here. When Changed, attributeChangedCallback is invoked
     * @observedAttributes
     */
    static get observedAttributes() {
        console.group("Swipe.observedAttributes");

	this.observables = ["header"];

        console.groupEnd();
        return this.observables;
    };

    /**
     * This function is called when this is attached to DOM
     * @connectedCallback. 
     */
    connectedCallback() {
        console.group("Swipe.connectedCallback")
	
	let self = this;

	// GET PROPERTIES AND INTERESTING ELEMENTS
	this._initialize();

	this.properties.autoheight = this.properties.autoheight || true;
	this.properties.pagination = this.properties.pagination || false;
	this.properties.navigation = this.properties.navigation || false;
	this.properties.space      = this.properties.space      || "20";
	this.properties.start      = this.properties.start      || "0";

	var sargs = "new Swiper('.swiper-container', {autoHeight:" + this.properties.autoheight + ", spaceBetween:" + this.properties.space + ", initialSlide:" + this.properties.start + ",";

	var pagination = ""
	if (this.properties.pagination == "true") {
	    pagination = "<div class='swiper-pagination'></div>";
	    sargs += "pagination: {el:'.swiper-pagination', clickable:true},";
	}

	var navigation = ""
	if (this.properties.navigation == "true") {
	    navigation = "<div class='swiper-button-next'></div><div class='swiper-button-prev'></div>";
	    sargs += "navigation: {nextEl:'.swiper-button-next', prevEl:'.swiper-button-prev'},"
	}
	sargs += "})";

	// REPLACE CONTENT IF NECESSARY WITH NEW STUFF
	this.innerHTML = "<div class='swiper-container'><div class='swiper-wrapper'>" + this.dom.content + "</div>" + pagination + navigation + "</div>";
	
	$(".swiper-wrapper > div").addClass("swiper-slide");

	this.swiper = eval(sargs);
	    
	// ADD STATS AND OTHER FINAL STUFF
	this._finalize();

	// PUBLISH INTERESTING EVENTS
	//this._publish();
	
        console.groupEnd();
    };

    /**
     * Publish all events
     * @_publish
     */
    _publish() {
	console.group("Swipe.publish");

	this.addEventListener("click", e => {
	    this._click();
	});
	
	console.groupEnd();
	return true;
    }

    /**
     * A sample callback usage function - see connectedCallback()
     * @_click
     */
    _click() {
	console.group("Swipe._click:", this.id);

	wc.publish(this, "wc-swipe", {
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
        console.group("Swipe.disconnectedCallback")

	/* CLEAN UP NOW */

        console.groupEnd();
    };

    /**
     * Called with .setAttribute(...) function call
     * @attributeChangedCallback
     */
    attributeChangedCallback(attr, oldval, newval) {
        console.group("Swipe.attributeChangedCallback:", attr, oldval, newval);

	this.properties = this.properties || [];

	let obs = Swipe.observedAttributes;

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
	console.group("Swipe._fetchElements");
	
	this.dom = this.dom || [];
	this.dom.content = this.innerHTML;

	console.groupEnd();
    };

    /**
     * Component attributes are _fetched and defaults are set if undefined
     * @_fetchAttributes
     * @param {string} [modal=true] mode for our swipe
     */
    _fetchAttributes() {
	console.group("Swipe._fetchAttributes");
	
	this.properties = {
	    cname      : "Swipe",
	    author     : "Mel Heravi",
	    version    : "1.0",
	    header     : "UNDEFINED HEADER"
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
		
		case "header":
		let h = document.querySelector("wc-header")
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
	console.group("Swipe._onClick:", this.id);

	wc.publish(this, "wc-swipe", {
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
	console.group("Swipe.destroy:", this.id);

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
	console.group("Swipe.configure:", JSON.stringify(options));

	// PROCESS ALL OPTIONS HERE

	console.groupEnd();
    };

    /**
     * SAVE DATA FOR ANALYTICS
     * @__initialize
     */
    _initialize() {
	console.group("Swipe._initialize:", this.id);

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
	console.group("Swipe._finalize:", this.id);

	this.classList.add("wc");

	// ADD ANALYTICS HERE
	wc.setStats(this, this.properties.cname, this.properties.version);
	
	// SHOW IT NOW (NO FLICKERS) 
	this.style.visibility = "visible";

	console.groupEnd();
    };

    /**
     * SAVE DATA FOR ANALYTICS
     * @slideTo
     */
    slideTo(ind) {
	console.group("Swipe.slideTo:", ind);

	this.swiper.slideTo(ind);

	console.groupEnd();
    };
}

window.customElements.define('wc-swipe', Swipe);
