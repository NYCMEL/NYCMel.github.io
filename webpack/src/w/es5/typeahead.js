"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Typeahead Component<BR>
 * <BR><BR><img src=../img/typeahead.png width=80% style="border:1px lime dashed;padding:20px">
 * <BR><BR><a href="../html/typeahead.html">DEMO</a>
 */
var Typeahead = function (_HTMLElement) {
	_inherits(Typeahead, _HTMLElement);

	function Typeahead() {
		_classCallCheck(this, Typeahead);

		console.group("Typeahead.constructor");

		var _this = _possibleConstructorReturn(this, (Typeahead.__proto__ || Object.getPrototypeOf(Typeahead)).call(this));

		console.groupEnd();
		return _this;
	}

	_createClass(Typeahead, [{
		key: "connectedCallback",


		/**
   * This function is called when this is attached to DOM
   * @connectedCallback. 
   */
		value: function connectedCallback() {
			console.group("Typeahead.connectedCallback");

			var self = this;

			// GET PROPERTIES AND INTERESTING ELEMENTS
			this._initialize();

			// REPLACE CONTENT IF NECESSARY WITH NEW STUFF
			this.innerHTML = "<input class=\"typeahead " + this.properties.class + "\" type=\"text\" placeholder=\"" + this.properties.placeholder + "\" autocomplete='off' />";

			if (this.properties.url) {
				this._load();
			}

			console.groupEnd();
		}
	}, {
		key: "_publish",


		/**
   * Publish all events
   * @_publish
   */
		value: function _publish(name, value) {
			console.group("Typeahead.publish:", name, value);

			if (typeof value === 'undefined') {
				value = "UNDEFINED";
			}

			wc.publish(this, "wc-typeahead", {
				time: new Date().getTime(),
				action: "selected",
				id: this.id,
				name: name,
				value: value
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
		value: function _click() {
			console.group("Typeahead._click:", this.id);

			wc.publish(this, "wc-typeahead", {
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
			console.group("Typeahead.disconnectedCallback");

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
			console.group("Typeahead.attributeChangedCallback:", attr, oldval, newval);

			this.properties = this.properties || [];

			var obs = Typeahead.observedAttributes;

			for (var i = 0; i < obs.length; i++) {
				if (newval) {
					this.properties[obs[i]] = newval;
				}
			}

			// YOUR CODE FOR CHANGES GO HERE (MAYBE NULL FIRST TIME THROUGH)
			try {
				switch (attr) {
					case "background":
						//this.style.background = newval;
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
			console.group("Typeahead._fetchElements");

			this.dom = this.dom || [];
			this.dom.content = this.innerHTML;

			console.groupEnd();
		}
	}, {
		key: "_fetchAttributes",


		/**
   * Component attributes are _fetched and defaults are set if undefined
   * @_fetchAttributes
   * @param {string} [modal=true] mode for our typeahead
   */
		value: function _fetchAttributes() {
			console.group("Typeahead._fetchAttributes");

			this.properties = {
				cname: "Typeahead",
				author: "Mel Heravi",
				version: "1.0",
				url: null,
				show: 5
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
			console.group("Typeahead._onClick:", this.id);

			wc.publish(this, "wc-typeahead", {
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
			console.group("Typeahead.destroy:", this.id);

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
		value: function configure(data, name, value) {
			console.group("Typeahead.configure:", name, value);

			this.properties.name = name;
			this.properties.value = value;

			this._process(data);

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
			console.group("Typeahead._initialize:", this.id);

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
			console.group("Typeahead._finalize:", this.id);

			this.classList.add("wc");

			// ADD ANALYTICS HERE
			wc.setStats(this, this.properties.cname, this.properties.version);

			// SHOW IT NOW (NO FLICKERS) 
			this.style.visibility = "visible";

			console.groupEnd();
		}
	}, {
		key: "_load",


		/**
   * SAVE DATA FOR ANALYTICS
   * @_load
   */
		value: function _load() {
			console.group("Typeahead._load:", this.id);

			var self = this;
			var names = new Array();
			var ids = new Object();

			$.getJSON(this.properties.url, null, function (data) {
				self._process(data);
			}).fail(function (jqxhr, textStatus, error) {
				var err = textStatus + ', ' + error;
				alert("Request Failed: " + err);
			});

			console.groupEnd();
		}

		/**
   * Process
   * @_process
   */

	}, {
		key: "_process",
		value: function _process(data) {
			console.group("Typeahead._process");

			var self = this;
			var names = new Array();
			var ids = new Object();

			$.each(data, function (index, item) {
				var n = eval("item." + self.properties.name);
				var v = eval("item." + self.properties.value);

				names.push(n);
				ids[n] = v;
			});

			var th = self.querySelector(".typeahead");

			$(th).typeahead({
				hint: false,
				highlight: true,
				minLength: 1
			}, {
				limit: this.properties.show,
				source: substringMatcher(names)
			});

			// DROPDOWN MENU
			var tt = self.querySelector(".tt-menu");

			var width = $(self).width();

			// MAKE THEM SAME SIZE AS INPUT
			tt.style.width = th.style.width = width + "px";

			// BORDER WIDTH BASED ON FONT SIZE
			var bw = width.toString()[0];

			if (this.classList.contains("border-all")) {
				// BORDER ALL
				$(th).css("border", bw + "px" + " #CCC solid");

				$(th).focus(function () {
					$(th).css("border", bw + "px" + " steelblue solid");
				});

				$(th).focusout(function () {
					$(th).css("border-color", "#CCC");
				});
			} else {
				// DEFAULT
				$(th).css("border-bottom", bw + "px" + " #CCC solid");

				$(th).focus(function () {
					$(th).css("border-bottom", bw + "px" + " steelblue solid");
				});

				$(th).focusout(function () {
					$(th).css("border-color", "#CCC");
				});
			}

			// ADD STATS AND OTHER FINAL STUFF
			self._finalize();

			// PUBLISH INTERESTING EVENTS
			$(th).on("keydown", function search(e) {
				if (e.keyCode == 13) {
					self._publish($(this).val(), ids[$(this).val()]);
					var menu = self.querySelector(".tt-menu");
					menu.style.display = "none";
				}
			});

			// $(th).on('change keyup paste', function() {
			// });

			console.groupEnd();
		}
	}], [{
		key: "observedAttributes",


		/**
   * Set observable values here. When Changed, attributeChangedCallback is invoked
   * @observedAttributes
   */
		get: function get() {
			console.group("Typeahead.observedAttributes");

			this.observables = [];

			console.groupEnd();
			return this.observables;
		}
	}]);

	return Typeahead;
}(HTMLElement);

window.customElements.define('wc-typeahead', Typeahead);

var substringMatcher = function substringMatcher(strs) {
	return function findMatches(q, cb) {
		var matches, substringRegex;

		// an array that will be populated with substring matches
		matches = [];

		// regex used to determine if a string contains the substring `q`
		substrRegex = new RegExp(q, 'i');

		// iterate through the pool of strings and for any string that
		// contains the substring `q`, add it to the `matches` array
		$.each(strs, function (i, str) {
			if (substrRegex.test(str)) {
				matches.push(str);
			}
		});

		cb(matches);
	};
};