/**
 * Ranger Component<BR>
 * <BR><BR><img src=../img/ranger.png width=70% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/ranger.html">DEMO</a>
 */
class Ranger extends HTMLElement {
    constructor() {
        console.group("Ranger.constructor")
	
        super();

        console.groupEnd();
    };
    
    /**
     * Set observable values here. When Changed, attributeChangedCallback is invoked
     * @observedAttributes
     */
    static get observedAttributes() {
        console.group("Ranger.observedAttributes");

	this.observables = [];

        console.groupEnd();
        return this.observables;
    };

    /**
     * This function is called when this is attached to DOM
     * @connectedCallback. 
     */
    connectedCallback() {
        console.group("Ranger.connectedCallback")
	
	let self = this;

	// GET PROPERTIES AND INTERESTING ELEMENTS
	this._initialize();

	// ADD GRIP HANDLES
	$(this).append(`<div class="ui-resizable-handle ui-resizable-nw" id="wc-ranger-nwgrip"></div><div class="ui-resizable-handle ui-resizable-se" id="wc-ranger-segrip"></div>`);
	//$(this).addClass("ui-state-active");

	let p = $(this).parent().css("position", "relative").addClass("ui-widget-content");
	let ph  = p.height()
	let pid = p.attr("id");

	$(this).css("min-height",ph);

	$(this).draggable({
	    containment: "#" + pid
	}).resizable({
	    containment: "#" + pid,
	    handles: {
                'se': "#wc-ranger-segrip",
                'nw': "#wc-ranger-nwgrip"
            },
	 })

	$("#wc-ranger-segrip").css("top", ph/2 -12);
	$("#wc-ranger-nwgrip").css("top", ph/2 -12);

	$(this).on("resizestart", function(event, ui) {
	    wc.publish(this, "wc-ranger", {
		time: new Date().getTime(),
		action: "resizestart",
		id: this.id,
		left: $(this).position().left,
		width: $(this).width()
	    });
	}).on("resizestop", function(event, ui) {
	    wc.publish(this, "wc-ranger", {
		time: new Date().getTime(),
		action: "resizestop",
		id: this.id,
		left: $(this).position().left,
		width: $(this).width()
	    });
	}).on("resize", function(event, ui) {
	    wc.publish(this, "wc-ranger", {
		time: new Date().getTime(),
		action: "resize",
		id: this.id,
		left: $(this).position().left,
		width: $(this).width()
	    });
	});
	
	$(this).on("dragstart", function(event, ui) {
	    wc.publish(this, "wc-ranger", {
		time: new Date().getTime(),
		action: "dragstart",
		id: this.id,
		left: $(this).position().left,
		width: $(this).width()
	    });
	}).on("dragstop", function(event, ui) {
	    wc.publish(this, "wc-ranger", {
		time: new Date().getTime(),
		action: "dragstop",
		id: this.id,
		left: $(this).position().left,
		width: $(this).width()
	    });
	}).on("drag", function(event, ui) {
	    wc.publish(this, "wc-ranger", {
		time: new Date().getTime(),
		action: "drag",
		id: this.id,
		left: $(this).position().left,
		width: $(this).width()
	    });
	});

	
	// ADD STATS AND OTHER FINAL STUFF
	this._finalize();

        console.groupEnd();
    };

    /**
     * A sample callback usage function - see connectedCallback()
     * @_click
     */
    _click() {
	console.group("Ranger._click:", this.id);

	wc.publish(this, "wc-ranger", {
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
        console.group("Ranger.disconnectedCallback")

	/* CLEAN UP NOW */

        console.groupEnd();
    };

    /**
     * Called with .setAttribute(...) function call
     * @attributeChangedCallback
     */
    attributeChangedCallback(attr, oldval, newval) {
        console.group("Ranger.attributeChangedCallback:", attr, oldval, newval);

	this.properties = this.properties || [];

	let obs = Ranger.observedAttributes;

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
	console.group("Ranger._fetchElements");
	
	this.dom = this.dom || [];
	this.dom.content = this.innerHTML;

	console.groupEnd();
    };

    /**
     * Component attributes are _fetched and defaults are set if undefined
     * @_fetchAttributes
     * @param {string} [modal=true] mode for our ranger
     */
    _fetchAttributes() {
	console.group("Ranger._fetchAttributes");
	
	this.properties = {
	    cname      : "Ranger",
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
	console.group("Ranger._onClick:", this.id);

	wc.publish(this, "wc-ranger", {
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
	console.group("Ranger.destroy:", this.id);

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
	console.group("Ranger.configure:", JSON.stringify(options));

	// PROCESS ALL OPTIONS HERE

	console.groupEnd();
    };

    /**
     * SAVE DATA FOR ANALYTICS
     * @__initialize
     */
    _initialize() {
	console.group("Ranger._initialize:", this.id);

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
	console.group("Ranger._finalize:", this.id);

	this.classList.add("wc");

	// ADD ANALYTICS HERE
	wc.setStats(this, this.properties.cname, this.properties.version);
	
	// SHOW IT NOW (NO FLICKERS) 
	this.style.visibility = "visible";

	console.groupEnd();
    };
}

window.customElements.define('wc-ranger', Ranger);





