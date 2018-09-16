"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * App Component<BR>
 * <BR><BR><img src=../img/app.png width=100% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/app.html">DEMO</a>
 */
var App = function (_HTMLElement) {
	_inherits(App, _HTMLElement);

	function App() {
		_classCallCheck(this, App);

		console.group("App.constructor");

		var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

		console.groupEnd();
		return _this;
	}

	_createClass(App, [{
		key: "connectedCallback",


		/**
   * This function is called when this is attached to DOM
   * @connectedCallback. 
   */
		value: function connectedCallback() {
			console.group("App.connectedCallback");

			var self = this;

			// GET PROPERTIES AND INTERESTING ELEMENTS
			this._initialize();

			// REPLACE CONTENT IF NECESSARY WITH NEW STUFF
			this.innerHTML = "<div class='wc-app'></div>";

			this.configure();

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

			console.group("App.publish");

			this.addEventListener("click", function (e) {
				wc.publish(_this2, "wc-app", {
					time: new Date().getTime(),
					action: "click",
					id: _this2.id,
					uparam: _this2.properties.uparam
				});
			});

			console.groupEnd();
		}

		/**
   * Called with .setAttribute(...) function call
   * @attributeChangedCallback
   */

	}, {
		key: "attributeChangedCallback",
		value: function attributeChangedCallback(attr, oldval, newval) {
			console.group("App.attributeChangedCallback:", attr, oldval, newval);

			this.properties = this.properties || [];

			var obs = App.observedAttributes;

			for (var i = 0; i < obs.length; i++) {
				if (newval) {
					this.properties[obs[i]] = newval;
				}
			}

			// YOUR CODE FOR CHANGES GO HERE (MAYBE NULL FIRST TIME THROUGH)
			try {
				switch (attr) {
					case "header":
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
			console.group("App._fetchElements");

			this.dom = this.dom || [];
			this.dom.content = this.innerHTML;

			console.groupEnd();
		}
	}, {
		key: "_fetchAttributes",


		/**
   * Component attributes are _fetched and defaults are set if undefined
   * @_fetchAttributes
   * @param {string} [modal=true] mode for our app
   */
		value: function _fetchAttributes() {
			console.group("App._fetchAttributes");

			this.properties = {
				cname: "App",
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
		key: "destroy",


		/**
   * Destroy the instance object and artifacts
   * @destroy
   */
		value: function destroy() {
			console.group("App.destroy:", this.id);

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
		value: function configure() {
			console.group("App.configure");

			var self = this;

			$.getJSON(this.properties.cfg, function (data) {
				var rval = "";
				var pages = data.pages;

				if (self.properties.testing == "true") {
					rval += "<div class=\"btn-group\" role=\"group\"><label style=\"padding-top:8px;padding-right:10px\">PAGES:</label>";

					$(pages).each(function () {
						rval += "<button type=\"button\" class=\"btn btn-outline-danger app-test-btn\" pid=\"" + this.id + "\">" + this.label + "</button>";
					});

					rval += "</div><hr>";
				}

				rval += "<div class=\"app-header\"><wc-include href=\"" + data.header + "\"></wc-include></div>";

				$(pages).each(function () {
					if (this.active) {
						var display = "block";
					} else {
						var display = "none";
					}

					// IF CACHE IS REQUESTED ADD THE PAGES
					if (this.url != "" && this.cache) {
						rval += "<div class=\"app-page\" cache=\"" + this.cache + "\" url=\"" + this.url + "\" id=\"app-page-" + this.id + "\" style=\"display:" + display + "\"><wc-include href=\"" + this.url + "\"></wc-include></div>";
					} else {
						rval += "<div class=\"app-page\" cache=\"" + this.cache + "\" url=\"" + this.url + "\" id=\"app-page-" + this.id + "\" style=\"display:" + display + "\"><div class=\"p-4 text-center\"><span class='p-4 wc-loading-img'></span></div></div>";
					}
				});

				rval += "<div class=\"app-footer\"><wc-include href=\"" + data.footer + "\"></wc-include></div>";

				$("wc-app").append(rval);

				// FOR TESTING
				$(".app-test-btn").on("click", function () {
					var pid = $(this).attr("pid");
					self.show(pid);
				});

				// ADD STATS AND OTHER FINAL STUFF
				self._finalize();
			}).fail(function (jqXHR, textStatus, errorThrown) {
				console.error('getJSON request failed! ' + textStatus);
			});

			console.groupEnd();
		}
	}, {
		key: "_initialize",


		/**
   * SAVE DATA FOR ANALYTICS
   * @_initialize
   */
		value: function _initialize() {
			console.group("App._initialize:", this.id);

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
			console.group("App._finalize:", this.id);

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
			console.group("App.disconnectedCallback");

			/* CLEAN UP NOW */

			console.groupEnd();
		}
	}, {
		key: "show",


		/**
   * @show
   */
		value: function show(pid) {
			console.group("App.show:", pid);

			var cache = $("#app-page-" + pid).attr("cache");

			$(".app-page").hide();

			// LOAD THE PAGE EACH TIME
			if (cache == "false") {
				var pg = $("#app-page-" + pid);
				var url = pg.attr("url");

				pg.append("<wc-include href=\"" + url + "\"></wc-include>");
			}

			$("#app-page-" + pid).show();

			console.log('PUBLISHED wc-app: show', pid);
			wc.publish(this, "wc-app", {
				time: new Date().getTime(),
				action: "show",
				id: pid
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
			console.group("App.observedAttributes");

			this.observables = [];

			console.groupEnd();
			return this.observables;
		}
	}]);

	return App;
}(HTMLElement);

window.customElements.define('wc-app', App);