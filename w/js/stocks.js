/**
 * Stocks Component<BR>
 * <BR><BR><img src=../img/stocks.png width=50% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/stocks.html">DEMO</a>
 */
class Stocks extends HTMLElement {
    constructor() {
        console.group("Stocks.constructor")
	
        super();

        console.groupEnd();
    };
    
    /**
     * Set observable values here. When Changed, attributeChangedCallback is invoked
     * @observedAttributes
     */
    static get observedAttributes() {
        console.group("Stocks.observedAttributes");

	this.observables = ["header"];

        console.groupEnd();
        return this.observables;
    };

    /**
     * This function is called get component template
     * @template
     */
    template() {
        console.group("Stocks.template");
	
	let tmp = "<div class='stocks-container'></div>";

        console.groupEnd();
        return tmp;
    };

    /**
     * This function is called when this is attached to DOM
     * @connectedCallback. 
     */
    connectedCallback() {
        console.group("Stocks.connectedCallback")
	
	let self = this;

	// GET PROPERTIES AND INTERESTING ELEMENTS
	this._initialize();

	// REPLACE CONTENT FROM TEMPLATE
	this.innerHTML = this.template();

	this._update();

	// ADD STATS AND OTHER FINAL STUFF
	this._finalize();
	
        console.groupEnd();
    };

    /**
     * Called with .setAttribute(...) function call
     * @attributeChangedCallback
     */
    attributeChangedCallback(attr, oldval, newval) {
        console.group("Stocks.attributeChangedCallback:", attr, oldval, newval);

	this.properties = this.properties || [];

	let obs = Stocks.observedAttributes;

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
	console.group("Stocks._fetchElements");
	
	this.dom = this.dom || [];
	this.dom.content = this.innerHTML;

	console.groupEnd();
    };

