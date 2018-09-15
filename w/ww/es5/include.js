"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Include Component<BR>
 * <BR><BR><a href="../html/include.html">DEMO</a>
 */
var Include = function (_HTMLElement) {
	_inherits(Include, _HTMLElement);

	function Include() {
		_classCallCheck(this, Include);

		console.group("Include.constructor");

		var _this = _possibleConstructorReturn(this, (Include.__proto__ || Object.getPrototypeOf(Include)).call(this));

		console.groupEnd();
		return _this;
	}

	_createClass(Include, [{
		key: "connectedCallback",


		/**
   * This function is called when this is attached to DOM
   * @connectedCallback. 
   */
		value: function connectedCallback() {
			console.group("Include.connectedCallback");

			var href = $(this).attr("href");
			var par = $(this).parent();

			// ADD LOADING IMAGE
			$(par).html("<span class='wc-loading-img'></span>");

			if (href) {
				var xhttp = new XMLHttpRequest();

				xhttp.onreadystatechange = function () {
					if (this.readyState == 4) {
						//alert(this.responseText)
						if (this.status == 200) {
							$(par).html(this.responseText);
						}
						if (this.status == 404) {
							$(par).html("wc-include: Page not found: " + href);
						}
					}
				};

				xhttp.open("GET", href, true);
				xhttp.send();
			}

			console.groupEnd();
		}
	}]);

	return Include;
}(HTMLElement);

window.customElements.define('wc-include', Include);