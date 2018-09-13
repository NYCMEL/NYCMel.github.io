/**
 * A Modal Dialog component
 * <BR><BR><img src=../img/modal.png width=70% style="border:1px lime dashed";>
 * <BR><BR><a href="../html/modal.html">DEMO</a>
 */
class Modal extends HTMLElement {
    constructor() {
        console.group("Modal.constructor")
	
        super();

        console.groupEnd();
    };
    
    /**
     * Set observable values here. When Changed, attributeChangedCallback is invoked
     * @observedAttributes
     */
    static get observedAttributes() {
        console.group("Modal.observedAttributes");

	let observables = ["title"];
	console.log(observables);

        console.groupEnd();
        return observables;
    };

    /**
     * This function is called when this is attached to DOM
     * @connectedCallback. 
     */
    connectedCallback() {
        console.group("Modal.connectedCallback")
	
	let self = this;

	// MAKE SURE OUR COMPONENT HAS GLOBAL CLASS
	this.classList.add("wc");

	// FETCH ALL INTERESTING ELEMENTS
	this._fetchElements();

	// FETCH ALL ATTRIBUTES
	this._fetchAttributes();

	let id = this.id + "-dialog";

	this.innerHTML = `
	    <div class="modal" id="${id}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	    <div class="modal-dialog" role="document">
	    <div class="modal-content" style="width:${this.properties.width};height=${this.properties.height}">
	    <div class="modal-header">
	    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	    <h4 class="modal-title" id="myModalLabel">${this.properties.title}</h4>
	    </div>
	    <div class="modal-body">
	    ${this.dom.body.innerHTML}
	    </div>
	    <div class="modal-footer">
	    ${this.dom.controls.innerHTML}
	    </div>
	    </div>
	    </div>
	    </div>`;

	if (this.properties.title === "UNDEFINED") {
	    this.querySelector(".modal-header").style.display = "none";
	}

	if(!this.dom.controls) {
	    this.querySelector(".modal-footer").style.display = "none";
	}

	// REPOSITION WHEN A MODAL IS SHOWN
	$('.modal').on('show.bs.modal', this._reposition);

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
        console.group("Modal.disconnectedCallback")

	/* CLEAN UP NOW */

        console.groupEnd();
    };

    /**
     * Called with .setAttribute(...) function call
     * @attributeChangedCallback
     */
    attributeChangedCallback(attr, oldval, newval) {
        console.group("Modal.attributeChangedCallback:", attr, oldval, newval);

	this.properties = this.properties || [];

	let obs = Modal.observedAttributes;

	for (let i = 0; i < obs.length; i++) {
	    this.properties[obs[i]] = newval;
            console.log(obs[i] + ": " + this.properties.background);
	    // YOUR CODE FOR CHANGES GO HERE 
	}
	
        console.groupEnd();
    };

    /**
     * Stores DOM elements of interest for future use
     * @_fetchElements
     */
    _fetchElements() {
	console.group("Modal._fetchElements");
	
	this.dom = this.dom || []
	this.dom.content  = this.innerHTML;
	this.dom.body     = this.querySelector("wc-modal-body");
	this.dom.controls = this.querySelector("wc-modal-controls");

	if (this.dom.controls) {
	    this.dom.controls.style.display = "none";
	} else {
	    this.dom.controls = "";
	}

	console.groupEnd();
    };

    /**
     * Component attributes are _fetched and defaults are set if undefined
     * @_fetchAttributes
     * @param {string} author component owner
     * @param {string} version Latest version of this component
     */
    _fetchAttributes() {
	console.group("Modal._fetchAttributes");
	
	this.properties = {
	    "cname"	 : "Modal",
	    "author"     : "Mel Heravi",
	    "version"    : "1.0",
	    "title"	 : "UNDEFINED"
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

	// PROCESS ALL PROPERTIES (example below);
	// this.style.background = this.properties.background;

	console.groupEnd();
    };

    /**
     * Centers the dialog
     * @_reposition
     */
    _reposition() {
	console.group("Modal._reposition");

        var modal = $(this), dialog = modal.find('.modal-dialog');
        modal.css('display', 'block');
        
        // Dividing by two centers the modal exactly, but dividing by three 
        // or four works better for larger screens.
        dialog.css("margin-top", Math.max(0, ($(window).height() - dialog.height()) / 2));

	console.groupEnd();
    }

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
	console.group("Modal._finalize:", this.id);

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
	console.group("Modal.test");

	console.log("testing results will be printed here...");

	console.groupEnd();
	return true;
    }
}

window.customElements.define('wc-modal', Modal);


