"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A Listbox Component
 * <BR><BR><img src=../img/listbox.png width=30% style="border:1px lime dashed";>
 * <BR><BR><a href="../html/listbox.html">DEMO</a>
 */
var Listbox = function (_HTMLElement) {
	_inherits(Listbox, _HTMLElement);

	function Listbox() {
		_classCallCheck(this, Listbox);

		console.group("Listbox.constructor");

		var _this = _possibleConstructorReturn(this, (Listbox.__proto__ || Object.getPrototypeOf(Listbox)).call(this));

		console.groupEnd();
		return _this;
	}

	_createClass(Listbox, [{
		key: "connectedCallback",


		/**
   * This function is called when this is attached to DOM
   * @connectedCallback. 
   */
		value: function connectedCallback() {
			var _this2 = this;

			console.group("Listbox.connectedCallback");

			var self = this;

			// MAKE SURE OUR COMPONENT HAS GLOBAL CLASS
			this.classList.add("wc");

			// FETCH ALL INTERESTING ELEMENTS
			this._fetchElements();

			// FETCH ALL ATTRIBUTES
			this._fetchAttributes();

			var _loop = function _loop(i) {
				console.log(_this2.dom.items[i]);

				var item = _this2.dom.items[i];

				item.addEventListener("click", function () {
					self._onClick(item);
				});
			};

			for (var i = 0; i < this.dom.items.length; i++) {
				_loop(i);
			}

			// WRAP UP AND ADD STATS
			this._finalize();

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
			console.group("Listbox.disconnectedCallback");

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
			console.group("Listbox.attributeChangedCallback:", attr, oldval, newval);

			this.properties = this.properties || [];

			// EXAMPLE ONLY. replace with observables
			switch (attr) {
				case "width":
					this.properties.width = newval;
					this.style.width = this.properties.width;
					break;
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
			console.group("Listbox._fetchElements");

			this.dom = this.dom || [];
			this.dom.content = this.innerHTML;
			this.dom.items = this.querySelectorAll(".list-group-item");

			console.groupEnd();
		}
	}, {
		key: "_fetchAttributes",


		/**
   * Component attributes are _fetched and defaults are set if undefined
   * @_fetchAttributes
   * @param {string} [width=100%] Listbox width
   */
		value: function _fetchAttributes() {
			console.group("Listbox._fetchAttributes");

			this.properties = {
				"cname": "Listbox",
				"author": "Mel Heravi",
				"version": "1.0",
				"width": "100%"
			};

			// EXAMPLE ONLY. replace with attributes
			if (this.hasAttribute("width")) {
				this.properties.width = this.getAttribute("width");
				this.style.width = this.properties.width;
				console.log("width: ", this.properties.width);
			}

			console.groupEnd();
		}
	}, {
		key: "_onClick",


		/**
   * A sample callback usage function - see connectedCallback()
   * @_onClick
   * @param {object} item clicked item
   */
		value: function _onClick(item) {
			console.group("Listbox._onClick:", this.id);

			// REMOVE ACTIVE ITEM
			for (var i = 0; i < this.dom.items.length; i++) {
				this.dom.items[i].classList.remove("active");
			}

			// ACTIVATE THIS ITEM
			item.classList.add("active");

			//PUBLISH TO THE EVENT
			wc.publish(this, "wc-listbox", {
				item: item.id,
				action: "click"
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
			console.group("Message.destroy:", this.id);

			// FREE POINTER
			delete this;

			// REMOVE ITEM FROM DOM
			this.parentNode.removeChild(this);

			console.groupEnd();
		}
	}, {
		key: "_finalize",


		/**
   * SAVE DATA FOR ANALYTICS
   * @__finalize
   */
		value: function _finalize() {
			console.group("Listbox._finalize:", this.id);

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
			console.group("Listbox.test");

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
			console.group("Listbox.observedAttributes");

			this.observables = ["width"];
			console.log(this.observables);

			console.groupEnd();
			return this.observables;
		}
	}]);

	return Listbox;
}(HTMLElement);

window.customElements.define('wc-listbox', Listbox);