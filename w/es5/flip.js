"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Flip Component<BR>
 * <BR><BR><img src=../img/flip.png width=70% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/flip.html">DEMO</a>
 */
var Flip = function (_HTMLElement) {
	_inherits(Flip, _HTMLElement);

	function Flip() {
		_classCallCheck(this, Flip);

		console.group("Flip.constructor");

		var _this = _possibleConstructorReturn(this, (Flip.__proto__ || Object.getPrototypeOf(Flip)).call(this));

		console.groupEnd();
		return _this;
	}

	_createClass(Flip, [{
		key: "template",


		/**
   * This function is called get component template
   * @template
   */
		value: function template() {
			var _this2 = this;

			console.group("Flip.template");

			var w = $(this).parent().width();
			var h = $(this).parent().height();

			var tmp = "\n\t    <wc-flip-container>\n\t\t<wc-flipper>\n\t\t    " + this.dom.content + "\n\t\t</wc-flipper>\n\t    </wc-flip-container>";

			setTimeout(function () {
				var con = _this2.querySelector("wc-flip-container");

				$(con).on("click", function () {
					$(this).addClass("hover");
				});

				$(con).mouseleave(function () {
					$(this).removeClass("hover");
				});
			}, 300);

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
			console.group("Flip.connectedCallback");

			var self = this;

			// GET PROPERTIES AND INTERESTING ELEMENTS
			this._initialize();

			// REPLACE CONTENT FROM TEMPLATE
			this.innerHTML = this.template();

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
			var _this3 = this;

			console.group("Flip.publish");

			this.addEventListener("click", function (e) {
				wc.publish(_this3, "wc-flip", {
					time: new Date().getTime(),
					action: "click",
					id: _this3.id,
					uparam: _this3.properties.uparam
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
			console.group("Flip.attributeChangedCallback:", attr, oldval, newval);

			this.properties = this.properties || [];

			var obs = Flip.observedAttributes;

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
			console.group("Flip._fetchElements");

			this.dom = this.dom || [];
			this.dom.content = this.innerHTML;

			console.groupEnd();
		}
	}, {
		key: "_fetchAttributes",


		/**
   * Component attributes are _fetched and defaults are set if undefined
   * @_fetchAttributes
   * @param {string} [modal=true] mode for our flip
   */
		value: function _fetchAttributes() {
			console.group("Flip._fetchAttributes");

			this.properties = {
				cname: "flip",
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
			console.group("Flip.destroy:", this.id);

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
			console.group("Flip.configure:", JSON.stringify(options));

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
			console.group("Flip._initialize:", this.id);

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
			console.group("Flip._finalize:", this.id);

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
			console.group("Flip.disconnectedCallback");

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
			console.group("Flip.observedAttributes");

			this.observables = [];

			console.groupEnd();
			return this.observables;
		}
	}]);

	return Flip;
}(HTMLElement);

window.customElements.define('wc-flip', Flip);