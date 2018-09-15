"use strict";

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

window.customElements.define('wc-popup', Popup);