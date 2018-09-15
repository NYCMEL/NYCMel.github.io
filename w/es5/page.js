"use strict";

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

window.customElements.define('wc-page', Page);