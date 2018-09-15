"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Stocks Component<BR>
 * <BR><BR><img src=../img/stocks.png width=50% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/stocks.html">DEMO</a>
 */
var Stocks = function (_HTMLElement) {
	_inherits(Stocks, _HTMLElement);

	function Stocks() {
		_classCallCheck(this, Stocks);

		console.group("Stocks.constructor");

		var _this = _possibleConstructorReturn(this, (Stocks.__proto__ || Object.getPrototypeOf(Stocks)).call(this));

		console.groupEnd();
		return _this;
	}

	_createClass(Stocks, [{
		key: "template",


		/**
   * This function is called get component template
   * @template
   */
		value: function template() {
			console.group("Stocks.template");

			var tmp = "<div class='stocks-container'></div>";

			console.groupEnd();
			return tmp;
		}
	}, {
		key: "connectedCallback",


		/**
   * This function is called when this is attached to DOM
   * @connectedCallback. 
   */
		value: function connectedCallback() {
			console.group("Stocks.connectedCallback");

			var self = this;

			// GET PROPERTIES AND INTERESTING ELEMENTS
			this._initialize();

			// REPLACE CONTENT FROM TEMPLATE
			this.innerHTML = this.template();

			this._update();

			// ADD STATS AND OTHER FINAL STUFF
			this._finalize();

			console.groupEnd();
		}
	}, {
		key: "attributeChangedCallback",


		/**
   * Called with .setAttribute(...) function call
   * @attributeChangedCallback
   */
		value: function attributeChangedCallback(attr, oldval, newval) {
			console.group("Stocks.attributeChangedCallback:", attr, oldval, newval);

			this.properties = this.properties || [];

			var obs = Stocks.observedAttributes;

			for (var i = 0; i < obs.length; i++) {
				if (newval) {
					this.properties[obs[i]] = newval;
				}
			}

			// YOUR CODE FOR CHANGES GO HERE (MAYBE NULL FIRST TIME THROUGH)
			try {
				switch (attr) {
					case "header":
						var h = this.querySelector(".wc-header");
						h.innerHTML = newval;
						break;

					default:
						break;
				}
			} catch (e) {
				console.warn(e.name + ' > ' + e.message);
			}

			console.groupEnd();
		}
	}, {
		key: "_fetchElements",


		/**
   * Stores DOM elements of interest for future use
   * @_fetchElements
   */
		value: function _fetchElements() {
			console.group("Stocks._fetchElements");

			this.dom = this.dom || [];
			this.dom.content = this.innerHTML;

			console.groupEnd();
		}
	}, {
		key: "_fetchAttributes",


		/**
   * Component attributes are _fetched and defaults are set if undefined
   * @_fetchAttributes
   * @param {string} [modal=true] mode for our stocks
   */
		value: function _fetchAttributes() {
			console.group("Stocks._fetchAttributes");

			this.properties = {
				cname: "stocks",
				author: "Mel Heravi",
				version: "1.0",
				header: "UNDEFINED HEADER"
			};

			// SAVE WIDGET SPECIFIC PROPERTIES
			this.propertiesW = [];

			// SAVE ALL OTHER PROPERTIES
			var attrs = wc.getAttributes(this);

			for (var key in attrs) {
				var attr = this.getAttribute(key) || this.properties.key;
				this.properties[key] = this.getAttribute(key);
				this.propertiesW[key] = this.getAttribute(key);
				console.log(key + ": " + attrs[key]);
			}

			// SET ALL INITIAL ATTRIBUTES
			for (var key in this.properties) {
				switch (key) {
					case "header":
						var h = document.querySelector("wc-header");
						break;

					default:
						break;
				}
			}

			console.log("ATTRIBUTES: ", this.properties);

			console.groupEnd();
		}
	}, {
		key: "destroy",


		/**
   * Destroy the instance object and artifacts
   * @destroy
   */
		value: function destroy() {
			console.group("Stocks.destroy:", this.id);

			// FREE ALL MEMORY
			// you should delete all created objects here

			// FREE POINTER
			delete this;

			// REMOVE ITEM FROM DOM
			this.parentNode.removeChild(this);

			console.groupEnd();
		}
	}, {
		key: "configure",


		/**
   * configure the instance object and artifacts
   * @configure
   */
		value: function configure(options) {
			console.group("Stocks.configure:", JSON.stringify(options));

			// PROCESS ALL OPTIONS HERE

			console.groupEnd();
		}
	}, {
		key: "_initialize",


		/**
   * SAVE DATA FOR ANALYTICS
   * @_initialize
   */
		value: function _initialize() {
			console.group("Stocks._initialize:", this.id);

			// FETCH ALL INTERESTING ELEMENTS
			this._fetchElements();

			// FETCH ALL ATTRIBUTES
			this._fetchAttributes();

			console.groupEnd();
		}
	}, {
		key: "_finalize",


		/**
   * SAVE DATA FOR ANALYTICS
   * @_finalize
   */
		value: function _finalize() {
			console.group("Stocks._finalize:", this.id);

			this.classList.add("wc");

			// ADD ANALYTICS HERE
			wc.setStats(this, this.properties.cname, this.properties.version);

			// SHOW IT NOW (NO FLICKERS) 
			this.style.visibility = "visible";

			console.groupEnd();
		}
	}, {
		key: "_update",


		/**
   * SAVE DATA FOR ANALYTICS
   * @_finalize
   */
		value: function _update() {
			console.group("Stocks._finalize:", this.id);

			var self = this;

			var s = this.properties.symbols.split(',');

			var DEFAULT_PORTFOLIOS = [{ 'name': 'Stocks', 'symbols': s }];

			var PORTFOLIOS = portfoliosFromQueryParams() || DEFAULT_PORTFOLIOS;
			var REFRESH_SECONDS = 5;
			var BATCH_SIZE = 100;
			var BASE_URL = 'https://api.iextrading.com/1.0/stock/market/batch';

			var symbols = [];
			var containerDiv = document.querySelector('.stocks-container');
			var updatedDiv = document.querySelector('.updated-timestamp');

			PORTFOLIOS.forEach(function (p, i) {
				return addPortfolio(p, i === 0);
			});
			symbols = symbols.filter(function (s, i) {
				return symbols.indexOf(s) === i;
			});
			updateData('addTitle');
			setInterval(updateData, REFRESH_SECONDS * 1000);

			function addPortfolio(portfolio, includeHeader) {
				var tableHeaderHtml = '';
				if (includeHeader) {
					tableHeaderHtml = "\n\t\t    <thead>\n\t\t    <tr>\n\t\t    <th></th>\n\t\t    <th class=\"stock-price\">LAST</th>\n\t\t    <th class=\"stock-change\">CHANGE</th>\n\t\t    <th class=\"stock-change-pct\">CHANGE%</th>\n\t\t    <th class=\"stock-mkt-cap\">MKT CAP</th>\n\t\t    </tr>\n\t\t    </thead>\n\t\t    ";
				}

				var tableBodyHtml = portfolio.symbols.map(function (symbol) {
					symbol = symbol.toUpperCase();
					symbols.push(symbol);

					var html = "\n\t\t    <tr data-symbol=\"" + symbol + "\">\n\t\t    <td class=\"stock-symbol\"><a href=\"" + symbolUrl(symbol) + "\" target=\"_blank\">" + symbol + "</a></td>\n\t\t    <td class=\"stock-price\"></td>\n\t\t    <td class=\"stock-change\"></td>\n\t\t    <td class=\"stock-change-pct\"></td>\n\t\t    <td class=\"stock-mkt-cap\"></td>\n\t\t    </tr>\n\t\t    ";

					return html;
				}).join('');

				var portfolioDiv = document.createElement('div');

				portfolioDiv.innerHTML = "<table class='table table-bordered table-striped table-condensed'>" + tableHeaderHtml + "<tbody>" + tableBodyHtml + "</tbody></table>";

				containerDiv.appendChild(portfolioDiv);
			}

			function updateData(addTitle) {
				var numberOfBatches = Math.ceil(symbols.length / BATCH_SIZE);

				for (var i = 0; i < numberOfBatches; i++) {
					var symbolsBatch = symbols.slice(i * BATCH_SIZE, (i + 1) * BATCH_SIZE);
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
				var filters = ['latestPrice', 'change', 'changePercent', 'marketCap'];
				if (addTitle) filters.push('companyName');
				var url = BASE_URL + "?types=quote&symbols=" + symbols.join(',') + "&filter=" + filters.join(',');

				$.getJSON(url, function (json) {
					var cnt = 0;

					for (var i = 0; i < symbols.length; i++) {
						var symbol = symbols[i];
						var data = json[symbol];
						if (typeof data === 'undefined') return;

						var formattedPrice = formatQuote(data.quote.latestPrice);
						var formattedChange = data.quote.change.toLocaleString('en', { 'minimumFractionDigits': 2 });
						var formattedChangePercent = (data.quote.changePercent * 100).toFixed(1) + '%';
						var formattedMarketCap = formatMarketCap(data.quote.marketCap);
						var rgbColor = data.quote.changePercent > 0 ? 'green' : '#d50000';
						var rgbOpacity = Math.min(Math.abs(data.quote.changePercent) * 20, 1);

						var prices = document.querySelectorAll("[data-symbol=\"" + symbol + "\"] .stock-price");

						for (var k = 0; k < symbols.length; k++) {
							var e = prices[k];

							if (e) {
								cnt++;
								var x = $("table .stock-price").eq(cnt).text();

								if (x != formattedPrice) {
									e.innerHTML = formattedPrice;
									e.setAttribute('style', "color: " + rgbColor);

									$(e).parent().find("td").addClass("blink");

									setTimeout(function () {
										$(".blink").removeClass("blink");
									}, 2000);
								}
							}
						};

						var tmp;
						tmp = document.querySelectorAll("[data-symbol=\"" + symbol + "\"] .stock-change");
						for (var _k = 0; _k < symbols.length; _k++) {
							var _e = tmp[_k];
							if (_e) {
								_e.innerHTML = formattedChange;
								_e.setAttribute('style', "color: " + rgbColor);
							}
						};

						tmp = document.querySelectorAll("[data-symbol=\"" + symbol + "\"] .stock-change-pct");
						for (var _k2 = 0; _k2 < symbols.length; _k2++) {
							var _e2 = tmp[_k2];
							if (_e2) {
								_e2.innerHTML = formattedChangePercent;
								_e2.setAttribute('style', "color: " + rgbColor);
							}
						};

						tmp = document.querySelectorAll("[data-symbol=\"" + symbol + "\"] .stock-mkt-cap");
						for (var _k3 = 0; _k3 < symbols.length; _k3++) {
							var _e3 = tmp[_k3];
							if (_e3) {
								_e3.innerHTML = formattedMarketCap;
								_e3.setAttribute('style', "color: " + rgbColor);
							}
						};

						if (addTitle) {
							tmp = document.querySelectorAll("[data-symbol=\"" + symbol + "\"] .stock-symbol a");

							for (var _k4 = 0; _k4 < symbols.length; _k4++) {
								var _e4 = tmp[_k4];
								if (_e4) {
									_e4.setAttribute('title', data.quote.companyName);
								}
							};
						}
					}
				});
			}

			function portfoliosFromQueryParams() {
				if (!window.location.search) return;

				var params = new URLSearchParams(window.location.search);
				var portfolios = [];

				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = params[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var p = _step.value;

						portfolios.push({ 'name': p[0], 'symbols': p[1].split(',') });
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}

				return portfolios;
			}

			function symbolUrl(symbol) {
				return "https://iextrading.com/apps/stocks/" + symbol;
			}

			function formatQuote(value) {
				var options = {
					'minimumFractionDigits': 2,
					'style': 'currency',
					'currency': 'USD'
				};
				return value.toLocaleString('en', options);
			}

			function formatMarketCap(marketCap) {
				var value = void 0,
				    suffix = void 0;
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

				var digits = value < 10 ? 1 : 0;

				return '$' + value.toFixed(digits) + suffix;
			}

			console.groupEnd();
		}

		/**
   * Invoked When component is removed. Usually with a .remove() function call
   * @disconnectedCallback
   */

	}, {
		key: "reload",
		value: function reload(symbols) {
			console.group("Stocks.reload");

			$(".stocks-container").empty();
			$(".stocks-container").append("<wc-stocks id='my-stocks-1' symbols='" + symbols + "'></wc-stocks>");

			console.groupEnd();
		}
	}, {
		key: "disconnectedCallback",


		/**
   * Invoked When component is removed. Usually with a .remove() function call
   * @disconnectedCallback
   */
		value: function disconnectedCallback() {
			console.group("Stocks.disconnectedCallback");

			/* CLEAN UP NOW */

			console.groupEnd();
		}
	}], [{
		key: "observedAttributes",


		/**
   * Set observable values here. When Changed, attributeChangedCallback is invoked
   * @observedAttributes
   */
		get: function get() {
			console.group("Stocks.observedAttributes");

			this.observables = ["header"];

			console.groupEnd();
			return this.observables;
		}
	}]);

	return Stocks;
}(HTMLElement);

window.customElements.define('wc-stocks', Stocks);