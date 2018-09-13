/**
 * Popup Component<BR>
 * <BR><BR><img src=../img/popup.png width=50% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/popup.html">DEMO</a>
 */
class Popup extends HTMLElement {
    constructor() {
        console.group("Popup.constructor")
	
        super();

        console.groupEnd();
    };
    
    /**
     * Set observable values here. When Changed, attributeChangedCallback is invoked
     * @observedAttributes
     */
    static get observedAttributes() {
        console.group("Popup.observedAttributes");

	this.observables = ["header"];

        console.groupEnd();
        return this.observables;
    };

    /**
     * This function is called when this is attached to DOM
     * @connectedCallback. 
     */
    connectedCallback() {
        console.group("Popup.connectedCallback")
	
	let self = this;

	// GET PROPERTIES AND INTERESTING ELEMENTS
	this._initialize();

	$(this).css({
	    width: this.properties.width,
	    height: this.properties.height,
	})

	let driver = $('#' + this.properties.driver);

	driver.click(e => {
	    $(this).css({
		'left': $(driver).offset().left,
		'top' : $(driver).offset().top + $(driver).height() + 5
	    });
	    
	    if ($(this).is(":visible")) {
		wc.publish(this, "wc-popup", {
		    time: new Date().getTime(),
		    flag: "closed",
		    id: this.id
		});
		
		$(this).fadeOut(300);
	    } else {
		// HIDE ALL OTHER OPEN POPUPS
		$("wc-popup:visible").each(function() {
		    $(this).hide();

		    wc.publish(self, "wc-popup", {
			time: new Date().getTime(),
			flag: "closed",
			id: this.id
		    });
		});

		wc.publish(this, "wc-popup", {
		    time: new Date().getTime(),
		    flag: "opened",
		    id: this.id
		});

		$(this).fadeIn(300);
	    }
	});

	// ADD STATS AND OTHER FINAL STUFF
	this._finalize();

        console.groupEnd();
    };

    /**
     * Called with .setAttribute(...) function call
     * @attributeChangedCallback
     */
    attributeChangedCallback(attr, oldval, newval) {
        console.group("Popup.attributeChangedCallback:", attr, oldval, newval);

	this.properties = this.properties || [];

	let obs = Popup.observedAttributes;

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
		let h = this.querySelector(".wc-header")
		h.innerHTML = newval;
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
	console.group("Popup._fetchElements");
	
	this.dom = this.dom || [];
	this.dom.content = this.innerHTML;

	console.groupEnd();
    };

    /**
     * Component attributes are _fetched and defaults are set if undefined
     * @_fetchAttributes
     * @param {string} [modal=true] mode for our popup
     */
    _fetchAttributes() {
	console.group("Popup._fetchAttributes");
	
	this.properties = {
	    cname	: "Popup",
	    author	: "Mel Heravi",
	    version	: "1.0",
	    width	: "auto",
	    height	: "auto",
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
     * Destroy the instance object and artifacts
     * @destroy
     */
    destroy() {
	console.group("Popup.destroy:", this.id);

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
	console.group("Popup.configure:", JSON.stringify(options));

	// PROCESS ALL OPTIONS HERE

	console.groupEnd();
    };

    /**
     * SAVE DATA FOR ANALYTICS
     * @_initialize
     */
    _initialize() {
	console.group("Popup._initialize:", this.id);

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
	console.group("Popup._finalize:", this.id);

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
        console.group("Popup.disconnectedCallback")

	/* CLEAN UP NOW */

        console.groupEnd();
    };
}

window.customElements.define('wc-popup', Popup);
