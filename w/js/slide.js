/**
 * Slide Component<BR>
 * <BR><BR><img src=../img/slide.png width=80% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/slide.html">DEMO</a>
 */
class Slide extends HTMLElement {
    constructor() {
        console.group("Slide.constructor")
	
        super();

        console.groupEnd();
    };
    
    /**
     * Set observable values here. When Changed, attributeChangedCallback is invoked
     * @observedAttributes
     */
    static get observedAttributes() {
        console.group("Slide.observedAttributes");

	this.observables = ["toggle", "search", "title"];

        console.groupEnd();
        return this.observables;
    };

    /**
     * This function is called when this is attached to DOM
     * @connectedCallback. 
     */
    connectedCallback() {
        console.group("Slide.connectedCallback")
	
	let self = this;

	// GET PROPERTIES AND INTERESTING ELEMENTS
	this._initialize();

	if (this.properties.search == "true") {
	    var display = `block`;
	} else {
	    var display = `none`;
	}

	// REPLACE CONTENT IF NECESSARY WITH NEW STUFF
	this.innerHTML = `
		<wc-slide-menus>
		    <wc-slide-title>
			${this.properties.title}
		    </wc-slide-title>
		
		    <wc-slide-search style="display:${display}">
			<input type="text" placeholder="Search for names.." autocomplete='off' />
		    </wc-slide-search>
		
		    <wc-slide-menus>
			${this.dom.menus.innerHTML}
		    </wc-slide-menus>
		</wc-slide-menus>`;

	let search = document.querySelector("wc-slide-search input");

	search.addEventListener("keyup", this.search);

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
	console.group("Slide.publish");

	self = this;

	$("wc-slide-menus a").on("click", function() {
	    self._click(this);
	});
	
	console.groupEnd();
	return true;
    }

    /**
     * A sample callback usage function - see connectedCallback()
     * @_onClick
     */
    _click(self) {
	console.group("Slide._click:", self.id);

	wc.publish(self, "my-slide", {
	    time: new Date().getTime(),
	    action: "click",
	    id: self.id,
	});

	console.groupEnd();
    };

    /**
     * 
     * @open
     */
    open() {
        console.group("Slide.open")

	sidr.open(this.id);

	document.addEventListener("click", e => {
	    this.close();
	});

        console.groupEnd();
    };

    /**
     * 
     * @close
     */
    close() {
        console.group("Slide.close")

	sidr.close(this.id);

        console.groupEnd();
    };

    /**
     * Invoked When component is removed. Usually with a .remove() function call
     * @disconnectedCallback
     */
    disconnectedCallback() {
        console.group("Slide.disconnectedCallback")

	/* CLEAN UP NOW */

        console.groupEnd();
    };

    /**
     * Called with .setAttribute(...) function call
     * @attributeChangedCallback
     */
    attributeChangedCallback(attr, oldval, newval) {
        console.group("Slide.attributeChangedCallback:", attr, oldval, newval);

	this.properties = this.properties || [];

	let obs = Slide.observedAttributes;

	for (let i = 0; i < obs.length; i++) {
	    if (newval) {
		this.properties[obs[i]] = newval;
	    }
	}
	
	// YOUR CODE FOR CHANGES GO HERE (MAYBE NULL FIRST TIME THROUGH)
	try {
	    switch(attr) 
	    {
		case "title":
		break;
		
		case "search":
		break;
		
		case "toggle":
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
	console.group("Slide._fetchElements");
	
	this.dom = this.dom || [];
	this.dom.menus = this.querySelector("wc-slide-menus");

	console.groupEnd();
    };

    /**
     * Component attributes are _fetched and defaults are set if undefined
     * @_fetchAttributes
     * @param {string} [modal=true] mode for our slide
     */
    _fetchAttributes() {
	console.group("Slide._fetchAttributes");
	
	this.properties = {
	    cname	: "Slide",
	    author	: "Mel Heravi",
	    version	: "1.0",
	    title	: "",
	    search	: "true"
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
		case "title":
		break;
		
		case "search":
		break;
		
		case "title":
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
	console.group("Slide._onClick:", this.id);

	wc.publish(this, "wc-slide", {
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
	console.group("Slide.destroy:", this.id);

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
	console.group("Slide.configure:", JSON.stringify(options));

	// PROCESS ALL OPTIONS HERE

	console.groupEnd();
    };

    /**
     * SAVE DATA FOR ANALYTICS
     * @__initialize
     */
    _initialize() {
	console.group("Slide._initialize:", this.id);

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
	console.group("Slide._finalize:", this.id);

	this.classList.add("wc");

	// ADD ANALYTICS HERE
	wc.setStats(this, this.properties.cname, this.properties.version);
	
	// SHOW IT NOW (NO FLICKERS) 
	this.style.visibility = "visible";

	let toggler = this.getAttribute("toggler");
	let speed   = this.getAttribute("speed");

	// ADD EVENT TO TOGGLER
	document.querySelector("#" + toggler).addEventListener("click", e => {
	    this.open();
	});

	// MAKE IT HAPPEN
        sidr.new('#' + toggler, {
	    name: 'my-slide',
	    side: 'left',
	    timing: 'ease-in-out',
	    speed: speed
        });

	console.groupEnd();
    };

    /**
     * SAVE DATA FOR ANALYTICS
     * @search
     */
    search() {
	console.group("Slide.search");

	let root = this.parentNode.parentNode.parentNode;

	// Declare variables
	var input, filter, ul, li, a, i;
	var input = root.querySelector('wc-slide-search input');
	var list  = root.querySelector('wc-slide-menus');

	console.log($(input).val())
	filter = input.value.toUpperCase();

	console.log(">>>>>>>", input.value);
	
	if(input.value) {
            // HIDE THE ONES NOT CONTAINING THE INPUT
            $(list).find("ul li > a:not(:Contains(" + filter + "))").parent().slideUp();

            // SHOW THE ONES THAT DO
            $(list).find("ul li > a:Contains(" + filter + ")").parent().slideDown();
        } else {
            // RETURN TO DEFAULT
            $(list).find("ul li").slideDown();
        }

	console.groupEnd();
    }

    /**
     * SAVE DATA FOR ANALYTICS
     * @search
     */
    search() {
	console.group("Slide.search");

	//let root = this.parentNode.parentNode.parentNode;
	let slide = wc.getClosest(this, "wc-slide");

	// Declare variables
	var input, filter, ul, li, a, i;

	input = slide.querySelector('wc-slide-search input');

	console.log($(input).val())

	filter = input.value.toUpperCase();

	li = slide.querySelectorAll("wc-slide-menus ul li");

	// Loop through all list items, and hide those who don't match the search query
	for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];

            if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
		$(li[i]).slideDown();
            } else {
		if($(li[i]).find("ul").length == 0) {
		    $(li[i]).slideUp();
		}
            }
	}

	console.groupEnd();
    }
}

window.customElements.define('wc-slide', Slide);
