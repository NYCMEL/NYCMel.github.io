"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var fpattern = {
	phone: "\\d{3}[\\-]\\d{3}[\\-]\\d{4}",
	text: "\\[A-Za-z0-9 \\]",
	email: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$",
	city: "\\[A-Za-z \\]+",
	state: "\\[A-Za-z\\]{1,50}",
	zipcode: "{\\d{5,5}(-\\d{4,4})\\?",
	ssn: "{^(\\d{3}-|(\\d{3})\\s)\\d{2}-\\d{4}\\$",
	amount: "{^\\[\\$\\-\\s\\]*\\[\\d\\,\\]*\\?(\\[\\.\\]\\d{0,2})\\?\\s*\\$",
	number: "\\d*"

	/**
  * A FORM COMPONENT
  * <BR><BR><img src=../img/form.png width=70% style="border:1px lime dashed;padding:20px">
  * <BR><BR><a href="../html/form.html">DEMO</a>
  */
};
var Form = function (_HTMLElement) {
	_inherits(Form, _HTMLElement);

	function Form() {
		_classCallCheck(this, Form);

		console.group("Form.constructor");

		var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this));

		console.groupEnd();
		return _this;
	}

	_createClass(Form, [{
		key: "connectedCallback",


		/**
   * This function is called when this is attached to DOM
   * @connectedCallback. 
   */
		value: function connectedCallback() {
			console.group("Form.connectedCallback");

			var self = this;

			// FETCH ALL INTERESTING ELEMENTS
			this._fetchElements();

			// FETCH ALL ATTRIBUTES
			this._fetchAttributes();

			// REPLACE CONTENT IF NECESSARY WITH NEW STUFF
			this.innerHTML = "\n\t\t<form id='" + this.id + "-actual' class=\"" + this.properties.class + "\" name='" + this.properties.name + "' method='" + this.properties.method + "' action='" + this.properties.action + "'>\n\t\t    " + this.dom.content + "\n\t\t    <div class=\"clearfix\" id='" + this.id + "-results'></div>\n\t\t</form>";

			if (this.properties.action !== "undefined") {
				var form = this.querySelector("form");

				$(form).validator().on('submit', function (e) {
					if (e.isDefaultPrevented()) {
						// handle the invalid form...
					} else {
						e.preventDefault();

						var values = $(this).serializeArray();

						console.log('wc.publish: submit', this.id, values);

						wc.publish(this, this.id, {
							time: new Date().getTime(),
							action: "submit",
							id: this.id,
							values: values
						});
					}
				});
			}

			// REPLACE ALL PATTERNS WITH ACTUAL REGEX STRINGS
			var patterns = this.querySelectorAll("[pattern]");

			$(patterns).each(function () {
				var pattern = this.getAttribute("pattern");

				console.log("---", "fpattern." + pattern);

				this.setAttribute("pattern", eval("fpattern." + pattern));
			});

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
			console.group("Form.disconnectedCallback");

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
			console.group("Form.attributeChangedCallback:", attr, oldval, newval);

			this.properties = this.properties || [];

			var obs = Form.observedAttributes;

			for (var i = 0; i < obs.length; i++) {
				if (newval) {
					this.properties[obs[i]] = newval;

					// YOUR CODE FOR CHANGES GO HERE 
					switch (attr) {
						case "size":
							break;

						default:
							break;
					}
				}
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
			console.group("Form._fetchElements");

			this.dom = this.dom || [];
			this.dom.content = this.innerHTML;

			console.groupEnd();
		}
	}, {
		key: "_fetchAttributes",


		/**
   * Component attributes are _fetched and defaults are set if undefined
   * @_fetchAttributes
   * @param {string} [method=POST] form method
   * @param {string} [name="NOTSET"] form action
   */
		value: function _fetchAttributes() {
			console.group("Form._fetchAttributes");

			this.properties = {
				"cname": "Form",
				"author": "Mel Heravi",
				"version": "1.0",
				"method": "POST"
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

			console.groupEnd();
		}
	}, {
		key: "destroy",


		/**
   * Destroy the instance object and artifacts
   * @_destroy
   */
		value: function destroy() {
			console.group("Form.destroy:", this.id);

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
			console.group("Form._finalize:", this.id);

			this.classList.add("wc");

			setTimeout(function (e) {
				// MARK ALL REQUIRED FIELS
				$("*[required]").each(function () {
					var id = $(this).attr("id");
					$("#" + id + "-label").addClass("required");
				});

				// BIND VARIABLE TO HANDLER
				try {
					$("*[data-key]").each(function () {
						var id = $(this).attr("id");
						tkBind(id, tkBinder);
					});
				} catch (e) {
					console.error(e.name + ' > ' + e.message);
				}

				$("form").validator("update");
			}, 300);

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
			console.group("Form.test");

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
			console.group("Form.observedAttributes");

			this.observables = ["size"];
			console.log(this.observables);

			console.groupEnd();
			return this.observables;
		}
	}]);

	return Form;
}(HTMLElement);

window.customElements.define('wc-form', Form);