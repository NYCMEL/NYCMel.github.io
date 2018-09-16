"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Calendar Component<BR>
 * <BR><BR><img src=../img/calendar.png width=40% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/calendar.html">DEMO</a>
 */
var Calendar = function (_HTMLElement) {
	_inherits(Calendar, _HTMLElement);

	function Calendar() {
		_classCallCheck(this, Calendar);

		console.group("Calendar.constructor");

		var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this));

		console.groupEnd();
		return _this;
	}

	_createClass(Calendar, [{
		key: "connectedCallback",


		/**
   * This function is called when this is attached to DOM
   * @connectedCallback. 
   */
		value: function connectedCallback() {
			console.group("Calendar.connectedCallback");

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
			var nam = this.properties.name || "";

			// DATA-KEY FOR BINDING
			var dkey = id.replace(/_/g, '').replace(/-/g, '');

			if (id == "") {
				// KLUDGE CALENDAR IS CALLED TWICE
				console.groupEnd();
				return;
			}

			// REPLACE CONTENT IF NECESSARY WITH NEW STUFF
			this.innerHTML = "\n\t\t<div class=\"form-group has-feedback clearfix\">\n\t\t    <div class=\"row\">\n\t\t      <div class=\"" + c1 + "\">\n\t\t          <label id=\"" + this.id + "-label\" for=\"" + this.id + "-child\" class=\"btn-control col-form-label\">" + lbl + "</label>\n\t\t      </div>\n\t\t      <div class=\"" + c2 + "\">\n\t\t          <div class=\"input-group date\" data-provide=\"datepicker\">\n\t\t\t      <input type=\"text\" class=\"form-control " + cls + "\" name=\"" + nam + "\" id=\"" + id + "-child\" data-key=\"" + dkey + "\"\n\t\t\t\taria-describedby=\"" + id + "-date-help\" placeholder=\"mm/dd/yyyy\" value=\"" + val + "\" autocomplete='off' />\n\n\t\t              <div class=\"input-group-addon\"></div>\n\t\t          </div>\n\n\t\t          <small id=\"" + id + "-date-help\" class=\"form-text help-block with-errors text-muted\">" + hlp + "</small>\n\t\t      </div>\n\t\t  </div>\n\t\t</div>";

			// CLOSE CALENDAR AFTER SELECT
			$("[data-provide=datepicker]").on('changeDate', function (ev) {
				$(this).datepicker('hide');
			});

			// TRANSFER ALL ATTRIBUTES NOW
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

			console.group("Calendar.publish");

			var widget = this.querySelector("[type=text]");
			var id = $(widget).attr("id");

			widget.addEventListener("change", function (e) {
				_this2._change(id);
			});

			console.groupEnd();
			return true;
		}

		/**
   * A sample callback usage function - see connectedCallback()
   * @_onChange
   */

	}, {
		key: "_change",
		value: function _change(id) {
			console.group("Calendar._change:", id);

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
			console.group("Calendar.disconnectedCallback");

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
			console.group("Calendar.attributeChangedCallback:", attr, oldval, newval);

			this.properties = this.properties || [];

			var obs = Calendar.observedAttributes;

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
			console.group("Calendar._fetchElements");

			this.dom = this.dom || [];
			this.dom.content = this.innerHTML;

			console.groupEnd();
		}
	}, {
		key: "_fetchAttributes",


		/**
   * Component attributes are _fetched and defaults are set if undefined
   * @_fetchAttributes
   * @param {string} [modal=true] mode for our calendar
   */
		value: function _fetchAttributes() {
			console.group("Calendar._fetchAttributes");

			this.properties = {
				cname: "Calendar",
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
		key: "destroy",


		/**
   * Destroy the instance object and artifacts
   * @_destroy
   */
		value: function destroy() {
			console.group("Calendar.destroy:", this.id);

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
			console.group("Calendar.configure:", JSON.stringify(options));

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
			console.group("Calendar._initialize:", this.id);

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
			console.group("Calendar._finalize:", this.id);

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
			console.group("Calendar.observedAttributes");

			this.observables = ["columns"];

			console.groupEnd();
			return this.observables;
		}
	}]);

	return Calendar;
}(HTMLElement);

window.customElements.define("wc-calendar", Calendar);