/**
 * Chart Component<BR>
 * <BR><BR><img src=../img/chart.png width=30% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/chart.html">DEMO</a>
 */
class Chart extends HTMLElement {
    constructor() {
        console.group("Chart.constructor")
	
        super();

        console.groupEnd();
    };
    
    /**
     * Set observable values here. When Changed, attributeChangedCallback is invoked
     * @observedAttributes
     */
    static get observedAttributes() {
        console.group("Chart.observedAttributes");

	this.observables = [];

        console.groupEnd();
        return this.observables;
    };

    /**
     * This function is called when this is attached to DOM
     * @connectedCallback. 
     */
    connectedCallback() {
        console.group("Chart.connectedCallback")
	
	let self = this;

	// GET PROPERTIES AND INTERESTING ELEMENTS
	this._initialize();

	// REPLACE CONTENT IF NECESSARY WITH NEW STUFF
	this.innerHTML = `<div id="${this.id}-container"><span class="wc-loading-img"></span></div>`;
	
	// ADD STATS AND OTHER FINAL STUFF
	this._finalize();

        console.groupEnd();
    };

    /**
     * Invoked When component is removed. Usually with a .remove() function call
     * @disconnectedCallback
     */
    disconnectedCallback() {
        console.group("Chart.disconnectedCallback")

	/* CLEAN UP NOW */

        console.groupEnd();
    };

    /**
     * Called with .setAttribute(...) function call
     * @attributeChangedCallback
     */
    attributeChangedCallback(attr, oldval, newval) {
        console.group("Chart.attributeChangedCallback:", attr, oldval, newval);

	this.properties = this.properties || [];

	let obs = Chart.observedAttributes;

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
	console.group("Chart._fetchElements");
	
	this.dom = this.dom || [];
	this.dom.content = this.innerHTML;

	console.groupEnd();
    };

    /**
     * Component attributes are _fetched and defaults are set if undefined
     * @_fetchAttributes
     * @param {string} [modal=true] mode for our chart
     */
    _fetchAttributes() {
	console.group("Chart._fetchAttributes");
	
	this.properties = {
	    cname      : "Chart",
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
     * Destroy the instance object and artifacts
     * @_destroy
     */
    destroy() {
	console.group("Chart.destroy:", this.id);

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
    configure(data) {
	console.group("Chart.configure:", data);

	eval("this." + data.type + "(data)");

	console.groupEnd();
    };

    /**
     * SAVE DATA FOR ANALYTICS
     * @__initialize
     */
    _initialize() {
	console.group("Chart._initialize:", this.id);

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
	console.group("Chart._finalize:", this.id);

	this.classList.add("wc");

	// ADD ANALYTICS HERE
	wc.setStats(this, this.properties.cname, this.properties.version);
	
	// SHOW IT NOW (NO FLICKERS) 
	this.style.visibility = "visible";

	console.groupEnd();
    };

    /**
     * PIE CHART (DONUT IF INNSERSIZE SPECIFIED)
     * @pie
     */
    pie(data) {
	console.group("Chart.pie:", data);

	var chart = new Highcharts.Chart({
	    chart: {
		renderTo: `${this.id}-container`,
		type: data.type,
		plotShadow: false,
		backgroundColor:'transparent',
		alternateGridColor: null,
	    },

	    credits: { 
		enabled: false 
	    },

	    navigation: {
		buttonOptions: {
		    enabled: false
		}
	    },
	    
	    tooltip: { 
		pointFormat: '<b>{point.percentage:.1f}%</b>' 
	    },
	    
	    plotOptions: {
		pie: {
		    innerSize: '60%',
		    size: data.size
		}
	    },

	    title:{
		text:data.title
	    },

	    series: [{
		marker: {
		    enabled: false
		},
		dataLabels: {
		    enabled: data.labels
		},
		enableMouseTracking: true,
		innerSize: data.innerSize,

		center: ['50%', '50%'],
		
		data: data.data
	    }]
	});
	console.groupEnd();
    };
}

window.customElements.define('wc-chart', Chart);