    /**
     * Component attributes are _fetched and defaults are set if undefined
     * @_fetchAttributes
     * @param {string} [modal=true] mode for our stocks
     */
    _fetchAttributes() {
	console.group("Stocks._fetchAttributes");
	
	this.properties = {
	    cname	: "stocks",
	    author	: "Mel Heravi",
	    version	: "1.0",
	    header	: "UNDEFINED HEADER"
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
	console.group("Stocks.destroy:", this.id);

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
	console.group("Stocks.configure:", JSON.stringify(options));

	// PROCESS ALL OPTIONS HERE

	console.groupEnd();
    };

    /**
     * SAVE DATA FOR ANALYTICS
     * @_initialize
     */
    _initialize() {
	console.group("Stocks._initialize:", this.id);

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
	console.group("Stocks._finalize:", this.id);

	this.classList.add("wc");

	// ADD ANALYTICS HERE
	wc.setStats(this, this.properties.cname, this.properties.version);
	
	// SHOW IT NOW (NO FLICKERS) 
	this.style.visibility = "visible";

	console.groupEnd();
    };

    /**
     * SAVE DATA FOR ANALYTICS
     * @_finalize
     */
    _update() {
	console.group("Stocks._finalize:", this.id);

	let self = this;

	let s = this.properties.symbols.split(',');

	const DEFAULT_PORTFOLIOS = [
            {'name': 'Stocks', 'symbols': s}
	];

	const PORTFOLIOS = portfoliosFromQueryParams() || DEFAULT_PORTFOLIOS;
	const REFRESH_SECONDS = 5;
	const BATCH_SIZE = 100;
	const BASE_URL = 'https://api.iextrading.com/1.0/stock/market/batch';

	let symbols = [];
	let containerDiv = document.querySelector('.stocks-container');
	let updatedDiv = document.querySelector('.updated-timestamp');

	PORTFOLIOS.forEach((p, i) => addPortfolio(p, i === 0));
	symbols = symbols.filter((s, i) => symbols.indexOf(s) === i);
	updateData('addTitle');
	setInterval(updateData, REFRESH_SECONDS * 1000);

	function addPortfolio(portfolio, includeHeader) {
            let tableHeaderHtml = '';
            if (includeHeader) {
		tableHeaderHtml = `
		    <thead>
		    <tr>
		    <th></th>
		    <th class="stock-price">LAST</th>
		    <th class="stock-change">CHANGE</th>
		    <th class="stock-change-pct">CHANGE%</th>
		    <th class="stock-mkt-cap">MKT CAP</th>
		    </tr>
		    </thead>
		    `
            }

            let tableBodyHtml = portfolio.symbols.map(symbol => {
		symbol = symbol.toUpperCase();
		symbols.push(symbol);

		let html = `
		    <tr data-symbol="${symbol}">
		    <td class="stock-symbol"><a href="${symbolUrl(symbol)}" target="_blank">${symbol}</a></td>
		    <td class="stock-price"></td>
		    <td class="stock-change"></td>
		    <td class="stock-change-pct"></td>
		    <td class="stock-mkt-cap"></td>
		    </tr>
		    `

		return html;
            }).join('');

            let portfolioDiv = document.createElement('div');

            portfolioDiv.innerHTML = `<table class='table table-bordered table-striped table-condensed'>${tableHeaderHtml}<tbody>${tableBodyHtml}</tbody></table>`;

            containerDiv.appendChild(portfolioDiv);
	}

	function updateData(addTitle) {
            let numberOfBatches = Math.ceil(symbols.length / BATCH_SIZE);

            for (let i = 0; i < numberOfBatches; i++) {
		let symbolsBatch = symbols.slice(i * BATCH_SIZE, (i + 1) * BATCH_SIZE);
		updateDataForBatch(symbolsBatch, addTitle);
            }

            //updatedDiv.innerHTML = `${(new Date()).toLocaleString()}`;
	}

	// URL like:
	// -----------------
	// https://api.iextrading.com/1.0/stock/market/batch?types=quote&symbols=JPM,HOV,C,AAPL,GOOGL,MSFT,AMZN,ORCL&filter=latestPrice,change,changePercent,marketCap,companyName
	//
	// DATA IN LIKE BELOW
	// -----------------
	// {
	//     "JPM":{"quote":{"latestPrice":113.08,"change":-1.35,"changePercent":-0.0118,"marketCap":380048774820,"companyName":"JP Morgan Chase & Co."}},
	//     ...
	// }
	function updateDataForBatch(symbols, addTitle) {
            let filters = ['latestPrice', 'change', 'changePercent', 'marketCap'];
            if (addTitle) filters.push('companyName');
            let url = `${BASE_URL}?types=quote&symbols=${symbols.join(',')}&filter=${filters.join(',')}`;

	    $.getJSON(url, function(json) {
		var cnt = 0;

		for (var i = 0; i < symbols.length; i++) {
		    let symbol = symbols[i];
		    let data = json[symbol];
		    if (typeof(data) === 'undefined') return;

		    let formattedPrice = formatQuote(data.quote.latestPrice);
		    let formattedChange = data.quote.change.toLocaleString('en', {'minimumFractionDigits': 2});
		    let formattedChangePercent = (data.quote.changePercent * 100).toFixed(1) + '%';
		    let formattedMarketCap = formatMarketCap(data.quote.marketCap);
		    let rgbColor = data.quote.changePercent > 0 ? 'green' : '#d50000';
		    let rgbOpacity = Math.min(Math.abs(data.quote.changePercent) * 20, 1);

		    let prices = document.querySelectorAll(`[data-symbol="${symbol}"] .stock-price`);

		    for (let k = 0; k < symbols.length; k++) {
			let e = prices[k];

			if (e) {
			    cnt++;
			    let x = $("table .stock-price").eq(cnt).text();

			    if (x != formattedPrice) {
				e.innerHTML = formattedPrice;
				e.setAttribute('style', `color: ${rgbColor}`);
				
				$(e).parent().find("td").addClass("blink");
				
				setTimeout(function(){
				    $(".blink").removeClass("blink");
				}, 2000);
			    }
			}
		    };

		    var tmp
		    tmp = document.querySelectorAll(`[data-symbol="${symbol}"] .stock-change`);
		    for (let k = 0; k < symbols.length; k++) {
			let e = tmp[k];
			if (e) {
			    e.innerHTML = formattedChange;
			    e.setAttribute('style', `color: ${rgbColor}`);
			}
		    };

		    tmp = document.querySelectorAll(`[data-symbol="${symbol}"] .stock-change-pct`);
		    for (let k = 0; k < symbols.length; k++) {
			let e = tmp[k];
			if (e) {
			    e.innerHTML = formattedChangePercent;
			    e.setAttribute('style', `color: ${rgbColor}`);
			}
		    };

		    tmp = document.querySelectorAll(`[data-symbol="${symbol}"] .stock-mkt-cap`);
		    for (let k = 0; k < symbols.length; k++) {
			let e = tmp[k];
			if (e) {
			    e.innerHTML = formattedMarketCap;
			    e.setAttribute('style', `color: ${rgbColor}`);
			}
		    };

		    if (addTitle) {
			tmp = document.querySelectorAll(`[data-symbol="${symbol}"] .stock-symbol a`);

			for (let k = 0; k < symbols.length; k++) {
			    let e = tmp[k];
			    if (e) {
				e.setAttribute('title', data.quote.companyName);
			    }
			};
		    }
		}
	    });
	}

	function portfoliosFromQueryParams() {
            if (!window.location.search) return;

            let params = new URLSearchParams(window.location.search);
            let portfolios = [];

            for (let p of params) {
		portfolios.push({'name': p[0], 'symbols': p[1].split(',')});
            }

            return portfolios;
	}

	function symbolUrl(symbol) {
            return `https://iextrading.com/apps/stocks/${symbol}`;
	}

	function formatQuote(value) {
            let options = {
		'minimumFractionDigits': 2,
		'style': 'currency',
		'currency': 'USD'
            };
            return value.toLocaleString('en', options);
	}

	function formatMarketCap(marketCap) {
            let value, suffix;
            if (marketCap >= 1e12) {
		value = marketCap / 1e12;
		suffix = 'T';
            } else if (marketCap >= 1e9) {
		value = marketCap / 1e9;
		suffix = 'B';
            } else {
		value = marketCap / 1e6;
		suffix = 'M';
            }

            let digits = value < 10 ? 1 : 0;

            return '$' + value.toFixed(digits) + suffix;
	}

	console.groupEnd();
    }

    /**
     * Invoked When component is removed. Usually with a .remove() function call
     * @disconnectedCallback
     */
    reload(symbols) {
        console.group("Stocks.reload")
	
	$(".stocks-container").empty();
	$(".stocks-container").append("<wc-stocks id='my-stocks-1' symbols='" +  symbols + "'></wc-stocks>")
	
        console.groupEnd();
    };

    /**
     * Invoked When component is removed. Usually with a .remove() function call
     * @disconnectedCallback
     */
    disconnectedCallback() {
        console.group("Stocks.disconnectedCallback")

	/* CLEAN UP NOW */

        console.groupEnd();
    };
}

window.customElements.define('wc-stocks', Stocks);
