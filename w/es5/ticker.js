"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Ticker Component<BR>
 * <BR><BR><img src=../img/ticker.png width=40% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/ticker.html">DEMO</a>
 */
var Ticker = function (_HTMLElement) {
	_inherits(Ticker, _HTMLElement);

	function Ticker() {
		_classCallCheck(this, Ticker);

		console.group("Ticker.constructor");

		var _this = _possibleConstructorReturn(this, (Ticker.__proto__ || Object.getPrototypeOf(Ticker)).call(this));

		console.groupEnd();
		return _this;
	}

	_createClass(Ticker, [{
		key: "connectedCallback",


		/**
   * This function is called when this is attached to DOM
   * @connectedCallback. 
   */
		value: function connectedCallback() {
			console.group("Ticker.connectedCallback");

			var self = this;

			// GET PROPERTIES AND INTERESTING ELEMENTS
			this._initialize();

			// REPLACE CONTENT FROM TEMPLATE
			this.innerHTML = "<wc-ticker-container>AAAAAAAAA</wc-ticker-container>";

			// SAVE THESE FOR setInterval
			this.symbols = this.properties.symbols;
			this.interval = this.properties.interval;

			this._update();

			//setInterval(this._update, this.interval * 1000);

			// ADD STATS AND OTHER FINAL STUFF
			this._finalize();

			console.groupEnd();
		}
	}, {
		key: "_publish",


		/**
   * Publish all events
   * @_publish
   */
		value: function _publish() {
			var _this2 = this;

			console.group("Ticker.publish");

			this.addEventListener("click", function (e) {
				wc.publish(_this2, "wc-ticker", {
					time: new Date().getTime(),
					action: "click",
					id: _this2.id,
					uparam: _this2.properties.uparam
				});
			});

			console.groupEnd();
		}

		/**
   * Called with .setAttribute(...) function call
   * @attributeChangedCallback
   */

	}, {
		key: "attributeChangedCallback",
		value: function attributeChangedCallback(attr, oldval, newval) {
			console.group("Ticker.attributeChangedCallback:", attr, oldval, newval);

			this.properties = this.properties || [];

			var obs = Ticker.observedAttributes;

			for (var i = 0; i < obs.length; i++) {
				if (newval) {
					this.properties[obs[i]] = newval;
				}
			}

			// YOUR CODE FOR CHANGES GO HERE (MAYBE NULL FIRST TIME THROUGH)
			try {
				switch (attr) {
					case "header":
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
			console.group("Ticker._fetchElements");

			this.dom = this.dom || [];
			this.dom.content = this.innerHTML;

			console.groupEnd();
		}
	}, {
		key: "_fetchAttributes",


		/**
   * Component attributes are _fetched and defaults are set if undefined
   * @_fetchAttributes
   * @param {string} [modal=true] mode for our ticker
   */
		value: function _fetchAttributes() {
			console.group("Ticker._fetchAttributes");

			this.properties = {
				cname: "ticker",
				author: "Mel Heravi",
				version: "1.0"
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
			console.group("Ticker.destroy:", this.id);

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
			console.group("Ticker.configure:", JSON.stringify(options));

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
			console.group("Ticker._initialize:", this.id);

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
			console.group("Ticker._finalize:", this.id);

			this.classList.add("wc");

			// ADD ANALYTICS HERE
			wc.setStats(this, this.properties.cname, this.properties.version);

			// SHOW IT NOW (NO FLICKERS) 
			this.style.visibility = "visible";

			console.groupEnd();
		}
	}, {
		key: "disconnectedCallback",


		/**
   * Invoked When component is removed. Usually with a .remove() function call
   * @disconnectedCallback
   */
		value: function disconnectedCallback() {
			console.group("Ticker.disconnectedCallback");

			/* CLEAN UP NOW */

			console.groupEnd();
		}
	}, {
		key: "_update",


		/**
   * Invoked When component is removed. Usually with a .remove() function call
   * @disconnectedCallback
   */
		value: function _update() {
			var _this3 = this;

			console.group("Ticker.update");

			$("wc-ticker-container").empty();

			var sym = this.symbols;
			var fil = "latestPrice,change";
			var url = "https://api.iextrading.com/1.0/stock/market/batch?types=quote&symbols=" + sym + "&filter=" + fil;

			$.getJSON(url, function (json) {
				sym.split(",").forEach(function (tmp) {
					var data = json[tmp];
					if (typeof data === 'undefined') return;

					var change = data.quote.change;

					if (change > 0) {
						$("wc-ticker-container").append("<span style=\"margin-right:10px;color:green\"><b>" + tmp + "</b> $" + data.quote.latestPrice + " <i class='fa fa-caret-up fa-lg'></i></span>");
					} else if (change < 0) {
						$("wc-ticker-container").append("<span style=\"margin-right:10px;color:brown\"><b>" + tmp + "</b> $" + data.quote.latestPrice + " <i class='fa fa-caret-down fa-lg'></i></span>");
					} else {
						$("wc-ticker-container").append("<span style=\"margin-right:10px\"><b>" + tmp + "</b> $" + data.quote.latestPrice + "</span>");
					}
				});
			});

			setTimeout(function () {
				_this3._update();
			}, this.interval * 1000);

			console.groupEnd();
		}
	}], [{
		key: "observedAttributes",


		/**
   * Set observable values here. When Changed, attributeChangedCallback is invoked
   * @observedAttributes
   */
		get: function get() {
			console.group("Ticker.observedAttributes");

			this.observables = [];

			console.groupEnd();
			return this.observables;
		}
	}]);

	return Ticker;
}(HTMLElement);

window.customElements.define('wc-ticker', Ticker);