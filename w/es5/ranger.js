"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Ranger Component<BR>
 * <BR><BR><img src=../img/ranger.png width=70% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/ranger.html">DEMO</a>
 */
var Ranger = function (_HTMLElement) {
	_inherits(Ranger, _HTMLElement);

	function Ranger() {
		_classCallCheck(this, Ranger);

		console.group("Ranger.constructor");

		var _this = _possibleConstructorReturn(this, (Ranger.__proto__ || Object.getPrototypeOf(Ranger)).call(this));

		console.groupEnd();
		return _this;
	}

	_createClass(Ranger, [{
		key: "connectedCallback",


		/**
   * This function is called when this is attached to DOM
   * @connectedCallback. 
   */
		value: function connectedCallback() {
			console.group("Ranger.connectedCallback");

			var self = this;

			// GET PROPERTIES AND INTERESTING ELEMENTS
			this._initialize();

			// ADD GRIP HANDLES
			$(this).append("<div class=\"ui-resizable-handle ui-resizable-nw\" id=\"wc-ranger-nwgrip\"></div><div class=\"ui-resizable-handle ui-resizable-se\" id=\"wc-ranger-segrip\"></div>");
			//$(this).addClass("ui-state-active");

			var p = $(this).parent().css("position", "relative").addClass("ui-widget-content");
			var ph = p.height();
			var pid = p.attr("id");

			$(this).css("min-height", ph);

			$(this).draggable({
				containment: "#" + pid
			}).resizable({
				containment: "#" + pid,
				handles: {
					'se': "#wc-ranger-segrip",
					'nw': "#wc-ranger-nwgrip"
				}
			});

			$("#wc-ranger-segrip").css("top", ph / 2 - 12);
			$("#wc-ranger-nwgrip").css("top", ph / 2 - 12);

			$(this).on("resizestart", function (event, ui) {
				wc.publish(this, "wc-ranger", {
					time: new Date().getTime(),
					action: "resizestart",
					id: this.id,
					left: $(this).position().left,
					width: $(this).width()
				});
			}).on("resizestop", function (event, ui) {
				wc.publish(this, "wc-ranger", {
					time: new Date().getTime(),
					action: "resizestop",
					id: this.id,
					left: $(this).position().left,
					width: $(this).width()
				});
			}).on("resize", function (event, ui) {
				wc.publish(this, "wc-ranger", {
					time: new Date().getTime(),
					action: "resize",
					id: this.id,
					left: $(this).position().left,
					width: $(this).width()
				});
			});

			$(this).on("dragstart", function (event, ui) {
				wc.publish(this, "wc-ranger", {
					time: new Date().getTime(),
					action: "dragstart",
					id: this.id,
					left: $(this).position().left,
					width: $(this).width()
				});
			}).on("dragstop", function (event, ui) {
				wc.publish(this, "wc-ranger", {
					time: new Date().getTime(),
					action: "dragstop",
					id: this.id,
					left: $(this).position().left,
					width: $(this).width()
				});
			}).on("drag", function (event, ui) {
				wc.publish(this, "wc-ranger", {
					time: new Date().getTime(),
					action: "drag",
					id: this.id,
					left: $(this).position().left,
					width: $(this).width()
				});
			});

			// ADD STATS AND OTHER FINAL STUFF
			this._finalize();

			console.groupEnd();
		}
	}, {
		key: "_click",


		/**
   * A sample callback usage function - see connectedCallback()
   * @_click
   */
		value: function _click() {
			console.group("Ranger._click:", this.id);

			wc.publish(this, "wc-ranger", {
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
			console.group("Ranger.disconnectedCallback");

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
			console.group("Ranger.attributeChangedCallback:", attr, oldval, newval);

			this.properties = this.properties || [];

			var obs = Ranger.observedAttributes;

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
			console.group("Ranger._fetchElements");

			this.dom = this.dom || [];
			this.dom.content = this.innerHTML;

			console.groupEnd();
		}
	}, {
		key: "_fetchAttributes",


		/**
   * Component attributes are _fetched and defaults are set if undefined
   * @_fetchAttributes
   * @param {string} [modal=true] mode for our ranger
   */
		value: function _fetchAttributes() {
			console.group("Ranger._fetchAttributes");

			this.properties = {
				cname: "Ranger",
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
			console.group("Ranger._onClick:", this.id);

			wc.publish(this, "wc-ranger", {
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
			console.group("Ranger.destroy:", this.id);

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
			console.group("Ranger.configure:", JSON.stringify(options));

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
			console.group("Ranger._initialize:", this.id);

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
			console.group("Ranger._finalize:", this.id);

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
			console.group("Ranger.observedAttributes");

			this.observables = [];

			console.groupEnd();
			return this.observables;
		}
	}]);

	return Ranger;
}(HTMLElement);

window.customElements.define('wc-ranger', Ranger);