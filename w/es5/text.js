"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Text Component<BR>
 * <BR><BR><img src=../img/text.png width=40% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/text.html">DEMO</a>
 */
var Text = function (_HTMLElement) {
	_inherits(Text, _HTMLElement);

	function Text() {
		_classCallCheck(this, Text);

		console.group("Text.constructor");

		var _this = _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this));

		console.groupEnd();
		return _this;
	}

	_createClass(Text, [{
		key: "connectedCallback",


		/**
   * This function is called when this is attached to DOM
   * @connectedCallback. 
   */
		value: function connectedCallback() {
			console.group("Text.connectedCallback");

			var self = this;

			// GET PROPERTIES AND INTERESTING ELEMENTS
			this._initialize();

			var cols = this.properties.columns.split(',');

			var id = this.id;
			var c1 = "col-md-" + cols[0];
			var c2 = "col-md-" + cols[1];

			var lbl = this.properties.label || "";
			var val = this.properties.value || "";
			var hlp = this.properties.help || "";
			var cls = this.properties.class || "";

			// DATA-KEY FOR BINDING
			var dkey = id.replace(/_/g, '').replace(/-/g, '');

			// REPLACE CONTENT IF NECESSARY WITH NEW STUFF
			this.innerHTML = "\n\t    <div class=\"form-group has-feedback clearfix\">\n\t\t<div class=\"row\">\n\t\t    <div class=\"" + c1 + "\">\n\t\t      <label id=\"" + this.id + "-label\" for=\"" + this.id + "-label\" class=\"btn-control col-form-label\">" + lbl + "</label>\n\t\t    </div>\n\n\t\t    <div class=\"" + c2 + "\">\n\t                <input type=\"text\" class=\"form-control " + cls + "\" id=\"" + this.id + "\" value=\"" + val + "\" data-key=" + dkey + " autocomplete='off' />\n\t\t        <span class=\"glyphicon form-control-feedback\" aria-hidden=\"true\"></span>\n\t\t        <small id='" + this.id + "-help' class='form-text help-block with-errors text-muted'>" + hlp + "</small>\n\t\t    </div>\n\t\t</div>\n\t    </div>";

			// TRANSFER ALL ATTRIBUTES NOW (below is an example)
			// -------------------------------------------------
			var widget = this.querySelector("input[type=text]");

			for (var key in this.propertiesW) {
				this.removeAttribute(key);
				if (key != "class") {
					widget.setAttribute(key, this.properties[key]);
				}
			}

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
			var _this2 = this;

			console.group("Text.publish");

			var widget = this.querySelector("input[type=text]");

			if (0) {
				try {
					widget.addEventListener("change", function (e) {
						var id = $(widget).attr("id");

						_this2._change(id);
					});
				} catch (e) {
					console.error(e.name + ' > ' + e.message);
				}
			}

			console.groupEnd();
			return true;
		}

		/**
   * A sample callback usage function - see connectedCallback()
   * @_onClick
   */

	}, {
		key: "_change",
		value: function _change(id) {
			console.group("Text._change:", id);

			var val = $("#" + id).val();

			wc.publish(this, "wc-text", {
				time: new Date().getTime(),
				action: "change",
				id: id,
				val: val,
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
			console.group("Text.disconnectedCallback");

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
			console.group("Text.attributeChangedCallback:", attr, oldval, newval);

			this.properties = this.properties || [];

			var obs = Text.observedAttributes;

			for (var i = 0; i < obs.length; i++) {
				this.properties[obs[i]] = newval;
				// YOUR CODE FOR CHANGES GO HERE 
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
			console.group("Text._fetchElements");

			this.dom = this.dom || [];
			this.dom.content = this.innerHTML;

			console.groupEnd();
		}
	}, {
		key: "_fetchAttributes",


		/**
   * Component attributes are _fetched and defaults are set if undefined
   * @_fetchAttributes
   * @param {string} [modal=true] mode for our text
   */
		value: function _fetchAttributes() {
			console.group("Text._fetchAttributes");

			this.properties = {
				cname: "Text",
				author: "Mel Heravi",
				version: "1.0",
				columns: "12,12"
			};

			// SAVE WIDGET SPECIFIC PROPERTIES
			this.propertiesW = [];

			// SAVE ALL OTHER PROPERTIES
			var attrs = wc.getAttributes(this);

			for (var key in attrs) {
				this.properties[key] = this.getAttribute(key);
				this.propertiesW[key] = this.getAttribute(key);
				console.log(key + ": " + attrs[key]);
			}

			console.log("attributes: ", this.properties);

			// PROCESS ALL PROPERTIES (example below);

			console.groupEnd();
		}
	}, {
		key: "_onClick",


		/**
   * A sample callback usage function - see connectedCallback()
   * @_onClick
   */
		value: function _onClick() {
			console.group("Text._onClick:", this.id);

			wc.publish(this, "wc-text", {
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
			console.group("Text.destroy:", this.id);

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
			console.group("Text.configure:", JSON.stringify(options));

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
			console.group("Text._initialize:", this.id);

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
			console.group("Text._finalize:", this.id);

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
			console.group("Text.observedAttributes");

			this.observables = ["columns"];

			console.groupEnd();
			return this.observables;
		}
	}]);

	return Text;
}(HTMLElement);

window.customElements.define('wc-text', Text);