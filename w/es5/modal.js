"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A Modal Dialog component
 * <BR><BR><img src=../img/modal.png width=70% style="border:1px lime dashed";>
 * <BR><BR><a href="../html/modal.html">DEMO</a>
 */
var Modal = function (_HTMLElement) {
	_inherits(Modal, _HTMLElement);

	function Modal() {
		_classCallCheck(this, Modal);

		console.group("Modal.constructor");

		var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this));

		console.groupEnd();
		return _this;
	}

	_createClass(Modal, [{
		key: "connectedCallback",


		/**
   * This function is called when this is attached to DOM
   * @connectedCallback. 
   */
		value: function connectedCallback() {
			console.group("Modal.connectedCallback");

			var self = this;

			// MAKE SURE OUR COMPONENT HAS GLOBAL CLASS
			this.classList.add("wc");

			// FETCH ALL INTERESTING ELEMENTS
			this._fetchElements();

			// FETCH ALL ATTRIBUTES
			this._fetchAttributes();

			var id = this.id + "-dialog";

			this.innerHTML = "\n\t    <div class=\"modal\" id=\"" + id + "\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">\n\t    <div class=\"modal-dialog\" role=\"document\">\n\t    <div class=\"modal-content\" style=\"width:" + this.properties.width + ";height=" + this.properties.height + "\">\n\t    <div class=\"modal-header\">\n\t    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n\t    <h4 class=\"modal-title\" id=\"myModalLabel\">" + this.properties.title + "</h4>\n\t    </div>\n\t    <div class=\"modal-body\">\n\t    " + this.dom.body.innerHTML + "\n\t    </div>\n\t    <div class=\"modal-footer\">\n\t    " + this.dom.controls.innerHTML + "\n\t    </div>\n\t    </div>\n\t    </div>\n\t    </div>";

			if (this.properties.title === "UNDEFINED") {
				this.querySelector(".modal-header").style.display = "none";
			}

			if (!this.dom.controls) {
				this.querySelector(".modal-footer").style.display = "none";
			}

			// REPOSITION WHEN A MODAL IS SHOWN
			$('.modal').on('show.bs.modal', this._reposition);

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
			console.group("Modal.disconnectedCallback");

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
			console.group("Modal.attributeChangedCallback:", attr, oldval, newval);

			this.properties = this.properties || [];

			var obs = Modal.observedAttributes;

			for (var i = 0; i < obs.length; i++) {
				this.properties[obs[i]] = newval;
				console.log(obs[i] + ": " + this.properties.background);
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
			console.group("Modal._fetchElements");

			this.dom = this.dom || [];
			this.dom.content = this.innerHTML;
			this.dom.body = this.querySelector("wc-modal-body");
			this.dom.controls = this.querySelector("wc-modal-controls");

			if (this.dom.controls) {
				this.dom.controls.style.display = "none";
			} else {
				this.dom.controls = "";
			}

			console.groupEnd();
		}
	}, {
		key: "_fetchAttributes",


		/**
   * Component attributes are _fetched and defaults are set if undefined
   * @_fetchAttributes
   * @param {string} author component owner
   * @param {string} version Latest version of this component
   */
		value: function _fetchAttributes() {
			console.group("Modal._fetchAttributes");

			this.properties = {
				"cname": "Modal",
				"author": "Mel Heravi",
				"version": "1.0",
				"title": "UNDEFINED"
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
			// this.style.background = this.properties.background;

			console.groupEnd();
		}
	}, {
		key: "_reposition",


		/**
   * Centers the dialog
   * @_reposition
   */
		value: function _reposition() {
			console.group("Modal._reposition");

			var modal = $(this),
			    dialog = modal.find('.modal-dialog');
			modal.css('display', 'block');

			// Dividing by two centers the modal exactly, but dividing by three 
			// or four works better for larger screens.
			dialog.css("margin-top", Math.max(0, ($(window).height() - dialog.height()) / 2));

			console.groupEnd();
		}

		/**
   * Destroy the instance object and artifacts
   * @_destroy
   */

	}, {
		key: "destroy",
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
			console.group("Modal._finalize:", this.id);

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
			console.group("Modal.test");

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
			console.group("Modal.observedAttributes");

			var observables = ["title"];
			console.log(observables);

			console.groupEnd();
			return observables;
		}
	}]);

	return Modal;
}(HTMLElement);

window.customElements.define('wc-modal', Modal);