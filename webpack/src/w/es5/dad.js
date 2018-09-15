"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Dad Component<BR>
 * <BR><BR><img src=../img/dad.png width=80% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/dad.html">DEMO</a>
 */
var Dad = function (_HTMLElement) {
	_inherits(Dad, _HTMLElement);

	function Dad() {
		_classCallCheck(this, Dad);

		console.group("Dad.constructor");

		var _this = _possibleConstructorReturn(this, (Dad.__proto__ || Object.getPrototypeOf(Dad)).call(this));

		console.groupEnd();
		return _this;
	}

	_createClass(Dad, [{
		key: "connectedCallback",


		/**
   * This function is called when this is attached to DOM
   * @connectedCallback. 
   */
		value: function connectedCallback() {
			var _dragula;

			console.group("Dad.connectedCallback");

			var self = this;

			// GET PROPERTIES AND INTERESTING ELEMENTS
			this._initialize();

			// REPLACE CONTENT IF NECESSARY WITH NEW STUFF
			//this.innerHTML = `<wc-header>${this.properties.header}</wc-header>` + this.dom.content;

			// ADD STATS AND OTHER FINAL STUFF
			this._finalize();

			this.lhs = document.querySelector('#' + this.properties.src);
			this.rhs = document.querySelector('#' + this.properties.dst);

			this.dad = dragula([this.lhs, this.rhs], (_dragula = {
				direction: this.properties.direction,
				copy: eval(this.properties.copy),
				copySortSource: true,
				revertOnSpill: true
			}, _defineProperty(_dragula, "copy", function copy(el, source) {
				// ONLY COPY ALLOWED
				console.groupEnd();
				return source.getAttribute("id") === self.properties.src;
			}), _defineProperty(_dragula, "accepts", function accepts(el, target, source, sibling) {
				// REJECT A DROP
				if (!target) {
					console.groupEnd();
					return false;
				}

				if (target.getAttribute("id") == self.properties.dst) {
					console.groupEnd();
					return true;
				} else {
					console.log("drop rejected...");
					console.groupEnd();
					return false;
				}
			}), _dragula)).on('drag', function (el) {
				console.log("drag...");
				el.className = el.className.replace('ex-moved', '');
			}).on('drop', function (el) {
				console.log("drop...");
				el.className += ' ex-moved';
			}).on('over', function (el, container) {
				console.log("over...");
				container.className += ' ex-over';
			}).on('out', function (el, container) {
				console.log("out...");
				container.className = container.className.replace('ex-over', '');
			});

			this.dad.on("drop", function (el, target, source, sibling) {
				// DROPPED OUTSIDE OF DST. DO NOTHING
				if (!target) {
					console.groupEnd();
					return false;
				}

				if (target.getAttribute("id") == self.properties.dst) {
					self._onDrop(el, target != source, sibling);
				}
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
			console.group("Dad.disconnectedCallback");

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
			console.group("Dad.attributeChangedCallback:", attr, oldval, newval);

			this.properties = this.properties || [];

			var obs = Dad.observedAttributes;

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
			console.group("Dad._fetchElements");

			this.dom = this.dom || [];
			this.dom.content = this.innerHTML;

			console.groupEnd();
		}
	}, {
		key: "_fetchAttributes",


		/**
   * Component attributes are _fetched and defaults are set if undefined
   * @_fetchAttributes
   * @param {string} [modal=true] mode for our dad
   */
		value: function _fetchAttributes() {
			console.group("Dad._fetchAttributes");

			this.properties = {
				cname: "Dad",
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
						this.style.background = this.properties.background;
						break;

					case "header":
						break;
				}
			}

			console.log("ATTRIBUTES: ", this.properties);

			console.groupEnd();
		}
	}, {
		key: "_onDrop",


		/**
   * A sample callback usage function - see connectedCallback()
   * @_onDrop
   */
		value: function _onDrop(el, update, sibling) {
			console.group("Dad._onDrop:", el, update, sibling);

			wc.publish(this, "wc-dad", {
				action: "dropped",
				id: this.id,
				did: el.getAttribute("id"),
				sibling: sibling,
				new: update
			});

			if (update) {
				// ALREADY PUBLISHED THE EVENT. REVERT NOW
				this.dad.cancel("revert");
			}

			console.groupEnd();
		}
	}, {
		key: "destroy",


		/**
   * Destroy the instance object and artifacts
   * @_destroy
   */
		value: function destroy() {
			console.group("Dad.destroy:", this.id);

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
			console.group("Dad.configure:", JSON.stringify(options));

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
			console.group("Dad._initialize:", this.id);

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
			console.group("Dad._finalize:", this.id);

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
			console.group("Dad.observedAttributes");

			this.observables = [];

			console.groupEnd();
			return this.observables;
		}
	}]);

	return Dad;
}(HTMLElement);

window.customElements.define('wc-dad', Dad);