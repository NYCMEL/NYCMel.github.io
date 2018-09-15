var fpattern = {
    phone:	"\\d{3}[\\-]\\d{3}[\\-]\\d{4}",
    text:	"\\[A-Za-z0-9 \\]",
    email:	"[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$",
    city:	"\\[A-Za-z \\]+",
    state:	"\\[A-Za-z\\]{1,50}",
    zipcode:	"{\\d{5,5}(-\\d{4,4})\\?",
    ssn:	"{^(\\d{3}-|(\\d{3})\\s)\\d{2}-\\d{4}\\$",
    amount:	"{^\\[\\$\\-\\s\\]*\\[\\d\\,\\]*\\?(\\[\\.\\]\\d{0,2})\\?\\s*\\$",
    number:	"\\d*"
}

/**
 * A FORM COMPONENT
 * <BR><BR><img src=../img/form.png width=70% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/form.html">DEMO</a>
 */
class Form extends HTMLElement {
    constructor() {
        console.group("Form.constructor")
	
        super();

        console.groupEnd();
    };
    
    /**
     * Set observable values here. When Changed, attributeChangedCallback is invoked
     * @observedAttributes
     */
    static get observedAttributes() {
        console.group("Form.observedAttributes");

	this.observables = ["size"];
	console.log(this.observables);

        console.groupEnd();
        return this.observables;
    };

    /**
     * This function is called when this is attached to DOM
     * @connectedCallback. 
     */
    connectedCallback() {
        console.group("Form.connectedCallback")
	
	let self = this;

	// FETCH ALL INTERESTING ELEMENTS
	this._fetchElements();

	// FETCH ALL ATTRIBUTES
	this._fetchAttributes();

	// REPLACE CONTENT IF NECESSARY WITH NEW STUFF
	this.innerHTML = `
		<form id='${this.id}-actual' class="${this.properties.class}" name='${this.properties.name}' method='${this.properties.method}' action='${this.properties.action}'>
		    ${this.dom.content}
		    <div class="clearfix" id='${this.id}-results'></div>
		</form>`

	if (this.properties.action !== "undefined") {
	    let form = this.querySelector("form");

	    $(form).validator().on('submit', function (e) {
		if (e.isDefaultPrevented()) {
		    // handle the invalid form...
		} else {
		    e.preventDefault();
		    
		    let values = $(this).serializeArray();
		    
		    console.log('wc.publish: submit', this.id, values);

		    wc.publish(this, this.id, {
			time: new Date().getTime(),
			action: "submit",
			id: this.id,
			values: values
		    });
		}
	    })
	}

	// REPLACE ALL PATTERNS WITH ACTUAL REGEX STRINGS
	let patterns = this.querySelectorAll("[pattern]");
	
	$(patterns).each(function() {
	    let pattern = this.getAttribute("pattern");

	    console.log("---", "fpattern." + pattern);

	    this.setAttribute("pattern", eval("fpattern." + pattern));
	});

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
        console.group("Form.disconnectedCallback")

	/* CLEAN UP NOW */

        console.groupEnd();
    };

    /**
     * Called with .setAttribute(...) function call
     * @attributeChangedCallback
     */
    attributeChangedCallback(attr, oldval, newval) {
        console.group("Form.attributeChangedCallback:", attr, oldval, newval);

	this.properties = this.properties || [];

	let obs = Form.observedAttributes;

	for (let i = 0; i < obs.length; i++) {
	    if (newval) {
		this.properties[obs[i]] = newval;

		// YOUR CODE FOR CHANGES GO HERE 
		switch(attr) 
		{
		    case "size":
		    break;

		    default:
		    break;
		}
	    }
	}
	
        console.groupEnd();
    };

    /**
     * Stores DOM elements of interest for future use
     * @_fetchElements
     */
    _fetchElements() {
	console.group("Form._fetchElements");
	
	this.dom = this.dom || [];
	this.dom.content = this.innerHTML;

	console.groupEnd();
    };

    /**
     * Component attributes are _fetched and defaults are set if undefined
     * @_fetchAttributes
     * @param {string} [method=POST] form method
     * @param {string} [name="NOTSET"] form action
     */
    _fetchAttributes() {
	console.group("Form._fetchAttributes");
	
	this.properties = {
	    "cname"	 : "Form",
	    "author"     : "Mel Heravi",
	    "version"    : "1.0",
	    "method"     : "POST"
	};
	
	// SAVE WIDGET SPECIFIC PROPERTIES
	this.propertiesW = [];

	// SAVE ALL OTHER PROPERTIES
	let attrs = wc.getAttributes(this)

 	for (var key in attrs) {
	    this.properties[key]  = this.getAttribute(key);
	    this.propertiesW[key] = this.getAttribute(key);
	    console.log(key + ": " + attrs[key]);
	}

	console.log("attributes: ", this.properties);

	console.groupEnd();
    };

    /**
     * Destroy the instance object and artifacts
     * @_destroy
     */
    destroy() {
	console.group("Form.destroy:", this.id);

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
	console.group("Form._finalize:", this.id);

	this.classList.add("wc");

	setTimeout(e => {
	    // MARK ALL REQUIRED FIELS
	    $("*[required]").each(function() {
		let id = $(this).attr("id");
		$("#" + id + "-label").addClass("required");
	    });

	    // BIND VARIABLE TO HANDLER
	    try {
		$("*[data-key]").each(function() {
		    let id = $(this).attr("id");
		    tkBind(id, tkBinder);
		});
	    }
	    catch(e) {
		console.error(e.name + ' > ' + e.message);
	    }

	    $("form").validator("update");
	}, 300);

	// ADD ANALYTICS HERE
	wc.setStats(this, this.properties.cname, this.properties.version);

	console.groupEnd();
    };

    /**
     * FOR TESTING PURPOSES
     * @test
     */
    static test() {
	console.group("Form.test");

	console.log("testing results will be printed here...");

	console.groupEnd();
	return true;
    }
}

window.customElements.define('wc-form', Form);




