"use strict";

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

window.customElements.define('wc-carouselbs', CarouselBS);