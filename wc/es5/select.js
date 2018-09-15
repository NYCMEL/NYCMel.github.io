"use strict";

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

window.customElements.define('wc-select', Select);