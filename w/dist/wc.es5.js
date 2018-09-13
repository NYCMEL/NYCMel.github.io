"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Accordion Component<BR>
 * <BR><BR><img src=../img/accordion.png width=60% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/accordion.html">DEMO</a>
 */
var Accordion = function (_HTMLElement) {
	_inherits(Accordion, _HTMLElement);

	function Accordion() {
		_classCallCheck(this, Accordion);

		console.group("Accordion.constructor");

		var _this = _possibleConstructorReturn(this, (Accordion.__proto__ || Object.getPrototypeOf(Accordion)).call(this));

		console.groupEnd();
		return _this;
	}

	_createClass(Accordion, [{
		key: "connectedCallback",


		/**
   * This function is called when this is attached to DOM
   * @connectedCallback. 
   */
		value: function connectedCallback() {
			console.group("Accordion.connectedCallback");

			var self = this;

			// GET PROPERTIES AND INTERESTING ELEMENTS
			this._initialize();

			this.properties.show = this.properties.show || 1;

			this.headers = this.querySelectorAll(".card-header");
			this.bodies = this.querySelectorAll(".card-body");

			var cnt = 0;
			$(this.headers).each(function () {
				cnt++;

				$(this).attr({
					"data-toggle": "collapse",
					"data-target": "#collaps-" + cnt,
					"aria-expanded": "false",
					"aria-controls": "collaps-" + cnt
				});
			});

			cnt = 0;
			$(this.bodies).each(function () {
				cnt++;

				var state = "";
				if (cnt == self.properties.show) {
					state = "show";
				}

				$(this).wrap("<div id=\"collaps-" + cnt + "\" class=\"collapse " + state + "\" aria-labelledby=\"heading-" + cnt + "\" data-parent=\"#" + self.id + "\">");
			});

			// ADD STATS AND OTHER FINAL STUFF
			this._finalize();

			// PUBLISH INTERESTING EVENTS
			this._publish();

			console.groupEnd();
		}
	}, {
		key: "_publish",


		/**
   * Publish all events
   * @_publish
   */
		value: function _publish() {
			console.group("Accordion.publish");

			$(this.bodies).each(function () {
				var _this2 = this;

				this.addEventListener("click", function (e) {
					_this2._click();
				});
			});

			console.groupEnd();
			return true;
		}

		/**
   * A sample callback usage function - see connectedCallback()
   * @_click
   */

	}, {
		key: "_click",
		value: function _click() {
			console.group("Accordion._click:", this.id);

			wc.publish(this, "wc-accordion", {
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
			console.group("Accordion.disconnectedCallback");

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
			console.group("Accordion.attributeChangedCallback:", attr, oldval, newval);

			this.properties = this.properties || [];

			var obs = Accordion.observedAttributes;

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
			console.group("Accordion._fetchElements");

			this.dom = this.dom || [];
			this.dom.content = this.innerHTML;

			console.groupEnd();
		}
	}, {
		key: "_fetchAttributes",


		/**
   * Component attributes are _fetched and defaults are set if undefined
   * @_fetchAttributes
   * @param {string} [modal=true] mode for our accordion
   */
		value: function _fetchAttributes() {
			console.group("Accordion._fetchAttributes");

			this.properties = {
				cname: "Accordion",
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
					case "background":
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
			console.group("Accordion._onClick:", this.id);

			wc.publish(this, "wc-accordion", {
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
			console.group("Accordion.destroy:", this.id);

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
		value: function configure(options) {
			console.group("Accordion.configure:", JSON.stringify(options));

			// PROCESS ALL OPTIONS HERE

			console.groupEnd();
		}
	}, {
		key: "_initialize",


		/**
   * SAVE DATA FOR ANALYTICS
   * @__initialize
   */
		value: function _initialize() {
			console.group("Accordion._initialize:", this.id);

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
			console.group("Accordion._finalize:", this.id);

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
			console.group("Accordion.observedAttributes");

			this.observables = [];

			console.groupEnd();
			return this.observables;
		}
	}]);

	return Accordion;
}(HTMLElement);

window.customElements.define('wc-accordion', Accordion);"use strict";

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

window.customElements.define('wc-band', Band);"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A breadcrumb component 
 * <BR><BR><img src=../img/breadcrumb.png width=30% style="border:1px lime dashed";>
 * <BR><BR><a href="../html/breadcrumb.html">DEMO</a>
 */
var Breadcrumb = function (_HTMLElement) {
  _inherits(Breadcrumb, _HTMLElement);

  function Breadcrumb() {
    _classCallCheck(this, Breadcrumb);

    console.group("Breadcrumb.constructor");

    var _this = _possibleConstructorReturn(this, (Breadcrumb.__proto__ || Object.getPrototypeOf(Breadcrumb)).call(this));

    console.groupEnd();
    return _this;
  }

  _createClass(Breadcrumb, [{
    key: "connectedCallback",


    /**
     * This function is called when this is attached to DOM
     * @connectedCallback. 
     */
    value: function connectedCallback() {
      console.group("Breadcrumb.connectedCallback");

      var self = this;

      // MAKE SURE OUR COMPONENT HAS GLOBAL CLASS
      this.classList.add("wc");

      // FETCH ALL INTERESTING ELEMENTS
      this._fetchElements();

      // FETCH ALL ATTRIBUTES
      this._fetchAttributes();

      this.innerHTML = this.dom.content;

      // WRAP UP AND ADD STATS
      this._finalize();

      //SHOW IT NOW (NO FLICKERS) 
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
      console.group("Breadcrumb.disconnectedCallback");

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
      console.group("Breadcrumb.attributeChangedCallback:", attr, oldval, newval);

      this.properties = this.properties || [];

      var obs = Maker.observedAttributes;

      for (var i = 0; i < obs.length; i++) {
        this.properties[obs[i]] = newval;
        console.log(obs[i] + ": " + this.properties.background);
        // YOUR CODE FOR CHANGES GO HERE 
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
      console.group("Breadcrumb._fetchElements");

      this.dom = {};
      this.dom.content = this.innerHTML;

      console.groupEnd();
    }
  }, {
    key: "_fetchAttributes",


    /**
     * Component attributes are _fetched and defaults are set if undefined
     * @_fetchAttributes
     * @param {string} [background=indianred] background color
     */
    value: function _fetchAttributes() {
      console.group("Breadcrumb._fetchAttributes");

      // SAVE WIDGET SPECIFIC PROPERTIES
      this.propertiesW = [];

      // SAVE ALL OTHER PROPERTIES
      var attrs = wc.getAttributes(this);

      for (var key in attrs) {
        this.properties[key] = this.getAttribute(key);
        this.propertiesW[key] = this.getAttribute(key);
        console.log(key + ": " + attrs[key]);
      }

      console.log("attributes: ", this.properties);

      // PROCESS ALL PROPERTIES (example below);
      // this.style.background = this.properties.background;

      console.groupEnd();
    }
  }, {
    key: "destroy",


    /**
     * Destroy the instance object and artifacts
     * @_destroy
     */
    value: function destroy() {
      console.group("Message.destroy:", this.id);

      // FREE POINTER
      delete this;

      // REMOVE ITEM FROM DOM
      this.parentNode.removeChild(this);

      console.groupEnd();
    }
  }, {
    key: "_finalize",


    /**
     * SAVE DATA FOR ANALYTICS
     * @__finalize
     */
    value: function _finalize() {
      console.group("Breadcrumb._finalize:", this.id);

      this.classList.add("wc");

      // ADD ANALYTICS HERE
      wc.setStats(this, this.properties.cname, this.properties.version);

      console.groupEnd();
    }
  }], [{
    key: "test",


    /**
     * FOR TESTING PURPOSES
     * @test
     */
    value: function test() {
      console.group("Breadcrumb.test");

      console.log("testing results will be printed here...");

      console.groupEnd();
      return true;
    }
  }, {
    key: "observedAttributes",


    /**
     * Set observable values here. When Changed, attributeChangedCallback is invoked
     * @observedAttributes
     */
    get: function get() {
      console.group("Breadcrumb.observedAttributes");

      this.observables = [];
      console.log(this.observables);

      console.groupEnd();
      return this.observables;
    }
  }]);

  return Breadcrumb;
}(HTMLElement);

window.customElements.define('wc-breadcrumb', Breadcrumb);"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Calendar Component<BR>
 * <BR><BR><img src=../img/calendar.png width=40% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/calendar.html">DEMO</a>
 */
var Calendar = function (_HTMLElement) {
	_inherits(Calendar, _HTMLElement);

	function Calendar() {
		_classCallCheck(this, Calendar);

		console.group("Calendar.constructor");

		var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this));

		console.groupEnd();
		return _this;
	}

	_createClass(Calendar, [{
		key: "connectedCallback",


		/**
   * This function is called when this is attached to DOM
   * @connectedCallback. 
   */
		value: function connectedCallback() {
			console.group("Calendar.connectedCallback");

			var self = this;

			// GET PROPERTIES AND INTERESTING ELEMENTS
			this._initialize();

			var cols = this.properties.columns.split(',');

			var id = this.id;
			var c1 = "col-md-" + cols[0];
			var c2 = "col-md-" + cols[1];

			var lbl = this.properties.label || "";
			var val = this.properties.value || "";
			var hlp = this.properties.help || "";
			var cls = this.properties.class || "";
			var nam = this.properties.name || "";

			// DATA-KEY FOR BINDING
			var dkey = id.replace(/_/g, '').replace(/-/g, '');

			if (id == "") {
				// KLUDGE CALENDAR IS CALLED TWICE
				console.groupEnd();
				return;
			}

			// REPLACE CONTENT IF NECESSARY WITH NEW STUFF
			this.innerHTML = "\n\t\t<div class=\"form-group has-feedback clearfix\">\n\t\t    <div class=\"row\">\n\t\t      <div class=\"" + c1 + "\">\n\t\t          <label id=\"" + this.id + "-label\" for=\"" + this.id + "-child\" class=\"btn-control col-form-label\">" + lbl + "</label>\n\t\t      </div>\n\t\t      <div class=\"" + c2 + "\">\n\t\t          <div class=\"input-group date\" data-provide=\"datepicker\">\n\t\t\t      <input type=\"text\" class=\"form-control " + cls + "\" name=\"" + nam + "\" id=\"" + id + "-child\" data-key=\"" + dkey + "\"\n\t\t\t\taria-describedby=\"" + id + "-date-help\" placeholder=\"mm/dd/yyyy\" value=\"" + val + "\" autocomplete='off' />\n\n\t\t              <div class=\"input-group-addon\"></div>\n\t\t          </div>\n\n\t\t          <small id=\"" + id + "-date-help\" class=\"form-text help-block with-errors text-muted\">" + hlp + "</small>\n\t\t      </div>\n\t\t  </div>\n\t\t</div>";

			// CLOSE CALENDAR AFTER SELECT
			$("[data-provide=datepicker]").on('changeDate', function (ev) {
				$(this).datepicker('hide');
			});

			// TRANSFER ALL ATTRIBUTES NOW
			var widget = this.querySelector("input[type=text]");

			for (var key in this.propertiesW) {
				this.removeAttribute(key);
				if (key != "class") {
					widget.setAttribute(key, this.properties[key]);
				}
			}

			// ADD STATS AND OTHER FINAL STUFF
			this._finalize();

			// PUBLISH INTERESTING EVENTS
			this._publish();

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

			console.group("Calendar.publish");

			var widget = this.querySelector("[type=text]");
			var id = $(widget).attr("id");

			widget.addEventListener("change", function (e) {
				_this2._change(id);
			});

			console.groupEnd();
			return true;
		}

		/**
   * A sample callback usage function - see connectedCallback()
   * @_onChange
   */

	}, {
		key: "_change",
		value: function _change(id) {
			console.group("Calendar._change:", id);

			var val = $("#" + id).val();

			wc.publish(this, "wc-text", {
				time: new Date().getTime(),
				action: "change",
				id: id,
				val: val,
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
			console.group("Calendar.disconnectedCallback");

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
			console.group("Calendar.attributeChangedCallback:", attr, oldval, newval);

			this.properties = this.properties || [];

			var obs = Calendar.observedAttributes;

			for (var i = 0; i < obs.length; i++) {
				this.properties[obs[i]] = newval;
				// YOUR CODE FOR CHANGES GO HERE 
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
			console.group("Calendar._fetchElements");

			this.dom = this.dom || [];
			this.dom.content = this.innerHTML;

			console.groupEnd();
		}
	}, {
		key: "_fetchAttributes",


		/**
   * Component attributes are _fetched and defaults are set if undefined
   * @_fetchAttributes
   * @param {string} [modal=true] mode for our calendar
   */
		value: function _fetchAttributes() {
			console.group("Calendar._fetchAttributes");

			this.properties = {
				cname: "Calendar",
				author: "Mel Heravi",
				version: "1.0",
				columns: "12,12"
			};

			// SAVE WIDGET SPECIFIC PROPERTIES
			this.propertiesW = [];

			// SAVE ALL OTHER PROPERTIES
			var attrs = wc.getAttributes(this);

			for (var key in attrs) {
				this.properties[key] = this.getAttribute(key);
				this.propertiesW[key] = this.getAttribute(key);
				console.log(key + ": " + attrs[key]);
			}

			console.log("attributes: ", this.properties);

			// PROCESS ALL PROPERTIES (example below);

			console.groupEnd();
		}
	}, {
		key: "destroy",


		/**
   * Destroy the instance object and artifacts
   * @_destroy
   */
		value: function destroy() {
			console.group("Calendar.destroy:", this.id);

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
		value: function configure(options) {
			console.group("Calendar.configure:", JSON.stringify(options));

			// PROCESS ALL OPTIONS HERE

			console.groupEnd();
		}
	}, {
		key: "_initialize",


		/**
   * SAVE DATA FOR ANALYTICS
   * @__initialize
   */
		value: function _initialize() {
			console.group("Calendar._initialize:", this.id);

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
			console.group("Calendar._finalize:", this.id);

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
			console.group("Calendar.observedAttributes");

			this.observables = ["columns"];

			console.groupEnd();
			return this.observables;
		}
	}]);

	return Calendar;
}(HTMLElement);

window.customElements.define("wc-calendar", Calendar);"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Card Component<BR>
 * <BR><BR><img src=../img/card.png width=80% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/card.html">DEMO</a>
 */
var Card = function (_HTMLElement) {
	_inherits(Card, _HTMLElement);

	function Card() {
		_classCallCheck(this, Card);

		console.group("Card.constructor");

		var _this = _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).call(this));

		console.groupEnd();
		return _this;
	}

	_createClass(Card, [{
		key: "connectedCallback",


		/**
   * This function is called when this is attached to DOM
   * @connectedCallback. 
   */
		value: function connectedCallback() {
			console.group("Card.connectedCallback");

			var self = this;

			// GET PROPERTIES AND INTERESTING ELEMENTS
			this._initialize();

			var header = this.querySelector("wc-card-header") || null;
			var footer = this.querySelector("wc-card-footer") || null;
			var body = this.querySelector("wc-card-body") || null;
			var img = this.querySelector("wc-card-img") || null;

			var h = "";
			var f = "";
			var b = "";
			var i = "";

			if (header) {
				h = "<div class='card-header'>" + header.innerHTML + "</div>";
			}
			if (footer) {
				f = "<div class='card-footer'>" + footer.innerHTML + "</div>";
			}
			if (img) {
				i = "<div class='card-img'>" + img.innerHTML + "</div>";
			}
			if (body) {
				b = "<div class='card-body'>" + body.innerHTML + "</div>";
			}

			console.log(">>>>>>>>", body);

			// REPLACE CONTENT IF NECESSARY WITH NEW STUFF
			if (img) {
				if (img.getAttribute("position") == "top") {
					this.innerHTML = "<div class=\"card\">" + h + " " + b + " " + i + " " + f + "</div>";
				} else {
					this.innerHTML = "<div class=\"card\">" + h + " " + i + " " + b + " " + f + "</div>";
				}
			} else {
				this.innerHTML = "<div class=\"card\">" + h + " " + b + " " + f + "</div>";
			}

			// ADD STATS AND OTHER FINAL STUFF
			this._finalize();

			// PUBLISH INTERESTING EVENTS
			this._publish();

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

			console.group("Card.publish");

			this.addEventListener("click", function (e) {
				_this2._click();
			});

			console.groupEnd();
			return true;
		}

		/**
   * A sample callback usage function - see connectedCallback()
   * @_onClick
   */

	}, {
		key: "_click",
		value: function _click() {
			console.group("Card._click:", this.id);

			wc.publish(this, "wc-card", {
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
			console.group("Card.disconnectedCallback");

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
			console.group("Card.attributeChangedCallback:", attr, oldval, newval);

			this.properties = this.properties || [];

			var obs = Card.observedAttributes;

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
			console.group("Card._fetchElements");

			this.dom = this.dom || [];
			this.dom.content = this.innerHTML;

			console.groupEnd();
		}
	}, {
		key: "_fetchAttributes",


		/**
   * Component attributes are _fetched and defaults are set if undefined
   * @_fetchAttributes
   * @param {string} [modal=true] mode for our card
   */
		value: function _fetchAttributes() {
			console.group("Card._fetchAttributes");

			this.properties = {
				cname: "Card",
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
						var h = document.querySelector("wc-header");
						//h.innerHTML = this.properties.header;
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
			console.group("Card._onClick:", this.id);

			wc.publish(this, "wc-card", {
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
			console.group("Card.destroy:", this.id);

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
		value: function configure(options) {
			console.group("Card.configure:", JSON.stringify(options));

			// PROCESS ALL OPTIONS HERE

			console.groupEnd();
		}
	}, {
		key: "_initialize",


		/**
   * SAVE DATA FOR ANALYTICS
   * @__initialize
   */
		value: function _initialize() {
			console.group("Card._initialize:", this.id);

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
			console.group("Card._finalize:", this.id);

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
			console.group("Card.observedAttributes");

			this.observables = [];

			console.groupEnd();
			return this.observables;
		}
	}]);

	return Card;
}(HTMLElement);

window.customElements.define('wc-card', Card);"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Carousel Component<BR>
 * <BR><BR><img src=../img/carousel.png width=90% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/carousel.html">DEMO</a>
 */
var Carousel = function (_HTMLElement) {
	_inherits(Carousel, _HTMLElement);

	function Carousel() {
		_classCallCheck(this, Carousel);

		console.group("Carousel.constructor");

		var _this = _possibleConstructorReturn(this, (Carousel.__proto__ || Object.getPrototypeOf(Carousel)).call(this));

		console.groupEnd();
		return _this;
	}

	_createClass(Carousel, [{
		key: "connectedCallback",


		/**
   * This function is called when this is attached to DOM
   * @connectedCallback. 
   */
		value: function connectedCallback() {
			console.group("Carousel.connectedCallback");

			var self = this;

			// GET PROPERTIES AND INTERESTING ELEMENTS
			this._initialize();

			// REPLACE CONTENT IF NECESSARY WITH NEW STUFF
			this.innerHTML = this.dom.content;

			this.classList.add("slider");
			this.classList.add("responsive");

			var opts = JSON.parse(this.getAttribute("options"));

			var options = {
				dots: typeof opts.dots === "undefined" ? false : opts.dots,
				speed: typeof opts.speed === "undefined" ? false : opts.speed,
				swipe: typeof opts.swipe === "undefined" ? false : opts.swipe,
				autoplay: typeof opts.autoplay === "undefined" ? false : opts.autoplay,
				arrows: typeof opts.arrows === "undefined" ? true : opts.arrows,
				infinite: typeof opts.infinite === "undefined" ? true : opts.infinite,
				slidesToShow: typeof opts.slidesToShow === "undefined" ? false : opts.slidesToShow,
				slidesToScroll: typeof opts.slidesToScroll === "undefined" ? 1 : opts.slidesToScroll,
				initialSlide: typeof opts.initialSlide === "undefined" ? 0 : opts.initialSlide
			};

			console.log("OPTIONS:", options);

			$(this).slick({
				speed: options.speed,
				dots: options.dots,
				autoplay: options.autoplay,
				arrows: options.arrows,
				swipe: options.swipe,
				slidesToShow: options.slidesToShow,
				slidesToScroll: options.slidesToScroll,
				initialSlide: options.initialSlide,
				infinite: options.infinite,
				pauseOnHover: true,
				mobileFirst: true,

				responsive: [{
					breakpoint: 1024,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3
					}
				}, {
					breakpoint: 600,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2
					}
				}, {
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}

				}]
			});

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

			console.group("Carousel.publish");

			this.addEventListener("click", function (e) {
				_this2._click();
			});

			console.groupEnd();
			return true;
		}

		/**
   * A sample callback usage function - see connectedCallback()
   * @_click
   */

	}, {
		key: "_click",
		value: function _click() {
			console.group("Carousel._click:", this.id);

			wc.publish(this, "wc-carousel", {
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
			console.group("Carousel.disconnectedCallback");

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
			console.group("Carousel.attributeChangedCallback:", attr, oldval, newval);

			this.properties = this.properties || [];

			var obs = Carousel.observedAttributes;

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
			console.group("Carousel._fetchElements");

			this.dom = this.dom || [];
			this.dom.content = this.innerHTML;

			console.groupEnd();
		}
	}, {
		key: "_fetchAttributes",


		/**
   * Component attributes are _fetched and defaults are set if undefined
   * @_fetchAttributes
   * @param {string} [modal=true] mode for our carousel
   */
		value: function _fetchAttributes() {
			console.group("Carousel._fetchAttributes");

			this.properties = {
				cname: "Carousel",
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
					case "background":
						break;

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
		key: "_onClick",


		/**
   * A sample callback usage function - see connectedCallback()
   * @_onClick
   */
		value: function _onClick() {
			console.group("Carousel._onClick:", this.id);

			wc.publish(this, "wc-carousel", {
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
			console.group("Carousel.destroy:", this.id);

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
		value: function configure(options) {
			console.group("Carousel.configure:", JSON.stringify(options));

			// PROCESS ALL OPTIONS HERE

			console.groupEnd();
		}
	}, {
		key: "_initialize",


		/**
   * SAVE DATA FOR ANALYTICS
   * @__initialize
   */
		value: function _initialize() {
			console.group("Carousel._initialize:", this.id);

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
			console.group("Carousel._finalize:", this.id);

			this.classList.add("wc");

			// ADD ANALYTICS HERE
			wc.setStats(this, this.properties.cname, this.properties.version);

			// SHOW IT NOW (NO FLICKERS) 
			this.style.visibility = "visible";

			this._caption();

			$(window).resize(function (e) {
				$(".wc-carousel-img-caption").each(function () {
					var w = $(this).parent().parent().width() - 50;

					$(this).css({
						"width": w + "px",
						"position": "relative",
						"z-index": 999999,
						"background": red
					});
				});
			});

			console.groupEnd();
		}
	}, {
		key: "_caption",


		/**
   * SAVE DATA FOR ANALYTICS
   * @_caption
   */
		value: function _caption() {
			console.group("Carousel._caption:", this.id);

			var self = this;

			$("#" + this.id + " [slick-caption]").each(function () {
				var caption = $(this).attr("slick-caption");

				var w = $(this).width() - 50;

				$(this).parent().append("<span>" + caption + "</span>");
			});

			console.groupEnd();
		}
	}], [{
		key: "observedAttributes",


		/**
   * Set observable values here. When Changed, attributeChangedCallback is invoked
   * @observedAttributes
   */
		get: function get() {
			console.group("Carousel.observedAttributes");

			this.observables = [];

			console.groupEnd();
			return this.observables;
		}
	}]);

	return Carousel;
}(HTMLElement);

window.customElements.define('wc-carousel', Carousel);"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * CarouselBS Component<BR>
 * <BR><BR><img src=../img/carouselbs.png width=50% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/carouselbs.html">DEMO</a>
 */
var CarouselBS = function (_HTMLElement) {
	_inherits(CarouselBS, _HTMLElement);

	function CarouselBS() {
		_classCallCheck(this, CarouselBS);

		console.group("CarouselBS.constructor");

		var _this = _possibleConstructorReturn(this, (CarouselBS.__proto__ || Object.getPrototypeOf(CarouselBS)).call(this));

		console.groupEnd();
		return _this;
	}

	_createClass(CarouselBS, [{
		key: "connectedCallback",


		/**
   * This function is called when this is attached to DOM
   * @connectedCallback. 
   */
		value: function connectedCallback() {
			console.group("CarouselBS.connectedCallback");

			var self = this;

			// GET PROPERTIES AND INTERESTING ELEMENTS
			this._initialize();

			this.properties.active = this.properties.active || 1;
			this.properties.open = this.properties.open || "false";

			var close = "";

			if ($(this).hasClass("modal")) {
				if (this.properties.open == "false") {
					$(this).css("display", "none");
				}

				close = "<div class=\"close\" onclick=\"document.getElementById('" + this.id + "').style.display='none'\"><i class=\"fa fa-times-circle fa-2x\"></i></div>";
			}

			// REPLACE CONTENT IF NECESSARY WITH NEW STUFF
			this.innerHTML = "\n<div class=\"carousel slide\" data-ride=\"carousel\" id=\"" + this.id + "-actual\">\n    " + close + "\n\n    <div class=\"carousel-inner\">\n\t" + this.dom.content + "\n    </div>\n\n    <a class=\"carousel-control-prev\" href=\"#" + this.id + "-actual\" role=\"button\" data-slide=\"prev\">\n\t<span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>\n\t<span class=\"sr-only\">Previous</span>\n    </a>\n    <a class=\"carousel-control-next\" href=\"#" + this.id + "-actual\" role=\"button\" data-slide=\"next\">\n\t<span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>\n\t<span class=\"sr-only\">Next</span>\n    </a>\n</div>";

			var divs = this.querySelectorAll(".carousel-inner > div");
			var cnt = 0;
			$(divs).each(function () {
				cnt++;
				$(this).addClass("carousel-item");

				if (cnt == self.properties.active) {
					$(this).addClass("active");
				}
			});

			// ADD STATS AND OTHER FINAL STUFF
			this._finalize();

			$('#' + this.id).on('slide.bs.carousel', function () {
				var _this2 = this;

				setTimeout(function () {
					var active = $(_this2).find(".active");
					var id = $(active).attr("id");

					wc.publish(_this2, "wc-carouselbs", {
						action: "click",
						id: _this2.id,
						active: id
					});
				}, 1000);
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
			console.group("CarouselBS.disconnectedCallback");

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
			console.group("CarouselBS.attributeChangedCallback:", attr, oldval, newval);

			this.properties = this.properties || [];

			var obs = CarouselBS.observedAttributes;

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
			console.group("CarouselBS._fetchElements");

			this.dom = this.dom || [];
			this.dom.content = this.innerHTML;

			console.groupEnd();
		}
	}, {
		key: "_fetchAttributes",


		/**
   * Component attributes are _fetched and defaults are set if undefined
   * @_fetchAttributes
   * @param {string} [modal=true] mode for our carouselbs
   */
		value: function _fetchAttributes() {
			console.group("CarouselBS._fetchAttributes");

			this.properties = {
				cname: "CarouselBS",
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
			console.group("CarouselBS._onClick:", this.id);

			wc.publish(this, "wc-carouselbs", {
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
			console.group("CarouselBS.destroy:", this.id);

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
		value: function configure(options) {
			console.group("CarouselBS.configure:", JSON.stringify(options));

			// PROCESS ALL OPTIONS HERE

			console.groupEnd();
		}
	}, {
		key: "_initialize",


		/**
   * SAVE DATA FOR ANALYTICS
   * @__initialize
   */
		value: function _initialize() {
			console.group("CarouselBS._initialize:", this.id);

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
			console.group("CarouselBS._finalize:", this.id);

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
			console.group("CarouselBS.observedAttributes");

			this.observables = ["header"];

			console.groupEnd();
			return this.observables;
		}
	}]);

	return CarouselBS;
}(HTMLElement);

window.customElements.define('wc-carouselbs', CarouselBS);"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Chart Component<BR>
 * <BR><BR><img src=../img/chart.png width=30% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/chart.html">DEMO</a>
 */
var Chart = function (_HTMLElement) {
	_inherits(Chart, _HTMLElement);

	function Chart() {
		_classCallCheck(this, Chart);

		console.group("Chart.constructor");

		var _this = _possibleConstructorReturn(this, (Chart.__proto__ || Object.getPrototypeOf(Chart)).call(this));

		console.groupEnd();
		return _this;
	}

	_createClass(Chart, [{
		key: "connectedCallback",


		/**
   * This function is called when this is attached to DOM
   * @connectedCallback. 
   */
		value: function connectedCallback() {
			console.group("Chart.connectedCallback");

			var self = this;

			// GET PROPERTIES AND INTERESTING ELEMENTS
			this._initialize();

			// REPLACE CONTENT IF NECESSARY WITH NEW STUFF
			this.innerHTML = "<div id=\"" + this.id + "-container\"><span class=\"wc-loading-img\"></span></div>";

			// ADD STATS AND OTHER FINAL STUFF
			this._finalize();

			console.groupEnd();
		}
	}, {
		key: "disconnectedCallback",


		/**
   * Invoked When component is removed. Usually with a .remove() function call
   * @disconnectedCallback
   */
		value: function disconnectedCallback() {
			console.group("Chart.disconnectedCallback");

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
			console.group("Chart.attributeChangedCallback:", attr, oldval, newval);

			this.properties = this.properties || [];

			var obs = Chart.observedAttributes;

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
			console.group("Chart._fetchElements");

			this.dom = this.dom || [];
			this.dom.content = this.innerHTML;

			console.groupEnd();
		}
	}, {
		key: "_fetchAttributes",


		/**
   * Component attributes are _fetched and defaults are set if undefined
   * @_fetchAttributes
   * @param {string} [modal=true] mode for our chart
   */
		value: function _fetchAttributes() {
			console.group("Chart._fetchAttributes");

			this.properties = {
				cname: "Chart",
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
					case "background":
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
   * @_destroy
   */
		value: function destroy() {
			console.group("Chart.destroy:", this.id);

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
		value: function configure(data) {
			console.group("Chart.configure:", data);

			eval("this." + data.type + "(data)");

			console.groupEnd();
		}
	}, {
		key: "_initialize",


		/**
   * SAVE DATA FOR ANALYTICS
   * @__initialize
   */
		value: function _initialize() {
			console.group("Chart._initialize:", this.id);

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
			console.group("Chart._finalize:", this.id);

			this.classList.add("wc");

			// ADD ANALYTICS HERE
			wc.setStats(this, this.properties.cname, this.properties.version);

			// SHOW IT NOW (NO FLICKERS) 
			this.style.visibility = "visible";

			console.groupEnd();
		}
	}, {
		key: "pie",


		/**
   * PIE CHART (DONUT IF INNSERSIZE SPECIFIED)
   * @pie
   */
		value: function pie(data) {
			console.group("Chart.pie:", data);

			var chart = new Highcharts.Chart({
				chart: {
					renderTo: this.id + "-container",
					type: data.type,
					plotShadow: false,
					backgroundColor: 'transparent',
					alternateGridColor: null
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

				title: {
					text: data.title
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
		}
	}], [{
		key: "observedAttributes",


		/**
   * Set observable values here. When Changed, attributeChangedCallback is invoked
   * @observedAttributes
   */
		get: function get() {
			console.group("Chart.observedAttributes");

			this.observables = [];

			console.groupEnd();
			return this.observables;
		}
	}]);

	return Chart;
}(HTMLElement);

window.customElements.define('wc-chart', Chart);"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Check Component<BR>
 * <BR><BR><img src=../img/check.png width=40% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/check.html">DEMO</a>
 */
var Check = function (_HTMLElement) {
	_inherits(Check, _HTMLElement);

	function Check() {
		_classCallCheck(this, Check);

		console.group("Check.constructor");

		var _this = _possibleConstructorReturn(this, (Check.__proto__ || Object.getPrototypeOf(Check)).call(this));

		console.groupEnd();
		return _this;
	}

	_createClass(Check, [{
		key: "connectedCallback",


		/**
   * This function is called when this is attached to DOM
   * @connectedCallback. 
   */
		value: function connectedCallback() {
			console.group("Check.connectedCallback");

			var self = this;

			// GET PROPERTIES AND INTERESTING ELEMENTS
			this._initialize();

			var cols = this.properties.columns.split(',');

			var id = this.id;
			var c1 = "col-md-" + cols[0];
			var c2 = "col-md-" + cols[1];

			var lbl = this.properties.label || "";
			var hlp = this.properties.help || "";
			var cls = this.properties.class || "";

			// DATA-KEY FOR BINDING
			var dkey = id.replace(/_/g, '').replace(/-/g, '');

			// KLUSGE - FIX IT LATER
			if (!lbl) {
				console.groupEnd();
				return;
			}

			// REPLACE CONTENT IF NECESSARY WITH NEW STUFF
			this.innerHTML = "\n\t\t<div class=\"form-group has-feedback form-check-inline\">\n\t\t    <input class=\"form-check-input\" type=\"checkbox\" data-key=\"" + dkey + "\" />\n\t\t    <label for=\"" + this.id + "\" class=\"form-check-label col-form-label\">" + lbl + "</label>\n\t\t</div>";

			// TRANSFER ALL ATTRIBUTES NOW (below is an example)
			// -------------------------------------------------
			var widget = this.querySelector("input[type=checkbox]");

			for (var key in this.propertiesW) {
				this.removeAttribute(key);
				widget.setAttribute(key, this.properties[key]);
			}

			// ADD STATS AND OTHER FINAL STUFF
			this._finalize();

			// PUBLISH INTERESTING EVENTS
			this._publish();

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

			console.group("Check.publish");

			var widget = this.querySelector("input[type=checkbox]");

			widget.addEventListener("change", function (e) {
				var id = $(widget).attr("id");

				_this2._change(id);
			});

			console.groupEnd();
			return true;
		}

		/**
   * A sample callback usage function - see connectedCallback()
   * @_onClick
   */

	}, {
		key: "_change",
		value: function _change(id) {
			console.group("Check._change:", id);

			var val = $("#check-1").is(":checked");

			wc.publish(this, "wc-check", {
				time: new Date().getTime(),
				action: "change",
				id: id,
				checked: val,
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
			console.group("Check.disconnectedCallback");

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
			console.group("Check.attributeChangedCallback:", attr, oldval, newval);

			this.properties = this.properties || [];

			var obs = Check.observedAttributes;

			for (var i = 0; i < obs.length; i++) {
				this.properties[obs[i]] = newval;
				// YOUR CODE FOR CHANGES GO HERE 
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
			console.group("Check._fetchElements");

			this.dom = this.dom || [];
			this.dom.content = this.innerHTML;

			console.groupEnd();
		}
	}, {
		key: "_fetchAttributes",


		/**
   * Component attributes are _fetched and defaults are set if undefined
   * @_fetchAttributes
   * @param {string} [modal=true] mode for our check
   */
		value: function _fetchAttributes() {
			console.group("Check._fetchAttributes");

			this.properties = {
				cname: "Check",
				author: "Mel Heravi",
				version: "1.0",
				columns: "12,12"
			};

			// SAVE WIDGET SPECIFIC PROPERTIES
			this.propertiesW = [];

			// SAVE ALL OTHER PROPERTIES
			var attrs = wc.getAttributes(this);

			for (var key in attrs) {
				this.properties[key] = this.getAttribute(key);
				this.propertiesW[key] = this.getAttribute(key);
				console.log(key + ": " + attrs[key]);
			}

			console.log("attributes: ", this.properties);

			// PROCESS ALL PROPERTIES (example below);

			console.groupEnd();
		}
	}, {
		key: "_onClick",


		/**
   * A sample callback usage function - see connectedCallback()
   * @_onClick
   */
		value: function _onClick() {
			console.group("Check._onClick:", this.id);

			wc.publish(this, "wc-check", {
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
			console.group("Check.destroy:", this.id);

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
		value: function configure(options) {
			console.group("Check.configure:", JSON.stringify(options));

			// PROCESS ALL OPTIONS HERE

			console.groupEnd();
		}
	}, {
		key: "_initialize",


		/**
   * SAVE DATA FOR ANALYTICS
   * @__initialize
   */
		value: function _initialize() {
			console.group("Check._initialize:", this.id);

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
			console.group("Check._finalize:", this.id);

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
			console.group("Check.observedAttributes");

			this.observables = ["columns"];

			console.groupEnd();
			return this.observables;
		}
	}]);

	return Check;
}(HTMLElement);

window.customElements.define('wc-check', Check);"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Dad Component<BR>
 * <BR><BR><img src=../img/dad.png width=80% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/dad.html">DEMO</a>
 */
var Dad = function (_HTMLElement) {
	_inherits(Dad, _HTMLElement);

	function Dad() {
		_classCallCheck(this, Dad);

		console.group("Dad.constructor");

		var _this = _possibleConstructorReturn(this, (Dad.__proto__ || Object.getPrototypeOf(Dad)).call(this));

		console.groupEnd();
		return _this;
	}

	_createClass(Dad, [{
		key: "connectedCallback",


		/**
   * This function is called when this is attached to DOM
   * @connectedCallback. 
   */
		value: function connectedCallback() {
			var _dragula;

			console.group("Dad.connectedCallback");

			var self = this;

			// GET PROPERTIES AND INTERESTING ELEMENTS
			this._initialize();

			// REPLACE CONTENT IF NECESSARY WITH NEW STUFF
			//this.innerHTML = `<wc-header>${this.properties.header}</wc-header>` + this.dom.content;

			// ADD STATS AND OTHER FINAL STUFF
			this._finalize();

			this.lhs = document.querySelector('#' + this.properties.src);
			this.rhs = document.querySelector('#' + this.properties.dst);

			this.dad = dragula([this.lhs, this.rhs], (_dragula = {
				direction: this.properties.direction,
				copy: eval(this.properties.copy),
				copySortSource: true,
				revertOnSpill: true
			}, _defineProperty(_dragula, "copy", function copy(el, source) {
				// ONLY COPY ALLOWED
				console.groupEnd();
				return source.getAttribute("id") === self.properties.src;
			}), _defineProperty(_dragula, "accepts", function accepts(el, target, source, sibling) {
				// REJECT A DROP
				if (!target) {
					console.groupEnd();
					return false;
				}

				if (target.getAttribute("id") == self.properties.dst) {
					console.groupEnd();
					return true;
				} else {
					console.log("drop rejected...");
					console.groupEnd();
					return false;
				}
			}), _dragula)).on('drag', function (el) {
				console.log("drag...");
				el.className = el.className.replace('ex-moved', '');
			}).on('drop', function (el) {
				console.log("drop...");
				el.className += ' ex-moved';
			}).on('over', function (el, container) {
				console.log("over...");
				container.className += ' ex-over';
			}).on('out', function (el, container) {
				console.log("out...");
				container.className = container.className.replace('ex-over', '');
			});

			this.dad.on("drop", function (el, target, source, sibling) {
				// DROPPED OUTSIDE OF DST. DO NOTHING
				if (!target) {
					console.groupEnd();
					return false;
				}

				if (target.getAttribute("id") == self.properties.dst) {
					self._onDrop(el, target != source, sibling);
				}
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
			console.group("Dad.disconnectedCallback");

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
			console.group("Dad.attributeChangedCallback:", attr, oldval, newval);

			this.properties = this.properties || [];

			var obs = Dad.observedAttributes;

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
			console.group("Dad._fetchElements");

			this.dom = this.dom || [];
			this.dom.content = this.innerHTML;

			console.groupEnd();
		}
	}, {
		key: "_fetchAttributes",


		/**
   * Component attributes are _fetched and defaults are set if undefined
   * @_fetchAttributes
   * @param {string} [modal=true] mode for our dad
   */
		value: function _fetchAttributes() {
			console.group("Dad._fetchAttributes");

			this.properties = {
				cname: "Dad",
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
					case "background":
						this.style.background = this.properties.background;
						break;

					case "header":
						break;
				}
			}

			console.log("ATTRIBUTES: ", this.properties);

			console.groupEnd();
		}
	}, {
		key: "_onDrop",


		/**
   * A sample callback usage function - see connectedCallback()
   * @_onDrop
   */
		value: function _onDrop(el, update, sibling) {
			console.group("Dad._onDrop:", el, update, sibling);

			wc.publish(this, "wc-dad", {
				action: "dropped",
				id: this.id,
				did: el.getAttribute("id"),
				sibling: sibling,
				new: update
			});

			if (update) {
				// ALREADY PUBLISHED THE EVENT. REVERT NOW
				this.dad.cancel("revert");
			}

			console.groupEnd();
		}
	}, {
		key: "destroy",


		/**
   * Destroy the instance object and artifacts
   * @_destroy
   */
		value: function destroy() {
			console.group("Dad.destroy:", this.id);

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
		value: function configure(options) {
			console.group("Dad.configure:", JSON.stringify(options));

			// PROCESS ALL OPTIONS HERE

			console.groupEnd();
		}
	}, {
		key: "_initialize",


		/**
   * SAVE DATA FOR ANALYTICS
   * @__initialize
   */
		value: function _initialize() {
			console.group("Dad._initialize:", this.id);

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
			console.group("Dad._finalize:", this.id);

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
			console.group("Dad.observedAttributes");

			this.observables = [];

			console.groupEnd();
			return this.observables;
		}
	}]);

	return Dad;
}(HTMLElement);

window.customElements.define('wc-dad', Dad);"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Dropdown Component<BR>
 * <BR><BR><img src=../img/dropdown.png width=30% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/dropdown.html">DEMO</a>
 */
var Dropdown = function (_HTMLElement) {
	_inherits(Dropdown, _HTMLElement);

	function Dropdown() {
		_classCallCheck(this, Dropdown);

		console.group("Dropdown.constructor");

		var _this = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this));

		console.groupEnd();
		return _this;
	}

	_createClass(Dropdown, [{
		key: "connectedCallback",


		/**
   * This function is called when this is attached to DOM
   * @connectedCallback. 
   */
		value: function connectedCallback() {
			console.group("Dropdown.connectedCallback");

			var self = this;

			// GET PROPERTIES AND INTERESTING ELEMENTS
			this._initialize();

			this.properties.btn = this.properties.btn || "btn-outline-secondary";
			this.properties.selected = this.properties.selected || null;

			// REPLACE CONTENT IF NECESSARY WITH NEW STUFF
			this.innerHTML = "\n<div class=\"dropdown\">\n    <a class=\"btn " + this.properties.btn + " dropdown-toggle\" href=\"#\" role=\"button\" id=\"" + this.id + "-menus\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n\tDropdown link\n    </a>\n\n    <div class=\"dropdown-menu\" aria-labelledby=\"" + this.id + "-menus\">\n\t" + this.dom.content + "\n    </div>\n</div>";

			// MAKE DROPDOWN SAME WIDTH AS THE BUTTON
			var tmp = this.querySelectorAll(".dropdown-menu");
			$(tmp).width($(this).width());

			// ADD CLASS
			this.links = this.querySelectorAll(".dropdown-menu a");
			$(this.links).addClass("dropdown-item " + this.properties.btn);

			// ACTIVATE SELECTED
			if (this.properties.selected) {
				var item = $(this).find("#" + this.properties.selected);
				$(item).addClass("active");

				var lbl = self.querySelector(".dropdown > a");
				$(lbl).text($(item).text());
			}

			// ADD STATS AND OTHER FINAL STUFF
			this._finalize();

			// PUBLISH INTERESTING EVENTS
			this._publish();

			console.groupEnd();
		}
	}, {
		key: "_publish",


		/**
   * Publish all events
   * @_publish
   */
		value: function _publish() {
			console.group("Dropdown.publish");

			var self = this;

			$(this.links).on("click", function () {
				var lbl = self.querySelector(".dropdown > a");
				$(lbl).text($(this).text());

				$(self.links).removeClass("active");
				$(this).addClass("active");

				wc.publish(this, "wc-dropdown", {
					time: new Date().getTime(),
					action: "click",
					id: self.id,
					menuid: $(this).attr("id"),
					menutext: $(this).text()
				});
			});

			console.groupEnd();
			return true;
		}

		/**
   * A sample callback usage function - see connectedCallback()
   * @_click
   */

	}, {
		key: "_click",
		value: function _click() {
			console.group("Dropdown._click:", this.id);

			wc.publish(this, "wc-dropdown", {
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
			console.group("Dropdown.disconnectedCallback");

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
			console.group("Dropdown.attributeChangedCallback:", attr, oldval, newval);

			this.properties = this.properties || [];

			var obs = Dropdown.observedAttributes;

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
			console.group("Dropdown._fetchElements");

			this.dom = this.dom || [];
			this.dom.content = this.innerHTML;

			console.groupEnd();
		}
	}, {
		key: "_fetchAttributes",


		/**
   * Component attributes are _fetched and defaults are set if undefined
   * @_fetchAttributes
   * @param {string} [modal=true] mode for our dropdown
   */
		value: function _fetchAttributes() {
			console.group("Dropdown._fetchAttributes");

			this.properties = {
				cname: "Dropdown",
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
					case "background":
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
			console.group("Dropdown._onClick:", this.id);

			wc.publish(this, "wc-dropdown", {
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
			console.group("Dropdown.destroy:", this.id);

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
		value: function configure(options) {
			console.group("Dropdown.configure:", JSON.stringify(options));

			// PROCESS ALL OPTIONS HERE

			console.groupEnd();
		}
	}, {
		key: "_initialize",


		/**
   * SAVE DATA FOR ANALYTICS
   * @__initialize
   */
		value: function _initialize() {
			console.group("Dropdown._initialize:", this.id);

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
			console.group("Dropdown._finalize:", this.id);

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
			console.group("Dropdown.observedAttributes");

			this.observables = [];

			console.groupEnd();
			return this.observables;
		}
	}]);

	return Dropdown;
}(HTMLElement);

window.customElements.define('wc-dropdown', Dropdown);"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Dropper Component<BR>
 * <BR><BR><img src=../img/dropper.png width=50% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/dropper.html">DEMO</a>
 */
var Dropper = function (_HTMLElement) {
	_inherits(Dropper, _HTMLElement);

	function Dropper() {
		_classCallCheck(this, Dropper);

		console.group("Dropper.constructor");

		var _this = _possibleConstructorReturn(this, (Dropper.__proto__ || Object.getPrototypeOf(Dropper)).call(this));

		console.groupEnd();
		return _this;
	}

	_createClass(Dropper, [{
		key: "template",


		/**
   * This function is called get component template
   * @template
   */
		value: function template() {
			console.group("Dropper.template");

			var tmp = "<div class=\"wc-header\">" + this.properties.header + "</div>" + this.dom.content;

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
			console.group("Dropper.connectedCallback");

			var self = this;

			// GET PROPERTIES AND INTERESTING ELEMENTS
			this._initialize();

			var driver = $("#" + this.properties.driver);

			$(driver).addClass("dropdown-toggle").attr("data-toggle", "dropdown").attr("aria-haspopup", "true").attr("aria-expanded", "false");

			$(this).addClass("dropdown-menu").attr("aria-labelledby", this.properties.driver);

			// IGNORE CLICKS INSIDE THE CONTENT
			$(this).load(this.properties.url).on("click", function (e) {
				e.stopPropagation();
			});

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
			console.group("Dropper.attributeChangedCallback:", attr, oldval, newval);

			this.properties = this.properties || [];

			var obs = Dropper.observedAttributes;

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
			console.group("Dropper._fetchElements");

			this.dom = this.dom || [];
			this.dom.content = this.innerHTML;

			console.groupEnd();
		}
	}, {
		key: "_fetchAttributes",


		/**
   * Component attributes are _fetched and defaults are set if undefined
   * @_fetchAttributes
   * @param {string} [modal=true] mode for our dropper
   */
		value: function _fetchAttributes() {
			console.group("Dropper._fetchAttributes");

			this.properties = {
				cname: "Dropper",
				author: "Mel Heravi",
				version: "1.0",
				url: null,
				driver: null
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
			console.group("Dropper.destroy:", this.id);

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
			console.group("Dropper.configure:", JSON.stringify(options));

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
			console.group("Dropper._initialize:", this.id);

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
			console.group("Dropper._finalize:", this.id);

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
			console.group("Dropper.disconnectedCallback");

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
			console.group("Dropper.observedAttributes");

			this.observables = ["header"];

			console.groupEnd();
			return this.observables;
		}
	}]);

	return Dropper;
}(HTMLElement);

window.customElements.define('wc-dropper', Dropper);"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var fpattern = {
	phone: "\\d{3}[\\-]\\d{3}[\\-]\\d{4}",
	text: "\\[A-Za-z0-9 \\]",
	email: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$",
	city: "\\[A-Za-z \\]+",
	state: "\\[A-Za-z\\]{1,50}",
	zipcode: "{\\d{5,5}(-\\d{4,4})\\?",
	ssn: "{^(\\d{3}-|(\\d{3})\\s)\\d{2}-\\d{4}\\$",
	amount: "{^\\[\\$\\-\\s\\]*\\[\\d\\,\\]*\\?(\\[\\.\\]\\d{0,2})\\?\\s*\\$",
	number: "\\d*"

	/**
  * A FORM COMPONENT
  * <BR><BR><img src=../img/form.png width=70% style="border:1px lime dashed;padding:20px">
  * <BR><BR><a href="../html/form.html">DEMO</a>
  */
};
var Form = function (_HTMLElement) {
	_inherits(Form, _HTMLElement);

	function Form() {
		_classCallCheck(this, Form);

		console.group("Form.constructor");

		var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this));

		console.groupEnd();
		return _this;
	}

	_createClass(Form, [{
		key: "connectedCallback",


		/**
   * This function is called when this is attached to DOM
   * @connectedCallback. 
   */
		value: function connectedCallback() {
			console.group("Form.connectedCallback");

			var self = this;

			// FETCH ALL INTERESTING ELEMENTS
			this._fetchElements();

			// FETCH ALL ATTRIBUTES
			this._fetchAttributes();

			// REPLACE CONTENT IF NECESSARY WITH NEW STUFF
			this.innerHTML = "\n\t\t<form id='" + this.id + "-actual' class=\"" + this.properties.class + "\" name='" + this.properties.name + "' method='" + this.properties.method + "' action='" + this.properties.action + "'>\n\t\t    " + this.dom.content + "\n\t\t    <div class=\"clearfix\" id='" + this.id + "-results'></div>\n\t\t</form>";

			if (this.properties.action !== "undefined") {
				var form = this.querySelector("form");

				$(form).validator().on('submit', function (e) {
					if (e.isDefaultPrevented()) {
						// handle the invalid form...
					} else {
						e.preventDefault();

						var values = $(this).serializeArray();

						console.log('wc.publish: submit', this.id, values);

						wc.publish(this, this.id, {
							time: new Date().getTime(),
							action: "submit",
							id: this.id,
							values: values
						});
					}
				});
			}

			// REPLACE ALL PATTERNS WITH ACTUAL REGEX STRINGS
			var patterns = this.querySelectorAll("[pattern]");

			$(patterns).each(function () {
				var pattern = this.getAttribute("pattern");

				console.log("---", "fpattern." + pattern);

				this.setAttribute("pattern", eval("fpattern." + pattern));
			});

			this._finalize();

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
			console.group("Form.disconnectedCallback");

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
			console.group("Form.attributeChangedCallback:", attr, oldval, newval);

			this.properties = this.properties || [];

			var obs = Form.observedAttributes;

			for (var i = 0; i < obs.length; i++) {
				if (newval) {
					this.properties[obs[i]] = newval;

					// YOUR CODE FOR CHANGES GO HERE 
					switch (attr) {
						case "size":
							break;

						default:
							break;
					}
				}
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
			console.group("Form._fetchElements");

			this.dom = this.dom || [];
			this.dom.content = this.innerHTML;

			console.groupEnd();
		}
	}, {
		key: "_fetchAttributes",


		/**
   * Component attributes are _fetched and defaults are set if undefined
   * @_fetchAttributes
   * @param {string} [method=POST] form method
   * @param {string} [name="NOTSET"] form action
   */
		value: function _fetchAttributes() {
			console.group("Form._fetchAttributes");

			this.properties = {
				"cname": "Form",
				"author": "Mel Heravi",
				"version": "1.0",
				"method": "POST"
			};

			// SAVE WIDGET SPECIFIC PROPERTIES
			this.propertiesW = [];

			// SAVE ALL OTHER PROPERTIES
			var attrs = wc.getAttributes(this);

			for (var key in attrs) {
				this.properties[key] = this.getAttribute(key);
				this.propertiesW[key] = this.getAttribute(key);
				console.log(key + ": " + attrs[key]);
			}

			console.log("attributes: ", this.properties);

			console.groupEnd();
		}
	}, {
		key: "destroy",


		/**
   * Destroy the instance object and artifacts
   * @_destroy
   */
		value: function destroy() {
			console.group("Form.destroy:", this.id);

			// FREE POINTER
			delete this;

			// REMOVE ITEM FROM DOM
			this.parentNode.removeChild(this);

			console.groupEnd();
		}
	}, {
		key: "_finalize",


		/**
   * SAVE DATA FOR ANALYTICS
   * @__finalize
   */
		value: function _finalize() {
			console.group("Form._finalize:", this.id);

			this.classList.add("wc");

			setTimeout(function (e) {
				// MARK ALL REQUIRED FIELS
				$("*[required]").each(function () {
					var id = $(this).attr("id");
					$("#" + id + "-label").addClass("required");
				});

				// BIND VARIABLE TO HANDLER
				try {
					$("*[data-key]").each(function () {
						var id = $(this).attr("id");
						tkBind(id, tkBinder);
					});
				} catch (e) {
					console.error(e.name + ' > ' + e.message);
				}

				//tkBind("uname-1", changeHandler);

				$("form").validator("update");
			}, 400);

			// ADD ANALYTICS HERE
			wc.setStats(this, this.properties.cname, this.properties.version);

			console.groupEnd();
		}
	}], [{
		key: "test",


		/**
   * FOR TESTING PURPOSES
   * @test
   */
		value: function test() {
			console.group("Form.test");

			console.log("testing results will be printed here...");

			console.groupEnd();
			return true;
		}
	}, {
		key: "observedAttributes",


		/**
   * Set observable values here. When Changed, attributeChangedCallback is invoked
   * @observedAttributes
   */
		get: function get() {
			console.group("Form.observedAttributes");

			this.observables = ["size"];
			console.log(this.observables);

			console.groupEnd();
			return this.observables;
		}
	}]);

	return Form;
}(HTMLElement);

window.customElements.define('wc-form', Form);"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Groupbox Component<BR>
 * <BR><BR><img src=../img/groupbox.png width=40% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/groupbox.html">DEMO</a>
 */
var Groupbox = function (_HTMLElement) {
	_inherits(Groupbox, _HTMLElement);

	function Groupbox() {
		_classCallCheck(this, Groupbox);

		console.group("Groupbox.constructor");

		var _this = _possibleConstructorReturn(this, (Groupbox.__proto__ || Object.getPrototypeOf(Groupbox)).call(this));

		console.groupEnd();
		return _this;
	}

	_createClass(Groupbox, [{
		key: "connectedCallback",


		/**
   * This function is called when this is attached to DOM
   * @connectedCallback. 
   */
		value: function connectedCallback() {
			console.group("Groupbox.connectedCallback");

			var self = this;

			// GET PROPERTIES AND INTERESTING ELEMENTS
			this._initialize();

			var cols = this.properties.columns.split(',');

			var c1 = "col-md-" + cols[0];
			var c2 = "col-md-" + cols[1];

			var lbl = this.properties.label || "";
			var hlp = this.properties.help || "";

			// REPLACE CONTENT IF NECESSARY WITH NEW STUFF
			this.innerHTML = "\n\t\t<div class=\"form-group clearfix\" style=\"margin-bottom:0!important;\">\n\t\t    <div class=\"row\">\n\t\t        <div class=\"" + c1 + "\">\n\t\t            <label id=\"" + this.id + "-label\" for=\"" + this.id + "-label\" class=\"wc-groupbox-label btn-control col-form-label\">" + lbl + "</label>\n\t\t        </div>\n\n\t\t        <div class=\"" + c2 + "\">\n\t\t\t    <div class=\"clearfix\">\n\t\t\t    " + this.dom.content + "\n\t\t\t    </div>\n\t\t        </div>\n\t\t    </div>\n\t\t</div>";

			// TRANSFER ALL ATTRIBUTES NOW (below is an example)
			// -------------------------------------------------
			// let widget = this.querySelector("input[type=groupbox]");

			// for (var key in this.propertiesW) {
			//     this.removeAttribute(key);
			//     if (key != "class") {
			// 	widget.setAttribute(key, this.properties[key]);
			//     }
			// }	

			// ADD STATS AND OTHER FINAL STUFF
			this._finalize();

			// PUBLISH INTERESTING EVENTS
			this._publish();

			console.groupEnd();
		}
	}, {
		key: "_publish",


		/**
   * Publish all events
   * @_publish
   */
		value: function _publish() {
			console.group("Groupbox.publish");

			console.groupEnd();
			return true;
		}

		/**
   * A sample callback usage function - see connectedCallback()
   * @_onClick
   */

	}, {
		key: "_click",
		value: function _click(id) {
			console.group("Groupbox._click:", id);

			console.groupEnd();
		}
	}, {
		key: "disconnectedCallback",


		/**
   * Invoked When component is removed. Usually with a .remove() function call
   * @disconnectedCallback
   */
		value: function disconnectedCallback() {
			console.group("Groupbox.disconnectedCallback");

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
			console.group("Groupbox.attributeChangedCallback:", attr, oldval, newval);

			this.properties = this.properties || [];

			var obs = Groupbox.observedAttributes;

			for (var i = 0; i < obs.length; i++) {
				this.properties[obs[i]] = newval;
				// YOUR CODE FOR CHANGES GO HERE 
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
			console.group("Groupbox._fetchElements");

			this.dom = this.dom || [];
			this.dom.content = this.innerHTML;

			console.groupEnd();
		}
	}, {
		key: "_fetchAttributes",


		/**
   * Component attributes are _fetched and defaults are set if undefined
   * @_fetchAttributes
   * @param {string} [modal=true] mode for our groupbox
   */
		value: function _fetchAttributes() {
			console.group("Groupbox._fetchAttributes");

			this.properties = {
				cname: "Groupbox",
				author: "Mel Heravi",
				version: "1.0",
				columns: "12,12"
			};

			// SAVE WIDGET SPECIFIC PROPERTIES
			this.propertiesW = [];

			// SAVE ALL OTHER PROPERTIES
			var attrs = wc.getAttributes(this);

			for (var key in attrs) {
				this.properties[key] = this.getAttribute(key);
				this.propertiesW[key] = this.getAttribute(key);
				console.log(key + ": " + attrs[key]);
			}

			console.log("attributes: ", this.properties);

			// PROCESS ALL PROPERTIES (example below);

			console.groupEnd();
		}
	}, {
		key: "_onClick",


		/**
   * A sample callback usage function - see connectedCallback()
   * @_onClick
   */
		value: function _onClick() {
			console.group("Groupbox._onClick:", this.id);

			wc.publish(this, "wc-groupbox", {
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
			console.group("Groupbox.destroy:", this.id);

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
		value: function configure(options) {
			console.group("Groupbox.configure:", JSON.stringify(options));

			// PROCESS ALL OPTIONS HERE

			console.groupEnd();
		}
	}, {
		key: "_initialize",


		/**
   * SAVE DATA FOR ANALYTICS
   * @__initialize
   */
		value: function _initialize() {
			console.group("Groupbox._initialize:", this.id);

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
			console.group("Groupbox._finalize:", this.id);

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
			console.group("Groupbox.observedAttributes");

			this.observables = ["columns"];

			console.groupEnd();
			return this.observables;
		}
	}]);

	return Groupbox;
}(HTMLElement);

window.customElements.define('wc-groupbox', Groupbox);"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Include Component<BR>
 * <BR><BR><a href="../html/include.html">DEMO</a>
 */
var Include = function (_HTMLElement) {
	_inherits(Include, _HTMLElement);

	function Include() {
		_classCallCheck(this, Include);

		console.group("Include.constructor");

		var _this = _possibleConstructorReturn(this, (Include.__proto__ || Object.getPrototypeOf(Include)).call(this));

		console.groupEnd();
		return _this;
	}

	_createClass(Include, [{
		key: "connectedCallback",


		/**
   * This function is called when this is attached to DOM
   * @connectedCallback. 
   */
		value: function connectedCallback() {
			console.group("Include.connectedCallback");

			var href = $(this).attr("href");
			var par = $(this).parent();

			// ADD LOADING IMAGE
			$(par).html("<span class='wc-loading-img'></span>");

			if (href) {
				var xhttp = new XMLHttpRequest();

				xhttp.onreadystatechange = function () {
					if (this.readyState == 4) {
						//alert(this.responseText)
						if (this.status == 200) {
							$(par).html(this.responseText);
						}
						if (this.status == 404) {
							$(par).html("wc-include: Page not found.");
						}
					}
				};

				xhttp.open("GET", href, true);
				xhttp.send();
			}

			console.groupEnd();
		}
	}]);

	return Include;
}(HTMLElement);

window.customElements.define('wc-include', Include);"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A Listbox Component
 * <BR><BR><img src=../img/listbox.png width=30% style="border:1px lime dashed";>
 * <BR><BR><a href="../html/listbox.html">DEMO</a>
 */
var Listbox = function (_HTMLElement) {
	_inherits(Listbox, _HTMLElement);

	function Listbox() {
		_classCallCheck(this, Listbox);

		console.group("Listbox.constructor");

		var _this = _possibleConstructorReturn(this, (Listbox.__proto__ || Object.getPrototypeOf(Listbox)).call(this));

		console.groupEnd();
		return _this;
	}

	_createClass(Listbox, [{
		key: "connectedCallback",


		/**
   * This function is called when this is attached to DOM
   * @connectedCallback. 
   */
		value: function connectedCallback() {
			var _this2 = this;

			console.group("Listbox.connectedCallback");

			var self = this;

			// MAKE SURE OUR COMPONENT HAS GLOBAL CLASS
			this.classList.add("wc");

			// FETCH ALL INTERESTING ELEMENTS
			this._fetchElements();

			// FETCH ALL ATTRIBUTES
			this._fetchAttributes();

			var _loop = function _loop(i) {
				console.log(_this2.dom.items[i]);

				var item = _this2.dom.items[i];

				item.addEventListener("click", function () {
					self._onClick(item);
				});
			};

			for (var i = 0; i < this.dom.items.length; i++) {
				_loop(i);
			}

			// WRAP UP AND ADD STATS
			this._finalize();

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
			console.group("Listbox.disconnectedCallback");

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
			console.group("Listbox.attributeChangedCallback:", attr, oldval, newval);

			this.properties = this.properties || [];

			// EXAMPLE ONLY. replace with observables
			switch (attr) {
				case "width":
					this.properties.width = newval;
					this.style.width = this.properties.width;
					break;
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
			console.group("Listbox._fetchElements");

			this.dom = this.dom || [];
			this.dom.content = this.innerHTML;
			this.dom.items = this.querySelectorAll(".list-group-item");

			console.groupEnd();
		}
	}, {
		key: "_fetchAttributes",


		/**
   * Component attributes are _fetched and defaults are set if undefined
   * @_fetchAttributes
   * @param {string} [width=100%] Listbox width
   */
		value: function _fetchAttributes() {
			console.group("Listbox._fetchAttributes");

			this.properties = {
				"cname": "Listbox",
				"author": "Mel Heravi",
				"version": "1.0",
				"width": "100%"
			};

			// EXAMPLE ONLY. replace with attributes
			if (this.hasAttribute("width")) {
				this.properties.width = this.getAttribute("width");
				this.style.width = this.properties.width;
				console.log("width: ", this.properties.width);
			}

			console.groupEnd();
		}
	}, {
		key: "_onClick",


		/**
   * A sample callback usage function - see connectedCallback()
   * @_onClick
   * @param {object} item clicked item
   */
		value: function _onClick(item) {
			console.group("Listbox._onClick:", this.id);

			// REMOVE ACTIVE ITEM
			for (var i = 0; i < this.dom.items.length; i++) {
				this.dom.items[i].classList.remove("active");
			}

			// ACTIVATE THIS ITEM
			item.classList.add("active");

			//PUBLISH TO THE EVENT
			wc.publish(this, "wc-listbox", {
				item: item.id,
				action: "click"
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
			console.group("Message.destroy:", this.id);

			// FREE POINTER
			delete this;

			// REMOVE ITEM FROM DOM
			this.parentNode.removeChild(this);

			console.groupEnd();
		}
	}, {
		key: "_finalize",


		/**
   * SAVE DATA FOR ANALYTICS
   * @__finalize
   */
		value: function _finalize() {
			console.group("Listbox._finalize:", this.id);

			this.classList.add("wc");

			// ADD ANALYTICS HERE
			wc.setStats(this, this.properties.cname, this.properties.version);

			console.groupEnd();
		}
	}], [{
		key: "test",


		/**
   * FOR TESTING PURPOSES
   * @test
   */
		value: function test() {
			console.group("Listbox.test");

			console.log("testing results will be printed here...");

			console.groupEnd();
			return true;
		}
	}, {
		key: "observedAttributes",


		/**
   * Set observable values here. When Changed, attributeChangedCallback is invoked
   * @observedAttributes
   */
		get: function get() {
			console.group("Listbox.observedAttributes");

			this.observables = ["width"];
			console.log(this.observables);

			console.groupEnd();
			return this.observables;
		}
	}]);

	return Listbox;
}(HTMLElement);

window.customElements.define('wc-listbox', Listbox);"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Maker Component<BR>
 * <BR><BR><img src=../img/maker.png width=30% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/maker.html">DEMO</a>
 */
var Maker = function (_HTMLElement) {
	_inherits(Maker, _HTMLElement);

	function Maker() {
		_classCallCheck(this, Maker);

		console.group("Maker.constructor");

		var _this = _possibleConstructorReturn(this, (Maker.__proto__ || Object.getPrototypeOf(Maker)).call(this));

		console.groupEnd();
		return _this;
	}

	_createClass(Maker, [{
		key: "connectedCallback",


		/**
   * This function is called when this is attached to DOM
   * @connectedCallback. 
   */
		value: function connectedCallback() {
			console.group("Maker.connectedCallback");

			var self = this;

			// GET PROPERTIES AND INTERESTING ELEMENTS
			this._initialize();

			// REPLACE CONTENT IF NECESSARY WITH NEW STUFF
			this.innerHTML = "<div class=\"wc-header\">" + this.properties.header + "</div>" + this.dom.content;

			// TRANSFER ALL ATTRIBUTES NOW (below is an example)
			// -------------------------------------------------
			// let child = this.querySelector(".wc-header");
			//
			// for (var key in this.propertiesW) {
			//     this.removeAttribute(key);
			//
			//     if (key != "class") {
			// 	child.setAttribute(key, this.properties[key]);
			//     }
			// }	

			// PUBLISH INTERESTING EVENTS
			this._publish();

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

			console.group("Maker.publish");

			this.addEventListener("click", function (e) {
				wc.publish(_this2, "wc-maker", {
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
			console.group("Maker.attributeChangedCallback:", attr, oldval, newval);

			this.properties = this.properties || [];

			var obs = Maker.observedAttributes;

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
			console.group("Maker._fetchElements");

			this.dom = this.dom || [];
			this.dom.content = this.innerHTML;

			console.groupEnd();
		}
	}, {
		key: "_fetchAttributes",


		/**
   * Component attributes are _fetched and defaults are set if undefined
   * @_fetchAttributes
   * @param {string} [modal=true] mode for our maker
   */
		value: function _fetchAttributes() {
			console.group("Maker._fetchAttributes");

			this.properties = {
				cname: "Maker",
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
			console.group("Maker.destroy:", this.id);

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
			console.group("Maker.configure:", JSON.stringify(options));

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
			console.group("Maker._initialize:", this.id);

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
			console.group("Maker._finalize:", this.id);

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
			console.group("Maker.disconnectedCallback");

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
			console.group("Maker.observedAttributes");

			this.observables = ["header"];

			console.groupEnd();
			return this.observables;
		}
	}]);

	return Maker;
}(HTMLElement);

window.customElements.define('wc-maker', Maker);"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Matrix Component<BR>
 * <BR><BR><img src=../img/matrix.png width=100% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/matrix.html">DEMO</a>
 */
var Matrix = function (_HTMLElement) {
	_inherits(Matrix, _HTMLElement);

	function Matrix() {
		_classCallCheck(this, Matrix);

		console.group("Matrix.constructor");

		var _this = _possibleConstructorReturn(this, (Matrix.__proto__ || Object.getPrototypeOf(Matrix)).call(this));

		console.groupEnd();
		return _this;
	}

	_createClass(Matrix, [{
		key: "connectedCallback",


		/**
   * This function is called when this is attached to DOM
   * @connectedCallback. 
   */
		value: function connectedCallback() {
			console.group("Matrix.connectedCallback");

			var self = this;

			// GET PROPERTIES AND INTERESTING ELEMENTS
			this._initialize();

			// REPLACE CONTENT IF NECESSARY WITH NEW STUFF
			this.innerHTML = "<div id='" + this.id + "' class='wc-matrix-main'><span class=\"wc-loading-img\"></span></div>";

			// ADD STATS AND OTHER FINAL STUFF
			this._finalize();

			// PUBLISH INTERESTING EVENTS
			//this._publish();

			console.groupEnd();
		}
	}, {
		key: "_publish",


		/**
   * Pubplish all events
   * @_publish
   */
		value: function _publish() {
			var _this2 = this;

			console.group("Matrix.publish");

			this.addEventListener("click", function (e) {
				_this2._click();
			});

			console.groupEnd();
			return true;
		}

		/**
   * A sample callback usage function - see connectedCallback()
   * @_click
   */

	}, {
		key: "_click",
		value: function _click() {
			console.group("Matrix._click:", this.id);

			wc.publish(this, "wc-matrix", {
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
			console.group("Matrix.disconnectedCallback");

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
			console.group("Matrix.attributeChangedCallback:", attr, oldval, newval);

			this.properties = this.properties || [];

			var obs = Matrix.observedAttributes;

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
			console.group("Matrix._fetchElements");

			this.dom = this.dom || [];
			this.dom.content = this.innerHTML;

			console.groupEnd();
		}
	}, {
		key: "_fetchAttributes",


		/**
   * Component attributes are _fetched and defaults are set if undefined
   * @_fetchAttributes
   * @param {string} [modal=true] mode for our matrix
   */
		value: function _fetchAttributes() {
			console.group("Matrix._fetchAttributes");

			this.properties = {
				cname: "Matrix",
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
					case "background":
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
			console.group("Matrix._onClick:", this.id);

			wc.publish(this, "wc-matrix", {
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
			console.group("Matrix.destroy:", this.id);

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
		value: function configure(options) {
			console.group("Matrix.configure:", JSON.stringify(options));

			// PROCESS ALL OPTIONS HERE

			console.groupEnd();
		}
	}, {
		key: "_initialize",


		/**
   * SAVE DATA FOR ANALYTICS
   * @__initialize
   */
		value: function _initialize() {
			console.group("Matrix._initialize:", this.id);

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
			console.group("Matrix._finalize:", this.id);

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
			console.group("Matrix.observedAttributes");

			this.observables = [];

			console.groupEnd();
			return this.observables;
		}
	}]);

	return Matrix;
}(HTMLElement);

window.customElements.define('wc-matrix', Matrix);"use strict";

// START LOADING STUFF NOW
$(".wc-matrix-main").load(cmx.html + "matrix.html", function () {
	$(".page-footer").load(cmx.html + "matrix.footer.html", function () {
		$("#help-container").load(cmx.html + "matrix.help.html", function () {
			// PROCESS SCREEN ITEMS
			var $footer = $(".page-footer");
			var zoomLevel = 1;
			var zoomStep = .05;
			var zoomLevelMin = .3;
			var zoomLevelMax = 1;

			$footer.find(".disclaimer[data-currency=usd]").show();

			$("#zoom-out").on("click", function (e) {
				if ($(this).hasClass("disabled")) {
					return false;
				}
				zoomLevel = zoomLevel - zoomStep;
				$("#wc-matrix-container").css("transform", "scale(" + zoomLevel + ")").css("transform-origin", "0 0").css("width", 100 / zoomLevel + "%");
				if (zoomLevel <= zoomLevelMin) {
					$("#zoom-out").addClass("disabled");
				}
				$("#zoom-in").removeClass("disabled");
				$("#zoom-reset").removeClass("disabled");
				return false;
			});

			$("#zoom-in").on("click", function (e) {
				if ($(this).hasClass("disabled")) {
					return false;
				}
				zoomLevel = zoomLevel + zoomStep;
				$("#wc-matrix-container").css("transform", "scale(" + zoomLevel + ")").css("transform-origin", "0 0").css("width", 100 / zoomLevel + "%");
				if (zoomLevel >= zoomLevelMax) {
					$("#zoom-in").addClass("disabled");
					$("#zoom-reset").addClass("disabled");
				}
				$("#zoom-out").removeClass("disabled");
				return false;
			});

			$("#zoom-reset").on("click", function (e) {
				if ($(this).hasClass("disabled")) {
					return false;
				}
				zoomLevel = 1;
				$("#wc-matrix-container").css("transform", "scale(" + zoomLevel + ")").css("transform-origin", "0 0").css("width", 100 / zoomLevel + "%");
				$("#zoom-in").addClass("disabled");
				$("#zoom-reset").addClass("disabled");
				$("#zoom-out").removeClass("disabled");
				return false;
			});

			var table;
			var fixedColumns = 6;
			var excelUrl = cmx.data + "matrix-usd.xlsx";
			var $tableNavigationLeft = $(".table-navigation__left");
			var $tableNavigationRight = $(".table-navigation__right");
			var maxScroll;
			var tooltipTimeout;

			$.csv2table.cssReset();

			var tableParameters = {
				sortable: false,
				nowloadingMsg: "Loading...",

				onload: function onload(id, op, data, ary) {
					appendThead($("#wc-matrix-container table"));

					table = $("#wc-matrix-container table").DataTable({
						paging: false,
						ordering: false,
						searching: true,
						pageLength: 100,
						scrollX: true,
						info: false,
						autoWidth: false,
						dom: "rt",
						columnDefs: [{
							targets: "_all",
							render: function render(data, type, row) {
								if (!isNaN(parseFloat(data)) && isFinite(data)) {
									data = parseFloat(data).toFixed(2);
									if (data == "-0.00") {
										data = parseFloat(0).toFixed(2);
									}
								}
								return data;
							},
							createdCell: function createdCell(td, cellData, rowData, row, col) {
								if (col == 0) {
									$(td).addClass("col-sector");
								} else if (col == 1) {
									$(td).addClass("col-asset-class");
								} else if (col >= 2 && col < fixedColumns) {
									$(td).addClass("col-asset-type");
									if (cellData.length > 0) {
										var pctValue = parseFloat(cellData * 100).toFixed(2);
										if (isNaN(pctValue)) {
											$(td).html("-");
										} else {
											$(td).html(pctValue);
										}
									} else {
										$(td).html("-");
									}
								}
								if (col >= fixedColumns && isNaN(parseFloat(cellData))) {
									$(td).addClass("col-header");
									$(td).html('<span class="col-header-inner"><strong>' + cellData + "</strong></span>");
								}
								if (col >= fixedColumns && cellData.length == 0) {
									$(td).addClass("empty");
								}
							}
						}],

						createdRow: function createdRow(row, data, dataIndex) {
							var rowClass = data[0].toLowerCase().replace(/[^a-z0-9]/g, "-");
							$(row).addClass(rowClass);
						},

						initComplete: function initComplete(settings, json) {
							hideFullHeader();
							mergeLikeRowsOnInit(0, this);
							enableHighlighting();
							enableRowSelection();
							enableColumnSelection();
							enableClearing();
							enableAssetTypeFiltering();
							enableAssetClassFiltering();
							checkTableScroll();
							generateDownloadLink(excelUrl);
							$("#wc-matrix-container-th-6").addClass("col-header");
						},
						fixedColumns: {
							heightMatch: "none",
							leftColumns: fixedColumns
						}
					});
				}
			};

			function loadCSV(url) {
				$("#wc-matrix-container").csv2table(url, tableParameters);
			}

			function mergeLikeRowsOnInit(columnIndex, table) {
				var column = table.api().column(columnIndex);
				return mergeLikeRows(column, table, true);
			}

			function mergeLikeRows(column, table, useApi) {
				var rowspan = 0;
				var prevValue;
				var prevStart = 1;
				var nodes = column.nodes().to$();
				column.data().each(function (value, index) {
					if (value == prevValue) {
						rowspan = rowspan + 1;
						$(nodes[index]).hide();
					} else {
						$(nodes[prevStart]).html('<span class="vertical-text">' + $(nodes[prevStart]).text() + "</span>");
						$(nodes[prevStart]).attr("rowspan", rowspan);
						if (index > 0) {
							if (useApi) {
								$(table.api().row(index).node()).addClass("separator-row");
							} else {
								$(table.row(index).node()).addClass("separator-row");
							}
						}
						prevStart = index;
						rowspan = 1;
					}
					prevValue = value;
				});
				$(nodes[prevStart]).html('<span class="vertical-text">' + $(nodes[prevStart]).text() + "</span>");
				$(nodes[prevStart]).attr("rowspan", rowspan);
			}

			function hideFullHeader() {
				$(".dataTables_scrollHead th:gt(" + fixedColumns + ")").css("visibility", "hidden");
			}

			function showFullHeader() {
				$(".dataTables_scrollHead th:gt(" + fixedColumns + ")").css("visibility", "visible");
			}

			function enableAssetTypeFiltering() {
				$(".asset-type-checkbox").on("click", function (e) {
					var colIndex = $(this).attr("data-column");
					var checked = $(this).is(":checked");
					var column = table.column(colIndex);
					column.visible(checked);
				});
			}

			function enableAssetClassFiltering() {
				$(".asset-class-checkbox").on("click", function (e) {
					if ($(".asset-class-checkbox:checked").length == 3) {
						hideFullHeader();
					} else {
						showFullHeader();
					}
					table.draw();
				});
				$.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
					var rowClass = data[0].toLowerCase().replace(/[^a-z0-9]/g, "-");
					if ($("input[name=asset-class-" + rowClass + "]").is(":checked")) {
						return true;
					} else {
						return false;
					}
				});
			}

			function enableClearing() {
				var isClearing = false;
				$("#filter-clear-selections").on("click", function () {
					if ($(this).hasClass("disabled") && !isClearing) {
						isClearing = true;
						alert("Please choose some assets to compare by clicking row or column headings.");
						setTimeout(function () {
							isClearing = false;
						}, 1e3);
						return false;
					}
					clearSelections();
				});
			}

			function clearSelections() {
				if ($("#wc-matrix-container table").hasClass("filter-compare-active")) {
					hideFullHeader();
					table.columns().visible(true, false);
					table.columns.adjust().draw(false);
					$(".asset-type-checkbox").prop("checked", "checked");
					$("#wc-matrix-container table").removeClass("filter-compare-active").removeClass("filter-compare-rows-active").removeClass("filter-compare-cols-active");
					$.fn.dataTable.ext.search.pop();
					mergeLikeRows(table.column(0), table, false);
				}
				$(table.rows().nodes()).removeClass("selected");
				$("td.selected").removeClass("selected");
				$("td").removeClass("clicked");
				$("div.options__selection .asset-selector").addClass("disabled");
				table.fixedColumns().update();
				table.draw();
			}

			function enableHighlighting() {
				$("#wc-matrix-container-th-6").on("mouseenter", function (e) {
					$(table.cells().nodes()).removeClass("highlight").removeClass("active");
					$(table.rows().nodes()).removeClass("highlight");
					var colIdx = 6;
					$(table.column(colIdx).nodes()).addClass("highlight");
					var rowIdx = 0;
					$(table.row(rowIdx).node()).addClass("highlight");
					table.fixedColumns().update();
				});
				$("#wc-matrix-container table tbody").on("mouseenter", "td", function (e) {
					if ($(this).hasClass("empty")) {
						$(table.cells().nodes()).removeClass("highlight").removeClass("active");
						$(table.rows().nodes()).removeClass("highlight");
					} else if ($(this).hasClass("col-header")) {
						var colIdx = table.cell(this).index().column;
						$(table.cells().nodes()).removeClass("highlight").removeClass("active");
						if (!isOnAssetClassColumn(e.pageX)) {
							$(table.column(colIdx).nodes()).addClass("highlight");
						} else {
							var correlatedColumnIdx = rowIdx + fixedColumns;
							$(table.column(correlatedColumnIdx).nodes()).addClass("highlight");
						}
						var rowIdx = table.cell(this).index().row + 1;
						$(table.rows().nodes()).removeClass("highlight");
						$(table.row(rowIdx).node()).addClass("highlight");
					} else {
						var rowIdx = table.cell(this).index().row;
						$(table.rows().nodes()).removeClass("highlight");
						$(table.row(rowIdx).node()).addClass("highlight");
						var colIdx = table.cell(this).index().column;
						$(table.cells().nodes()).removeClass("highlight").removeClass("active");
						if (!isOnAssetClassColumn(e.pageX)) {
							$(table.column(colIdx).nodes()).addClass("highlight");
						} else {
							var correlatedColumnIdx = rowIdx + fixedColumns;
							$(table.column(correlatedColumnIdx).nodes()).addClass("highlight");
						}
						if (table.cell(this).data().length > 0) {
							$(table.cell(this).node()).addClass("active");
						}
						$(document).bind("mousemove", function (e) {
							var tooltipWidth = $(".tablecell-tooltip").width();
							var windowWidth = $(window).width() - 50 - tooltipWidth;
							if (e.clientX >= windowWidth) {
								$(".tablecell-tooltip").css({
									left: e.clientX - tooltipWidth - 30,
									top: e.pageY + 25
								});
							} else {
								$(".tablecell-tooltip").css({
									left: e.pageX + 15,
									top: e.pageY + 15
								});
							}
						});
						var tooltipText;
						if ($(this).hasClass("col-asset-type")) {
							tooltipText = "<strong>Risk and Return:</strong><span>" + $(table.column(colIdx).header()).text() + "</span>";
						} else {
							tooltipText = "<strong>Correlating Asset Type:</strong><span>" + $(table.column(colIdx).header()).text() + "</span>";
						}
						if (!$(this).hasClass("col-asset-class")) {
							tooltipTimeout = setTimeout(function () {
								$(".tablecell-tooltip").addClass("visible");
								$(".tablecell-tooltip").html(tooltipText);
							}, 800);
						}
					}
					table.fixedColumns().update();
				}).on("click", "td", function () {
					if (!$(this).hasClass("col-asset-class") && !$(this).hasClass("col-header")) {
						$(this).toggleClass("clicked");
						$("div.options__selection .asset-selector").not("#filter-reset").removeClass("disabled");
					}
				}).on("mouseleave", "td", function () {
					var colIdx = table.cell(this).index().column;
					$(table.column(colIdx).nodes()).removeClass("highlight");
					var rowIdx = table.cell(this).index().row;
					$(table.row(rowIdx).node()).removeClass("highlight");
					if (table.cell(this).data().length > 0) {
						$(table.cell(this).node()).removeClass("active");
					}
					clearTimeout(tooltipTimeout);
					$(".tablecell-tooltip").removeClass("visible");
					table.fixedColumns().update();
				});
			}

			function enableRowSelection() {
				$("#wc-matrix-container table tbody").on("click", "td", function (e) {
					if (isOnAssetClassColumn(e.pageX)) {
						var rowIdx = $(this).closest("tr").index();
						highlightRow(rowIdx);
						highlightColumn(rowIdx + fixedColumns);
						$("div.options__selection .asset-selector").not("#filter-reset").removeClass("disabled");
					}
				});
			}

			function enableColumnSelection() {
				$("#wc-matrix-container table tbody, #wc-matrix-container table thead").on("click", "td.col-header,th.csv2table-table-th", function (e) {
					var colIdx = $(this).index();
					var offset = 4 - $(".asset-type-checkbox:checked").length;
					colIdx = colIdx + offset;
					highlightColumn(colIdx);
					highlightRow(colIdx - fixedColumns);
					$("div.options__selection .asset-selector").not("#filter-reset").removeClass("disabled");
					e.stopPropagation();
				});
			}

			function highlightRow(rowIdx) {
				$(table.row(rowIdx).node()).toggleClass("selected");
				table.fixedColumns().update();
			}

			function highlightColumn(colIdx) {
				$(table.column(colIdx).header()).toggleClass("selected");
				var nodes = table.column(colIdx).nodes().to$();
				$(nodes).each(function (index, node) {
					$(node).toggleClass("selected");
				});
			}

			function appendThead(table) {
				var thead = table.find("thead");
				var thRows = table.find("tr:has(th)");
				if (thead.length === 0) {
					thead = jQuery("<thead></thead>").appendTo(table);
				}
				var copy = thRows.clone(true).appendTo("thead");
				thRows.remove();
			}

			function setScrollIcons() {
				if ($(".dataTables_scrollBody").scrollLeft() <= 0) {
					$tableNavigationLeft.addClass("inactive");
				} else {
					$tableNavigationLeft.removeClass("inactive");
				}
				maxScroll = $(".dataTables_scrollBody table").width() - $(".dataTables_scrollBody").width();
				if ($(".dataTables_scrollBody").scrollLeft() >= maxScroll) {
					$tableNavigationRight.addClass("inactive");
				} else {
					$tableNavigationRight.removeClass("inactive");
				}
				clearTimeout(tooltipTimeout);
				$(".tablecell-tooltip").removeClass("visible");
			}

			function checkTableScroll() {
				$(".dataTables_scrollBody").on("scroll", setScrollIcons);
			}

			function isOnAssetClassColumn(x) {
				var leftOfAssetColumn = $("table.DTFC_Cloned td.col-asset-class").first().offset().left;
				var rightOfAssetClassColumn = $("table.DTFC_Cloned td.col-asset-class").first().width() + $("table.DTFC_Cloned td.col-asset-class").first().offset().left;
				if (x < rightOfAssetClassColumn && x > leftOfAssetColumn) {
					return true;
				} else {
					return false;
				}
			}
			$tableNavigationLeft.click(function (event) {
				event.preventDefault();
				$(".dataTables_scrollBody").animate({
					scrollLeft: "-=300"
				}, "fast", function () {
					setScrollIcons();
				});
			});
			$tableNavigationRight.click(function (event) {
				event.preventDefault();
				$(".dataTables_scrollBody").animate({
					scrollLeft: "+=300"
				}, "fast", function () {
					setScrollIcons();
				});
			});
			var csv = location.search.split("csv=")[1];
			if (typeof csv == "undefined" || csv.length == 0) {
				csv = "usd";
			} else {
				$(".currency-dropdown__select").val(csv);
				$(".currency-dropdown__selectorInner").text($(".currency-dropdown__select option:selected").text());
			}

			wc.subscribe("wc-dropdown", function (e) {
				var $this = $("#" + e.detail.id);
				var currency = e.detail.menuid;

				fixedColumns = $this.find("option[value=" + currency + "]").data("fixed-columns") || 6;

				var $footer = $(".page-footer");
				if (fixedColumns == 5) {
					$(".filter input[data-column=5]").closest(".item").hide();
				} else {
					$(".filter input[data-column=5]").closest(".item").show();
				}

				var url = cmx.data + currency + ".csv";

				table.destroy();
				$("#wc-matrix-container").html("");
				loadCSV(url);

				excelUrl = cmx.data + "matrix-" + currency + ".xlsx";

				var $disclaimers = $footer.find(".disclaimer");
				$disclaimers.hide();

				$footer.find(".disclaimer[data-currency=" + currency + "]").show();

				generateDownloadLink(excelUrl);
			});

			var $downloadButton = $("#btn-download");

			function generateDownloadLink(url) {
				$downloadButton.attr("href", url);
			}

			loadCSV(cmx.data + csv + ".csv");

			setTimeout(function () {
				$("#zoom-out").click();
				$("#zoom-out").click();
			}, 0);
		});
	});
});"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A Modal Dialog component
 * <BR><BR><img src=../img/modal.png width=70% style="border:1px lime dashed";>
 * <BR><BR><a href="../html/modal.html">DEMO</a>
 */
var Modal = function (_HTMLElement) {
	_inherits(Modal, _HTMLElement);

	function Modal() {
		_classCallCheck(this, Modal);

		console.group("Modal.constructor");

		var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this));

		console.groupEnd();
		return _this;
	}

	_createClass(Modal, [{
		key: "connectedCallback",


		/**
   * This function is called when this is attached to DOM
   * @connectedCallback. 
   */
		value: function connectedCallback() {
			console.group("Modal.connectedCallback");

			var self = this;

			// MAKE SURE OUR COMPONENT HAS GLOBAL CLASS
			this.classList.add("wc");

			// FETCH ALL INTERESTING ELEMENTS
			this._fetchElements();

			// FETCH ALL ATTRIBUTES
			this._fetchAttributes();

			var id = this.id + "-dialog";

			this.innerHTML = "\n\t    <div class=\"modal\" id=\"" + id + "\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">\n\t    <div class=\"modal-dialog\" role=\"document\">\n\t    <div class=\"modal-content\" style=\"width:" + this.properties.width + ";height=" + this.properties.height + "\">\n\t    <div class=\"modal-header\">\n\t    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n\t    <h4 class=\"modal-title\" id=\"myModalLabel\">" + this.properties.title + "</h4>\n\t    </div>\n\t    <div class=\"modal-body\">\n\t    " + this.dom.body.innerHTML + "\n\t    </div>\n\t    <div class=\"modal-footer\">\n\t    " + this.dom.controls.innerHTML + "\n\t    </div>\n\t    </div>\n\t    </div>\n\t    </div>";

			if (this.properties.title === "UNDEFINED") {
				this.querySelector(".modal-header").style.display = "none";
			}

			if (!this.dom.controls) {
				this.querySelector(".modal-footer").style.display = "none";
			}

			// REPOSITION WHEN A MODAL IS SHOWN
			$('.modal').on('show.bs.modal', this._reposition);

			// WRAP UP AND ADD STATS
			this._finalize();

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
			console.group("Modal.disconnectedCallback");

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
			console.group("Modal.attributeChangedCallback:", attr, oldval, newval);

			this.properties = this.properties || [];

			var obs = Modal.observedAttributes;

			for (var i = 0; i < obs.length; i++) {
				this.properties[obs[i]] = newval;
				console.log(obs[i] + ": " + this.properties.background);
				// YOUR CODE FOR CHANGES GO HERE 
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
			console.group("Modal._fetchElements");

			this.dom = this.dom || [];
			this.dom.content = this.innerHTML;
			this.dom.body = this.querySelector("wc-modal-body");
			this.dom.controls = this.querySelector("wc-modal-controls");

			if (this.dom.controls) {
				this.dom.controls.style.display = "none";
			} else {
				this.dom.controls = "";
			}

			console.groupEnd();
		}
	}, {
		key: "_fetchAttributes",


		/**
   * Component attributes are _fetched and defaults are set if undefined
   * @_fetchAttributes
   * @param {string} author component owner
   * @param {string} version Latest version of this component
   */
		value: function _fetchAttributes() {
			console.group("Modal._fetchAttributes");

			this.properties = {
				"cname": "Modal",
				"author": "Mel Heravi",
				"version": "1.0",
				"title": "UNDEFINED"
			};

			// SAVE WIDGET SPECIFIC PROPERTIES
			this.propertiesW = [];

			// SAVE ALL OTHER PROPERTIES
			var attrs = wc.getAttributes(this);

			for (var key in attrs) {
				this.properties[key] = this.getAttribute(key);
				this.propertiesW[key] = this.getAttribute(key);
				console.log(key + ": " + attrs[key]);
			}

			console.log("attributes: ", this.properties);

			// PROCESS ALL PROPERTIES (example below);
			// this.style.background = this.properties.background;

			console.groupEnd();
		}
	}, {
		key: "_reposition",


		/**
   * Centers the dialog
   * @_reposition
   */
		value: function _reposition() {
			console.group("Modal._reposition");

			var modal = $(this),
			    dialog = modal.find('.modal-dialog');
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

	}, {
		key: "destroy",
		value: function destroy() {
			console.group("Message.destroy:", this.id);

			// FREE POINTER
			delete this;

			// REMOVE ITEM FROM DOM
			this.parentNode.removeChild(this);

			console.groupEnd();
		}
	}, {
		key: "_finalize",


		/**
   * SAVE DATA FOR ANALYTICS
   * @__finalize
   */
		value: function _finalize() {
			console.group("Modal._finalize:", this.id);

			this.classList.add("wc");

			// ADD ANALYTICS HERE
			wc.setStats(this, this.properties.cname, this.properties.version);

			console.groupEnd();
		}
	}], [{
		key: "test",


		/**
   * FOR TESTING PURPOSES
   * @test
   */
		value: function test() {
			console.group("Modal.test");

			console.log("testing results will be printed here...");

			console.groupEnd();
			return true;
		}
	}, {
		key: "observedAttributes",


		/**
   * Set observable values here. When Changed, attributeChangedCallback is invoked
   * @observedAttributes
   */
		get: function get() {
			console.group("Modal.observedAttributes");

			var observables = ["title"];
			console.log(observables);

			console.groupEnd();
			return observables;
		}
	}]);

	return Modal;
}(HTMLElement);

window.customElements.define('wc-modal', Modal);"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Orgchart Component<BR>
 * <BR><BR><img src=../img/orgchart.png width=100% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/orgchart.html">DEMO</a>
 */
var Orgchart = function (_HTMLElement) {
	_inherits(Orgchart, _HTMLElement);

	function Orgchart() {
		_classCallCheck(this, Orgchart);

		console.group("Orgchart.constructor");

		var _this = _possibleConstructorReturn(this, (Orgchart.__proto__ || Object.getPrototypeOf(Orgchart)).call(this));

		console.groupEnd();
		return _this;
	}

	_createClass(Orgchart, [{
		key: "connectedCallback",


		/**
   * This function is called when this is attached to DOM
   * @connectedCallback. 
   */
		value: function connectedCallback() {
			console.group("Orgchart.connectedCallback");

			var self = this;

			// GET PROPERTIES AND INTERESTING ELEMENTS
			this._initialize();

			this.properties.direction = this.properties.direction || "t2b";
			this.properties.toggle = this.properties.toggle || true;
			this.properties.icon = this.properties.icon || "fa-bars";

			// REPLACE CONTENT IF NECESSARY WITH NEW STUFF
			//this.innerHTML = `<wc-header>${this.properties.header}</wc-header>` + this.dom.content;

			// ADD STATS AND OTHER FINAL STUFF
			this._finalize();

			console.groupEnd();
		}
	}, {
		key: "disconnectedCallback",


		/**
   * Invoked When component is removed. Usually with a .remove() function call
   * @disconnectedCallback
   */
		value: function disconnectedCallback() {
			console.group("Orgchart.disconnectedCallback");

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
			console.group("Orgchart.attributeChangedCallback:", attr, oldval, newval);

			this.properties = this.properties || [];

			var obs = Orgchart.observedAttributes;

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
			console.group("Orgchart._fetchElements");

			this.dom = this.dom || [];
			this.dom.content = this.innerHTML;

			console.groupEnd();
		}
	}, {
		key: "_fetchAttributes",


		/**
   * Component attributes are _fetched and defaults are set if undefined
   * @_fetchAttributes
   * @param {string} [modal=true] mode for our orgchart
   */
		value: function _fetchAttributes() {
			console.group("Orgchart._fetchAttributes");

			this.properties = {
				cname: "Orgchart",
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
					case "background":
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
			console.group("Orgchart._onClick:", this.id);

			wc.publish(this, "wc-orgchart", {
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
			console.group("Orgchart.destroy:", this.id);

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
		value: function configure(options) {
			console.group("Orgchart.configure:", this.id);

			options.direction = options.direction || this.properties.direction;
			options.toggle = options.toggle || this.properties.toggle;
			options.icon = options.icon || this.properties.icon;

			$(this).orgchart({
				'nodeContent': 'title',
				'data': options.source,
				'direction': options.direction,
				"toggleSiblingsResp": JSON.parse(options.toggle),
				'parentNodeSymbol': options.icon
			});

			if (JSON.parse(options.toggle) == false) {
				$(this).find(".leftEdge, .rightEdge, .bottomEdge, .topEdge").css("display", "none");
			}

			self = this;

			$(".node").on("click", function () {
				wc.publish(self, "wc-orgchart", {
					time: new Date().getTime(),
					action: "click",
					id: self.id,
					node: $(this).closest(".node").attr("id")
				});
			});

			console.groupEnd();
		}
	}, {
		key: "_initialize",


		/**
   * SAVE DATA FOR ANALYTICS
   * @__initialize
   */
		value: function _initialize() {
			console.group("Orgchart._initialize:", this.id);

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
			console.group("Orgchart._finalize:", this.id);

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
			console.group("Orgchart.observedAttributes");

			this.observables = [];

			console.groupEnd();
			return this.observables;
		}
	}]);

	return Orgchart;
}(HTMLElement);

window.customElements.define('wc-orgchart', Orgchart);"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Page Component<BR>
 * <BR><BR><img src=../img/page.png width=70% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/page.html">DEMO</a>
 */
var Page = function (_HTMLElement) {
	_inherits(Page, _HTMLElement);

	function Page() {
		_classCallCheck(this, Page);

		console.group("Page.constructor");

		var _this = _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).call(this));

		console.groupEnd();
		return _this;
	}

	_createClass(Page, [{
		key: "connectedCallback",


		/**
   * This function is called when this is attached to DOM
   * @connectedCallback. 
   */
		value: function connectedCallback() {
			console.group("Page.connectedCallback");

			var self = this;

			// GET PROPERTIES AND INTERESTING ELEMENTS
			this._initialize();

			// REPLACE CONTENT IF NECESSARY WITH NEW STUFF
			this.innerHTML = this.dom.content;

			var tmp = "wc-page-header, wc-page-body, wc-page-footer".split(',');

			for (var i = 0; i < tmp.length; i++) {
				var c = $(tmp[i]).html();

				$(tmp[i]).html("<div class=\"container\"><div class=\"row\"><div class=\"col-md-12\">" + c + "</div></div></div>");
			}

			if (this.properties.fluid == "true") {
				this.fluid(this.properties.fluid);
			}

			// PUBLISH INTERESTING EVENTS
			this._publish();

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

			console.group("Page.publish");

			this.addEventListener("click", function (e) {
				wc.publish(_this2, "wc-page", {
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
			console.group("Page.attributeChangedCallback:", attr, oldval, newval);

			this.properties = this.properties || [];

			var obs = Page.observedAttributes;

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
			console.group("Page._fetchElements");

			this.dom = this.dom || [];
			this.dom.content = this.innerHTML;

			console.groupEnd();
		}
	}, {
		key: "_fetchAttributes",


		/**
   * Component attributes are _fetched and defaults are set if undefined
   * @_fetchAttributes
   * @param {string} [modal=true] mode for our page
   */
		value: function _fetchAttributes() {
			console.group("Page._fetchAttributes");

			this.properties = {
				cname: "Page",
				author: "Mel Heravi",
				version: "1.0",
				fluid: false
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
			console.group("Page.destroy:", this.id);

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
			console.group("Page.configure:", JSON.stringify(options));

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
			console.group("Page._initialize:", this.id);

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
			console.group("Page._finalize:", this.id);

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
			console.group("Page.disconnectedCallback");

			/* CLEAN UP NOW */

			console.groupEnd();
		}
	}, {
		key: "fluid",


		/**
   * toggle fluid class on top containers
   * @fluid
   */
		value: function fluid(flag) {
			console.group("Page.fluid");

			$(this).attr("fluid", flag);

			if (flag) {
				$("wc-page-footer > div, wc-page-body > div, wc-page-header > div").removeClass("container").addClass("container-fluid");
			} else {
				$("wc-page-footer > div, wc-page-body > div, wc-page-header > div").removeClass("container-fluid").addClass("container");
			}

			console.groupEnd();
		}
	}], [{
		key: "observedAttributes",


		/**
   * Set observable values here. When Changed, attributeChangedCallback is invoked
   * @observedAttributes
   */
		get: function get() {
			console.group("Page.observedAttributes");

			this.observables = [];

			console.groupEnd();
			return this.observables;
		}
	}]);

	return Page;
}(HTMLElement);

window.customElements.define('wc-page', Page);"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Popup Component<BR>
 * <BR><BR><img src=../img/popup.png width=50% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/popup.html">DEMO</a>
 */
var Popup = function (_HTMLElement) {
	_inherits(Popup, _HTMLElement);

	function Popup() {
		_classCallCheck(this, Popup);

		console.group("Popup.constructor");

		var _this = _possibleConstructorReturn(this, (Popup.__proto__ || Object.getPrototypeOf(Popup)).call(this));

		console.groupEnd();
		return _this;
	}

	_createClass(Popup, [{
		key: "connectedCallback",


		/**
   * This function is called when this is attached to DOM
   * @connectedCallback. 
   */
		value: function connectedCallback() {
			var _this2 = this;

			console.group("Popup.connectedCallback");

			var self = this;

			// GET PROPERTIES AND INTERESTING ELEMENTS
			this._initialize();

			$(this).css({
				width: this.properties.width,
				height: this.properties.height
			});

			var driver = $('#' + this.properties.driver);

			driver.click(function (e) {
				$(_this2).css({
					'left': $(driver).offset().left,
					'top': $(driver).offset().top + $(driver).height() + 5
				});

				if ($(_this2).is(":visible")) {
					wc.publish(_this2, "wc-popup", {
						time: new Date().getTime(),
						flag: "closed",
						id: _this2.id
					});

					$(_this2).fadeOut(300);
				} else {
					// HIDE ALL OTHER OPEN POPUPS
					$("wc-popup:visible").each(function () {
						$(this).hide();

						wc.publish(self, "wc-popup", {
							time: new Date().getTime(),
							flag: "closed",
							id: this.id
						});
					});

					wc.publish(_this2, "wc-popup", {
						time: new Date().getTime(),
						flag: "opened",
						id: _this2.id
					});

					$(_this2).fadeIn(300);
				}
			});

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
			console.group("Popup.attributeChangedCallback:", attr, oldval, newval);

			this.properties = this.properties || [];

			var obs = Popup.observedAttributes;

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
			console.group("Popup._fetchElements");

			this.dom = this.dom || [];
			this.dom.content = this.innerHTML;

			console.groupEnd();
		}
	}, {
		key: "_fetchAttributes",


		/**
   * Component attributes are _fetched and defaults are set if undefined
   * @_fetchAttributes
   * @param {string} [modal=true] mode for our popup
   */
		value: function _fetchAttributes() {
			console.group("Popup._fetchAttributes");

			this.properties = {
				cname: "Popup",
				author: "Mel Heravi",
				version: "1.0",
				width: "auto",
				height: "auto"
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
			console.group("Popup.destroy:", this.id);

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
			console.group("Popup.configure:", JSON.stringify(options));

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
			console.group("Popup._initialize:", this.id);

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
			console.group("Popup._finalize:", this.id);

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
			console.group("Popup.disconnectedCallback");

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
			console.group("Popup.observedAttributes");

			this.observables = ["header"];

			console.groupEnd();
			return this.observables;
		}
	}]);

	return Popup;
}(HTMLElement);

window.customElements.define('wc-popup', Popup);"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Radio Component<BR>
 * <BR><BR><img src=../img/radio.png width=40% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/radio.html">DEMO</a>
 */
var Radio = function (_HTMLElement) {
	_inherits(Radio, _HTMLElement);

	function Radio() {
		_classCallCheck(this, Radio);

		console.group("Radio.constructor");

		var _this = _possibleConstructorReturn(this, (Radio.__proto__ || Object.getPrototypeOf(Radio)).call(this));

		console.groupEnd();
		return _this;
	}

	_createClass(Radio, [{
		key: "connectedCallback",


		/**
   * This function is called when this is attached to DOM
   * @connectedCallback. 
   */
		value: function connectedCallback() {
			console.group("Radio.connectedCallback");

			var self = this;

			// GET PROPERTIES AND INTERESTING ELEMENTS
			this._initialize();

			var cols = this.properties.columns.split(',');

			var id = this.id;
			var c1 = "col-md-" + cols[0];
			var c2 = "col-md-" + cols[1];

			var lbl = this.properties.label || "";
			var val = this.properties.value || "";
			var cls = this.properties.class || "";
			var hlp = this.properties.help || "";

			// DATA-KEY FOR BINDING
			var dkey = id.replace(/_/g, '').replace(/-/g, '');

			// REPLACE CONTENT IF NECESSARY WITH NEW STUFF
			this.innerHTML = "\n\t\t<div class=\"form-group has-feedback form-check-inline\">\n\t\t    <input class=\"form-check-input\" type=\"radio\" value=\"" + val + "\" data-key=\"" + dkey + "\" />\n\t\t    <label for=\"" + this.id + "\" id=\"" + this.id + "-label\" class=\"form-check-label col-form-label\">" + lbl + "</label>\n\t\t</div>";

			// TRANSFER ALL ATTRIBUTES NOW (below is an example)
			// -------------------------------------------------
			var widget = this.querySelector("input[type=radio]");

			for (var key in this.propertiesW) {
				this.removeAttribute(key);
				if (key != "class") {
					widget.setAttribute(key, this.properties[key]);
				}
			}

			// ADD STATS AND OTHER FINAL STUFF
			this._finalize();

			// PUBLISH INTERESTING EVENTS
			this._publish();

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

			console.group("Radio.publish");

			var widget = this.querySelector("[type=radio]");

			widget.addEventListener("click", function (e) {
				_this2._click($(widget).attr("id"));
			});

			console.groupEnd();
			return true;
		}

		/**
   * A sample callback usage function - see connectedCallback()
   * @_onClick
   */

	}, {
		key: "_click",
		value: function _click(id) {
			console.group("Radio._click:", id);

			var val = $("#radio-1").val();

			wc.publish(this, "wc-radio", {
				time: new Date().getTime(),
				action: "click",
				id: id,
				checked: val,
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
			console.group("Radio.disconnectedCallback");

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
			console.group("Radio.attributeChangedCallback:", attr, oldval, newval);

			this.properties = this.properties || [];

			var obs = Radio.observedAttributes;

			for (var i = 0; i < obs.length; i++) {
				this.properties[obs[i]] = newval;
				// YOUR CODE FOR CHANGES GO HERE 
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
			console.group("Radio._fetchElements");

			this.dom = this.dom || [];
			this.dom.content = this.innerHTML;

			console.groupEnd();
		}
	}, {
		key: "_fetchAttributes",


		/**
   * Component attributes are _fetched and defaults are set if undefined
   * @_fetchAttributes
   * @param {string} [modal=true] mode for our radio
   */
		value: function _fetchAttributes() {
			console.group("Radio._fetchAttributes");

			this.properties = {
				cname: "Radio",
				author: "Mel Heravi",
				version: "1.0",
				columns: "12,12"
			};

			// SAVE WIDGET SPECIFIC PROPERTIES
			this.propertiesW = [];

			// SAVE ALL OTHER PROPERTIES
			var attrs = wc.getAttributes(this);

			for (var key in attrs) {
				this.properties[key] = this.getAttribute(key);
				this.propertiesW[key] = this.getAttribute(key);
				console.log(key + ": " + attrs[key]);
			}

			console.log("attributes: ", this.properties);

			// PROCESS ALL PROPERTIES (example below);

			console.groupEnd();
		}
	}, {
		key: "_onClick",


		/**
   * A sample callback usage function - see connectedCallback()
   * @_onClick
   */
		value: function _onClick() {
			console.group("Radio._onClick:", this.id);

			wc.publish(this, "wc-radio", {
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
			console.group("Radio.destroy:", this.id);

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
		value: function configure(options) {
			console.group("Radio.configure:", JSON.stringify(options));

			// PROCESS ALL OPTIONS HERE

			console.groupEnd();
		}
	}, {
		key: "_initialize",


		/**
   * SAVE DATA FOR ANALYTICS
   * @__initialize
   */
		value: function _initialize() {
			console.group("Radio._initialize:", this.id);

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
			console.group("Radio._finalize:", this.id);

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
			console.group("Radio.observedAttributes");

			this.observables = ["columns"];

			console.groupEnd();
			return this.observables;
		}
	}]);

	return Radio;
}(HTMLElement);

window.customElements.define('wc-radio', Radio);"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Ranger Component<BR>
 * <BR><BR><img src=../img/ranger.png width=70% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/ranger.html">DEMO</a>
 */
var Ranger = function (_HTMLElement) {
	_inherits(Ranger, _HTMLElement);

	function Ranger() {
		_classCallCheck(this, Ranger);

		console.group("Ranger.constructor");

		var _this = _possibleConstructorReturn(this, (Ranger.__proto__ || Object.getPrototypeOf(Ranger)).call(this));

		console.groupEnd();
		return _this;
	}

	_createClass(Ranger, [{
		key: "connectedCallback",


		/**
   * This function is called when this is attached to DOM
   * @connectedCallback. 
   */
		value: function connectedCallback() {
			console.group("Ranger.connectedCallback");

			var self = this;

			// GET PROPERTIES AND INTERESTING ELEMENTS
			this._initialize();

			// ADD GRIP HANDLES
			$(this).append("<div class=\"ui-resizable-handle ui-resizable-nw\" id=\"wc-ranger-nwgrip\"></div><div class=\"ui-resizable-handle ui-resizable-se\" id=\"wc-ranger-segrip\"></div>");
			//$(this).addClass("ui-state-active");

			var p = $(this).parent().css("position", "relative").addClass("ui-widget-content");
			var ph = p.height();
			var pid = p.attr("id");

			$(this).css("min-height", ph);

			$(this).draggable({
				containment: "#" + pid
			}).resizable({
				containment: "#" + pid,
				handles: {
					'se': "#wc-ranger-segrip",
					'nw': "#wc-ranger-nwgrip"
				}
			});

			$("#wc-ranger-segrip").css("top", ph / 2 - 12);
			$("#wc-ranger-nwgrip").css("top", ph / 2 - 12);

			$(this).on("resizestart", function (event, ui) {
				wc.publish(this, "wc-ranger", {
					time: new Date().getTime(),
					action: "resizestart",
					id: this.id,
					left: $(this).position().left,
					width: $(this).width()
				});
			}).on("resizestop", function (event, ui) {
				wc.publish(this, "wc-ranger", {
					time: new Date().getTime(),
					action: "resizestop",
					id: this.id,
					left: $(this).position().left,
					width: $(this).width()
				});
			}).on("resize", function (event, ui) {
				wc.publish(this, "wc-ranger", {
					time: new Date().getTime(),
					action: "resize",
					id: this.id,
					left: $(this).position().left,
					width: $(this).width()
				});
			});

			$(this).on("dragstart", function (event, ui) {
				wc.publish(this, "wc-ranger", {
					time: new Date().getTime(),
					action: "dragstart",
					id: this.id,
					left: $(this).position().left,
					width: $(this).width()
				});
			}).on("dragstop", function (event, ui) {
				wc.publish(this, "wc-ranger", {
					time: new Date().getTime(),
					action: "dragstop",
					id: this.id,
					left: $(this).position().left,
					width: $(this).width()
				});
			}).on("drag", function (event, ui) {
				wc.publish(this, "wc-ranger", {
					time: new Date().getTime(),
					action: "drag",
					id: this.id,
					left: $(this).position().left,
					width: $(this).width()
				});
			});

			// ADD STATS AND OTHER FINAL STUFF
			this._finalize();

			console.groupEnd();
		}
	}, {
		key: "_click",


		/**
   * A sample callback usage function - see connectedCallback()
   * @_click
   */
		value: function _click() {
			console.group("Ranger._click:", this.id);

			wc.publish(this, "wc-ranger", {
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
			console.group("Ranger.disconnectedCallback");

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
			console.group("Ranger.attributeChangedCallback:", attr, oldval, newval);

			this.properties = this.properties || [];

			var obs = Ranger.observedAttributes;

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
			console.group("Ranger._fetchElements");

			this.dom = this.dom || [];
			this.dom.content = this.innerHTML;

			console.groupEnd();
		}
	}, {
		key: "_fetchAttributes",


		/**
   * Component attributes are _fetched and defaults are set if undefined
   * @_fetchAttributes
   * @param {string} [modal=true] mode for our ranger
   */
		value: function _fetchAttributes() {
			console.group("Ranger._fetchAttributes");

			this.properties = {
				cname: "Ranger",
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
					case "background":
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
			console.group("Ranger._onClick:", this.id);

			wc.publish(this, "wc-ranger", {
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
			console.group("Ranger.destroy:", this.id);

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
		value: function configure(options) {
			console.group("Ranger.configure:", JSON.stringify(options));

			// PROCESS ALL OPTIONS HERE

			console.groupEnd();
		}
	}, {
		key: "_initialize",


		/**
   * SAVE DATA FOR ANALYTICS
   * @__initialize
   */
		value: function _initialize() {
			console.group("Ranger._initialize:", this.id);

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
			console.group("Ranger._finalize:", this.id);

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
			console.group("Ranger.observedAttributes");

			this.observables = [];

			console.groupEnd();
			return this.observables;
		}
	}]);

	return Ranger;
}(HTMLElement);

window.customElements.define('wc-ranger', Ranger);"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Select Dropdown Component
 * <BR><BR><img src=../img/select.png width=70% style="border:1px lime dashed";>
 * <BR><BR><a href="../html/select.html">DEMO</a>
 */
var Select = function (_HTMLElement) {
	_inherits(Select, _HTMLElement);

	function Select() {
		_classCallCheck(this, Select);

		console.group("Select.constructor");

		var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this));

		console.groupEnd();
		return _this;
	}

	_createClass(Select, [{
		key: "connectedCallback",


		/**
   * This function is called when this is attached to DOM
   * @connectedCallback. 
   */
		value: function connectedCallback() {
			console.group("Select.connectedCallback");

			var self = this;

			// GET PROPERTIES AND INTERESTING ELEMENTS
			this._initialize();

			var cols = this.properties.columns.split(',');

			var id = this.id;
			var c1 = "col-md-" + cols[0];
			var c2 = "col-md-" + cols[1];

			var lbl = this.properties.label || "";
			var hlp = this.properties.help || "";

			// DATA-KEY FOR BINDING
			var dkey = id.replace(/_/g, '').replace(/-/g, '');

			// REPLACE CONTENT IF NECESSARY WITH NEW STUFF
			this.innerHTML = "\n\t\t<div class=\"form-group clearfix\">\n\t\t    <div class=\"row\">\n\t\t        <div class=\"" + c1 + "\">\n\t\t            <label id=\"" + this.id + "-label\" for=\"" + this.id + "-label\" class=\"btn-control col-form-label\">" + lbl + "</label>\n\t\t        </div>\n\t\t        <div class=\"" + c2 + "\">\n \t\t            <select class=\"form-control " + this.properties.class + "\" id=\"" + this.id + "\" data-key=\"" + dkey + "\">\n\t\t\t    " + this.dom.content + ">\n\t\t\t    </select>\n\n\t\t\t    <span class=\"glyphicon form-control-feedback\" aria-hidden=\"true\"></span>\n\t\t\t    <small id='" + this.id + "-help' class='help-block with-errors text-muted'>" + hlp + "</small>\n                        </div>\n                    </div>\n\t\t</div>";

			// TRANSFER ALL ATTRIBUTES NOW (below is an example)
			var widget = this.querySelector("select");
			for (var key in this.propertiesW) {
				this.removeAttribute(key);
				if (key != "class") {
					widget.setAttribute(key, this.properties[key]);
				}
			}

			var select = this.querySelector("select");

			if (this.properties.searchable == "true") {
				var search = 1;
			} else {
				var search = Infinity;
			}

			var s2 = $(select).select2({
				minimumResultsForSearch: search, // HIDE SEARCH
				placeholder: this.properties.placeholder,
				theme: "bootstrap"
			});

			// let arrow = this.querySelector(".select2-selection__arrow");

			// // INITIAL ARROW DOWN
			// $(arrow).addClass("arrow-down");

			// $(s2).on('select2:open', function (e) {
			//     $(arrow).removeClass("arrow-down").addClass("arrow-up");
			// });

			// $(s2).on('select2:close', function (e) {
			//     $(arrow).removeClass("arrow-up").addClass("arrow-down");
			// });

			// ADD STATS AND OTHER FINAL STUFF
			this._finalize();

			// PUBLISH INTERESTING EVENTS
			this._publish();

			// SHOW IT NOW (NO FLICKERS) 
			this.style.visibility = "visible";

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

			console.group("Select._publish");

			var widget = this.querySelector("select");
			var id = $(widget).attr("id");

			$("#" + id).on("change", function (e) {
				_this2._change(id);
			});

			// NOT WORKING
			// widget.addEventListener("change", e => {
			//     this._change(id);
			// });

			console.groupEnd();
			return true;
		}

		/**
   * A sample callback usage function - see connectedCallback()
   * @_onChange
   */

	}, {
		key: "_change",
		value: function _change(id) {
			console.group("Select._change:", id);

			var val = $("#" + id).val();

			wc.publish(this, "wc-select", {
				time: new Date().getTime(),
				action: "change",
				id: id,
				val: val,
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
			console.group("Select.disconnectedCallback");

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
			console.group("Select.attributeChangedCallback:", attr, oldval, newval);

			this.properties = this.properties || [];

			var obs = Select.observedAttributes;

			for (var i = 0; i < obs.length; i++) {
				if (newval) {
					this.properties[obs[i]] = newval;
					// YOUR CODE FOR CHANGES GO HERE
				}
			}

			console.log("=====", this.properties);

			console.groupEnd();
		}
	}, {
		key: "_fetchElements",


		/**
   * Stores DOM elements of interest for future use
   * @_fetchElements
   */
		value: function _fetchElements() {
			console.group("Select._fetchElements");

			this.dom = this.dom || [];
			this.dom.content = this.innerHTML;

			console.groupEnd();
		}
	}, {
		key: "_fetchAttributes",


		/**
   * Component attributes are _fetched and defaults are set if undefined
   * @_fetchAttributes
   * @param {string} [searchable=false]
   */
		value: function _fetchAttributes() {
			console.group("Select._fetchAttributes");

			this.properties = {
				"cname": "Select",
				"author": "Mel Heravi",
				"version": "1.0",
				"columns": "12,12",
				"searchable": "false"
			};

			// SAVE WIDGET SPECIFIC PROPERTIES
			this.propertiesW = [];

			// SAVE ALL OTHER PROPERTIES
			var attrs = wc.getAttributes(this);

			for (var key in attrs) {
				this.properties[key] = this.getAttribute(key);
				this.propertiesW[key] = this.getAttribute(key);
				console.log(key + ": " + attrs[key]);
			}

			this.properties.placeholder = this.properties.placeholder || "";

			console.log("---------", this.properties);

			console.groupEnd();
		}
	}, {
		key: "destroy",


		/**
   * Destroy the instance object and artifacts
   * @_destroy
   */
		value: function destroy() {
			console.group("Select.destroy:", this.id);

			// FREE POINTER
			delete this;

			// REMOVE ITEM FROM DOM
			this.parentNode.removeChild(this);

			console.groupEnd();
		}
	}, {
		key: "_initialize",


		/**
   * SAVE DATA FOR ANALYTICS
   * @__initialize
   */
		value: function _initialize() {
			console.group("Select._initialize:", this.id);

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
			console.group("Select._finalize:", this.id);

			this.classList.add("wc");

			// ADD ANALYTICS HERE
			wc.setStats(this, this.properties.cname, this.properties.version);

			console.groupEnd();
		}
	}], [{
		key: "test",


		/**
   * FOR TESTING PURPOSES
   * @test
   */
		value: function test() {
			console.group("Select.test");

			console.log("testing results will be printed here...");

			console.groupEnd();
			return true;
		}
	}, {
		key: "observedAttributes",


		/**
   * Set observable values here. When Changed, attributeChangedCallback is invoked
   * @observedAttributes
   */
		get: function get() {
			console.group("Select.observedAttributes");

			this.observables = ["searchable"];

			console.groupEnd();
			return this.observables;
		}
	}]);

	return Select;
}(HTMLElement);

window.customElements.define('wc-select', Select);"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Slide Component<BR>
 * <BR><BR><img src=../img/slide.png width=80% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/slide.html">DEMO</a>
 */
var Slide = function (_HTMLElement) {
	_inherits(Slide, _HTMLElement);

	function Slide() {
		_classCallCheck(this, Slide);

		console.group("Slide.constructor");

		var _this = _possibleConstructorReturn(this, (Slide.__proto__ || Object.getPrototypeOf(Slide)).call(this));

		console.groupEnd();
		return _this;
	}

	_createClass(Slide, [{
		key: "connectedCallback",


		/**
   * This function is called when this is attached to DOM
   * @connectedCallback. 
   */
		value: function connectedCallback() {
			console.group("Slide.connectedCallback");

			var self = this;

			// GET PROPERTIES AND INTERESTING ELEMENTS
			this._initialize();

			if (this.properties.search == "true") {
				var display = "block";
			} else {
				var display = "none";
			}

			// REPLACE CONTENT IF NECESSARY WITH NEW STUFF
			this.innerHTML = "\n\t\t<wc-slide-menus>\n\t\t    <wc-slide-title>\n\t\t\t" + this.properties.title + "\n\t\t    </wc-slide-title>\n\t\t\n\t\t    <wc-slide-search style=\"display:" + display + "\">\n\t\t\t<input type=\"text\" placeholder=\"Search for names..\" autocomplete='off' />\n\t\t    </wc-slide-search>\n\t\t\n\t\t    <wc-slide-menus>\n\t\t\t" + this.dom.menus.innerHTML + "\n\t\t    </wc-slide-menus>\n\t\t</wc-slide-menus>";

			var search = document.querySelector("wc-slide-search input");

			search.addEventListener("keyup", this.search);

			// ADD STATS AND OTHER FINAL STUFF
			this._finalize();

			// PUBLISH INTERESTING EVENTS
			this._publish();

			console.groupEnd();
		}
	}, {
		key: "_publish",


		/**
   * Publish all events
   * @_publish
   */
		value: function _publish() {
			console.group("Slide.publish");

			self = this;

			$("wc-slide-menus a").on("click", function () {
				self._click(this);
			});

			console.groupEnd();
			return true;
		}

		/**
   * A sample callback usage function - see connectedCallback()
   * @_onClick
   */

	}, {
		key: "_click",
		value: function _click(self) {
			console.group("Slide._click:", self.id);

			wc.publish(self, "my-slide", {
				time: new Date().getTime(),
				action: "click",
				id: self.id
			});

			console.groupEnd();
		}
	}, {
		key: "open",


		/**
   * 
   * @open
   */
		value: function open() {
			var _this2 = this;

			console.group("Slide.open");

			sidr.open(this.id);

			document.addEventListener("click", function (e) {
				_this2.close();
			});

			console.groupEnd();
		}
	}, {
		key: "close",


		/**
   * 
   * @close
   */
		value: function close() {
			console.group("Slide.close");

			sidr.close(this.id);

			console.groupEnd();
		}
	}, {
		key: "disconnectedCallback",


		/**
   * Invoked When component is removed. Usually with a .remove() function call
   * @disconnectedCallback
   */
		value: function disconnectedCallback() {
			console.group("Slide.disconnectedCallback");

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
			console.group("Slide.attributeChangedCallback:", attr, oldval, newval);

			this.properties = this.properties || [];

			var obs = Slide.observedAttributes;

			for (var i = 0; i < obs.length; i++) {
				if (newval) {
					this.properties[obs[i]] = newval;
				}
			}

			// YOUR CODE FOR CHANGES GO HERE (MAYBE NULL FIRST TIME THROUGH)
			try {
				switch (attr) {
					case "title":
						break;

					case "search":
						break;

					case "toggle":
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
			console.group("Slide._fetchElements");

			this.dom = this.dom || [];
			this.dom.menus = this.querySelector("wc-slide-menus");

			console.groupEnd();
		}
	}, {
		key: "_fetchAttributes",


		/**
   * Component attributes are _fetched and defaults are set if undefined
   * @_fetchAttributes
   * @param {string} [modal=true] mode for our slide
   */
		value: function _fetchAttributes() {
			console.group("Slide._fetchAttributes");

			this.properties = {
				cname: "Slide",
				author: "Mel Heravi",
				version: "1.0",
				title: "",
				search: "true"
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
		}
	}, {
		key: "_onClick",


		/**
   * A sample callback usage function - see connectedCallback()
   * @_onClick
   */
		value: function _onClick() {
			console.group("Slide._onClick:", this.id);

			wc.publish(this, "wc-slide", {
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
			console.group("Slide.destroy:", this.id);

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
		value: function configure(options) {
			console.group("Slide.configure:", JSON.stringify(options));

			// PROCESS ALL OPTIONS HERE

			console.groupEnd();
		}
	}, {
		key: "_initialize",


		/**
   * SAVE DATA FOR ANALYTICS
   * @__initialize
   */
		value: function _initialize() {
			console.group("Slide._initialize:", this.id);

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
			var _this3 = this;

			console.group("Slide._finalize:", this.id);

			this.classList.add("wc");

			// ADD ANALYTICS HERE
			wc.setStats(this, this.properties.cname, this.properties.version);

			// SHOW IT NOW (NO FLICKERS) 
			this.style.visibility = "visible";

			var toggler = this.getAttribute("toggler");
			var speed = this.getAttribute("speed");

			// ADD EVENT TO TOGGLER
			document.querySelector("#" + toggler).addEventListener("click", function (e) {
				_this3.open();
			});

			// MAKE IT HAPPEN
			sidr.new('#' + toggler, {
				name: 'my-slide',
				side: 'left',
				timing: 'ease-in-out',
				speed: speed
			});

			console.groupEnd();
		}
	}, {
		key: "search",


		/**
   * SAVE DATA FOR ANALYTICS
   * @search
   */
		value: function search() {
			console.group("Slide.search");

			var root = this.parentNode.parentNode.parentNode;

			// Declare variables
			var input, filter, ul, li, a, i;
			var input = root.querySelector('wc-slide-search input');
			var list = root.querySelector('wc-slide-menus');

			console.log($(input).val());
			filter = input.value.toUpperCase();

			console.log(">>>>>>>", input.value);

			if (input.value) {
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

	}, {
		key: "search",
		value: function search() {
			console.group("Slide.search");

			//let root = this.parentNode.parentNode.parentNode;
			var slide = wc.getClosest(this, "wc-slide");

			// Declare variables
			var input, filter, ul, li, a, i;

			input = slide.querySelector('wc-slide-search input');

			console.log($(input).val());

			filter = input.value.toUpperCase();

			li = slide.querySelectorAll("wc-slide-menus ul li");

			// Loop through all list items, and hide those who don't match the search query
			for (i = 0; i < li.length; i++) {
				a = li[i].getElementsByTagName("a")[0];

				if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
					$(li[i]).slideDown();
				} else {
					if ($(li[i]).find("ul").length == 0) {
						$(li[i]).slideUp();
					}
				}
			}

			console.groupEnd();
		}
	}], [{
		key: "observedAttributes",


		/**
   * Set observable values here. When Changed, attributeChangedCallback is invoked
   * @observedAttributes
   */
		get: function get() {
			console.group("Slide.observedAttributes");

			this.observables = ["toggle", "search", "title"];

			console.groupEnd();
			return this.observables;
		}
	}]);

	return Slide;
}(HTMLElement);

window.customElements.define('wc-slide', Slide);"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Swipe Component<BR>
 * <BR><BR><img src=../img/swipe.png width=70% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/swipe.html">DEMO</a>
 */
var Swipe = function (_HTMLElement) {
	_inherits(Swipe, _HTMLElement);

	function Swipe() {
		_classCallCheck(this, Swipe);

		console.group("Swipe.constructor");

		var _this = _possibleConstructorReturn(this, (Swipe.__proto__ || Object.getPrototypeOf(Swipe)).call(this));

		console.groupEnd();
		return _this;
	}

	_createClass(Swipe, [{
		key: "connectedCallback",


		/**
   * This function is called when this is attached to DOM
   * @connectedCallback. 
   */
		value: function connectedCallback() {
			console.group("Swipe.connectedCallback");

			var self = this;

			// GET PROPERTIES AND INTERESTING ELEMENTS
			this._initialize();

			this.properties.autoheight = this.properties.autoheight || true;
			this.properties.pagination = this.properties.pagination || false;
			this.properties.navigation = this.properties.navigation || false;
			this.properties.space = this.properties.space || "20";
			this.properties.start = this.properties.start || "0";

			var sargs = "new Swiper('.swiper-container', {autoHeight:" + this.properties.autoheight + ", spaceBetween:" + this.properties.space + ", initialSlide:" + this.properties.start + ",";

			var pagination = "";
			if (this.properties.pagination == "true") {
				pagination = "<div class='swiper-pagination'></div>";
				sargs += "pagination: {el:'.swiper-pagination', clickable:true},";
			}

			var navigation = "";
			if (this.properties.navigation == "true") {
				navigation = "<div class='swiper-button-next'></div><div class='swiper-button-prev'></div>";
				sargs += "navigation: {nextEl:'.swiper-button-next', prevEl:'.swiper-button-prev'},";
			}
			sargs += "})";

			// REPLACE CONTENT IF NECESSARY WITH NEW STUFF
			this.innerHTML = "<div class='swiper-container'><div class='swiper-wrapper'>" + this.dom.content + "</div>" + pagination + navigation + "</div>";

			$(".swiper-wrapper > div").addClass("swiper-slide");

			this.swiper = eval(sargs);

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

			console.group("Swipe.publish");

			this.addEventListener("click", function (e) {
				_this2._click();
			});

			console.groupEnd();
			return true;
		}

		/**
   * A sample callback usage function - see connectedCallback()
   * @_click
   */

	}, {
		key: "_click",
		value: function _click() {
			console.group("Swipe._click:", this.id);

			wc.publish(this, "wc-swipe", {
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
			console.group("Swipe.disconnectedCallback");

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
			console.group("Swipe.attributeChangedCallback:", attr, oldval, newval);

			this.properties = this.properties || [];

			var obs = Swipe.observedAttributes;

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
			console.group("Swipe._fetchElements");

			this.dom = this.dom || [];
			this.dom.content = this.innerHTML;

			console.groupEnd();
		}
	}, {
		key: "_fetchAttributes",


		/**
   * Component attributes are _fetched and defaults are set if undefined
   * @_fetchAttributes
   * @param {string} [modal=true] mode for our swipe
   */
		value: function _fetchAttributes() {
			console.group("Swipe._fetchAttributes");

			this.properties = {
				cname: "Swipe",
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
			console.group("Swipe._onClick:", this.id);

			wc.publish(this, "wc-swipe", {
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
			console.group("Swipe.destroy:", this.id);

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
		value: function configure(options) {
			console.group("Swipe.configure:", JSON.stringify(options));

			// PROCESS ALL OPTIONS HERE

			console.groupEnd();
		}
	}, {
		key: "_initialize",


		/**
   * SAVE DATA FOR ANALYTICS
   * @__initialize
   */
		value: function _initialize() {
			console.group("Swipe._initialize:", this.id);

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
			console.group("Swipe._finalize:", this.id);

			this.classList.add("wc");

			// ADD ANALYTICS HERE
			wc.setStats(this, this.properties.cname, this.properties.version);

			// SHOW IT NOW (NO FLICKERS) 
			this.style.visibility = "visible";

			console.groupEnd();
		}
	}, {
		key: "slideTo",


		/**
   * SAVE DATA FOR ANALYTICS
   * @slideTo
   */
		value: function slideTo(ind) {
			console.group("Swipe.slideTo:", ind);

			this.swiper.slideTo(ind);

			console.groupEnd();
		}
	}], [{
		key: "observedAttributes",


		/**
   * Set observable values here. When Changed, attributeChangedCallback is invoked
   * @observedAttributes
   */
		get: function get() {
			console.group("Swipe.observedAttributes");

			this.observables = ["header"];

			console.groupEnd();
			return this.observables;
		}
	}]);

	return Swipe;
}(HTMLElement);

window.customElements.define('wc-swipe', Swipe);"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Table-plain Component<BR>
 * <BR><BR><img src=/tk/lib/components/w/img/table-plain.png width=70% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="/tk/lib/components/w/html/table-plain.html">DEMO</a>
 */
var TablePlain = function (_HTMLElement) {
	_inherits(TablePlain, _HTMLElement);

	function TablePlain() {
		_classCallCheck(this, TablePlain);

		console.group("TablePlain.constructor");

		var _this = _possibleConstructorReturn(this, (TablePlain.__proto__ || Object.getPrototypeOf(TablePlain)).call(this));

		console.groupEnd();
		return _this;
	}

	_createClass(TablePlain, [{
		key: "connectedCallback",


		/**
   * This function is called when this is attached to DOM
   * @connectedCallback. 
   */
		value: function connectedCallback() {
			console.group("TablePlain.connectedCallback");

			// GET PROPERTIES AND INTERESTING ELEMENTS
			this._initialize();

			// REPLACE CONTENT IF NECESSARY WITH NEW STUFF
			this.innerHTML = "\n\t    <div class=\"table-responsive\">\n\t    <table class=\"table\" width=\"100%\">\n\t    <span id=\"" + this.id + "-loading\" class=\"wc-loading-img\"></span>\n\t    </table>\n            </div>\n\t";

			// ADD STATS AND OTHER FINAL STUFF
			this._finalize();

			// PUBLISH INTERESTING EVENTS
			//this._publish();

			console.groupEnd();
		}
	}, {
		key: "_trasferAttr",


		/**
   * @_trasferAttr
   * @param {string} elem1
   * @param {string} elem2
   */
		value: function _trasferAttr(elem1, elem2) {
			console.group("TablePlain._trasferAttr:", elem1, elem2);

			// TRANSFER
			$.each($(elem1).prop("attributes"), function () {
				if (this.name != "id") {
					// DO NOT COPY ID
					console.log("copied:", this.name, this.value);

					$(elem2).attr(this.name, this.value);
				}
			});

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

			console.group("TablePlain.publish");

			this.addEventListener("click", function (e) {
				_this2._click(_this2);
			});

			console.groupEnd();
			return true;
		}

		/**
   * @_click
   */

	}, {
		key: "_click",
		value: function _click() {
			console.group("TablePlain._click:", this.id);

			wc.publish(this, "wc-table-plain", {
				time: new Date().getTime(),
				action: "click",
				id: this.id,
				uparam: this.properties.uparam
			});

			console.groupEnd();
			return true;
		}
	}, {
		key: "disconnectedCallback",


		/**
   * Invoked When component is removed. Usually with a .remove() function call
   * @disconnectedCallback
   */
		value: function disconnectedCallback() {
			console.group("TablePlain.disconnectedCallback");

			/* CLEAN UP NOW */

			console.groupEnd();
			return true;
		}
	}, {
		key: "attributeChangedCallback",


		/**
   * Called with .setAttribute(...) function call
   * @attributeChangedCallback
   */
		value: function attributeChangedCallback(attr, oldval, newval) {
			console.group("TablePlain.attributeChangedCallback:", attr, oldval, newval);

			this.properties = this.properties || [];

			var obs = TablePlain.observedAttributes;

			for (var i = 0; i < obs.length; i++) {
				this.properties[obs[i]] = newval;
			}

			// YOUR CODE FOR CHANGES GO HERE (MAYBE NULL FIRST TIME THROUGH)
			try {
				switch (attr) {
					case "background":
						this.style.background = newval;
						break;

					default:
						break;
				}
			} catch (e) {
				console.warn(e.name + ' > ' + e.message);
			}

			console.groupEnd();
			return true;
		}
	}, {
		key: "_fetchElements",


		/**
   * Stores DOM elements of interest for future use
   * @_fetchElements
   */
		value: function _fetchElements() {
			console.group("TablePlain._fetchElements");

			this.dom = this.dom || [];
			this.dom.content = this.innerHTML;

			console.groupEnd();
			return true;
		}
	}, {
		key: "_fetchAttributes",


		/**
   * Component attributes are _fetched and defaults are set if undefined
   * @_fetchAttributes
   * @param {string} [modal=true] mode for our table-plain
   */
		value: function _fetchAttributes() {
			console.group("TablePlain._fetchAttributes");

			this.properties = {
				cname: "Table-plain",
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
					case "background":
						this.style.background = this.properties.background;
						break;

					default:
						break;
				}
			}

			console.log("ATTRIBUTES: ", this.properties);

			console.groupEnd();
			return true;
		}
	}, {
		key: "destroy",


		/**
   * Destroy the instance object and artifacts
   * @_destroy
   */
		value: function destroy() {
			console.group("TablePlain.destroy:", this.id);

			// FREE ALL MEMORY
			// you should delete all created objects here

			// FREE POINTER
			delete this;

			// REMOVE ITEM FROM DOM
			this.parentNode.removeChild(this);

			console.groupEnd();
			return true;
		}
	}, {
		key: "configure",


		/**
   * configure the instance object and artifacts
   * @_configure
   */
		value: function configure(tdata) {
			console.group("TablePlain.configure");

			var table = this.querySelector("table");
			$(table).addClass(tdata.class);

			// ADD TABLE HEADER
			var tstr = "<thead><tr>";
			for (var key in tdata.columns) {
				var h = tdata.columns[key];

				tstr += "<th id=\"" + h.id + "\">" + h.title + "</th>";
			}
			tstr += "</tr></thead>";

			// ADD BODY HEADER
			tstr += "<tbody>";
			for (var key in tdata.data) {
				tstr += "<tr>";

				var r = tdata.data[key];

				$.each(r, function (i, item) {
					tstr += "<td>" + item + "</td>";
				});

				tstr += "</tr>";
			}
			tstr += "</tbody>";

			$(table).append(tstr);

			// ASSIGN A CLASS TO EACH COLUMN
			for (var i = 1; i < tdata.columns.length + 1; i++) {
				$(table).find("td:nth-child(" + i + "), th:nth-child(" + i + ")").addClass("wc-table-col-" + i);
			}

			// REMOVE LOADING
			$("#" + this.id + "-loading").remove();

			console.groupEnd();
			return true;
		}
	}, {
		key: "_initialize",


		/**
   * SAVE DATA FOR ANALYTICS
   * @__initialize
   */
		value: function _initialize() {
			console.group("TablePlain._initialize:", this.id);

			// FETCH ALL INTERESTING ELEMENTS
			this._fetchElements(this);

			// FETCH ALL ATTRIBUTES
			this._fetchAttributes(this);

			console.groupEnd();
			return true;
		}
	}, {
		key: "_finalize",


		/**
   * SAVE DATA FOR ANALYTICS
   * @__finalize
   */
		value: function _finalize() {
			console.group("TablePlain._finalize:", this.id);

			this.classList.add("wc");

			// ADD ANALYTICS HERE
			wc.setStats(this, this.properties.cname, this.properties.version);

			// SHOW IT NOW (NO FLICKERS) 
			this.style.visibility = "visible";

			console.groupEnd();
			return true;
		}
	}], [{
		key: "observedAttributes",


		/**
   * Set observable values here. When Changed, attributeChangedCallback is invoked
   * @observedAttributes
   */
		get: function get() {
			console.group("TablePlain.observedAttributes");

			this.observables = [];

			console.groupEnd();
			return this.observables;
		}
	}]);

	return TablePlain;
}(HTMLElement);

window.customElements.define('wc-table-plain', TablePlain);"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Table component<BR>
 * <BR><BR><img src=../img/table.png width=80%>
 * <BR><BR><a href="../html/table.html">DEMO</a>
 */
var Table = function (_HTMLElement) {
	_inherits(Table, _HTMLElement);

	function Table() {
		_classCallCheck(this, Table);

		console.group("Table.constructor");

		var _this = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this));

		console.groupEnd();
		return _this;
	}

	_createClass(Table, [{
		key: "connectedCallback",


		/**
   * This function is called when this is attached to DOM
   * @connectedCallback. 
   */
		value: function connectedCallback() {
			console.group("Table.connectedCallback");

			var self = this;

			// GET PROPERTIES AND INTERESTING ELEMENTS
			this._initialize();

			this.addEventListener("click", function () {
				self._onClick();
			});

			var cls = this.getAttribute("class");

			// FOR JSON TABLE ONLY
			if (this.properties.json) {
				this.innerHTML = "<table class=\"" + cls + "\" id=\"my-table-table\" style=\"border:1px #cecece solid\">" + this.innerHTML + "</table>";
			}

			var params = JSON.parse(this.properties.datatable);

			var table = this.querySelector("table");

			if (!params.sort) {
				params.sort = { column: 1, direction: "desc" };
			}

			if (this.properties.json) {
				// LOAD FROM JSON FILE
				$.getJSON(this.properties.json, function (values) {
					console.log("SUCCESS", values);

					$(table).addClass(values.class);

					if (params.height) {
						var _$$DataTable;

						$(table).DataTable((_$$DataTable = {
							"data": values.data,
							"columns": values.columns,
							"bLengthChange": params.length,
							"bScrollAutoCss": false,
							"scrollY": params.height,
							"scrollCollapse": true,
							"paging": false,
							"bInfo": params.info,
							"bFilter": params.search
						}, _defineProperty(_$$DataTable, "paging", params.pagination), _defineProperty(_$$DataTable, "aaSorting", [[params.sort.column, params.sort.direction]]), _$$DataTable));
					} else {
						$(table).DataTable({
							"data": values.data,
							"columns": values.columns,
							"bLengthChange": params.length,
							"bProcessing": true,
							"bInfo": params.info,
							"bFilter": params.search,
							"paging": params.pagination,
							"aaSorting": [[params.sort.column, params.sort.direction]]
						});
					}
				});
			} else {
				// NORMAL DATA TABLE
				if (params.height) {
					var _$$DataTable2;

					$(table).DataTable((_$$DataTable2 = {
						"bScrollAutoCss": false,
						"scrollY": params.height,
						"scrollCollapse": true,
						"paging": false,
						"bInfo": params.info
					}, _defineProperty(_$$DataTable2, "paging", params.pagination), _defineProperty(_$$DataTable2, "aaSorting", [[params.sort.column, params.sort.direction]]), _$$DataTable2));
				} else {
					$(table).DataTable({
						"bLengthChange": params.length,
						"bProcessing": true,
						"bInfo": params.info,
						"bFilter": params.search,
						"paging": params.pagination,
						"aaSorting": [[params.sort.column, params.sort.direction]]
					});
				}
			}

			if (this.properties.datatable == "{}") {
				setTimeout(function () {
					var table = $('#my-table-table').DataTable();
					table.destroy();
				}, 50);
			}

			// ADD STATS AND OTHER FINAL STUFF
			this._finalize();

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
			console.group("Table.disconnectedCallback");

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
			console.group("Table.attributeChangedCallback:", attr, oldval, newval);

			this.properties = this.properties || [];

			var obs = Table.observedAttributes;

			for (var i = 0; i < obs.length; i++) {
				this.properties[obs[i]] = newval;
				// YOUR CODE FOR CHANGES GO HERE 
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
			console.group("Table._fetchElements");

			this.dom = this.dom || [];
			this.dom.content = this.innerHTML;

			console.groupEnd();
		}
	}, {
		key: "_fetchAttributes",


		/**
   * Component attributes are _fetched and defaults are set if undefined
   * @_fetchAttributes
   * @param {string} [datatable="{}"] datatable attributes
   */
		value: function _fetchAttributes() {
			console.group("Table._fetchAttributes");

			this.properties = {
				"cname": "Table",
				"author": "Mel Heravi",
				"version": "1.0",
				"datatable": "{}",
				"json": null
			};

			// SAVE WIDGET SPECIFIC PROPERTIES
			this.propertiesW = [];

			// SAVE ALL OTHER PROPERTIES
			var attrs = wc.getAttributes(this);

			for (var key in attrs) {
				this.properties[key] = this.getAttribute(key);
				this.propertiesW[key] = this.getAttribute(key);
				console.log(key + ": " + attrs[key]);
			}

			console.log("attributes: ", this.properties);

			// PROCESS ALL PROPERTIES (example below);
			// this.style.background = this.properties.background;

			console.groupEnd();
		}
	}, {
		key: "_onClick",


		/**
   * A sample callback usage function - see connectedCallback()
   * @_onClick
   */
		value: function _onClick() {
			console.group("Table._onClick:", this.id);

			wc.publish(this, "wc-table", {
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
			console.group("Table.destroy:", this.id);

			// FREE POINTER
			delete this;

			// REMOVE ITEM FROM DOM
			this.parentNode.removeChild(this);

			console.groupEnd();
		}
	}, {
		key: "_initialize",


		/**
   * SAVE DATA FOR ANALYTICS
   * @__initialize
   */
		value: function _initialize() {
			console.group("Table._initialize:", this.id);

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
			console.group("Table._finalize:", this.id);

			this.classList.add("wc");

			// ADD ANALYTICS HERE
			wc.setStats(this, this.properties.cname, this.properties.version);

			console.groupEnd();
		}
	}], [{
		key: "test",


		/**
   * FOR TESTING PURPOSES
   * @test
   */
		value: function test() {
			console.group("Table.test");

			console.log("testing results will be printed here...");

			console.groupEnd();
			return true;
		}
	}, {
		key: "observedAttributes",


		/**
   * Set observable values here. When Changed, attributeChangedCallback is invoked
   * @observedAttributes
   */
		get: function get() {
			console.group("Table.observedAttributes");

			this.observables = ["datatable", "json"];

			console.groupEnd();
			return this.observables;
		}
	}]);

	return Table;
}(HTMLElement);

window.customElements.define('wc-table', Table);"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Text Component<BR>
 * <BR><BR><img src=../img/text.png width=40% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/text.html">DEMO</a>
 */
var Text = function (_HTMLElement) {
	_inherits(Text, _HTMLElement);

	function Text() {
		_classCallCheck(this, Text);

		console.group("Text.constructor");

		var _this = _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this));

		console.groupEnd();
		return _this;
	}

	_createClass(Text, [{
		key: "connectedCallback",


		/**
   * This function is called when this is attached to DOM
   * @connectedCallback. 
   */
		value: function connectedCallback() {
			console.group("Text.connectedCallback");

			var self = this;

			// GET PROPERTIES AND INTERESTING ELEMENTS
			this._initialize();

			var cols = this.properties.columns.split(',');

			var id = this.id;
			var c1 = "col-md-" + cols[0];
			var c2 = "col-md-" + cols[1];

			var lbl = this.properties.label || "";
			var val = this.properties.value || "";
			var hlp = this.properties.help || "";
			var cls = this.properties.class || "";

			// DATA-KEY FOR BINDING
			var dkey = id.replace(/_/g, '').replace(/-/g, '');

			// REPLACE CONTENT IF NECESSARY WITH NEW STUFF
			this.innerHTML = "\n\t    <div class=\"form-group has-feedback clearfix\">\n\t\t<div class=\"row\">\n\t\t    <div class=\"" + c1 + "\">\n\t\t      <label id=\"" + this.id + "-label\" for=\"" + this.id + "-label\" class=\"btn-control col-form-label\">" + lbl + "</label>\n\t\t    </div>\n\n\t\t    <div class=\"" + c2 + "\">\n\t                <input type=\"text\" class=\"form-control " + cls + "\" id=\"" + this.id + "\" value=\"" + val + "\" data-key=" + dkey + " autocomplete='off' />\n\t\t        <span class=\"glyphicon form-control-feedback\" aria-hidden=\"true\"></span>\n\t\t        <small id='" + this.id + "-help' class='form-text help-block with-errors text-muted'>" + hlp + "</small>\n\t\t    </div>\n\t\t</div>\n\t    </div>";

			// TRANSFER ALL ATTRIBUTES NOW (below is an example)
			// -------------------------------------------------
			var widget = this.querySelector("input[type=text]");

			for (var key in this.propertiesW) {
				this.removeAttribute(key);
				if (key != "class") {
					widget.setAttribute(key, this.properties[key]);
				}
			}

			// ADD STATS AND OTHER FINAL STUFF
			this._finalize();

			// PUBLISH INTERESTING EVENTS
			this._publish();

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

			console.group("Text.publish");

			var widget = this.querySelector("input[type=text]");

			if (0) {
				try {
					widget.addEventListener("change", function (e) {
						var id = $(widget).attr("id");

						_this2._change(id);
					});
				} catch (e) {
					console.error(e.name + ' > ' + e.message);
				}
			}

			console.groupEnd();
			return true;
		}

		/**
   * A sample callback usage function - see connectedCallback()
   * @_onClick
   */

	}, {
		key: "_change",
		value: function _change(id) {
			console.group("Text._change:", id);

			var val = $("#" + id).val();

			wc.publish(this, "wc-text", {
				time: new Date().getTime(),
				action: "change",
				id: id,
				val: val,
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
			console.group("Text.disconnectedCallback");

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
			console.group("Text.attributeChangedCallback:", attr, oldval, newval);

			this.properties = this.properties || [];

			var obs = Text.observedAttributes;

			for (var i = 0; i < obs.length; i++) {
				this.properties[obs[i]] = newval;
				// YOUR CODE FOR CHANGES GO HERE 
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
			console.group("Text._fetchElements");

			this.dom = this.dom || [];
			this.dom.content = this.innerHTML;

			console.groupEnd();
		}
	}, {
		key: "_fetchAttributes",


		/**
   * Component attributes are _fetched and defaults are set if undefined
   * @_fetchAttributes
   * @param {string} [modal=true] mode for our text
   */
		value: function _fetchAttributes() {
			console.group("Text._fetchAttributes");

			this.properties = {
				cname: "Text",
				author: "Mel Heravi",
				version: "1.0",
				columns: "12,12"
			};

			// SAVE WIDGET SPECIFIC PROPERTIES
			this.propertiesW = [];

			// SAVE ALL OTHER PROPERTIES
			var attrs = wc.getAttributes(this);

			for (var key in attrs) {
				this.properties[key] = this.getAttribute(key);
				this.propertiesW[key] = this.getAttribute(key);
				console.log(key + ": " + attrs[key]);
			}

			console.log("attributes: ", this.properties);

			// PROCESS ALL PROPERTIES (example below);

			console.groupEnd();
		}
	}, {
		key: "_onClick",


		/**
   * A sample callback usage function - see connectedCallback()
   * @_onClick
   */
		value: function _onClick() {
			console.group("Text._onClick:", this.id);

			wc.publish(this, "wc-text", {
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
			console.group("Text.destroy:", this.id);

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
		value: function configure(options) {
			console.group("Text.configure:", JSON.stringify(options));

			// PROCESS ALL OPTIONS HERE

			console.groupEnd();
		}
	}, {
		key: "_initialize",


		/**
   * SAVE DATA FOR ANALYTICS
   * @__initialize
   */
		value: function _initialize() {
			console.group("Text._initialize:", this.id);

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
			console.group("Text._finalize:", this.id);

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
			console.group("Text.observedAttributes");

			this.observables = ["columns"];

			console.groupEnd();
			return this.observables;
		}
	}]);

	return Text;
}(HTMLElement);

window.customElements.define('wc-text', Text);"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Textarea Component<BR>
 * <BR><BR><img src=../img/textarea.png width=50% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/textarea.html">DEMO</a>
 */
var Textarea = function (_HTMLElement) {
	_inherits(Textarea, _HTMLElement);

	function Textarea() {
		_classCallCheck(this, Textarea);

		console.group("Textarea.constructor");

		var _this = _possibleConstructorReturn(this, (Textarea.__proto__ || Object.getPrototypeOf(Textarea)).call(this));

		console.groupEnd();
		return _this;
	}

	_createClass(Textarea, [{
		key: "connectedCallback",


		/**
   * This function is called when this is attached to DOM
   * @connectedCallback. 
   */
		value: function connectedCallback() {
			console.group("Textarea.connectedCallback");

			var self = this;

			// GET PROPERTIES AND INTERESTING ELEMENTS
			this._initialize();

			var cols = this.properties.columns.split(',');

			var id = this.id;
			var c1 = "col-md-" + cols[0];
			var c2 = "col-md-" + cols[1];

			var lbl = this.properties.label || "";
			var val = this.properties.value || "";
			var hlp = this.properties.help || "";
			var cls = this.properties.class || "";

			// DATA-KEY FOR BINDING
			var dkey = id.replace(/_/g, '').replace(/-/g, '');

			// REPLACE CONTENT IF NECESSARY WITH NEW STUFF
			this.innerHTML = "\n\t    <div class=\"form-group has-feedback clearfix\">\n\t\t<div class=\"row\">\n\t\t    <div class=\"" + c1 + "\">\n\t\t        <label id=\"" + this.id + "-label\" for=\"" + this.id + "-label\" class=\"btn-control col-form-label\">" + lbl + "</label>\n\t\t    </div>\n\t\t    <div class=\"" + c2 + "\">\n\t\t        <textarea name=\"" + this.id + "\" class=\"form-control " + cls + "\" id=\"" + this.id + "-child\" aria-describedby=\"" + this.id + "-help\" rows=\"3\" data-key=\"" + dkey + "\"></textarea>\n\t\t        <span class=\"glyphicon form-control-feedback\" aria-hidden=\"true\"></span>\n\t\t        <small id='" + this.id + "-help' class='form-text help-block with-errors text-muted'>" + hlp + "</small>\n\t\t    </div>\n\t\t</div>\n\t    </div>";

			// TRANSFER ALL ATTRIBUTES NOW (below is an example)
			// -------------------------------------------------
			var widget = this.querySelector("textarea");

			for (var key in this.propertiesW) {
				this.removeAttribute(key);
				if (key != "class") {
					widget.setAttribute(key, this.properties[key]);
				}
			}

			// ADD STATS AND OTHER FINAL STUFF
			this._finalize();

			// PUBLISH INTERESTING EVENTS
			this._publish();

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

			console.group("Textarea.publish");

			var widget = this.querySelector("textarea");

			widget.addEventListener("change", function (e) {
				var id = $(widget).attr("id");

				_this2._change(id);
			});

			console.groupEnd();
			return true;
		}

		/**
   * A sample callback usage function - see connectedCallback()
   * @_onClick
   */

	}, {
		key: "_change",
		value: function _change(id) {
			console.group("Textarea._change:", id);

			var val = $("#" + id).val();

			wc.publish(this, "wc-text", {
				time: new Date().getTime(),
				action: "change",
				id: id,
				val: val,
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
			console.group("Textarea.disconnectedCallback");

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
			console.group("Textarea.attributeChangedCallback:", attr, oldval, newval);

			this.properties = this.properties || [];

			var obs = Textarea.observedAttributes;

			for (var i = 0; i < obs.length; i++) {
				this.properties[obs[i]] = newval;
				// YOUR CODE FOR CHANGES GO HERE 
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
			console.group("Textarea._fetchElements");

			this.dom = this.dom || [];
			this.dom.content = this.innerHTML;

			console.groupEnd();
		}
	}, {
		key: "_fetchAttributes",


		/**
   * Component attributes are _fetched and defaults are set if undefined
   * @_fetchAttributes
   * @param {string} [modal=true] mode for our textarea
   */
		value: function _fetchAttributes() {
			console.group("Textarea._fetchAttributes");

			this.properties = {
				cname: "Textarea",
				author: "Mel Heravi",
				version: "1.0",
				columns: "12,12"
			};

			// SAVE WIDGET SPECIFIC PROPERTIES
			this.propertiesW = [];

			// SAVE ALL OTHER PROPERTIES
			var attrs = wc.getAttributes(this);

			for (var key in attrs) {
				this.properties[key] = this.getAttribute(key);
				this.propertiesW[key] = this.getAttribute(key);
				console.log(key + ": " + attrs[key]);
			}

			console.log("attributes: ", this.properties);

			// PROCESS ALL PROPERTIES (example below);

			console.groupEnd();
		}
	}, {
		key: "_onClick",


		/**
   * A sample callback usage function - see connectedCallback()
   * @_onClick
   */
		value: function _onClick() {
			console.group("Textarea._onClick:", this.id);

			wc.publish(this, "wc-textarea", {
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
			console.group("Textarea.destroy:", this.id);

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
		value: function configure(options) {
			console.group("Textarea.configure:", JSON.stringify(options));

			// PROCESS ALL OPTIONS HERE

			console.groupEnd();
		}
	}, {
		key: "_initialize",


		/**
   * SAVE DATA FOR ANALYTICS
   * @__initialize
   */
		value: function _initialize() {
			console.group("Textarea._initialize:", this.id);

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
			console.group("Textarea._finalize:", this.id);

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
			console.group("Textarea.observedAttributes");

			this.observables = ["columns"];

			console.groupEnd();
			return this.observables;
		}
	}]);

	return Textarea;
}(HTMLElement);

window.customElements.define('wc-textarea', Textarea);"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Toolbar Component<BR>
 * <BR><BR><img src=../img/toolbar.png width=40% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/toolbar.html">DEMO</a>
 */
var Toolbar = function (_HTMLElement) {
	_inherits(Toolbar, _HTMLElement);

	function Toolbar() {
		_classCallCheck(this, Toolbar);

		console.group("Toolbar.constructor");

		var _this = _possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).call(this));

		console.groupEnd();
		return _this;
	}

	_createClass(Toolbar, [{
		key: "connectedCallback",


		/**
   * This function is called when this is attached to DOM
   * @connectedCallback. 
   */
		value: function connectedCallback() {
			console.group("Toolbar.connectedCallback");

			var self = this;

			// GET PROPERTIES AND INTERESTING ELEMENTS
			this._initialize();

			// REPLACE CONTENT IF NECESSARY WITH NEW STUFF
			this.innerHTML = "<div id=\"" + this.id + "-container\">" + this.innerHTML + "</div>";

			this.style.background = this.properties.bg || "indianred";
			this.style.color = this.properties.fg || "#FFF";
			this.properties.isize = this.properties.isize || "18px";

			$(this).find("wc-toolbar-item").each(function () {
				var _this2 = this;

				if (typeof $(this).attr("wc-toolbar-sep") === 'undefined') {
					console.log(">>>>>>>", "<i class='fa fa-" + $(this).attr("icon") + "' style=font-size:" + self.properties.isize + "></i>");

					$(this).html("<i class='fa fa-" + $(this).attr("icon") + "' style=font-size:" + self.properties.isize + "></i>");

					$(this).on("click", function (e) {
						self._onClick($(_this2).attr("id"));
					});
				}
			});

			// ADD STATS AND OTHER FINAL STUFF
			this._finalize();

			console.groupEnd();
		}
	}, {
		key: "disconnectedCallback",


		/**
   * Invoked When component is removed. Usually with a .remove() function call
   * @disconnectedCallback
   */
		value: function disconnectedCallback() {
			console.group("Toolbar.disconnectedCallback");

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
			console.group("Toolbar.attributeChangedCallback:", attr, oldval, newval);

			this.properties = this.properties || [];

			var obs = Toolbar.observedAttributes;

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
			console.group("Toolbar._fetchElements");

			this.dom = this.dom || [];
			this.dom.content = this.innerHTML;

			console.groupEnd();
		}
	}, {
		key: "_fetchAttributes",


		/**
   * Component attributes are _fetched and defaults are set if undefined
   * @_fetchAttributes
   * @param {string} [modal=true] mode for our toolbar
   */
		value: function _fetchAttributes() {
			console.group("Toolbar._fetchAttributes");

			this.properties = {
				cname: "Toolbar",
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
					case "background":
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
		value: function _onClick(tid) {
			console.group("Toolbar._onClick:", tid);

			wc.publish(this, "wc-toolbar", {
				action: "click",
				id: this.id,
				tid: tid,
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
			console.group("Toolbar.destroy:", this.id);

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
		value: function configure(options) {
			console.group("Toolbar.configure:", JSON.stringify(options));

			// PROCESS ALL OPTIONS HERE

			console.groupEnd();
		}
	}, {
		key: "_initialize",


		/**
   * SAVE DATA FOR ANALYTICS
   * @__initialize
   */
		value: function _initialize() {
			console.group("Toolbar._initialize:", this.id);

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
			console.group("Toolbar._finalize:", this.id);

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
			console.group("Toolbar.observedAttributes");

			this.observables = [];

			console.groupEnd();
			return this.observables;
		}
	}]);

	return Toolbar;
}(HTMLElement);

window.customElements.define('wc-toolbar', Toolbar);"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Typeahead Component<BR>
 * <BR><BR><img src=../img/typeahead.png width=80% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/typeahead.html">DEMO</a>
 */
var Typeahead = function (_HTMLElement) {
	_inherits(Typeahead, _HTMLElement);

	function Typeahead() {
		_classCallCheck(this, Typeahead);

		console.group("Typeahead.constructor");

		var _this = _possibleConstructorReturn(this, (Typeahead.__proto__ || Object.getPrototypeOf(Typeahead)).call(this));

		console.groupEnd();
		return _this;
	}

	_createClass(Typeahead, [{
		key: "connectedCallback",


		/**
   * This function is called when this is attached to DOM
   * @connectedCallback. 
   */
		value: function connectedCallback() {
			console.group("Typeahead.connectedCallback");

			var self = this;

			// GET PROPERTIES AND INTERESTING ELEMENTS
			this._initialize();

			// REPLACE CONTENT IF NECESSARY WITH NEW STUFF
			this.innerHTML = "<input class=\"typeahead " + this.properties.class + "\" type=\"text\" placeholder=\"" + this.properties.placeholder + "\" autocomplete='off' />";

			if (this.properties.url) {
				this._load();
			}

			console.groupEnd();
		}
	}, {
		key: "_publish",


		/**
   * Publish all events
   * @_publish
   */
		value: function _publish(name, value) {
			console.group("Typeahead.publish:", name, value);

			if (typeof value === 'undefined') {
				value = "UNDEFINED";
			}

			wc.publish(this, "wc-typeahead", {
				time: new Date().getTime(),
				action: "selected",
				id: this.id,
				name: name,
				value: value
			});

			console.groupEnd();
			return true;
		}

		/**
   * A sample callback usage function - see connectedCallback()
   * @_onClick
   */

	}, {
		key: "_click",
		value: function _click() {
			console.group("Typeahead._click:", this.id);

			wc.publish(this, "wc-typeahead", {
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
			console.group("Typeahead.disconnectedCallback");

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
			console.group("Typeahead.attributeChangedCallback:", attr, oldval, newval);

			this.properties = this.properties || [];

			var obs = Typeahead.observedAttributes;

			for (var i = 0; i < obs.length; i++) {
				if (newval) {
					this.properties[obs[i]] = newval;
				}
			}

			// YOUR CODE FOR CHANGES GO HERE (MAYBE NULL FIRST TIME THROUGH)
			try {
				switch (attr) {
					case "background":
						//this.style.background = newval;
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
			console.group("Typeahead._fetchElements");

			this.dom = this.dom || [];
			this.dom.content = this.innerHTML;

			console.groupEnd();
		}
	}, {
		key: "_fetchAttributes",


		/**
   * Component attributes are _fetched and defaults are set if undefined
   * @_fetchAttributes
   * @param {string} [modal=true] mode for our typeahead
   */
		value: function _fetchAttributes() {
			console.group("Typeahead._fetchAttributes");

			this.properties = {
				cname: "Typeahead",
				author: "Mel Heravi",
				version: "1.0",
				url: null,
				show: 5
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
						this.style.background = this.properties.background;
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
			console.group("Typeahead._onClick:", this.id);

			wc.publish(this, "wc-typeahead", {
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
			console.group("Typeahead.destroy:", this.id);

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
		value: function configure(data, name, value) {
			console.group("Typeahead.configure:", name, value);

			this.properties.name = name;
			this.properties.value = value;

			this._process(data);

			// PROCESS ALL OPTIONS HERE

			console.groupEnd();
		}
	}, {
		key: "_initialize",


		/**
   * SAVE DATA FOR ANALYTICS
   * @__initialize
   */
		value: function _initialize() {
			console.group("Typeahead._initialize:", this.id);

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
			console.group("Typeahead._finalize:", this.id);

			this.classList.add("wc");

			// ADD ANALYTICS HERE
			wc.setStats(this, this.properties.cname, this.properties.version);

			// SHOW IT NOW (NO FLICKERS) 
			this.style.visibility = "visible";

			console.groupEnd();
		}
	}, {
		key: "_load",


		/**
   * SAVE DATA FOR ANALYTICS
   * @_load
   */
		value: function _load() {
			console.group("Typeahead._load:", this.id);

			var self = this;
			var names = new Array();
			var ids = new Object();

			$.getJSON(this.properties.url, null, function (data) {
				self._process(data);
			}).fail(function (jqxhr, textStatus, error) {
				var err = textStatus + ', ' + error;
				alert("Request Failed: " + err);
			});

			console.groupEnd();
		}

		/**
   * Process
   * @_process
   */

	}, {
		key: "_process",
		value: function _process(data) {
			console.group("Typeahead._process");

			var self = this;
			var names = new Array();
			var ids = new Object();

			$.each(data, function (index, item) {
				var n = eval("item." + self.properties.name);
				var v = eval("item." + self.properties.value);

				names.push(n);
				ids[n] = v;
			});

			var th = self.querySelector(".typeahead");

			$(th).typeahead({
				hint: false,
				highlight: true,
				minLength: 1
			}, {
				limit: this.properties.show,
				source: substringMatcher(names)
			});

			// DROPDOWN MENU
			var tt = self.querySelector(".tt-menu");

			var width = $(self).width();

			// MAKE THEM SAME SIZE AS INPUT
			tt.style.width = th.style.width = width + "px";

			// BORDER WIDTH BASED ON FONT SIZE
			var bw = width.toString()[0];

			if (this.classList.contains("border-all")) {
				// BORDER ALL
				$(th).css("border", bw + "px" + " #CCC solid");

				$(th).focus(function () {
					$(th).css("border", bw + "px" + " steelblue solid");
				});

				$(th).focusout(function () {
					$(th).css("border-color", "#CCC");
				});
			} else {
				// DEFAULT
				$(th).css("border-bottom", bw + "px" + " #CCC solid");

				$(th).focus(function () {
					$(th).css("border-bottom", bw + "px" + " steelblue solid");
				});

				$(th).focusout(function () {
					$(th).css("border-color", "#CCC");
				});
			}

			// ADD STATS AND OTHER FINAL STUFF
			self._finalize();

			// PUBLISH INTERESTING EVENTS
			$(th).on("keydown", function search(e) {
				if (e.keyCode == 13) {
					self._publish($(this).val(), ids[$(this).val()]);
					var menu = self.querySelector(".tt-menu");
					menu.style.display = "none";
				}
			});

			// $(th).on('change keyup paste', function() {
			// });

			console.groupEnd();
		}
	}], [{
		key: "observedAttributes",


		/**
   * Set observable values here. When Changed, attributeChangedCallback is invoked
   * @observedAttributes
   */
		get: function get() {
			console.group("Typeahead.observedAttributes");

			this.observables = [];

			console.groupEnd();
			return this.observables;
		}
	}]);

	return Typeahead;
}(HTMLElement);

window.customElements.define('wc-typeahead', Typeahead);

var substringMatcher = function substringMatcher(strs) {
	return function findMatches(q, cb) {
		var matches, substringRegex;

		// an array that will be populated with substring matches
		matches = [];

		// regex used to determine if a string contains the substring `q`
		substrRegex = new RegExp(q, 'i');

		// iterate through the pool of strings and for any string that
		// contains the substring `q`, add it to the `matches` array
		$.each(strs, function (i, str) {
			if (substrRegex.test(str)) {
				matches.push(str);
			}
		});

		cb(matches);
	};
};