/**
 * CarouselBS Component<BR>
 * <BR><BR><img src=../img/carouselbs.png width=50% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/carouselbs.html">DEMO</a>
 */
class CarouselBS extends HTMLElement {
    constructor() {
        console.group("CarouselBS.constructor")
	
        super();

        console.groupEnd();
    };
    
    /**
     * Set observable values here. When Changed, attributeChangedCallback is invoked
     * @observedAttributes
     */
    static get observedAttributes() {
        console.group("CarouselBS.observedAttributes");

	this.observables = ["header"];

        console.groupEnd();
        return this.observables;
    };

    /**
     * This function is called when this is attached to DOM
     * @connectedCallback. 
     */
    connectedCallback() {
        console.group("CarouselBS.connectedCallback")
	
	let self = this;

	// GET PROPERTIES AND INTERESTING ELEMENTS
	this._initialize();

	this.properties.active = this.properties.active || 1;
	this.properties.open   = this.properties.open || "false";

	var close = "";

	if ($(this).hasClass("modal")) {
	    if (this.properties.open == "false") {
		$(this).css("display","none");
	    }

	    close = `<div class="close" onclick="document.getElementById('${this.id}').style.display='none'"><i class="fa fa-times-circle fa-2x"></i></div>`;
	}

	// REPLACE CONTENT IF NECESSARY WITH NEW STUFF
	this.innerHTML = `
<div class="carousel slide" data-ride="carousel" id="${this.id}-actual">
    ${close}

    <div class="carousel-inner">
	${this.dom.content}
    </div>

    <a class="carousel-control-prev" href="#${this.id}-actual" role="button" data-slide="prev">
	<span class="carousel-control-prev-icon" aria-hidden="true"></span>
	<span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#${this.id}-actual" role="button" data-slide="next">
	<span class="carousel-control-next-icon" aria-hidden="true"></span>
	<span class="sr-only">Next</span>
    </a>
</div>`

	let divs = this.querySelectorAll(".carousel-inner > div");
	let cnt = 0
	$(divs).each(function() {
	    cnt ++
	    $(this).addClass("carousel-item");

	    if (cnt == self.properties.active) {
		$(this).addClass("active");
	    }
	});

	// ADD STATS AND OTHER FINAL STUFF
	this._finalize();

	$('#' + this.id).on('slide.bs.carousel', function () {
	    setTimeout(() => {
		let active = $(this).find(".active");
		let id = $(active).attr("id");
		
		wc.publish(this, "wc-carouselbs", {
		    action: "click",
		    id: this.id,
		    active: id
		});
	    }, 1000);
	})

        console.groupEnd();
    };

    /**
     * Invoked When component is removed. Usually with a .remove() function call
     * @disconnectedCallback
     */
    disconnectedCallback() {
        console.group("CarouselBS.disconnectedCallback")

	/* CLEAN UP NOW */

        console.groupEnd();
    };

    /**
     * Called with .setAttribute(...) function call
     * @attributeChangedCallback
     */
    attributeChangedCallback(attr, oldval, newval) {
        console.group("CarouselBS.attributeChangedCallback:", attr, oldval, newval);

	this.properties = this.properties || [];

	let obs = CarouselBS.observedAttributes;

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
	console.group("CarouselBS._fetchElements");
	
	this.dom = this.dom || [];
	this.dom.content = this.innerHTML;

	console.groupEnd();
    };

    /**
     * Component attributes are _fetched and defaults are set if undefined
     * @_fetchAttributes
     * @param {string} [modal=true] mode for our carouselbs
     */
    _fetchAttributes() {
	console.group("CarouselBS._fetchAttributes");
	
	this.properties = {
	    cname      : "CarouselBS",
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
	console.group("CarouselBS._onClick:", this.id);

	wc.publish(this, "wc-carouselbs", {
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
	console.group("CarouselBS.destroy:", this.id);

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
	console.group("CarouselBS.configure:", JSON.stringify(options));

	// PROCESS ALL OPTIONS HERE

	console.groupEnd();
    };

    /**
     * SAVE DATA FOR ANALYTICS
     * @__initialize
     */
    _initialize() {
	console.group("CarouselBS._initialize:", this.id);

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
	console.group("CarouselBS._finalize:", this.id);

	this.classList.add("wc");

	// ADD ANALYTICS HERE
	wc.setStats(this, this.properties.cname, this.properties.version);
	
	// SHOW IT NOW (NO FLICKERS) 
	this.style.visibility = "visible";

	console.groupEnd();
    };
}

window.customElements.define('wc-carouselbs', CarouselBS);





