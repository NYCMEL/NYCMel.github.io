"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * band Component<BR>
 * <BR><BR><img src=/tk/lib/components/w/img/band.png width=60% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="/tk/lib/components/w/html/band.html">DEMO</a>
 */
var Band = function (_HTMLElement) {
	_inherits(Band, _HTMLElement);

	function Band() {
		_classCallCheck(this, Band);

		console.group("Band.constructor");

		var _this = _possibleConstructorReturn(this, (Band.__proto__ || Object.getPrototypeOf(Band)).call(this));

		console.groupEnd();
		return _this;
	}

	_createClass(Band, [{
		key: "connectedCallback",


		/**
   * This function is called when this is attached to DOM
   * @connectedCallback. 
   */
		value: function connectedCallback() {
			console.group("Band.connectedCallback");

			var self = this;

			// GET PROPERTIES AND INTERESTING ELEMENTS
			this._initialize();

			// REPLACE CONTENT IF NECESSARY WITH NEW STUFF
			this.innerHTML = "\n<div class=\"row\">\n    <div class=\"wc-band-lhs\">\n    </div>\n    \n    <div class=\"wc-band-rhs\">\n    </div>\n</div>\n";
			// ADD STATS AND OTHER FINAL STUFF
			this._finalize();

			// PUBLISH INTERESTING EVENTS
			//this._publish();

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

			console.group("Band.publish");

			this.addEventListener("click", function (e) {
				_this2._click();
			});

			console.groupEnd();
		}

		/**
   * A sample callback usage function - see connectedCallback()
   * @_click
   */

	}, {
		key: "_click",
		value: function _click() {
			console.group("Band._click:", this.id);

			wc.publish(this, "wc-band", {
				time: new Date().getTime(),
				action: "click",
				id: this.id,
				uparam: this.properties.uparam
			});

			console.groupEnd();
		}
	}, {
		key: "disconnectedCallback",


		/**
   * Invoked When component is removed. Usually with a .remove() function call
   * @disconnectedCallback
   */
		value: function disconnectedCallback() {
			console.group("Band.disconnectedCallback");

			/* CLEAN UP NOW */

			console.groupEnd();
		}
	}, {
		key: "attributeChangedCallback",


		/**
   * Called with .setAttribute(...) function call
   * @attributeChangedCallback
   */
		value: function attributeChangedCallback(attr, oldval, newval) {
			console.group("Band.attributeChangedCallback:", attr, oldval, newval);

			this.properties = this.properties || [];

			var obs = Band.observedAttributes;

			for (var i = 0; i < obs.length; i++) {
				if (newval) {
					this.properties[obs[i]] = newval;
				}
			}

			// YOUR CODE FOR CHANGES GO HERE (MAYBE NULL FIRST TIME THROUGH)
			try {
				switch (attr) {
					case "background":
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
			console.group("Band._fetchElements");

			this.dom = this.dom || [];
			this.dom.content = this.innerHTML;

			console.groupEnd();
		}
	}, {
		key: "_fetchAttributes",


		/**
   * Component attributes are _fetched and defaults are set if undefined
   * @_fetchAttributes
   * @param {string} [modal=true] mode for our band
   */
		value: function _fetchAttributes() {
			console.group("Band._fetchAttributes");

			this.properties = {
				cname: "band",
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
					case "background":
						break;

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
		key: "_onClick",


		/**
   * A sample callback usage function - see connectedCallback()
   * @_onClick
   */
		value: function _onClick() {
			console.group("Band._onClick:", this.id);

			wc.publish(this, "wc-band", {
				action: "click",
				id: this.id,
				uparam: this.properties.uparam
			});

			console.groupEnd();
		}
	}, {
		key: "destroy",


		/**
   * Destroy the instance object and artifacts
   * @_destroy
   */
		value: function destroy() {
			console.group("Band.destroy:", this.id);

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
   * @_configure
   */
		value: function configure(band) {
			console.group("Band.configure");

			this._lhs("lhs", band.lhs);
			this._rhs("rhs", band.rhs);

			console.groupEnd();
		}
	}, {
		key: "_lhs",


		/**
   * @__lhs
   */
		value: function _lhs(side, band) {
			console.group("Band._lhs:", side, band);

			// CALL FUNC BASED ON CATEGORY
			eval("this._" + band.category + "(side, band)");

			console.groupEnd();
		}
	}, {
		key: "_table",


		/**
   * @__table
   */
		value: function _table(side, band) {
			var _this3 = this;

			console.group("Band._table:", side, band);

			var con = "#" + this.id + " .wc-band-" + side;

			$(con).empty();

			$(con).addClass(band.width).append("<wc-table-plain></wc-table-plain>");

			setTimeout(function (e) {
				var tbl = _this3.querySelector("wc-table-plain");
				tbl.configure(band);
			}, 200);

			console.groupEnd();
		}
	}, {
		key: "_rhs",


		/**
   * 
   * @__lhs
   */
		value: function _rhs(side, band) {
			console.group("Band._rhs", side, band);

			// CALL FUNC BASED ON CATEGORY
			eval("this._" + band.category + "(side, band)");

			console.groupEnd();
		}
	}, {
		key: "_chart",


		/**
   * 
   * @__lhs
   */
		value: function _chart(side, band) {
			console.group("Band._chart:", side, band);

			var con = "#" + this.id + " .wc-band-" + side;

			$(con).empty();

			$(con).addClass(band.width).append("<wc-chart id=\"" + this.id + "-" + side + "\"></wc-chart>");

			var chart = this.querySelector("wc-chart");

			eval("chart." + band.type + "(band)");

			console.groupEnd();
		}
	}, {
		key: "_initialize",


		/**
   * SAVE DATA FOR ANALYTICS
   * @__initialize
   */
		value: function _initialize() {
			console.group("Band._initialize:", this.id);

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
   * @__finalize
   */
		value: function _finalize() {
			console.group("Band._finalize:", this.id);

			this.classList.add("wc");

			// ADD ANALYTICS HERE
			wc.setStats(this, this.properties.cname, this.properties.version);

			// SHOW IT NOW (NO FLICKERS) 
			this.style.visibility = "visible";

			console.groupEnd();
		}
	}], [{
		key: "observedAttributes",


		/**
   * Set observable values here. When Changed, attributeChangedCallback is invoked
   * @observedAttributes
   */
		get: function get() {
			console.group("Band.observedAttributes");

			this.observables = ["header"];

			console.groupEnd();
			return this.observables;
		}
	}]);

	return Band;
}(HTMLElement);

window.customElements.define('wc-band', Band);