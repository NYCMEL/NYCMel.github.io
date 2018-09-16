"use strict";

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

window.customElements.define('wc-carousel', Carousel);