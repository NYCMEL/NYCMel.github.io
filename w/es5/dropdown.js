"use strict";

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

window.customElements.define('wc-dropdown', Dropdown);