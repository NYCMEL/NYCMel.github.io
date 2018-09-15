"use strict";

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

window.customElements.define('wc-slide', Slide);