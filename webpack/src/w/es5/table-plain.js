"use strict";

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

window.customElements.define('wc-table-plain', TablePlain);