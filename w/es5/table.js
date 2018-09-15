"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Table component<BR>
 * <BR><BR><img src=../img/table.png width=80%>
 * <BR><BR><a href="../html/table.html">DEMO</a>
 */
var Table = function (_HTMLElement) {
	_inherits(Table, _HTMLElement);

	function Table() {
		_classCallCheck(this, Table);

		console.group("Table.constructor");

		var _this = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this));

		console.groupEnd();
		return _this;
	}

	_createClass(Table, [{
		key: "connectedCallback",


		/**
   * This function is called when this is attached to DOM
   * @connectedCallback. 
   */
		value: function connectedCallback() {
			console.group("Table.connectedCallback");

			var self = this;

			// GET PROPERTIES AND INTERESTING ELEMENTS
			this._initialize();

			this.addEventListener("click", function () {
				self._onClick();
			});

			var cls = this.getAttribute("class");

			// FOR JSON TABLE ONLY
			if (this.properties.json) {
				this.innerHTML = "<table class=\"" + cls + "\" id=\"my-table-table\" style=\"border:1px #cecece solid\">" + this.innerHTML + "</table>";
			}

			var params = JSON.parse(this.properties.datatable);

			var table = this.querySelector("table");

			if (!params.sort) {
				params.sort = { column: 1, direction: "desc" };
			}

			if (this.properties.json) {
				// LOAD FROM JSON FILE
				$.getJSON(this.properties.json, function (values) {
					console.log("SUCCESS", values);

					$(table).addClass(values.class);

					if (params.height) {
						var _$$DataTable;

						$(table).DataTable((_$$DataTable = {
							"data": values.data,
							"columns": values.columns,
							"bLengthChange": params.length,
							"bScrollAutoCss": false,
							"scrollY": params.height,
							"scrollCollapse": true,
							"paging": false,
							"bInfo": params.info,
							"bFilter": params.search
						}, _defineProperty(_$$DataTable, "paging", params.pagination), _defineProperty(_$$DataTable, "aaSorting", [[params.sort.column, params.sort.direction]]), _$$DataTable));
					} else {
						$(table).DataTable({
							"data": values.data,
							"columns": values.columns,
							"bLengthChange": params.length,
							"bProcessing": true,
							"bInfo": params.info,
							"bFilter": params.search,
							"paging": params.pagination,
							"aaSorting": [[params.sort.column, params.sort.direction]]
						});
					}
				});
			} else {
				// NORMAL DATA TABLE
				if (params.height) {
					var _$$DataTable2;

					$(table).DataTable((_$$DataTable2 = {
						"bScrollAutoCss": false,
						"scrollY": params.height,
						"scrollCollapse": true,
						"paging": false,
						"bInfo": params.info
					}, _defineProperty(_$$DataTable2, "paging", params.pagination), _defineProperty(_$$DataTable2, "aaSorting", [[params.sort.column, params.sort.direction]]), _$$DataTable2));
				} else {
					$(table).DataTable({
						"bLengthChange": params.length,
						"bProcessing": true,
						"bInfo": params.info,
						"bFilter": params.search,
						"paging": params.pagination,
						"aaSorting": [[params.sort.column, params.sort.direction]]
					});
				}
			}

			if (this.properties.datatable == "{}") {
				setTimeout(function () {
					var table = $('#my-table-table').DataTable();
					table.destroy();
				}, 50);
			}

			// ADD STATS AND OTHER FINAL STUFF
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
			console.group("Table.disconnectedCallback");

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
			console.group("Table.attributeChangedCallback:", attr, oldval, newval);

			this.properties = this.properties || [];

			var obs = Table.observedAttributes;

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
			console.group("Table._fetchElements");

			this.dom = this.dom || [];
			this.dom.content = this.innerHTML;

			console.groupEnd();
		}
	}, {
		key: "_fetchAttributes",


		/**
   * Component attributes are _fetched and defaults are set if undefined
   * @_fetchAttributes
   * @param {string} [datatable="{}"] datatable attributes
   */
		value: function _fetchAttributes() {
			console.group("Table._fetchAttributes");

			this.properties = {
				"cname": "Table",
				"author": "Mel Heravi",
				"version": "1.0",
				"datatable": "{}",
				"json": null
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
		key: "_onClick",


		/**
   * A sample callback usage function - see connectedCallback()
   * @_onClick
   */
		value: function _onClick() {
			console.group("Table._onClick:", this.id);

			wc.publish(this, "wc-table", {
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
			console.group("Table.destroy:", this.id);

			// FREE POINTER
			delete this;

			// REMOVE ITEM FROM DOM
			this.parentNode.removeChild(this);

			console.groupEnd();
		}
	}, {
		key: "_initialize",


		/**
   * SAVE DATA FOR ANALYTICS
   * @__initialize
   */
		value: function _initialize() {
			console.group("Table._initialize:", this.id);

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
			console.group("Table._finalize:", this.id);

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
			console.group("Table.test");

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
			console.group("Table.observedAttributes");

			this.observables = ["datatable", "json"];

			console.groupEnd();
			return this.observables;
		}
	}]);

	return Table;
}(HTMLElement);

window.customElements.define('wc-table', Table);