/**
 * App Component<BR>
 * <BR><BR><img src=../img/app.png width=100% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/app.html">DEMO</a>
 */
class App extends HTMLElement {
    constructor() {
        console.group("App.constructor")
	
        super();

        console.groupEnd();
    };
    
    /**
     * Set observable values here. When Changed, attributeChangedCallback is invoked
     * @observedAttributes
     */
    static get observedAttributes() {
        console.group("App.observedAttributes");

	this.observables = [];

        console.groupEnd();
        return this.observables;
    };

    /**
     * This function is called when this is attached to DOM
     * @connectedCallback. 
     */
    connectedCallback() {
        console.group("App.connectedCallback")
	
	let self = this;

	// GET PROPERTIES AND INTERESTING ELEMENTS
	this._initialize();

	// REPLACE CONTENT IF NECESSARY WITH NEW STUFF
	this.innerHTML = "<div class='wc-app'></div>"

	this.configure();

	// PUBLISH INTERESTING EVENTS
	//this._publish();
	
        console.groupEnd();
    };

    /**
     * Publish all events
     * @_publish
     */
    _publish() {
	console.group("App.publish");

	this.addEventListener("click", e => {
	    wc.publish(this, "wc-app", {
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
        console.group("App.attributeChangedCallback:", attr, oldval, newval);

	this.properties = this.properties || [];

	let obs = App.observedAttributes;

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
	console.group("App._fetchElements");
	
	this.dom = this.dom || [];
	this.dom.content = this.innerHTML;

	console.groupEnd();
    };

    /**
     * Component attributes are _fetched and defaults are set if undefined
     * @_fetchAttributes
     * @param {string} [modal=true] mode for our app
     */
    _fetchAttributes() {
	console.group("App._fetchAttributes");
	
	this.properties = {
	    cname      : "App",
	    author     : "Mel Heravi",
	    version    : "1.0"
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
	console.group("App.destroy:", this.id);

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
    configure() {
	console.group("App.configure");

	let self = this;

	$.getJSON(this.properties.cfg, function(data) {
	    let rval = "";
	    let pages = data.pages;

	    if (self.properties.testing == "true") {
		rval += `<div class="btn-group" role="group"><label style="padding-top:8px;padding-right:10px">PAGES:</label>`;

		$(pages).each(function() {
		    rval += `<button type="button" class="btn btn-outline-danger app-test-btn" pid="${this.id}">${this.label}</button>`
		});

		rval += "</div><hr>";
	    }

	    rval += `<div class="app-header"><wc-include href="${data.header}"></wc-include></div>`;

	    $(pages).each(function() {
		if (this.active) {
		    var display = "block";
		} else {
		    var display = "none";
		}

		// IF CACHE IS REQUESTED ADD THE PAGES
		if (this.url != "" && this.cache) {
		    rval += `<div class="app-page" cache="${this.cache}" url="${this.url}" id="app-page-${this.id}" style="display:${display}"><wc-include href="${this.url}"></wc-include></div>`;
		} else {
		    rval += `<div class="app-page" cache="${this.cache}" url="${this.url}" id="app-page-${this.id}" style="display:${display}"><div class="p-4 text-center"><span class='p-4 wc-loading-img'></span></div></div>`;
		}
	    });

	    rval += `<div class="app-footer"><wc-include href="${data.footer}"></wc-include></div>`;

	    $("wc-app").append(rval);

	    // FOR TESTING
	    $(".app-test-btn").on("click", function() {
		let pid = $(this).attr("pid")
		self.show(pid);
	    });

	    // ADD STATS AND OTHER FINAL STUFF
	    self._finalize();
	}).fail(function(jqXHR, textStatus, errorThrown) {
	    console.error('getJSON request failed! ' + textStatus);
	});

	console.groupEnd();
    };

    /**
     * SAVE DATA FOR ANALYTICS
     * @_initialize
     */
    _initialize() {
	console.group("App._initialize:", this.id);

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
	console.group("App._finalize:", this.id);

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
        console.group("App.disconnectedCallback")

	/* CLEAN UP NOW */

        console.groupEnd();
    };

    /**
     * @show
     */
    show(pid) {
        console.group("App.show:", pid)

	let cache = $("#app-page-" + pid).attr("cache")

	$(".app-page").hide();
	
	// LOAD THE PAGE EACH TIME
	if (cache == "false") {
	    let pg = $("#app-page-" + pid);
	    let url = pg.attr("url");
	    
	    pg.append(`<wc-include href="${url}"></wc-include>`);
	}
	
	$("#app-page-" + pid).show();

	console.log('PUBLISHED wc-app: show', pid);
	wc.publish(this, "wc-app", {
	    time: new Date().getTime(),
	    action: "show",
	    id: pid
	});

        console.groupEnd();
    };
}

window.customElements.define('wc-app', App);
