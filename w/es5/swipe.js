"use strict";

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

window.customElements.define('wc-swipe', Swipe);